import ApiBaseController from '@core/common/api-base.controller';
import {
  ICreateTicketDto,
  IUpdateTicketDto,
} from '@core/interfaces/ticket.interface';
import TicketService from '@core/services/ticket.service';
import logger from '@core/utils/logger';
import { Request, Response } from 'express';

export class TicketController extends ApiBaseController {
  private ticketService: TicketService;

  constructor() {
    super();
    this.ticketService = new TicketService(); // Initialize your service
    logger.debug('TicketController created');
  }

  createTicket = async (req: Request, res: Response) => {
    const ticketDto: ICreateTicketDto = req.body;
    const ticket = await this.ticketService.create(ticketDto);
    if (!ticket.success) {
      this.error(res, 'An error occurred while creating the ticket');
    }
    this.okWithData(res, ticket, 'Ticket created successfully');
  };

  findTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await this.ticketService.findOne(id);
    if (!ticket.success) {
      this.error(res, 'An error occurred while fetching the ticket');
    }
    this.okWithData(res, ticket.data, 'Successfully fetched ticket data');
  };

  findTickets = async (req: Request, res: Response) => {
    // Ensure page and pageSize are strings before parsing
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1;
    const pageSize =
      typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize, 10)
        : 10; // Default page size
    const { success, data, error } =
      await this.ticketService.findUsersPaginated(page, pageSize);
    if (success) {
      this.okWithPagination(res, data, 'Successfully fetched all ticket data');
    } else {
      this.error(res, error);
    }
  };

  updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTicketDto: IUpdateTicketDto = req.body;
    const updatedTicket = await this.ticketService.update(updateTicketDto, id);
    if (!updatedTicket.success) {
      this.error(res, 'An error occurred while updating the ticket');
    }
    this.okWithData(res, updatedTicket, `Successfully updated ticket ${id}`);
  };

  deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const exists = await this.ticketService.findOne(id);
    const deleted = await this.ticketService.remove(id, false); // Assuming soft delete by default
    if (deleted.success && exists) {
      this.ok(res, 'Successfully deleted ticket');
    } else {
      this.error(res, 'An error occurred while deleting the ticket');
    }
  };

  // Add more methods as needed based on your requirements
}

export default TicketController;
