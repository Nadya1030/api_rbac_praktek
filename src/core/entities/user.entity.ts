import type { RoleEntity } from './role.entity';

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  role: RoleEntity;
}

// Versi tanpa password untuk response publik
export type SafeUser = Omit<UserEntity, 'password'>;