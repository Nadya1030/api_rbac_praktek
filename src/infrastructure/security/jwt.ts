import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env';

export interface JwtUserPayload {
  id: string;
  role: string;
}

export const signToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

const isValidPayload = (data: unknown): data is JwtUserPayload => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'role' in data &&
    typeof (data as JwtUserPayload).id === 'string' &&
    typeof (data as JwtUserPayload).role === 'string'
  );
};

export const verifyToken = (token: string): JwtUserPayload => {
  const decoded = jwt.verify(token, ENV.JWT_SECRET);

  if (!isValidPayload(decoded)) {
    throw new Error('Invalid token payload');
  }

  return decoded;
};