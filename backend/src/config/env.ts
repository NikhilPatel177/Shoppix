import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default('3000'),
  MONGO_URI: z.string().url(),
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
