import { Router } from 'express';
import { validateSchema } from '../../../shared/middlewares/validateSchema.middleware';
import { registerSchema } from '../validators/register.validator';
import { registerUser } from '../controllers/register.controller';
import { loginSchema } from '../validators/login.validator';
import { loginUser } from '../controllers/login.controller';
import { isAuthenticated } from '../../../shared/middlewares/isAuthenticated.middleware';
import { logoutUser } from '../controllers/logout.controller';
import { refreshTheTokens } from '../controllers/refreshToken.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);
router.post('/logout', isAuthenticated, logoutUser);

router.post('/refresh-token', refreshTheTokens);
export default router;
