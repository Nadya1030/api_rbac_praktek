import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate, registerSchema, loginSchema } from '../middlewares/validate.middleware';

const router = express.Router();
const controller = new AuthController();

router.post('/register', validate(registerSchema), controller.register.bind(controller));
router.post('/login', validate(loginSchema), controller.login.bind(controller));

export default router;