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

    const rawState = req.query.state as string;
    let redirectTo = '/';

    if (rawState) {
      try {
        const decoded = JSON.parse(Buffer.from(rawState, 'base64').toString());
        redirectTo = decoded?.redirectTo || '/';
      } catch (err) {
        console.warn('Failed to parse redirect state:', err);
      }
    }

    res.redirect(`${env.FRONTEND_URL}${redirectTo}`);
  } catch (error) {
    AppError(res);
  }
};
