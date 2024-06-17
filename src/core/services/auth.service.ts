// src/services/auth.service.ts
import config from '@config/config';
import jwt from 'jsonwebtoken';

class AuthService {
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
    return new Promise((resolve, reject) => {
      jwt.verify(token, `${this.secretKey}`, (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      });
    });
  }
}

export default AuthService;
