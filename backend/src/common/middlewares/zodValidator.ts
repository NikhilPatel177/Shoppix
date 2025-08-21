import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';

export const zodValidator =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Data not provided' });
    }

    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        path: e.path.join(','),
        message: e.message,
      }));

      return res.status(400).json({ message: 'Validation Error', errors });
    }

    req.validatedData = result.data;
    next();
  };
