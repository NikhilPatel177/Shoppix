import z from 'zod';
import { authBaseSchema } from './base.schema';
import { setPasswordSchema } from './setPassword.schema';

export const forgotPasswordSchema = authBaseSchema.pick({ email: true });

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = setPasswordSchema
  .pick({
    newPassword: true,
    confirmNewPassword: true,
  })
  .extend({ resetToken: z.string({ error: 'Reset token is required' }) })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
