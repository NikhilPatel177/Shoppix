import z from 'zod';

export const profileUpdateSchema = z
  .object({
    phone: z
      .string()
      .regex(/^\+\d{1,3}\d{6,14}$/, {
        message: 'Phone must be a valid international number',
      })
      .optional(),
    fullName: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    avatar: z.string().url('Avatar must be a valid URL').optional(),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  })
  .strict();

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
