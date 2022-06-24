import TeamModel from '../models/TeamModel';
import { ITeam } from '../interfaces/ITeam';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getOne(id: number): Promise<ITeam> {
    const team = await TeamModel.findByPk(id);

    return team as ITeam;
  }
}