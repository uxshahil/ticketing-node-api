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
      const [newTicketType] = await db('ticketTypes')
        .insert(ticketType)
        .returning('*');
      return newTicketType;
    } catch (error) {
      logger.error('Failed to create ticket type:', error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<ITicketType> {
    try {
      const ticketTypes = await db('ticketTypes').where('id', id);
      return ticketTypes[0];
    } catch (error) {
      logger.error('Failed to read ticket type:', error);
      return undefined;
    }
  }

  async findAll(): Promise<ITicketType[]> {
    try {
      const ticketTypes = await db('ticketTypes');
      return ticketTypes;
    } catch (error) {
      logger.error('Failed to read ticket types:', error);
      return undefined;
    }
  }

  async update(
    ticketType: IUpdateTicketTypeDto,
    id: string,
  ): Promise<ITicketType> {
    try {
      const updatedTicketType = await db('ticketTypes')
        .where('id', id)
        .update(ticketType)
        .returning('*');
      return updatedTicketType[0];
    } catch (error) {
      logger.error('Failed to update ticket type:', error);
      return undefined;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await db('ticketTypes').where('id', id).delete();
      return result > 0;
    } catch (error) {
      logger.error('Failed to delete ticket type:', error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      const result = await db('ticketTypes').where('id', id).delete();
      return result > 0;
    } catch (error) {
      logger.error('Failed to hard delete ticket type:', error);
      return undefined;
    }
  }
}

export default TicketTypeRepository;
