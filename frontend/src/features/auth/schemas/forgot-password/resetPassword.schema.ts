import { z } from 'zod';
import { strongPasswordSchema } from '../strongPassword.schema';

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .pipe(strongPasswordSchema),
    confirmNewPassword: z.string().min(1, 'Confirm new password is required'),
  })
  .refine((val) => val.confirmNewPassword === val.newPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
