import ApiBaseController from '@core/common/api-base.controller';
import { ILoginDto } from '@core/interfaces/login.interface';
import {
  ICreateUserDto,
  IUpdateUserDto,
} from '@core/interfaces/user.interface';
import AuthService from '@core/services/auth.service';
import UserService from '@core/services/user.service';
import logger from '@core/utils/logger';
import { Request, Response } from 'express';

export class UserController extends ApiBaseController {
  private userService: UserService;

  private authService: AuthService;

  constructor() {
    super();
    this.userService = new UserService();
    this.authService = new AuthService();
    logger.debug('UserController created');
  }

  createUser = async (req: Request, res: Response) => {
    const createUserDto: ICreateUserDto = req.body;
    const user = await this.userService.create(createUserDto);
    if (!user.success) {
      this.error(res, 'An error occurred');
    }
    this.okWithData(res, user, 'User data created successfully');
  };

  findUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.findOne(id);
    if (!user.success) {
      this.error(res, 'An error occurred while fetching user');
    }
    this.okWithData(res, user.data, 'Successfully fetched user data');
  };

  findUsers = async (req: Request, res: Response) => {
    const { page, pageSize } = req.params;
    const pageInt = parseInt(page, 10) || 1;
    const pageSizeInt = parseInt(pageSize, 10) || 10; // Default page size
    const { success, data, error } = await this.userService.findUsersPaginated(
      pageInt,
      pageSizeInt,
    );
    if (success) {
      this.okWithPagination(res, data, 'Successfully fetched all user data');
    } else {
      this.error(res, error);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateUserDto: IUpdateUserDto = req.body;
    const updatedUser = await this.userService.update(updateUserDto, id);
    if (!updatedUser.success) {
      this.error(res, 'An error occurred while updating user');
    }
    this.okWithData(res, updatedUser.data, `Successfully updated user`);
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const exists = await this.userService.findOne(id);
    const deleted = await this.userService.remove(id, false); // Assuming soft delete by default
    if (deleted.success && exists) {
      this.ok(res, 'Successfully deleted user');
    } else {
      this.error(res, 'An error occurred while deleting user');
    }
  };

  login = async (req: Request, res: Response) => {
    const loginDto: ILoginDto = req.body;
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (loginDto.password === user.data.password) {
      const token = this.authService.generateToken(user.data.id);
      const updatedLogin = await this.userService.update(
        { jwt: token },
        user.data.id,
      );
      this.okWithData(res, updatedLogin.data, `User login successful`);
    } else {
      this.error(res, 'User login failed');
    }
  };
}

export default UserController;
