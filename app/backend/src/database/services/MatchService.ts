import IError from '../interfaces/IError';
import { ICompleteMatch, IMatch } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import TeamService from './TeamService';

export default class MatchService {
  static async getAll(): Promise<ICompleteMatch[]> {
    const matches = await MatchModel.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
    }) as ICompleteMatch[];

    return matches;
  }

  static async getAllByParams(params:boolean): Promise<IMatch[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress: params },
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
    });

    return matches;
  }

  static async createMatch(match:IMatch): Promise<IMatch | IError> {
    if (match.awayTeam === match.homeTeam) {
      return ({
        type: 'unauthorized',
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const validateTeam = await Promise.all([
      await TeamService.getOne(match.homeTeam),
      await TeamService.getOne(match.awayTeam),
    ]);

    if (validateTeam.some((result) => result === null)) {
      return ({
        type: 'notFound',
        message: 'There is no team with such id!',
      });
    }

    const newMatch = await MatchModel.create(match);

    return newMatch;
  }

  static async finishMatch(id: number): Promise<void> {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }

  static async updateGoals(homeTeamGoals: number, awayTeamGoals: number, id: number):Promise<void> {
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
