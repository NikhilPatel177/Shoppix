import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { respondErr, respondWithErrors } from '../utils/sendReponse';

export const validateSchema =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      respondErr(res, 400, 'Provide data');
      return;
    }

    const parserSchema = schema.safeParse(req.body);

    if (!parserSchema.success) {
      const errors = parserSchema.error.errors.map((e) => ({
        field: e.path.join(''),
        message: e.message,
      }));
      respondWithErrors(res, errors, 400, 'Validation Failed');
      return;
    }
    req.validatedData = parserSchema.data
    next();
  };
