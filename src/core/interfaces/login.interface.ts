import { LoginT } from '@core/types/login.type';

export interface ILogin extends LoginT {}

export interface ILoginMeta extends ILogin {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateLoginDto extends Omit<ILogin, 'id'> {}

export interface IUpdateLoginDto extends Partial<Omit<ILogin, 'id'>> {}

export interface ILoginDto extends ICreateLoginDto {}
