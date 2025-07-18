import env from '@/config/env';
import { IUser } from '@/shared/types/IUser.type';
import jwt from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (user: IUser): Tokens => {
  const accessToken = jwt.sign(
    { id: user.id, activeRole: user.activeRole },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY } as jwt.SignOptions
  );

  const refreshToken = jwt.sign(
    { id: user.id, activeRole: user.activeRole },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );
  return { accessToken, refreshToken };
};
