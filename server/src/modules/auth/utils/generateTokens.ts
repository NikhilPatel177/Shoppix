import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const generateTokens = (id: Types.ObjectId, activeRole: string): Tokens => {
  let payload = { id, activeRole };

  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  } as jwt.SignOptions);

  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  } as jwt.SignOptions);

  return { accessToken, refreshToken };
};
