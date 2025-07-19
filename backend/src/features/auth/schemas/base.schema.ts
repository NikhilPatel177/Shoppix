import z from 'zod';

export const authBaseSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'At least 8 characters'),
  currentPassword: z
    .string({ required_error: 'Current password is required' })
    .min(8, 'At least 8 characters'),
});

export const strongPasswordField = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/\d/, 'At least 1 number')
  .regex(/[a-z]/, 'At least 1 lowercase letter')
  .regex(/[A-Z]/, 'At least 1 uppercase letter');
