import { AuthCredentials } from '@/features/auth/schemas/authCredentials.schema';
import 'express';

declare global {
  namespace Express {
    interface Request {
      validatedData?:unknown;
      user?: unknown;
    }
  }
}

export {};
