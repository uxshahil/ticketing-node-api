import TicketPriority from '@core/enums/ticket-priority.enum';
import TicketStatus from '@core/enums/ticket-status.enum';

export type TicketT = {
  id: string;
  description?: string;
  number: number;
  dueDate?: Date;
  completedDate?: Date;
  status: TicketStatus;
  priority: TicketPriority;
};
