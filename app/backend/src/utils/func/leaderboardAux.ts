import { ICompleteMatch } from '../../database/interfaces/IMatch';
import { ILeaderboard } from '../../database/interfaces/ILeaderBoard';

export function pointsEarnings(a:number, b:number): number {
  if (a > b) {
    return 3;
  }
  if (a === b) {
    return 1;
  }
  return 0;
}

export function calculateEfficiency(totalPoints:number, totalGames:number):number {
  return Number(
    (
      (totalPoints
          / (totalGames * 3)) * 100)
      .toFixed(2),
  );
}

export function sortLeaders(leaderboard:ILeaderboard[]):ILeaderboard[] {
  return leaderboard.sort((a, b) =>
    b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
}

export function creatingLeaderboardObj(
  team:ICompleteMatch,
  points:number,
  from:string,
):ILeaderboard {
  const { teamHome, homeTeamGoals, awayTeamGoals, teamAway } = team;
  const goalsFavor = from === 'home' ? homeTeamGoals : awayTeamGoals;
  const goalsOwn = from === 'home' ? awayTeamGoals : homeTeamGoals;
  return {
    name: from === 'home' ? teamHome.teamName : teamAway.teamName,
    totalPoints: points,
    totalGames: 1,
    totalVictories: points === 3 ? 1 : 0,
    totalDraws: points === 1 ? 1 : 0,
    totalLosses: points === 0 ? 1 : 0,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: calculateEfficiency(points, 1) };
}

export function totalResult(actualQuantity:number, points:number, compare:number):number {
  return points === compare
    ? actualQuantity + 1 : actualQuantity;
}

export
function updtLeader(team:ILeaderboard, data:ICompleteMatch, pts:number, from:string):ILeaderboard {
  const {
    totalGames, totalPoints, goalsFavor, goalsOwn, totalVictories, totalDraws, totalLosses } = team;
  const { homeTeamGoals, awayTeamGoals } = data;
  const newGoalsFavor = goalsFavor + (from === 'home' ? homeTeamGoals : awayTeamGoals);
  const newGoalsOwn = goalsOwn + (from === 'home' ? awayTeamGoals : homeTeamGoals);
  return ({ ...team,
    totalGames: totalGames + 1,
    totalPoints: totalPoints + pts,
    goalsFavor: newGoalsFavor,
    goalsOwn: newGoalsOwn,
    goalsBalance: newGoalsFavor - newGoalsOwn,
    efficiency: calculateEfficiency(totalPoints + pts, totalGames + 1),
    totalVictories: totalResult(totalVictories, pts, 3),
    totalDraws: totalResult(totalDraws, pts, 1),
    totalLosses: totalResult(totalLosses, pts, 0) });
}

export function combineLeaderboard(objTeam:ILeaderboard, data:ILeaderboard): ILeaderboard {
  const newObj: ILeaderboard = JSON.parse(JSON.stringify(objTeam));
  newObj.totalPoints += data.totalPoints;
  newObj.totalGames += data.totalGames;
  newObj.totalVictories += data.totalVictories;
  newObj.totalDraws += data.totalDraws;
  newObj.totalLosses += data.totalLosses;
  newObj.goalsFavor += data.goalsFavor;
  newObj.goalsOwn += data.goalsOwn;
  newObj.goalsBalance += data.goalsBalance;
  newObj.efficiency = calculateEfficiency(
    objTeam.totalPoints + data.totalPoints,
    objTeam.totalGames + data.totalGames,
  );

  return newObj;
}
