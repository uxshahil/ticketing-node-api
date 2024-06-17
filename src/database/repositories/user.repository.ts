/* eslint-disable class-methods-use-this */
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUser,
} from '@core/interfaces/user.interface';
import AuthService from '@core/services/auth.service';
import logger from '@core/utils/logger';
import db from 'database/database';

class UserRepository {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async create(createUser: ICreateUserDto): Promise<IUser> {
    try {
      const id = await db.transaction(async (trx) => {
        const [{ id: loginId }] = await trx('logins')
          .insert({
            email: createUser.email,
            password: createUser.password,
          })
          .returning('id');

        const [newUser] = (await trx('users')
          .insert({
            first_name: createUser.firstName,
            last_name: createUser.lastName,
            profile_pic: createUser.profilePic,
            loginId,
          })
          .returning('*')) as IUser[];

        const token = this.authService.generateToken(newUser.id);

        await trx('logins').where('id', loginId).update({ jwt: token });

        return newUser.id;
      });

      const user = await this.findOne(id);
      return user;
    } catch (error) {
      logger.error('Failed to create user:', error);
      return undefined;
    }
  }

  async findOne(id: string): Promise<IUser> {
    try {
      const users = await db('users as u')
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
        .andWhere('u.deletedAt', null)
        .first();
      return users;
    } catch (error) {
      logger.error('Failed to read user:', error);
      return undefined;
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      const users = await db('users as u')
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
        .whereNull('u.deletedAt')
        .first();
      return users;
    } catch (error) {
      logger.error('Failed to read users:', error);
      return undefined;
    }
  }

  async findAndCountAll(
    skip: number,
    take: number,
  ): Promise<[IUser[], number, number]> {
    try {
      const totalItemsQuery = await db('users as u')
        .count('* as total')
        .leftJoin('logins as l', 'u.loginId', 'l.id')
        .whereNull('u.deletedAt')
        .first();

      const totalItems = parseInt(totalItemsQuery.total, 10);

      const res = await db('users as u')
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

      return [res, totalItems, totalPages];
    } catch (error) {
      logger.error('Failed to read users:', error);
      return undefined;
    }
  }

  async update(user: IUpdateUserDto, id: string): Promise<IUser> {
    try {
      const res = await db.transaction(async (trx) => {
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
          .update({ password: user.password })
          .returning('*');

        const users = await trx('users as u')
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
          .andWhere('u.deletedAt', null)
          .first();

        return users;
      });

      return res;
    } catch (error) {
      logger.error('Failed to update user:', error);
      return undefined;
    }
  }

  async hardDelete(id: string): Promise<boolean> {
    try {
      await db('users').where('id', id).del();
      return true;
    } catch (error) {
      logger.error('Failed to delete user:', error);
      return undefined;
    }
  }

  async softDelete(id: string): Promise<boolean> {
    try {
      const resp = await db('users')
        .where('id', id)
        .update({ deletedAt: new Date() });
      if (resp === 1) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to delete user:', error);
      return undefined;
    }
  }

  async findUserByEmail(email: string): Promise<IUser> {
    try {
      const users = await db('users as u')
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
        .andWhere('u.deletedAt', null)
        .first();
      return users;
    } catch (error) {
      logger.error('Failed to read user:', error);
      return undefined;
    }
  }
}

export default UserRepository;
