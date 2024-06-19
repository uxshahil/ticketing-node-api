import { PagedList } from '@core/common/dto/responses/paged-list.dto';
import {
  ICreateTicketDto,
  ITicket,
  IUpdateTicketDto,
} from '@core/interfaces/ticket.interface';
import TicketRepository from 'database/repositories/ticket.repository';

class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async create(
    ticketDto: ICreateTicketDto,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const data = await this.ticketRepository.create(ticketDto);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const data = await this.ticketRepository.findOne(id);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findAll(): Promise<{
    success: boolean;
    data?: ITicket[] | string;
    error?: string;
  }> {
    try {
      const data = await this.ticketRepository.findAll();
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findTicketsPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ success: boolean; data?: PagedList<ITicket>; error?: string }> {
    try {
      const offset = (page - 1) * pageSize;
      const [users, totalItems, totalPages] =
        await this.ticketRepository.findAndCountAll(offset, pageSize);
      const data: PagedList<ITicket> = {
        items: users,
        paginationMetadata: {
          currentPage: page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async update(
    updateTicketDto: IUpdateTicketDto,
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const data = await this.ticketRepository.update(updateTicketDto, id);
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async remove(
    id: string,
    hardDelete: boolean,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!hardDelete) {
        await this.ticketRepository.softDelete(id);
      } else {
        await this.ticketRepository.hardDelete(id);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default TicketService;
