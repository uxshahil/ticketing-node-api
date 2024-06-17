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
      const [newTicket] = await db('tickets').insert(ticket).returning('*');
      return newTicket;
    } catch (error) {
      logger.error('Failed to create ticket:', error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<ITicket> {
    try {
      const ticket = await db('tickets').where('id', id).first();
      return ticket;
    } catch (error) {
      logger.error('Failed to read ticket:', error);
      return undefined;
    }
  }

  async findAll(): Promise<ITicket[]> {
    try {
      const tickets = await db('tickets');
      return tickets;
    } catch (error) {
      logger.error('Failed to read tickets:', error);
      return undefined;
    }
  }

  async findAndCountAll(
    skip: number,
    take: number,
  ): Promise<[ITicket[], number, number]> {
    try {
      const totalItemsQuery = await db('tickets')
        .count('* as total')
        .whereNull('deletedAt')
        .first();

      const totalItems = totalItemsQuery.total;

      // Calculate total pages based on the total items and items per page (take)
      const totalPages = Math.ceil(totalItems / take);

      const res = await db('tickets')
        .orderBy('createdAt')
        .limit(take)
        .offset(skip);

      return [res, totalItems, totalPages];
    } catch (error) {
      logger.error('Failed to read users:', error);
      return undefined;
    }
  }

  async update(ticket: IUpdateTicketDto, id: string): Promise<ITicket> {
    try {
      const updatedTicket = await db('tickets')
        .where('id', id)
        .update(ticket)
        .returning('*')
        .first();
      return updatedTicket;
    } catch (error) {
      logger.error('Failed to update ticket:', error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      const result = await db('tickets').where('id', id).delete();
      return result > 0;
    } catch (error) {
      logger.error('Failed to delete ticket:', error);
      return undefined;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const resp = await db('tickets')
        .where('id', id)
        .update({ deletedAt: new Date() });
      if (resp === 1) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to delete ticket:', error);
      return undefined;
    }
  }
}

export default TicketRepository;
