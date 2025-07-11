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
import passport from 'passport';
import { googleOauthCallback } from './controllers/googleOAuth.controller';

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

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleOauthCallback
);

export { router as authRoutes };
