import { ILeaderboard } from '../interfaces/ILeaderBoard';
import { pointsEarnings, sortLeaders, updtLeader, creatingLeaderboardObj, combineLeaderboard,
} from '../../utils/func/leaderboardAux';
import MatchService from './MatchService';

export default class LeaderboardService {
    static async getAllByPlace(url:string): Promise<ILeaderboard[]> {
      const matches = await MatchService.getAll();
      const whichSite = url.includes('home') ? 'home' : 'away';
  
      const leaderboard = matches.reduce((acc, cur) => {
        const teamName = whichSite === 'home' ? cur.teamHome.teamName : cur.teamAway.teamName;
        const index = acc.findIndex((team) => team.name === teamName);
        const points = pointsEarnings(
          whichSite === 'home'
            ? cur.homeTeamGoals : cur.awayTeamGoals,
          whichSite === 'home' ? cur.awayTeamGoals : cur.homeTeamGoals,
        );
  
        if (index !== -1 && cur.inProgress === 0) {
          acc[index] = updtLeader(acc[index], cur, points, whichSite);
        } else if (cur.inProgress === 0) {
          acc.push(creatingLeaderboardObj(cur, points, whichSite));
        }
        return acc;
      }, [] as ILeaderboard[]);
  
      return sortLeaders(leaderboard);
    }
  
    static async getAll(): Promise<ILeaderboard[]> {
      const [home, away] = await Promise.all([
        await this.getAllByPlace('home'), await this.getAllByPlace('away'),
      ]);
      const allLeaderboards = [...home, ...away] as ILeaderboard[];
  
      const leaderboardGrouped = allLeaderboards.reduce((acc, cur) => {
        const index = acc.findIndex((team) => team.name === cur.name);
        if (index === -1) {
          acc.push(cur);
        } else {
          acc[index] = combineLeaderboard(acc[index], cur);
        }
        return acc;
      }, [] as ILeaderboard[]);
      return sortLeaders(leaderboardGrouped);
    }
  }
  