import {
  ICreateTicketTypeDto,
  ITicketType,
  IUpdateTicketTypeDto,
} from '@core/interfaces/ticket-type.interface';
import TicketTypeRepository from 'database/repositories/ticket-type.repository.';

class TicketTypeService {
  private ticketTypeRepository: TicketTypeRepository;

  constructor() {
    this.ticketTypeRepository = new TicketTypeRepository();
  }

  async findAll(): Promise<{
    success: boolean;
    data?: ITicketType[];
    error?: string;
  }> {
    const ticketTypes = await this.ticketTypeRepository.findAll();
    if (Array.isArray(ticketTypes)) {
      return { success: true, data: ticketTypes };
    }
    return { success: false, error: ticketTypes };
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    const ticketType = await this.ticketTypeRepository.findOne(id);
    if (ticketType) {
      return { success: true, data: ticketType };
    }
    return { success: false, error: 'Ticket type not found' };
  }

  async create(
    ticketType: ICreateTicketTypeDto,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    const newTicketType = await this.ticketTypeRepository.create(ticketType);
    if (newTicketType) {
      return { success: true, data: newTicketType };
    }
    return { success: false, error: 'Failed to create ticket type' };
  }

  async update(
    ticketType: IUpdateTicketTypeDto,
    id: string,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    const updatedTicketType = await this.ticketTypeRepository.update(
      ticketType,
      id,
    );
    if (updatedTicketType) {
      return { success: true, data: updatedTicketType };
    }
    return { success: false, error: 'Failed to update ticket type' };
  }

  async delete(id: string): Promise<{ success: boolean; error?: string }> {
    const success = await this.ticketTypeRepository.delete(id);
    if (success) {
      return { success: true };
    }
    return { success: false, error: 'Failed to delete ticket type' };
  }

  async hardDelete(id: string): Promise<{ success: boolean; error?: string }> {
    const success = await this.ticketTypeRepository.hardDelete(id);
    if (success) {
      return { success: true };
    }
    return { success: false, error: 'Failed to hard delete ticket type' };
  }
}

export default TicketTypeService;
