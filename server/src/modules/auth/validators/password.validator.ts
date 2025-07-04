import { z } from 'zod';
import { passwordSchema } from '../../../shared/validators/password.validator';

const passwordBaseSchema = z.object({
  currentPassword: z.string({
    required_error: 'Current password is required',
  }),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .pipe(passwordSchema),
  confirmNewPassword: z.string({
    required_error: 'Confirm new password is required',
  }),
});

export const changePasswordSchema = passwordBaseSchema.refine(
  (data) => data.newPassword === data.confirmNewPassword,
  {
    message: 'New password and confirm password must match',
    path: ['confirmNewPassword'],
  }
);

export type changePasswordFormData = z.infer<typeof changePasswordSchema>;

export const setPasswordSchema = passwordBaseSchema
  .pick({
    newPassword: true,
    confirmNewPassword: true,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmNewPassword'],
  });

export type setPasswordFormData = z.infer<typeof setPasswordSchema>;

export const resetPasswordSchema = passwordBaseSchema
  .pick({ newPassword: true, confirmNewPassword: true })
  .extend({ token: z.string({ required_error: 'Token is required' }) })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmNewPassword'],
  });

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;
