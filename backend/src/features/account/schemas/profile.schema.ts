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
        firstName: z
          .string()
          .min(1, { error: 'First name cannot be empty' })
          .optional(),
        lastName: z
          .string()
          .min(1, { error: 'Last name cannot be empty' })
          .optional(),
      })
      .optional(),
    avatar: z.url({ error: 'Avatar must be a valid URL' }).optional(),
    gender: z
      .enum(['male', 'female', 'other', 'prefer_not_to_say'], {
        error: 'Gender must be one of allowed values only',
      })
      .optional(),
  })
  .strict();

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
