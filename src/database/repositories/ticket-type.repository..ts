/* eslint-disable class-methods-use-this */
import {
  ICreateTicketTypeDto,
  ITicketType,
  IUpdateTicketTypeDto,
} from '@core/interfaces/ticket-type.interface';
import logger from '@core/utils/logger';
import db from 'database/database';

class TicketTypeRepository {
  async create(ticketType: ICreateTicketTypeDto): Promise<ITicketType> {
    try {
      const [data] = await db('ticketTypes').insert(ticketType).returning('*');
      if (data < 1) {
        throw new Error('Failed to create ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<ITicketType> {
    try {
      const [data] = await db('ticketTypes').where('id', id);
      if (data < 1) {
        throw new Error('Failed to update ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findAll(): Promise<ITicketType[]> {
    try {
      const data = await db('ticketTypes');
      if (data < 1) {
        throw new Error('Failed to find ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async update(
    ticketType: IUpdateTicketTypeDto,
    id: string,
  ): Promise<ITicketType> {
    try {
      const [data] = await db('ticketTypes')
        .where('id', id)
        .update(ticketType)
        .returning('*');
      if (!data) {
        throw new Error('Failed to update ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      const data = await db('ticketTypes').where('id', id).delete();
      if (data < 1) {
        throw new Error('Failed to delete ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const data = await db('ticketTypes')
        .where('id', id)
        .update({ deletedAt: new Date() });
      if (data < 1) {
        throw new Error('Failed to delete ticket type');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}

export default TicketTypeRepository;
