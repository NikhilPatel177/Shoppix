import { Response, Request, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
import { AppError } from '../utils/AppResponse';

export const validateSchema =
  <T extends ZodTypeAny>(schema: T) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      AppError(res, 400, 'Provide Data');
      return;
    }

    const parsedData = schema.safeParse(req.body);
    if (!parsedData.success) {
      const errors = parsedData.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      AppError(res, 400, 'Validation Error', errors);
      return;
    }

    req.validatedData = parsedData.data;
    next();
  };
