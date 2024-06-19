import AuthService from '@core/services/auth.service';
import { NextFunction, Request, Response } from 'express';

const authService = new AuthService();

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  try {
    const user = await authService.verifyToken(token);
    if (!user) {
      res.sendStatus(403);
    }
    // validateUserId
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

export default authenticateToken;
