import config from '@config/config';
import jwt from 'jsonwebtoken';

export class AuthService {
  private secretKey: string;

  constructor() {
    this.secretKey = config.jwtSecret;
  }

  generateToken(userId: string): string {
    const payload = { userId };
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
