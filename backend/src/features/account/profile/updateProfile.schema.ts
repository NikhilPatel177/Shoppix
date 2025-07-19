import z from 'zod';

export const updateProfileSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\+\d{1,3}-\d{6,15}$/,
      'Phone must be in the format  +<countrycode>-<number>'
    )
    .optional(),
  fullName: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .refine((data) => data.firstName || data.lastName, {
      message: 'At least one to be provided either firstName or lastName',
    })
    .optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;
