import { Router } from 'express';
import { zodValidator } from '@common/middlewares';
import { registerSchema } from './schemas';
import { registerUserController } from './controllers';

const router = Router();

router.post('/register', zodValidator(registerSchema), registerUserController);

export { router as authRoutes };
