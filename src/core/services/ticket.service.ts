import { PagedList } from '@core/common/dto/responses/paged-list.dto';
import {
  ICreateTicketDto,
  ITicket,
  IUpdateTicketDto,
} from '@core/interfaces/ticket.interface';
import logger from '@core/utils/logger';
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
      const response = await this.ticketRepository.create(ticketDto);
      if (response instanceof Error) {
        throw response;
      }
      return { success: true, data: response };
    } catch (error) {
      logger.error('Failed to create ticket:', error);
      return { success: false, error: error.message };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await this.ticketRepository.findOne(id);
      if (response instanceof Error) {
        throw response;
      }
      return { success: true, data: response };
    } catch (error) {
      logger.error('Failed to fetch ticket:', error);
      return { success: false, error: error.message };
    }
  }

  async findAll(): Promise<{
    success: boolean;
    data?: ITicket[] | string;
    error?: string;
  }> {
    try {
      const response = await this.ticketRepository.findAll();
      if (response instanceof Error) {
        throw response;
      }
      return { success: true, data: response };
    } catch (error) {
      logger.error('Failed to fetch all tickets:', error);
      return { success: false, error: error.message };
    }
  }

  async findUsersPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ success: boolean; data?: PagedList<ITicket>; error?: string }> {
    try {
      const offset = (page - 1) * pageSize;
      const [users, totalItems, totalPages] =
        await this.ticketRepository.findAndCountAll(offset, pageSize);
      const pagedList: PagedList<ITicket> = {
        items: users,
        paginationMetadata: {
          statusCode: 200,
          currentPage: page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
      return { success: true, data: pagedList };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(
    updateTicketDto: IUpdateTicketDto,
    id: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await this.ticketRepository.update(updateTicketDto, id);
      if (response instanceof Error) {
        throw response;
      }
      return { success: true, data: response };
    } catch (error) {
      logger.error('Failed to update ticket:', error);
      return { success: false, error: error.message };
    }
  }

  async remove(
    id: string,
    hardDelete: boolean,
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      let response;
      if (!hardDelete) {
        response = await this.ticketRepository.softDelete(id);
      } else {
        response = await this.ticketRepository.hardDelete(id);
      }
      if (response instanceof Error) {
        throw response;
      }
      return { success: true, data: response };
    } catch (error) {
      logger.error('Failed to delete ticket:', error);
      return { success: false, error: error.message };
    }
  }

  // Additional methods for interacting with ticket types can be added here
}

export default TicketService;
