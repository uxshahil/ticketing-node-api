import { LoginT } from '@core/types/login.type';
import { UserT } from '@core/types/user.type';
import { UserRoleT } from '@core/types/userRoles.type';

export interface IUser extends UserT {
  loginId?: string;
}

export interface IUserMeta extends IUser {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateUserDto extends Omit<IUser, 'id'> {
  email: string;
  password: string;
}

export interface ICreateAdminDto extends Omit<ICreateUserDto, 'id'> {
  admin?: boolean;
}

export interface IUpdateUserDto extends Partial<Omit<IUser, 'id'>> {
  password?: string;
  jwt?: string;
}

export interface IUserVm extends UserT {
  login: LoginT;
  userRoles?: UserRoleT[];
}
