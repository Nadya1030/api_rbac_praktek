import type { Request, Response } from 'express';
import { GetUsersUseCase } from '../../core/use-cases/get-users.usecase';
import { GetProfileUseCase } from '../../core/use-cases/get-profile.usecase';
import { DeleteUserUseCase } from '../../core/use-cases/delete-user.usecase';
import { sendSuccess, sendError } from '../../utils/response';

export class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await new GetUsersUseCase().execute();
      return sendSuccess(res, { total: users.length, users }, `${users.length} user ditemukan`);
    } catch (e: any) {
      return sendError(res, e.message, 500);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return sendError(res, 'ID tidak valid', 400);
      const user = await new GetProfileUseCase().execute(id);
      return sendSuccess(res, user, 'User ditemukan');
    } catch (e: any) {
      return sendError(res, e.message, 404);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return sendError(res, 'ID tidak valid', 400);
      const requesterId = req.user!.id;
      const result = await new DeleteUserUseCase().execute(id, requesterId);
      return sendSuccess(res, result, 'User berhasil dihapus');
    } catch (e: any) {
      return sendError(res, e.message, 400);
    }
  }
}