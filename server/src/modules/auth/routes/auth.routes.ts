import { Router } from 'express';
import { validateSchema } from '../../../shared/middlewares/validate-schema.middleware';
import { registerSchema } from '../validators/register.validator';
import { registerUser } from '../controllers/register.controller';

const router = Router();

router.post('/register', validateSchema(registerSchema), registerUser);

export default router;
