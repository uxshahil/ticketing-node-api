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
    if (success) {
      this.okWithData(res, data, 'Ticket type created successfully');
    } else {
      this.error(res, error);
    }
  };

  findTicketTypes = async (req: Request, res: Response) => {
    const { success, data, error } = await this.ticketTypeService.findAll();
    if (success) {
      this.okWithData(res, data, 'Successfully fetched all ticket types');
    } else {
      this.error(res, error);
    }
  };

  findTicketTypeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, data, error } = await this.ticketTypeService.findOne(id);
    if (success) {
      this.okWithData(res, data, 'Successfully fetched ticket type');
    } else {
      this.error(res, error);
    }
  };

  updateTicketType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticketTypeData: IUpdateTicketTypeDto = req.body;
    const { success, data, error } = await this.ticketTypeService.update(
      ticketTypeData,
      id,
    );
    if (success) {
      this.okWithData(res, data, 'Ticket type updated successfully');
    } else {
      this.error(res, error);
    }
  };

  deleteTicketType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, error } = await this.ticketTypeService.delete(id);
    if (success) {
      this.ok(res, 'Ticket type deleted successfully');
    } else {
      this.error(res, error);
    }
  };

  hardDeleteTicketType = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, error } = await this.ticketTypeService.hardDelete(id);
    if (success) {
      this.ok(res, 'Ticket type hard deleted successfully');
    } else {
      this.error(res, error);
    }
  };
}

export default TicketTypeController;
