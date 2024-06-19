/* eslint-disable class-methods-use-this */
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUser,
} from '@core/interfaces/user.interface';
import logger from '@core/utils/logger';
import db from 'database/database';

class UserRepository {
  async create(createUser: ICreateUserDto): Promise<IUser> {
    try {
      const [data] = await db.transaction(async (trx) => {
        const [newUser] = await trx('users')
          .insert({
            first_name: createUser.firstName,
            last_name: createUser.lastName,
            profile_pic: createUser.profilePic,
            loginId: null,
          })
          .returning('*')
          .transacting(trx);

        const [{ id: loginId }] = await trx('logins')
          .insert({
            email: createUser.email,
            password: createUser.password,
          })
          .returning('id')
          .transacting(trx);

        const user = await trx('users')
          .where('id', newUser.id)
          .update({
            loginId,
          })
          .returning('*')
          .transacting(trx);

        if (!user) {
          throw new Error('Failed to create user');
        }
        return user;
      });
      if (!data) {
        throw new Error('Failed to create user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<IUser> {
    try {
      const [data] = await db('users as u')
        .select(
          'u.id',
          'u.firstName',
          'u.lastName',
          'u.profilePic',
          'u.loginId',
          'l.email',
          'l.password',
          'l.jwt',
        )
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .where('u.id', id)
        .andWhere('u.deletedAt', null);
      if (!data) {
        throw new Error('Failed to read user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      const [data] = await db('users as u')
        .select(
          'u.id',
          'u.firstName',
          'u.lastMame',
          'u.profilePic',
          'u.loginId',
          'l.email',
          'l.password',
          'l.jwt',
        )
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .whereNull('u.deletedAt');
      if (!data) {
        throw new Error('Failed to read users');
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
  ): Promise<[IUser[], number, number]> {
    try {
      const [totalItemsQuery] = await db('users as u')
        .count('* as total')
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .whereNull('u.deletedAt');

      const totalItems = parseInt(totalItemsQuery.total, 10);

      const data = await db('users as u')
        .select(
          'u.id',
          'u.firstName',
          'u.lastName',
          'u.profilePic',
          'u.loginId',
          'l.email',
          'l.password',
          'l.jwt',
        )
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .whereNull('u.deletedAt')
        .orderBy('u.createdAt')
        .limit(take)
        .offset(skip);

      const totalPages = Math.ceil(totalItems / take);

      if (!data || !totalItems || !totalPages) {
        throw new Error('Failed to read users');
      }

      return [data, totalItems, totalPages];
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async update(user: IUpdateUserDto, id: string): Promise<IUser> {
    try {
      const data = await db.transaction(async (trx) => {
        const updatedUser = await trx('users')
          .where('id', id)
          .update({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePic: user.profilePic,
          })
          .returning('*');

        await trx('logins')
          .where('id', updatedUser[0].loginId)
          .update({ password: user.password, jwt: user.jwt })
          .returning('*');

        const [users] = await trx('users as u')
          .select(
            'u.id',
            'u.firstName',
            'u.lastName',
            'u.profilePic',
            'u.loginId',
            'l.email',
            'l.password',
            'l.jwt',
          )
          .leftJoin('logins as l', 'u.loginId', 'l.id')
          .where('u.id', id)
          .andWhere('u.deletedAt', null);

        return users;
      });

      if (!data) {
        throw new Error('Failed to update user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      const data = await db('users').where('id', id).del();
      if (data < 1) {
        logger.error('Failed to delete user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const data = await db('users')
        .where('id', id)
        .update({ deletedAt: new Date() });
      if (data < 1) {
        logger.error('Failed to delete user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async findUserByEmail(email: string): Promise<IUser> {
    try {
      const [data] = await db('users as u')
        .select(
          'u.id',
          'u.firstName',
          'u.lastName',
          'u.profilePic',
          'u.loginId',
          'l.email',
          'l.password',
          'l.jwt',
        )
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .where('l.email', email)
        .andWhere('u.deletedAt', null);
      if (!data) {
        throw new Error('Failed to read user');
      }
      return data;
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }
}

export default UserRepository;
