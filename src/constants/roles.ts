export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;
 
export type RoleName = keyof typeof ROLES;