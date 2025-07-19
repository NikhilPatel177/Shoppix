import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  MONGO_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']),

  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_EXPIRY: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string().url(),
  FRONTEND_URL: z.string().url(),

  BREVO_EMAIL: z.string().email(),
  BREVO_SMTP_KEY: z.string(),

  RESET_PASSWORD_SECRET:z.string(),
  RESET_PASSWORD_EXPIRY:z.string().default('15m'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errorsObj = parsedEnv.error.issues.reduce((acc, err) => {
    const key = err.path.join('.');
    acc[key] = err.message;
    return acc;
  }, {} as Record<string, string>);
  console.log(errorsObj);
  process.exit(1);
}

let env = parsedEnv.data;

export default env;
