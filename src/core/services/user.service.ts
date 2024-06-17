/* eslint-disable class-methods-use-this */
import { PagedList } from '@core/common/dto/responses/paged-list.dto';
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUser,
} from '@core/interfaces/user.interface';
import logger from '@core/utils/logger';
import UserRepository from 'database/repositories/user.repository';

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUsersPaginated(
    page: number,
    pageSize: number,
  ): Promise<{ success: boolean; data?: PagedList<IUser>; error?: string }> {
    try {
      const offset = (page - 1) * pageSize;
      const [users, totalItems, totalPages] =
        await this.userRepository.findAndCountAll(offset, pageSize);
      const pagedList: PagedList<IUser> = {
        items: users,
        paginationMetadata: {
          statusCode: 200,
          currentPage: page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
      return { success: true, data: pagedList };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll(): Promise<{
    success: boolean;
    data?: IUser[];
    error?: string;
  }> {
    const resp = await this.userRepository.findAll();
    if (typeof resp !== 'string') {
      return { success: true, data: resp };
    }
    return { success: false };
  }

  catch(error) {
    return { success: false, error: error.message };
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const resp = await this.userRepository.findOne(id);
      if (typeof resp !== 'string') {
        return { success: true, data: resp };
      }
      return { success: false, error: resp };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async create(
    user: ICreateUserDto,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    // Implement your logic to create a new user in the database
    try {
      const resp = await this.userRepository.create(user);
      if (typeof resp !== 'string') {
        return { success: true, data: resp };
      }
      return { success: false, error: resp };
    } catch (error) {
      return { success: false, error: 'Failed to create user' };
    }
  }

  async update(
    user: IUpdateUserDto,
    id: string,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const resp = await this.userRepository.update(user, id);
      if (typeof resp !== 'string') {
        return { success: true, data: resp };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  }

  async remove(id: string, hardDelete: boolean) {
    try {
      let resp;

      if (!hardDelete) {
        resp = await this.userRepository.softDelete(id);
      } else {
        resp = await this.userRepository.hardDelete(id);
      }

      if (typeof resp !== 'string') {
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      logger.error('Failed to delete user:', error);
      return { success: false };
    }
  }

  async findUserByEmail(
    id: string,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const resp = await this.userRepository.findUserByEmail(id);
      if (typeof resp !== 'string') {
        return { success: true, data: resp };
      }
      return { success: false, error: resp };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default UserService;
