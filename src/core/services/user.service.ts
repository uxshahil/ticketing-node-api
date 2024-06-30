/* eslint-disable class-methods-use-this */
import { PagedList } from '@core/common/dto/responses/paged-list.dto';
import {
  ICreateUserDto,
  IUpdateUserDto,
  IUser,
  IUserVm,
} from '@core/interfaces/user.interface';
import { hash } from 'bcrypt';
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
      const data: PagedList<IUser> = {
        items: users,
        paginationMetadata: {
          currentPage: page,
          pageSize,
          totalItems,
          totalPages,
        },
      };
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findAll(): Promise<{
    success: boolean;
    data?: IUser[];
    error?: string;
  }> {
    try {
      const data = await this.userRepository.findAll();
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: false, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const data = await this.userRepository.findOne(id);
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async create(
    createUserDto: ICreateUserDto,
  ): Promise<{ success: boolean; data?: IUser; error?: string }> {
    try {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const data = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async update(
    updateUserDto: IUpdateUserDto,
    id: string,
  ): Promise<{ success: boolean; data?: IUserVm; error?: string }> {
    try {
      const data = await this.userRepository.update(updateUserDto, id);
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async remove(
    id: string,
    hardDelete: boolean,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!hardDelete) {
        await this.userRepository.softDelete(id);
      } else {
        await this.userRepository.hardDelete(id);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  async findUserByEmail(
    id: string,
  ): Promise<{ success: boolean; data?: IUserVm }> {
    try {
      const data = await this.userRepository.findUserByEmail(id);
      if (!data) {
        throw new Error('Db Error');
      }
      return { success: true, data };
    } catch (error) {
      return { success: false };
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}

export default UserService;
