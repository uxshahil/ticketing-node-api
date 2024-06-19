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
    try {
      const data = await this.ticketTypeRepository.findAll();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    try {
      const data = await this.ticketTypeRepository.findOne(id);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async create(
    ticketType: ICreateTicketTypeDto,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    try {
      const data = await this.ticketTypeRepository.create(ticketType);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async update(
    ticketType: IUpdateTicketTypeDto,
    id: string,
  ): Promise<{ success: boolean; data?: ITicketType; error?: string }> {
    try {
      const data = await this.ticketTypeRepository.update(ticketType, id);
      return { success: true, data };
    } catch (error) {
      return { success: false };
    }
  }

  async remove(
    id: string,
    hardDelete: boolean,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!hardDelete) {
        await this.ticketTypeRepository.softDelete(id);
      } else {
        await this.ticketTypeRepository.hardDelete(id);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default TicketTypeService;
