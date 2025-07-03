import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'At least 8 characters')
  .regex(/\d/, 'At least 1 number')
  .regex(/[a-z]/, 'At least 1 lowercase letter')
  .regex(/[A-Z]/, 'At least 1 uppercase letter');
