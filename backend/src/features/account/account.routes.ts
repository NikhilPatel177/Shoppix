import { validateSchema } from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';
import { updateProfileSchema } from './profile/updateProfile.schema';
import { updateProfile } from './profile/updateProfile.controller';

const router = Router();

router.patch('/profile', validateSchema(updateProfileSchema), updateProfile);

export { router as accountRoutes };
