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
      'REFRESH_TOKEN_EXPIRES_IN must be a valid time string like 15m,2h,7d'
    ),

  EMAIL_TOKEN_SECRET: z.string({
    required_error: 'EMAIL_TOKEN_SECRET is required',
  }),
  RESET_PASSWORD_TOKEN_SECRET: z.string({
    required_error: 'RESET_PASSWORD_TOKEN_SECRET is required',
  }),
  MULTIPURPOSE_TOKEN_EXPIRES_IN: z
    .string()
    .regex(
      /^\d+[smhd]$/,
      'MULTIPURPOSE_TOKEN_EXPIRES_IN must be a valid time string like 15m,2h,7d'
    ),

  GOOGLE_CLIENT_ID: z.string({
    required_error: 'GOOGLE_CLIENT_ID is required',
  }),
  GOOGLE_CLIENT_SECRET: z.string({
    required_error: 'GOOGLE_CLIENT_SECRET is required',
  }),

  BREVO_SMTP_SERVER: z.string({
    required_error: 'BREVO_SMTP_SERVER is required',
  }),
  BREVO_SMTP_PASSWORD: z.string({
    required_error: 'BREVO_SMTP_PASSWORD is required',
  }),
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
