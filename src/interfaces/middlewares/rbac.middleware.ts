import type { Request, Response, NextFunction } from 'express';
import { sendError } from '../../utils/response';

// ✅ Support single role atau array of roles
export const rbac = (...requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return sendError(res, 'Forbidden: no user context', 403);
    }

    if (!requiredRoles.includes(user.role)) {
      return sendError(res, 'Forbidden: insufficient role', 403);
    }

    return next();
  };
};