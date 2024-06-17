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
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            profilePic: createUser.profilePic,
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
      const users = await db.raw(
        `SELECT u.id, u."firstName", u."lastName", u."profilePic", u."loginId",
        l.email, l.password, l.jwt  FROM users u
        LEFT JOIN logins l ON u."loginId" = l.id
        WHERE u.id = '${id}' AND u."deletedAt" IS NULL;`,
      );
      return users.rows[0];
    } catch (error) {
      logger.error('Failed to read user:', error);
      return undefined;
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      const users = await db.raw(
        `SELECT u.id, u."firstName", u."lastName", u."profilePic", u."loginId",
        l.email, l.password, l.jwt  FROM users u
        LEFT JOIN logins l ON u."loginId" = l.id
        WHERE u."deletedAt" IS NULL;`,
      );
      return users.rows;
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
      const totalItemsQuery = await db.raw(
        `SELECT COUNT(*) as total FROM users u
         LEFT JOIN logins l ON u."loginId" = l.id
         WHERE u."deletedAt" IS NULL;`,
      );

      const totalItems = totalItemsQuery.rows[0].total;

      // Calculate total pages based on the total items and items per page (take)
      const totalPages = Math.ceil(totalItems / take);

      const res = await db.raw(
        `SELECT u.id, u."firstName", u."lastName", u."profilePic", u."loginId",
          l.email, l.password, l.jwt
          FROM users u
          LEFT JOIN logins l ON u."loginId" = l.id
          WHERE u."deletedAt" IS NULL
          ORDER BY u."createdAt"
          LIMIT ${take} OFFSET ${skip};`,
      );

      return [res.rows, totalItems, totalPages];
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

        const users = await trx.raw(
          `SELECT u.id, u."firstName", u."lastName", u."profilePic", u."loginId",
          l.email, l.password, l.jwt FROM users u
          LEFT JOIN logins l ON u."loginId" = l.id
          WHERE u.id = '${id}' AND u."deletedAt" IS NULL`,
        );

        return users.rows[0];
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
      const users = await db.raw(
        `SELECT u.id, u."firstName", u."lastName", u."profilePic", u."loginId",
        l.email, l.password, l.jwt  FROM users u
        LEFT JOIN logins l ON u."loginId" = l.id
        WHERE l.email = '${email}' AND u."deletedAt" IS NULL;`,
      );
      return users.rows[0];
    } catch (error) {
      logger.error('Failed to read user:', error);
      return undefined;
    }
  }
}

export default UserRepository;
