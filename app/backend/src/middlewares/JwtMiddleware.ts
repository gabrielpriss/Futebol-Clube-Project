import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import UserService from '../database/services/UserService';
import errorVerify from '../utils/internalErrorMessage';

export default class JwtMiddleware {
  static async validate(req: Request, _res: Response, next: NextFunction) {
    try {
      const { authorization: token } = req.headers;
      if (!token) return next({ type: 'unauthorized', message: 'Token not found' });

      const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

      jwt.verify(token, secret, async (err, decoded: any) => {
        const users = await UserService.getAll();

        if (err) return next({ type: 'unauthorized', message: 'Invalid token' });

        const anyUser = users.find((user) => user.email === decoded.data.email);

        req.user = anyUser?.role;

        next();
      });
    } catch (e) {
      return next(errorVerify(e));
    }
  }
}
