import z from 'zod';

export const resendEmailSchema = z.object({
  email: z.email(),
  purpose: z.enum(['verify_email', 'forgot_password']),
});

export type ResendEmail = z.infer<typeof resendEmailSchema>;
