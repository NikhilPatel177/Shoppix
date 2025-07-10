import { validateSchema } from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';
import { loginSchema, registerSchema } from './schemas/authCredentials.schema';
import { registerUser } from './controllers/register.controller';
import { loginUser } from './controllers/login.controller';
import { logoutUser } from './controllers/logout.controller';
import { isAuthenticated } from '@/shared/middlewares/isAuthenticated.middleware';
import { refreshingTheTokens } from './controllers/refreshTokens.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);
router.post('/logout', isAuthenticated, logoutUser);
router.post('/refresh-token', refreshingTheTokens);

export { router as authRoutes };
