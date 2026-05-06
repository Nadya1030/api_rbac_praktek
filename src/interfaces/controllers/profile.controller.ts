import type { Request, Response } from 'express';
import { GetProfileUseCase } from '../../core/use-cases/get-profile.usecase';
import { ChangePasswordUseCase } from '../../core/use-cases/change-password.usecase';
import { sendSuccess, sendError } from '../../utils/response';

export class ProfileController {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const profile = await new GetProfileUseCase().execute(userId);
      return sendSuccess(res, profile, 'Profil berhasil diambil');
    } catch (e: any) {
      return sendError(res, e.message, 404);
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { oldPassword, newPassword } = req.body;
      const result = await new ChangePasswordUseCase().execute(userId, oldPassword, newPassword);
      return sendSuccess(res, result, 'Password berhasil diubah');
    } catch (e: any) {
      return sendError(res, e.message, 400);
    }
  }
}