import z from 'zod';
import { authBaseSchema, strongPasswordField } from './base.schema';

export const changePasswordSchema = authBaseSchema
  .pick({
    currentPassword: true,
  })
  .extend({
    newPassword: z
      .string({ error: 'New password is required' })
      .pipe(strongPasswordField),
    confirmNewPassword: z.string({ error: 'Confirm new password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ChangePassword = z.infer<typeof changePasswordSchema>;
