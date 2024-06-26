/* eslint-disable class-methods-use-this */
import {
  ICreateAdminDto,
  ICreateUserDto,
  IUpdateUserDto,
  IUser,
  IUserVm,
} from '@core/interfaces/user.interface';
import logger from '@core/utils/logger';
import db from 'database/database';
import OmitMeta from 'database/types/omit-meta.type';
import omit from 'database/utils/omit-meta';

class UserRepository {
  async create(createUser: ICreateUserDto | ICreateAdminDto): Promise<IUser> {
    try {
      let userRolesId = '4270206a-fb67-472c-8d50-06b20dc1e606';
      if ('admin' in createUser) {
        userRolesId = '0e3c2b5f-2e6a-4024-b106-5bf2ef3ff5e8';
      }
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

        const userRole = await trx('user_userRoles')
          .insert({
            user_id: newUser.id,
            user_roles_id: userRolesId,
          })
          .returning('*')
          .transacting(trx);

        if (!user || !userRole) {
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

  async update(updateUserDto: IUpdateUserDto, id: string): Promise<IUserVm> {
    try {
      const data = await db.transaction(async (trx) => {
        const [updatedUser] = await trx('users')
          .where('id', id)
          .update({
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            profilePic: updateUserDto.profilePic,
          })
          .returning('*')
          .transacting(trx);

        const [login] = await trx('logins')
          .where('id', updatedUser.loginId)
          .update({ password: updateUserDto.password, jwt: updateUserDto.jwt })
          .returning('*')
          .transacting(trx);

        const userRoles = await trx('user_roles as ur')
          .select('ur.id', 'ur.user_role', 'ur.description')
          .leftJoin('user_user_roles as uur', 'uur.user_roles_id', 'ur.id')
          .where('uur.user_id', id)
          .returning('*')
          .transacting(trx);

        const [user] = await trx('users as u')
          .select('u.id', 'u.firstName', 'u.lastName', 'u.profilePic')
          .where('u.id', id)
          .andWhere('u.deletedAt', null)
          .returning('*')
          .transacting(trx);

        return {
          ...user,
          login: omit(login, [...OmitMeta, 'password']),
          userRoles,
        } as IUserVm;
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

  async findUserByEmail(email: string): Promise<IUserVm> {
    try {
      const data = await db.transaction(async (trx) => {
        const [user] = await trx('users as u')
          .select('u.id', 'u.firstName', 'u.lastName', 'u.profilePic')
          .leftJoin('logins as l', 'u.loginId', 'l.id')
          .where('l.email', email)
          .andWhere('u.deletedAt', null)
          .transacting(trx);

        const [login] = await trx('logins')
          .select('id', 'email', 'password', 'jwt')
          .where('email', email)
          .transacting(trx);

        const userRoles = await trx('user_roles as ur')
          .select('ur.id', 'ur.user_role', 'ur.description')
          .leftJoin('user_user_roles as uur', 'uur.user_roles_id', 'ur.id')
          .where('uur.user_id', user.id)
          .transacting(trx);

        return {
          ...user,
          login,
          userRoles,
        } as IUserVm;
      });

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
