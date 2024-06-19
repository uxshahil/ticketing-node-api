/* eslint-disable class-methods-use-this */
import {
  ICreateTicketDto,
  ITicket,
  IUpdateTicketDto,
} from '@core/interfaces/ticket.interface';
import logger from '@core/utils/logger';
import db from 'database/database';

class TicketRepository {
  async create(ticket: ICreateTicketDto): Promise<ITicket> {
    try {
      const [data] = await db('tickets').insert(ticket).returning('*');
      if (!data) {
        throw new Error('Failed to read user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<ITicket> {
    try {
      const [data] = await db('tickets').where('id', id);
      if (!data) {
        throw new Error('Failed to read ticket');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findAll(): Promise<ITicket[]> {
    try {
      const data = await db('tickets');
      if (!data) {
        throw new Error('Failed to read tickets');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findAndCountAll(
    skip: number,
    take: number,
  ): Promise<[ITicket[], number, number]> {
    try {
      const [totalItemsQuery] = await db('tickets')
        .count('* as total')
        .whereNull('deletedAt');

      const totalItems = totalItemsQuery.total;

      const totalPages = Math.ceil(totalItems / take);

      const data = await db('tickets')
        .orderBy('createdAt')
        .limit(take)
        .offset(skip);

      if (!data || !totalItems || !totalPages) {
        throw new Error('Failed to read tickets');
      }

      return [data, totalItems, totalPages];
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async update(ticket: IUpdateTicketDto, id: string): Promise<ITicket> {
    try {
      const [data] = await db('tickets')
        .where('id', id)
        .update(ticket)
        .returning('*');
      if (!data) {
        throw new Error('Failed to update ticket');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      const data = await db('tickets').where('id', id).delete();
      if (data < 1) {
        throw new Error('Failed to delete ticket');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const data = await db('tickets')
        .where('id', id)
        .update({ deletedAt: new Date() });
      if (data < 1) {
        throw new Error('Failed to delete ticket');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}

export default TicketRepository;
