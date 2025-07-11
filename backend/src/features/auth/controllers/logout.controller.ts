import env from '@/config/env';
import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';

export const logoutUser: RequestHandler = async (req, res) => {
  const user = req.user as DecodedJwt;
  try {
    const userExists = await UserModel.findById(user.id);

    userExists!.refreshToken = '';
    await userExists!.save();

    res.clearCookie('refreshToken', {
      sameSite: 'lax',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
    });

    AppSuccess(res, 200, 'Logged out successfully');
  } catch (error) {
    AppError(res);
  }
};
