import { validateSchema } from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';
import { loginSchema, registerSchema } from './schemas/authCredentials.schema';
import { registerUser } from './controllers/register.controller';
import { loginUser } from './controllers/login.controller';
import { logoutUser } from './controllers/logout.controller';
import { isAuthenticated } from '@/shared/middlewares/isAuthenticated.middleware';
import { refreshingTheTokens } from './controllers/refreshTokens.controller';
import { changePassword } from './controllers/changePassword.controller';
import { changePasswordSchema } from './schemas/changePassword.schema';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);
router.post('/refresh-token', refreshingTheTokens);
router.post('/logout', isAuthenticated, logoutUser);
router.patch(
  '/change-password',
  isAuthenticated,
  validateSchema(changePasswordSchema),
  changePassword
);

export { router as authRoutes };
