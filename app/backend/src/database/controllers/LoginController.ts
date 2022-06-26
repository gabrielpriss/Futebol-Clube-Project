import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import errorVerify from '../../utils/internalErrorMessage';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILogin;
      console.log(email);
      const result = await LoginService.getToken({ email, password });

      if (!result) {
        return next(({
          type: 'unauthorized',
          message: 'Incorrect email or password',
        }));
      }
      return res.status(StatusCodes.OK).json({ ...result });
    } catch (e) {
      return next(errorVerify(e));
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req;

      return res.status(StatusCodes.OK).send(user);
    } catch (e) {
      return next(errorVerify(e));
    }
  }
}
