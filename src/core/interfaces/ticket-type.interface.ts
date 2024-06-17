export interface ITicketType {
  id: string;
  title: string;
  description: string;
}

export interface ITicketTypeMeta extends ITicketType {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateTicketTypeDto extends Omit<ITicketType, 'id'> {}

export interface IUpdateTicketTypeDto extends Partial<Omit<ITicketType, 'id'> {}