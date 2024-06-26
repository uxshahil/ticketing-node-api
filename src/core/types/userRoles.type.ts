import { UserRole } from 'database/types/enums';

export type UserRoleT = {
  id: string;
  userRole: UserRole;
  description: string;
};
