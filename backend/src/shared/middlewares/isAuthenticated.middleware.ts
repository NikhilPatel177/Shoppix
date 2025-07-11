import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppResponse';
import { DecodedJwt } from '../types/DecodedToken.type';
import env from '@/config/env';
import UserModel from '../models/user.model';

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return AppError(res, 400, 'Access token not provided or invalid format');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as DecodedJwt;

    const isUser = await UserModel.findById(decoded.id);
    if (!isUser) {
      AppError(res, 404, 'Malformed token: cause no user found with it');
      return;
    }

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return AppError(res, 401, 'Access token expired');
    } else if (error.name === 'JsonWebTokenError') {
      return AppError(res, 401, 'Invalid access token');
    } else {
      return AppError(res, 500, 'Failed to authenticate');
    }
  }
};
