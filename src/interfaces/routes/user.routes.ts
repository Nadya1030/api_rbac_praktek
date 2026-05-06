import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { rbac } from '../middlewares/rbac.middleware';
import { ROLES } from '../../constants/roles';

const router = express.Router();
const controller = new UserController();

// Semua route user butuh login + role ADMIN
router.use(authMiddleware, rbac(ROLES.ADMIN));

// GET /api/users
router.get('/', controller.getAllUsers.bind(controller));

// GET /api/users/:id
router.get('/:id', controller.getUserById.bind(controller));

// DELETE /api/users/:id
router.delete('/:id', controller.deleteUser.bind(controller));

export default router;