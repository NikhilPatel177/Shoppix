import { RequestHandler } from 'express';
import { loginFormData } from '../validators/login.validator';
import {
  respondErr,
  respondServerErr,
  respondWithData,
} from '../../../shared/utils/sendReponse';
import { UserModel } from '../../../shared/models/user.model';
import { generateTokens, Tokens } from '../utils/generateTokens';
import { env } from '../../../config/env';
import { User } from '../types/auth.types';
import { getRespondedUserData } from '../utils/getRespondedUserData';

export const loginUser: RequestHandler = async (req, res, next) => {
  const data = req.validatedData as loginFormData;
  const { email, password } = data;

  try {
    const isUser = await UserModel.findOne({ email }).select('+password');

    if (!isUser) {
      respondErr(res, 400, 'Invalid email or password');
      return;
    }

    const isPasswordCorrect = await isUser.comparePassword(password);
    if (!isPasswordCorrect) {
      respondErr(res, 400, 'Invalid email or password');
      return;
    }

    const tokens: Tokens = generateTokens(isUser.id, isUser.activeRole);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    isUser.refreshToken = tokens.refreshToken;
    await isUser.save();

    respondWithData<User, string>(
      res,
      getRespondedUserData(isUser),
      200,
      `Welcome back, ${isUser.fullName.firstName}`,
      tokens.accessToken
    );
  } catch (error) {
    console.log('Login failed: ', error);
    respondServerErr(res);
  }
};
