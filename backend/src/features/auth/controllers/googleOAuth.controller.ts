import UserModel, { IUser } from '@/shared/models/user.model';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import { generateTokens } from '../utils/generateTokens';
import env from '@/config/env';

export const googleOauthCallback: RequestHandler = async (req, res) => {
  const user = req.user as any;

  try {
    const userExists = await UserModel.findById(user.id);

    if (!userExists) {
      AppError(res, 401, 'Google login failed');
      return;
    }

    const tokens = generateTokens(userExists);
    userExists.refreshToken = tokens.refreshToken;
    await userExists.save();

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
    });

    res.redirect(`${env.FRONTEND_URL}/auth/google/success`);
  } catch (error) {
    AppError(res);
  }
};
