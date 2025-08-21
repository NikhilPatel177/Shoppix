import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  MONGO_URI: z.string().url(),
  NODE_ENV: z.enum(['development','production']),

  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),

  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const errors = result.error.errors.map((e) => ({
    path: e.path.join(','),
    message: e.message,
  }));

  console.log('❌ Env Variables error :-', errors);
  process.exit(1);
}

export const env = result.data;
