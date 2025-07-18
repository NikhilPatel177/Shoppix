import { Router } from 'express';
import { updateProfile } from './controllers/updateProfile.controller';
import { validateSchema } from '@/shared/middlewares/validate.middleware';
import { profileUpdateSchema } from './schemas/profile.schema';

const router = Router();

router.patch('/profile', validateSchema(profileUpdateSchema), updateProfile);

export { router as accountRoutes };
