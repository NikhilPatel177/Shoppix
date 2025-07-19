import z from 'zod';
import { strongPasswordField } from './base.schema';

export const setPasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: 'New password is required' })
      .pipe(strongPasswordField),
    confirmNewPassword: z.string({ required_error: 'Confirm new password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type SetPassword = z.infer<typeof setPasswordSchema>;
