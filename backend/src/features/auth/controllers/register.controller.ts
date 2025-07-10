import { RequestHandler } from 'express';
import { AuthCredentials } from '../schemas/authCredentials.schema';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import UserModel from '@/shared/models/user.model';
import { generateTokens } from '../utils/generateTokens';
import env from '@/config/env';
import { AuthUserType } from '../types/auth.types';
import { sendFormattedData } from '../utils/sendFormattedData';

export const registerUser: RequestHandler = async (req, res) => {
  const { email, password } = req.validatedData as AuthCredentials;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      AppError(
        res,
        400,
        'User already registered with this email, Try login with it'
      );
      return;
    }
    const newUser = await UserModel.create({ email, password });

    const tokens = generateTokens(newUser);
    newUser.refreshToken = tokens.refreshToken;
    await newUser.save();

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
    });

    AppSuccess<AuthUserType>(
      res,
      201,
      'User registered successfully',
      sendFormattedData(newUser),
      tokens.accessToken
    );
  } catch (error) {
    AppError(res);
  }
};
