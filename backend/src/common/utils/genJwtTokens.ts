import { env } from '@config/env';
import jwt from 'jsonwebtoken';

export const genJwtToken = (
  type: 'accessToken' | 'refreshToken',
  payload: object,
  expiresIn?: string
): string => {
  const prefix = type.replace('Token', '').toUpperCase();

  const secretKey = `${prefix}_TOKEN_SECRET` as keyof typeof env;
  const expiryKey = `${prefix}_TOKEN_EXPIRY` as keyof typeof env;

  if (!env[secretKey] || !env[expiryKey]) {
    throw new Error(
      `Missing env variables for ${type}: ${secretKey}, ${expiryKey}`
    );
  }

  const secret = env[secretKey];
  if (typeof secret !== 'string') {
    throw new Error(`Invalid secret type for ${secretKey}`);
  }

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn ?? (env[expiryKey] as string),
  } as jwt.SignOptions);
};
