import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default(3000),
  MONGO_URI: z.url(),
  NODE_ENV: z.enum(['development', 'production']),
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
