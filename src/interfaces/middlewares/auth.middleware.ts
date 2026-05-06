import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../infrastructure/security/jwt';
import { sendError } from '../../utils/response';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Missing or invalid Authorization header', 401);
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return sendError(res, 'Invalid token format', 401);
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return sendError(res, 'Invalid or expired token', 403);
  }
};