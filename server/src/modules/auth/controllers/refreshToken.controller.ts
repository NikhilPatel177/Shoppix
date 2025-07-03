import { RequestHandler } from 'express';
import {
  respondErr,
  respondServerErr,
  respondWithData,
} from '../../../shared/utils/sendReponse';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env } from '../../../config/env';
import { DecodedUser } from '../../../shared/types/decodedUser.type';
import { UserModel } from '../../../shared/models/user.model';
import { generateTokens, Tokens } from '../utils/generateTokens';

export const refreshTheTokens: RequestHandler = async (req, res) => {
  if (!req.cookies || !req.cookies.refreshToken) {
    respondErr(res, 400, 'Refresh token not provided');
    return;
  }
  const token = req.cookies.refreshToken;

  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET);
    const { id } = decoded as DecodedUser;

    const isUser = await UserModel.findById(id).select('+refreshToken');

    if (!isUser || isUser.refreshToken !== token) {
      respondErr(res, 403, 'Refresh token is Invalid or doesnot match');
      return;
    }

    const tokens: Tokens = generateTokens(isUser.id, isUser.activeRole);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    isUser.refreshToken = tokens.refreshToken;
    await isUser.save();

    respondWithData<undefined, string>(
      res,
      undefined,
      200,
      'Tokens refreshed successfully',
      tokens.accessToken
    );
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      respondErr(res, 401, 'Invalid access token');
    } else if (error instanceof TokenExpiredError) {
      respondErr(res, 401, 'Access token has expired');
    } else {
      respondServerErr(res);
    }
  }
};
