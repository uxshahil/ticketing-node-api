import ApiBaseController from '@core/common/api-base.controller';
import {
  ICreateUserDto,
  IUpdateUserDto,
} from '@core/interfaces/user.interface';
import AuthService from '@core/services/auth.service';
import UserService from '@core/services/user.service';
import { Request, Response } from 'express';

export class UserController extends ApiBaseController {
  private userService: UserService;

  private authService: AuthService;

  constructor() {
    super();

    this.userService = new UserService();
    this.authService = new AuthService();
  }

  createUser = async (req: Request, res: Response) => {
    const createUserDto: ICreateUserDto = req.body;

    const {
      success: userCreated,
      data: user,
      error,
    } = await this.userService.create(createUserDto);

    if (!userCreated) {
      this.error(res, error);
    }

    const token = this.authService.generateToken(user.id);

    const { success, data } = await this.userService.update(
      { ...user, jwt: token },
      user.id,
    );

    if (!success) {
      this.error(res, error);
    }

    this.created(res, data, 'User created successfully');
  };

  findUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { success, data, error } = await this.userService.findOne(id);

    if (!success) {
      this.error(res, error);
    } else {
      this.okWithData(res, data, 'Successfully fetched user');
    }
  };

  findUsers = async (req: Request, res: Response) => {
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1;

    const pageSize =
      typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize, 10)
        : 10; // Default page size

    const { success, data, error } = await this.userService.findUsersPaginated(
      page,
      pageSize,
    );

    if (!success) {
      this.error(res, error);
    } else {
      this.okWithPagination(res, data, 'Successfully fetched all user data');
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateUserDto: IUpdateUserDto = req.body;

    const { success, data, error } = await this.userService.update(
      updateUserDto,
      id,
    );

    if (!success) {
      this.error(res, error);
    } else {
      this.okWithData(res, data, 'Successfully updated user');
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const exists = await this.userService.findOne(id);
    const deleted = await this.userService.remove(id, false); // Assuming soft delete by default

    if (!deleted.success || !exists.success) {
      this.error(res, exists.error ?? deleted.error);
    } else {
      this.ok(res, 'Successfully deleted user');
    }
  };
}

export default UserController;
