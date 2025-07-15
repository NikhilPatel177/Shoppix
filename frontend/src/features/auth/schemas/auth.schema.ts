import z from 'zod';
import { strongPasswordSchema } from './strongPassword.schema';

const registerSchema = z.object({
  mode: z.literal('register'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .pipe(strongPasswordSchema),
});

const loginSchema = z.object({
  mode: z.literal('login'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'At least 8 characters'),
});

export const authSchema = z.discriminatedUnion('mode', [
  loginSchema,
  registerSchema,
]);
export type AuthSchemaType = z.infer<typeof authSchema>;
