import ApiBaseController from '@core/common/api-base.controller';
import { ILoginDto } from '@core/interfaces/login.interface';
import { AuthService } from '@core/services/auth.service';
import UserService from '@core/services/user.service';
import { JwtAuth } from '@core/types/jwtAuth.type';
import { compare } from 'bcrypt';
import { UserRole } from 'database/types/enums';
import { Request, Response } from 'express';

export class AuthController extends ApiBaseController {
  private authService: AuthService;

  private userService: UserService;

  constructor() {
    super();

    this.authService = new AuthService();
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    const loginDto: ILoginDto = req.body;

    const { success: userExists, data: user } =
      await this.userService.findUserByEmail(loginDto.email);

    if (!userExists) {
      this.unauthorized(res);
    }

    const verifyPassword = await compare(
      loginDto.password,
      user.login.password,
    );

    if (!verifyPassword) {
      this.unauthorized(res);
      return;
    }

    const userRoles: UserRole[] = user.userRoles.map(
      (record) => record.userRole,
    );

    const jwtAuth: JwtAuth = {
      userId: user.id,
      roles: userRoles,
    };

    const token = this.authService.generateToken(jwtAuth);

    const { success, data } = await this.userService.update(
      { ...user, jwt: token },
      user.id,
    );

    if (!success) {
      this.error(res);
    }

    this.okWithData(res, data, 'User logged in successfully');
  };
}

export default AuthController;
