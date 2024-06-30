import UserRole from '@core/enums/user-role.enum';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const roleBasedAccess =
  (requiredRole: UserRole) =>
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : undefined; // Bearer TOKEN

    if (!token) {
      return res.sendStatus(401); // If no token, return Unauthorized status
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        roles: string[];
      };
      const userRoles = decoded.roles;

      // Check if the user has the required role(s)
      if (!userRoles.includes(requiredRole)) {
        return res.status(403).send({ message: 'Forbidden: Access denied.' });
      }

      // If the user has the required role, proceed to the next middleware or route handler
      next();
    } catch (err) {
      return res.sendStatus(403); // If verification fails, return Forbidden status
    }
  };

export default roleBasedAccess;
