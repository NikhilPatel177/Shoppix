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
import { setPasswordSchema } from './schemas/setPassword.schema';
import { setPassword } from './controllers/setPassword.controller';
import { verifyEmail } from './controllers/verifyEmail.controller';
import { resendEmailWithOtp } from './controllers/resend-email/resendEmailVerification.controller';
import { resendEmailSchema } from './schemas/resendEmail.schema';
import { forgotPassword } from './controllers/forgot-password/forgotPassword.controller';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from './schemas/resetPassword.schema';
import { resetPassword } from './controllers/forgot-password/resetPassword.controller';
import { passwordOtpVerify } from './controllers/forgot-password/verifyOtp.controller';

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
router.patch(
  '/set-password',
  isAuthenticated,
  validateSchema(setPasswordSchema),
  setPassword
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

router.post('/verify-email', isAuthenticated, verifyEmail);
router.post(
  '/resend-email',
  validateSchema(resendEmailSchema),
  resendEmailWithOtp
);

router.post(
  '/forgot-password',
  validateSchema(forgotPasswordSchema),
  forgotPassword
);
router.post('/verify-otp', passwordOtpVerify);
router.post(
  '/reset-password',
  validateSchema(resetPasswordSchema),
  resetPassword
);

export { router as authRoutes };
