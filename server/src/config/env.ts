import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  MONGO_URI: z.string().url('MONGO_URI must be a valid URL'),

  NODE_ENV: z.enum(['development', 'production']),

  ACCESS_TOKEN_SECRET: z.string({
    required_error: 'ACCESS_TOKEN_SECRET is required',
  }),
  REFRESH_TOKEN_SECRET: z.string({
    required_error: 'REFRESH_TOKEN_SECRET is required',
  }),

  ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .regex(
      /^\d+[smhd]$/,
      'ACCESS_TOKEN_EXPIRES_IN must be a valid time string like 15m,2h,7d'
    ),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .regex(
      /^\d+[smhd]$/,
      'REFRESH_TOKEN_EXPIRES_IN must be a valid time string like 15m,2h.7d'
    ),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errors = parsedEnv.error.errors.map((e) => ({
    path: e.path.join(''),
    message: e.message,
  }));
  console.log(`ENV variables error ❌ : ${JSON.stringify(errors, null, 2)}`);
  process.exit(1);
}

export const env = parsedEnv.data;
