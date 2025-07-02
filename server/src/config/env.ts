import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  MONGO_URI: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const errors = parsedEnv.error.errors.map((e) => ({
    path: e.path.join(''),
    message: e.message,
  }));
  console.log(`ENV variables error ❌ : ${JSON.stringify(errors, null, 2)}`);
  process.exit(1)
}

export const env = parsedEnv.data;
