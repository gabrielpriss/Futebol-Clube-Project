import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import errorVerify from '../utils/internalErrorMessage';
import { ILogin } from '../database/interfaces/ILogin';

export default class LoginMiddleware {
  static entriesValidation(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as ILogin;

      const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required(),
      }).validate({ email, password });
      if (error && (
        error.details[0].type.includes('required') || error.details[0].type.includes('empty'))
      ) {
        return next({ type: 'badRequest', message: 'All fields must be filled' });
      }
      return next({ type: 'unauthorized', message: 'Incorrect email or password' });
    } catch (error) {
      return next(errorVerify(error));
    }
  }
}
