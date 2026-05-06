import type { Request, Response } from 'express';
import { RegisterUseCase } from '../../core/use-cases/register.usecase';
import { LoginUseCase } from '../../core/use-cases/login.usecase';
import { sendSuccess, sendError } from '../../utils/response';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, roleId } = req.body;
      const data = await new RegisterUseCase().execute(email, password, roleId);
      return sendSuccess(res, { id: data.id, email: data.email }, 'Registrasi berhasil', 201);
    } catch (e: any) {
      return sendError(res, e.message, 400);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await new LoginUseCase().execute(email, password);
      return sendSuccess(res, { token }, 'Login berhasil');
    } catch (e: any) {
      return sendError(res, e.message, 401);
    }
  }
}