import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import errorVerify from '../../utils/internalErrorMessage';
import TeamService from '../services/TeamService';

export default class TeamController {
    static async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const teams = await TeamService.getAll();

            return res.status(StatusCodes.OK).json(teams);
        } catch (e) {
            return next(errorVerify(e));
        }
    }
    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const team = await TeamService.getOne(Number(id));

            return res.status(StatusCodes.OK).json(team);
        } catch (e) {
            return next(errorVerify(e));
        }
    }
}
