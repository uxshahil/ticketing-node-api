import ApiBaseController from '@core/common/api-base.controller';
import {
  ICreateTicketTypeDto,
  IUpdateTicketTypeDto,
} from '@core/interfaces/ticket-type.interface';
import TicketTypeService from '@core/services/ticket-type.service';
import logger from '@core/utils/logger';
import { Request, Response } from 'express';

export class TicketTypeController extends ApiBaseController {
  private ticketTypeService: TicketTypeService;

  constructor() {
    super();
    this.ticketTypeService = new TicketTypeService();
    logger.debug('TicketTypeController created');
  }

  createTicketType = async (req: Request, res: Response) => {
    const ticketTypeData: ICreateTicketTypeDto = req.body;
    const { success, data, error } = await this.ticketTypeService.create(
      ticketTypeData,
    );
    if (!success) {
      this.error(res, error);
    }
    this.created(res, data, 'Ticket type created successfully');
  };

  findTicketTypes = async (req: Request, res: Response) => {
    const { success, data, error } = await this.ticketTypeService.findAll();
    if (!success) {
      this.error(res, error);
    } else {
      this.okWithData(res, data, 'Successfully fetched all ticket types data');
    }
  };

  findTicketTypeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, data, error } = await this.ticketTypeService.findOne(id);
    if (!success) {
      this.error(res, error);
    }
    this.okWithData(res, data, 'Successfully fetched ticket type data');
  };

  updateTicketType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticketTypeData: IUpdateTicketTypeDto = req.body;
    const { success, data, error } = await this.ticketTypeService.update(
      ticketTypeData,
      id,
    );
    if (!success) {
      this.error(res, error);
    }
    this.okWithData(res, data, `Successfully updated ticket type ${id}`);
  };

  deleteTicketType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const exists = await this.ticketTypeService.findOne(id);
    const deleted = await this.ticketTypeService.remove(id, false);
    if (deleted.success && exists) {
      this.ok(res, 'Successfully deleted ticket type');
    } else {
      this.error(res, 'An error occurred while deleting the ticket');
    }
  };
}

export default TicketTypeController;
