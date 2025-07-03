import { Router } from 'express';
import { validateSchema } from '../../../shared/middlewares/validate-schema.middleware';
import { registerSchema } from '../validators/register.validator';
import { registerUser } from '../controllers/register.controller';
import { loginSchema } from '../validators/login.validator';
import { loginUser } from '../controllers/login.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);
router.post('/login', validateSchema(loginSchema), loginUser);

export default router;
