export interface ILogin {
  id: string;
  email: string;
  password: string;
  jwt?: string;
}

export interface ILoginMeta extends ILogin {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateLoginDto extends Omit<ILogin, 'id'> {}

export interface IUpdateLoginDto extends Partial<Omit<ILogin, 'id'>> {}

export interface ILoginDto extends ICreateLoginDto {}
