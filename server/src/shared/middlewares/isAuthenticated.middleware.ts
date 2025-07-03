import { RequestHandler } from 'express';
import { respondErr, respondServerErr } from '../utils/sendReponse';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { env } from '../../config/env';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    respondErr(res, 400, 'Provide accessToken in headers');
    return;
  }
  let token = req.headers.authorization;
  if (!token.startsWith('Bearer ')) {
    respondErr(res, 400, 'Invalid header format');
    return;
  }
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
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
