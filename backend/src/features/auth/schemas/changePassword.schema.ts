import z from 'zod';
import { authBaseSchema, strongPasswordField } from './base.schema';

export const changePasswordSchema = authBaseSchema
  .pick({
    currentPassword: true,
  })
  .extend({
    newPassword: z
      .string({ required_error: 'New password is required' })
      .pipe(strongPasswordField),
    confirmNewPassword: z.string({ required_error: 'Confirm new password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ChangePassword = z.infer<typeof changePasswordSchema>;
