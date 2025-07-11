import z from 'zod';
import { strongPasswordField } from './base.schema';

export const setPasswordSchema = z
  .object({
    newPassword: z
      .string({ error: 'New password is required' })
      .pipe(strongPasswordField),
    confirmNewPassword: z.string({ error: 'Confirm new password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type SetPassword = z.infer<typeof setPasswordSchema>;
