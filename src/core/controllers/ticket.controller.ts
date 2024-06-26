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
    this.ticketService = new TicketService();
    logger.debug('TicketController created');
  }

  createTicket = async (req: Request, res: Response) => {
    const ticketDto: ICreateTicketDto = req.body;
    const { success, data, error } = await this.ticketService.create(ticketDto);
    if (!success) {
      this.error(res, error);
    }
    this.created(res, data, 'Ticket created successfully');
  };

  findTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, data, error } = await this.ticketService.findOne(id);
    if (!success) {
      this.error(res, error);
    }
    this.okWithData(res, data, 'Successfully fetched ticket data');
  };

  findTickets = async (req: Request, res: Response) => {
    const sort = req?.body ?? undefined;

    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1;

    const pageSize =
      typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize, 10)
        : 10; // Default page size

    const { success, data, error } =
      await this.ticketService.findTicketsPaginated(page, pageSize, sort);

    if (!success) {
      this.error(res, error);
    } else {
      this.okWithPagination(res, data, 'Successfully fetched all ticket data');
    }
  };

  updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateTicketDto: IUpdateTicketDto = req.body;

    const { success, data, error } = await this.ticketService.update(
      updateTicketDto,
      id,
    );
    if (!success) {
      this.error(res, error);
    }
    this.okWithData(res, data, `Successfully updated ticket ${id}`);
  };

  deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const exists = await this.ticketService.findOne(id);
    const deleted = await this.ticketService.remove(id, false);
    if (deleted.success && exists) {
      this.ok(res, 'Successfully deleted ticket');
    } else {
      this.error(res, 'An error occurred while deleting the ticket');
    }
  };
}

export default TicketController;
