import env from '@/config/env';
import UserModel from '@/shared/models/user.model';
import { DecodedJwt } from '@/shared/types/DecodedToken.type';
import { AppError, AppSuccess } from '@/shared/utils/AppResponse';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/generateTokens';

export const refreshingTheTokens: RequestHandler = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    AppError(res, 400, 'Refresh token not provided');
    return;
  }
  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as DecodedJwt;

    const userExists = await UserModel.findById(decoded.id);

    if (!userExists || userExists.refreshToken !== token) {
      AppError(res, 400, 'Malformed token');
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

    AppSuccess(
      res,
      200,
      'Tokens refreshed successfully',
      undefined,
      tokens.accessToken
    );
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return AppError(res, 401, 'Refresh token expired');
    } else if (error.name === 'JsonWebTokenError') {
      return AppError(res, 401, 'Invalid refresh token');
    } else {
      return AppError(res);
    }
  }
};
