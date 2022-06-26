import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IError from '../interfaces/IError';
import errorVerify from '../../utils/internalErrorMessage';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const convertInProgress = inProgress === 'true';
      let matches;
      if (inProgress) {
        matches = await MatchService.getAllByParams(convertInProgress);
      } else {
        matches = await MatchService.getAll();
      }
      return res.status(StatusCodes.OK).json(matches);
    } catch (e) {
      return next(errorVerify(e));
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

      const result = await MatchService.createMatch(
        { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
      );

      const { type } = result as IError;
      if (type) {
        return next(result);
      }

      return res.status(StatusCodes.CREATED).json(result);
    } catch (e) {
      return next(errorVerify(e));
    }
  }

  static async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await MatchService.finishMatch(Number(id));

      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (e) {
      return next(errorVerify(e));
    }
  }

  static async updateGoals(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const {
        homeTeamGoals,
        awayTeamGoals,
      } = req.body as { homeTeamGoals: number, awayTeamGoals: number };
      await MatchService.updateGoals(homeTeamGoals, awayTeamGoals, Number(id));
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (e) {
      return next(errorVerify(e));
    }
  }
}
