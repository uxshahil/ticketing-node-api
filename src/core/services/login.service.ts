import {
  ICreateLoginDto,
  ILogin,
  IUpdateLoginDto,
} from '@core/interfaces/login.interface';
import logger from '@core/utils/logger';

import db from 'database/database';

const create = async (
  login: ILogin,
): Promise<{ success: boolean; data?: ICreateLoginDto }> => {
  try {
    const result = await db('users').insert(login).returning('*');
    return { success: true, data: result[0] };
  } catch (error) {
    logger.error('Failed to create login:', error);
    return { success: false };
  }
};

const find = async (id: string): Promise<ILogin | undefined> => {
  try {
    const users = await db('users').where('id', id).select('*');
    return users[0]; // Returns the login object or undefined if not found
  } catch (error) {
    logger.error('Failed to read login:', error);
    return undefined;
  }
};

const update = async (
  login: IUpdateLoginDto,
  id: string,
): Promise<{ success: boolean; data?: ILogin }> => {
  try {
    const result = await db('users')
      .where('id', id)
      .update(login)
      .returning('*');
    return { success: true, data: result[0] };
  } catch (error) {
    logger.error('Failed to update login:', error);
    return { success: false };
  }
};

const deleteById = async (id: string): Promise<boolean> => {
  try {
    await db('users').where('id', id).del();
    return true;
  } catch (error) {
    logger.error('Failed to delete login:', error);
    return false;
  }
};

export { create, deleteById, find, update };
