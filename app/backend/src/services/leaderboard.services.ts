import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';
import TeamsService from './teams.service';
import IMatch from '../interfaces/Match';
import ILeaderboard from '../interfaces/Leaderboard';

class LeaderboardService {
  _teamsService: TeamsService;
  leaderboard: ILeaderboard[] = [];
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

  efficiency = (element: ILeaderboard) => {
    const stageOne = element.totalGames * 3;
    const stageTwo = element.totalPoints / stageOne;
    const result = stageTwo * 100;
    return result.toFixed(2);
  };

  tiebreaker = (a: ILeaderboard, b: ILeaderboard) => {
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
    this.leaderboard.sort((a: ILeaderboard, b: ILeaderboard): number => {
      if (b.totalPoints > a.totalPoints) { return 1; }
      if (b.totalPoints === a.totalPoints) {
        return this.tiebreaker(a, b);
      }
      return -1;
    });
  };

  updateGeneral = (match: IMatch, team: string) => {
    const { teamSelected, goalsOneTeam, goalsTwoTeam } = this.validationTeam(match, team);
    for (let i = 0; i < this.leaderboard.length; i += 1) {
      const element = this.leaderboard[i];
      if (element.name === teamSelected) {
        if (goalsOneTeam > goalsTwoTeam) {
          element.totalPoints += 3;
          element.totalVictories += 1;
        } else if (goalsOneTeam === goalsTwoTeam) {
          element.totalPoints += 1;
          element.totalDraws += 1;
        } else { element.totalLosses += 1; }
        element.totalGames += 1;
        element.goalsFavor += goalsOneTeam;
        element.goalsOwn += goalsTwoTeam;
        element.goalsBalance = element.goalsFavor - element.goalsOwn;
        element.efficiency = this.efficiency(element);
      }
    }
  };

  validationTeam = (match: IMatch, team: string) => {
    const teamSelected = team === 'teamAway' ? match.teamAway?.teamName : match.teamHome?.teamName;
    const goalsOneTeam = team === 'teamAway' ? match.awayTeamGoals : match.homeTeamGoals;
    const goalsTwoTeam = team === 'teamAway' ? match.homeTeamGoals : match.awayTeamGoals;
    return {
      teamSelected,
      goalsOneTeam,
      goalsTwoTeam,
    };
  };

  getAll = async () => {
    try {
      this.initialTeams();
      const response = await this.matchesModel();
      response.forEach((match) => {
        this.updateGeneral(match, 'teamAway');
        this.updateGeneral(match, 'teamHome');
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
        this.updateGeneral(match, 'teamHome');
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
        this.updateGeneral(match, 'teamAway');
      });
      this.compareResults();
      return this.leaderboard;
    } catch (error) { console.log(error); }
  };
}

export default LeaderboardService;
