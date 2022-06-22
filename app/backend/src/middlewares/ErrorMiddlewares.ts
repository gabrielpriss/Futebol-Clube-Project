import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IError from '../database/interfaces/IError';

export default class ErrorMiddleware {
  static management(error: IError, _req: Request, res: Response, _next: NextFunction) {
    const { type, message } = error;

    let typeCode: number;

    switch (type) {
      case 'badRequest':
        typeCode = StatusCodes.BAD_REQUEST;
        break;
      case 'unprocessableEntity':
        typeCode = StatusCodes.UNPROCESSABLE_ENTITY;
        break;
      case 'unauthorized':
        typeCode = StatusCodes.UNAUTHORIZED;
        break;

      default:
        typeCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return res.status(typeCode).json({ message });
  }
}
