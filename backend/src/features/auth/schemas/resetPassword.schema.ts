import z from 'zod';
import { authBaseSchema, strongPasswordField } from './base.schema';
import { authBaseSchema, strongPasswordField } from './base.schema';

export const forgotPasswordSchema = authBaseSchema.pick({ email: true });

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: 'New password is required' })
      .pipe(strongPasswordField),
    confirmNewPassword: z.string({
      required_error: 'Confirm new password is required',
    }),
    resetToken: z.string({ required_error: 'Reset token is required' }),
  })
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: 'New password is required' })
      .min(1)
      .pipe(strongPasswordField),
    confirmNewPassword: z
      .string({ required_error: 'Confirm new password is required' })
      .min(1),
    resetToken: z
      .string({ required_error: 'Reset token is required' })
      .min(1, 'Reset token is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ResetPassword = z.infer<typeof resetPasswordSchema>;
