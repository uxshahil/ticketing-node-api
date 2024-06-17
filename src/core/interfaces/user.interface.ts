import { ILogin } from './login.interface';

export interface IUser extends ILogin {
  id: string;
  firstName: string;
  lastName?: string;
  profilePic?: string;
  loginId?: string;
}

export interface IUserMeta extends IUser {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateUserDto extends Omit<IUser, 'id'> {}

export interface IUpdateUserDto extends Partial<Omit<IUser, 'id'>> {}
