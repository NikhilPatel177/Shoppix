import { RequestHandler } from 'express';
import {
  respondErr,
  respondServerErr,
  respondWithData,
} from '../../../shared/utils/sendReponse';
import { UserModel } from '../../../shared/models/user.model';
import { RegisterFormData } from '../validators/register.validator';
import { generateTokens, Tokens } from '../utils/generateTokens';
import { env } from '../../../config/env';
import { User } from '../types/auth.types';
import { getRespondedUserData } from '../utils/getRespondedUserData';

export const registerUser: RequestHandler = async (req, res) => {
  const data = req.validatedData as RegisterFormData;
  const { email, fullName, password } = data;

  try {
    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      respondErr(
        res,
        400,
        'User is already registered with the email you gave! Please login with it'
      );
      return;
    }

    const newUser = await UserModel.create({ email, fullName, password });

    const tokens: Tokens = generateTokens(newUser.id, newUser.activeRole);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    newUser.refreshToken = tokens.refreshToken;
    await newUser.save();

    respondWithData<User, string>(
      res,
      getRespondedUserData(newUser),
      201,
      'User registration successfull',
      tokens.accessToken
    );
  } catch (error) {
    console.log('Registration failed : ', error);
    respondServerErr(res);
  }
};
