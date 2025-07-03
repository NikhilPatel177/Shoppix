import { RequestHandler } from 'express';
import { DecodedUser } from '../../../shared/types/decodedUser.type';
import {
  respondErr,
  respondOk,
  respondServerErr,
} from '../../../shared/utils/sendReponse';
import { UserModel } from '../../../shared/models/user.model';
import { en } from 'zod/v4/locales';
import { env } from '../../../config/env';

export const logoutUser: RequestHandler = async (req, res) => {
  const data = req.user as DecodedUser;
  const { id } = data;

  try {
    const isUser = await UserModel.findById(id).select('+refreshToken');

    if (!isUser) {
      respondErr(res, 404, 'Invalid token: user not found');
      return;
    }

    isUser.refreshToken = '';
    await isUser.save();

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      path:'/'
    });

    respondOk(res, 200, 'Logout successfull');
  } catch (error) {
    console.log('Login failed : ', error);
    respondServerErr(res);
  }
};
