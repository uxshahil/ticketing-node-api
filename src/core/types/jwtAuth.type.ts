import { UserRole } from 'database/types/enums';

export type JwtAuth = {
  userId: string;
  roles: UserRole[];
};
