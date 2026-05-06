import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendError } from '../../utils/response';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message).join(', ');
      return sendError(res, messages, 422);
    }
    return next();
  };
};

// Auth schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email tidak valid',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password minimal 6 karakter',
    'any.required': 'Password wajib diisi',
  }),
  roleId: Joi.string().required().messages({
    'any.required': 'roleId wajib diisi',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email tidak valid',
    'any.required': 'Email wajib diisi',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password wajib diisi',
  }),
});

// Profile schemas
export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'any.required': 'Password lama wajib diisi',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Password baru minimal 6 karakter',
    'any.required': 'Password baru wajib diisi',
  }),
});