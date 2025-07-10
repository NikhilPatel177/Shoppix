import { validateSchema } from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';
import { loginSchema, registerSchema } from './schemas/authCredentials.schema';
import { registerUser } from './controllers/register.controller';
import { loginUser } from './controllers/login.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);

export { router as authRoutes };
