import z from 'zod';

export const resendEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  purpose: z.enum(['verify_email', 'forgot_password']),
});

export type ResendEmail = z.infer<typeof resendEmailSchema>;
