import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Must be a valid email'),
  password: z.string({ required_error: 'Password is required' }),
});

export type loginFormData = z.infer<typeof loginSchema>;
