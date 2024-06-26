import config from '@config/config';
import { JwtAuth } from '@core/types/jwtAuth.type';
import jwt from 'jsonwebtoken';

export class AuthService {
  private secretKey: string;

  constructor() {
    this.secretKey = config.jwtSecret;
  }

  generateToken(payload: JwtAuth): string {
    const token = jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    return token;
  }

  verifyToken(token: string): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        jwt.verify(token, `${this.secretKey}`, (err, user) => {
          if (err) {
            return reject(err);
          }
          return resolve(user);
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
