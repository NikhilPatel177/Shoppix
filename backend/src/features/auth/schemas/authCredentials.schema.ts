import z from 'zod';
import { authBaseSchema, strongPasswordField } from './base.schema';

export const registerSchema = authBaseSchema
  .pick({
    email: true,
  })
  .extend({
    password: z
      .string({ error: 'Password is required' })
      .pipe(strongPasswordField),
  });

export const loginSchema = authBaseSchema.pick({
  email: true,
  password: true,
});

export type AuthCredentials = z.infer<typeof loginSchema>;
