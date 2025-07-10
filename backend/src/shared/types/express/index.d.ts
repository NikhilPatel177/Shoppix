import 'express';
import { DecodedJwt } from '../DecodedToken.type';

declare global {
  namespace Express {
    interface Request {
      validatedData?: unknown;
      user: DecodedJwt;
    }
  }
}

export {};
