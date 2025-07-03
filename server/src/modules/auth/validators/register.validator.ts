import z from 'zod';
import { passwordSchema } from '../../../shared/validators/password.validator';

export const registerSchema = z
  .object({
    fullName: z
      .object(
        {
          firstName: z.string({
            required_error: 'fullName.firstName is required',
          }),
          lastName: z.string({
            required_error: 'fullName.lastName is required',
          }),
        },
        { required_error: 'Full name is required' }
      )
      .strict(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Must be a valid email')
      .transform((val) => val.toLowerCase()),
    password: z
      .string({ required_error: 'Password is required' })
      .pipe(passwordSchema),
  })
  .strict();

export type RegisterFormData = z.infer<typeof registerSchema>;
