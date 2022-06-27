import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import errorVerify from "../../utils/internalErrorMessage";
import LeaderBoardService from '../services/LeaderBoardService'

export default class LeaderBoardController {
  static async getAllByPlace(req: Request, res: Response, next: NextFunction) {
    try {
      const { originalUrl } = req;
      const matches = await LeaderBoardService.getAllByPlace(originalUrl);
      return res.status(StatusCodes.OK).json(matches);
    } catch (e) {
      return next(errorVerify(e));
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await LeaderBoardService.getAll();
      return res.status(StatusCodes.OK).json(matches);
    } catch (e) {
      return next(errorVerify(e));
    }
  }
}