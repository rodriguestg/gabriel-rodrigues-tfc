import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';
import TeamsService from './teams.service';

class LeaderboardService {
  _teamsService: TeamsService;
  leaderboard: any[] = [];
  constructor() {
    this._teamsService = new TeamsService();
    this.initialTeams();
  }

  initialTeams = async () => {
    const teams = await TeamModel.findAll();
    this.leaderboard = [];
    teams.map((team) =>
      this.leaderboard.push({
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: '00.00',
      }));
  };

  matchesModel = async () => {
    const response = await MatchesModel.findAll({
      where: { inProgress: false },
      include: this._includeInfoTeams,
    });
    return response;
  };

  _includeInfoTeams = [
    {
      model: TeamModel,
      as: 'teamHome',
      attributes: ['teamName'],
    },
    {
      model: TeamModel,
      as: 'teamAway',
      attributes: ['teamName'],
    },
  ];

  efficiency = (element: any) => {
    const stageOne = element.totalGames * 3;
    const stageTwo = element.totalPoints / stageOne;
    const result = stageTwo * 100;
    return result.toFixed(2);
  };

  tiebreaker = (a: any, b: any) => {
    if (b.totalVictories > a.totalVictories) { return 1; }
    if (b.totalVictories < a.totalVictories) { return -1; }
    if (b.goalsBalance > a.goalsBalance) { return 1; }
    if (b.goalsBalance < a.goalsBalance) { return -1; }
    if (b.goalsFavor > a.goalsFavor) { return 1; }
    if (b.goalsOwn > a.goalsOwn && b.goalsFavor === a.goalsFavor) { return 1; }
    return -1;
  };

  // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
  compareResults = () => {
    this.leaderboard.sort((a: any, b: any): number => {
      if (b.totalPoints > a.totalPoints) { return 1; }
      if (b.totalPoints === a.totalPoints) {
        return this.tiebreaker(a, b);
      }
      return -1;
    });
  };

  updateRatingHome = (match: any) => {
    for (let i = 0; i < this.leaderboard.length; i += 1) {
      const element = this.leaderboard[i];
      if (element.name === match.teamHome.teamName) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          element.totalPoints += 3;
          element.totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          element.totalPoints += 1;
          element.totalDraws += 1;
        } else { element.totalLosses += 1; }
        element.totalGames += 1;
        element.goalsFavor += match.homeTeamGoals;
        element.goalsOwn += match.awayTeamGoals;
        element.goalsBalance = element.goalsFavor - element.goalsOwn;
        element.efficiency = this.efficiency(element);
      }
    }
  };

  updateRatingAway = (match: any) => {
    for (let i = 0; i < this.leaderboard.length; i += 1) {
      const element = this.leaderboard[i];
      if (element.name === match.teamAway.teamName) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          element.totalPoints += 3;
          element.totalVictories += 1;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          element.totalPoints += 1;
          element.totalDraws += 1;
        } else { element.totalLosses += 1; }
        element.totalGames += 1;
        element.goalsFavor += match.awayTeamGoals;
        element.goalsOwn += match.homeTeamGoals;
        element.goalsBalance = element.goalsFavor - element.goalsOwn;
        element.efficiency = this.efficiency(element);
      }
    }
  };

  getAll = async () => {
    try {
      this.initialTeams();
      const response = await this.matchesModel();
      response.forEach((match) => {
        this.updateRatingHome(match);
        this.updateRatingAway(match);
      });
      this.compareResults();
      return this.leaderboard;
    } catch (error) { console.log(error); }
  };

  getAllHome = async () => {
    try {
      this.initialTeams();
      const response = await this.matchesModel();
      response.forEach((match) => {
        this.updateRatingHome(match);
      });
      this.compareResults();
      return this.leaderboard;
    } catch (error) { console.log(error); }
  };

  getAllAway = async () => {
    try {
      this.initialTeams();
      const response = await this.matchesModel();
      response.forEach((match) => {
        this.updateRatingAway(match);
      });
      this.compareResults();
      return this.leaderboard;
    } catch (error) { console.log(error); }
  };
}

export default LeaderboardService;
