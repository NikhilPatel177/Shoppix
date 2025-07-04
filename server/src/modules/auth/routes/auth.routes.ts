import { Router } from 'express';
import { validateSchema } from '../../../shared/middlewares/validateSchema.middleware';
import { registerSchema } from '../validators/register.validator';
import { registerUser } from '../controllers/register.controller';
import { loginSchema } from '../validators/login.validator';
import { loginUser } from '../controllers/login.controller';
import { isAuthenticated } from '../../../shared/middlewares/isAuthenticated.middleware';
import { logoutUser } from '../controllers/logout.controller';
import { refreshTheTokens } from '../controllers/refreshToken.controller';
import { changeThePassword } from '../controllers/password/changePassword.controller';
import {
  changePasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from '../validators/password.validator';
import { setPassword } from '../controllers/password/setPassword.controller';
import { verifyEmail } from '../controllers/email/verifyEmail.controller';
import { resendForEmailVerification } from '../controllers/email/resendEmailVerification.controller';
import { forgotPassword } from '../controllers/password/forgotPassword.controller';
import { resetPassword } from '../controllers/password/resetPassword.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);
router.post('/logout', isAuthenticated, logoutUser);

router.post('/refresh-token', refreshTheTokens);

router.patch(
  '/change-password',
  isAuthenticated,
  validateSchema(changePasswordSchema),
  changeThePassword
);
router.post(
  '/set-password',
  isAuthenticated,
  validateSchema(setPasswordSchema),
  setPassword
);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',validateSchema(resetPasswordSchema), resetPassword);

router.patch('/verify-email/:token', verifyEmail);
router.post(
  '/resend-email-verification',
  isAuthenticated,
  resendForEmailVerification
);

export default router;
