export interface ITicket {
  id: string;
  description: string;
  number: number;
  createdBy: string;
  ticketTypeId: string;
  assignedTo?: string;
  dueDate: Date;
  completedDate?: Date;
  status: 'unassigned' | 'open' | 'paused' | 'closed';
  priority: 'low' | 'medium' | 'high';
}

export interface ITicketMeta extends ITicket {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICreateTicketDto extends Omit<ITicket, 'id'> {}

export interface IUpdateTicketDto extends Partial<Omit<ITicket, 'id'>> {}
