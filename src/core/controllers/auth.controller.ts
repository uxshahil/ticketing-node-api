import ApiBaseController from '@core/common/api-base.controller';
import { ILoginDto } from '@core/interfaces/login.interface';
import AuthService from '@core/services/auth.service';
import UserService from '@core/services/user.service';
import logger from '@core/utils/logger';
import { Request, Response } from 'express';

export class AuthController extends ApiBaseController {
  private userService: UserService;

  private authService: AuthService;

  constructor() {
    super();
    this.userService = new UserService();
    this.authService = new AuthService();
    logger.debug('UserController created');
  }

  login = async (req: Request, res: Response) => {
    const loginDto: ILoginDto = req.body;
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (loginDto.password === user.data.password) {
      const token = this.authService.generateToken(user.data.id);
      const { success, error, data } = await this.userService.update(
        { jwt: token },
        user.data.id,
      );
      if (!success) {
        this.error(res, 'User login failed');
        logger.error(error);
      }
      this.okWithData(res, data, `User login successful`);
    } else {
      this.error(res, 'User login failed');
      logger.error('User login failed');
    }
  };
}

export default AuthController;
