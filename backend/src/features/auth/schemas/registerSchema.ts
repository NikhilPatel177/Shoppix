import z from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be atleast 8 characters'),
});

export type RegisterType = z.infer<typeof registerSchema>;
