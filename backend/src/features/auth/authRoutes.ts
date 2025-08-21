import { Router } from 'express';
import { zodValidator } from '@common/middlewares';
import { loginSchema, registerSchema } from './schemas';
import { loginUserController, registerUserController } from './controllers';

const router = Router();

router.post('/register', zodValidator(registerSchema), registerUserController);
router.post('/login', zodValidator(loginSchema), loginUserController);

export { router as authRoutes };
