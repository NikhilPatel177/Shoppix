import z from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string({ required_error: 'Email either Phone number is required' })
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^\+?[0-9]{10,15}$/.test(val);
        return isEmail || isPhone;
      },
      {
        message: 'Enter a valid email or phone number',
      }
    ),
  password: z.string({ required_error: 'Password is required' }),
});

export type LoginType = z.infer<typeof loginSchema>;
