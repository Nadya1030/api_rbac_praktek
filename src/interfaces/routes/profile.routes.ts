import express from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate, changePasswordSchema } from '../middlewares/validate.middleware';

const router = express.Router();
const controller = new ProfileController();

// Semua route profile butuh login
router.use(authMiddleware);

// GET /api/profile
router.get('/', controller.getProfile.bind(controller));

// PUT /api/profile/password
router.put('/password', validate(changePasswordSchema), controller.changePassword.bind(controller));

export default router;