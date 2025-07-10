import z from 'zod';

export const authBaseSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? 'Email is required' : 'Invalid email address',
  }),
  password: z
    .string({ error: 'Password is required' })
    .min(8, { error: 'At least 8 characters' }),
});

export const strongPasswordField = z
  .string()
  .min(8, { error: 'At least 8 characters' })
  .regex(/\d/, { error: 'At least 1 number' })
  .regex(/[a-z]/, { error: 'At least 1 lowercase letter' })
  .regex(/[A-Z]/, { error: 'At least 1 uppercase letter' });
