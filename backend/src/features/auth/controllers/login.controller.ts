import { RequestHandler } from 'express';
import { AuthCredentials } from '../schemas/authCredentials.schema';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import UserModel from '@/shared/models/user.model';
import { generateTokens } from '../utils/generateTokens';
import env from '@/config/env';
import { AuthUserType } from '../types/auth.types';
import { sendFormattedData } from '../utils/sendFormattedData';

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.validatedData as AuthCredentials;

  try {
    const existingUser = await UserModel.findOne({ email }).select('+password');
    if (!existingUser) {
      AppError(
        res,
        404,
        'No user found with the email you provided, Do registration with it instead'
      );
      return;
    }

    const isPasswordCorrect = await existingUser.comparePassword(password); 
    if (!isPasswordCorrect) {
      AppError(res, 400, 'Invalid password');
      return;
    }

    const tokens = generateTokens(existingUser);
    existingUser.refreshToken = tokens.refreshToken;
    await existingUser.save();

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
    });

    AppSuccess<AuthUserType>(
      res,
      200,
      'LoggedIn successfully',
      sendFormattedData(existingUser),
      tokens.accessToken
    );
  } catch (error) {
    AppError(res);
  }
};
