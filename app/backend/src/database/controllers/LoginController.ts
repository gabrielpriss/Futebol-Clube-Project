import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILogin;
      const result = await LoginService.getToken({ email, password });

      if (!result) {
        return next(({
          type: 'unauthorized',
          message: 'Incorrect email or password'
        }))
      }
      return res.status(StatusCodes.OK).json({ ...result });
    } catch (e) {
      return next(errorVerify(e));
    }
  }
}

