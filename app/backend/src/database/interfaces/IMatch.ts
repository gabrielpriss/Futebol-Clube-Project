export interface IMatch {
  id?:number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
  teamHome?: {
    teamName: string,
  };
  teamAway?: {
    teamName: string,
  };
}

export interface ICompleteMatch extends IMatch {
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}
