import { TicketT } from '@core/types/ticket.type';
import { UserT } from '@core/types/user.type';
import { TicketTypeT } from '../types/ticket-type.type';

export interface ITicket extends TicketT {
  createdBy: string;
  ticketTypeId: string;
  assignedTo?: string;
}

export interface ITicketMeta extends ITicket {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateTicketDto extends Omit<ITicket, 'id'> {}

export interface IUpdateTicketDto extends Partial<Omit<ITicket, 'id'>> {}

export interface ITicketVm extends TicketT {
  createdBy: UserT;
  ticketType: TicketTypeT;
  assignedto: UserT;
}
