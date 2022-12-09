import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';

class MatchesService {
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

  getAll = async () => {
    try {
      const response = await MatchesModel.findAll({
        include: this._includeInfoTeams,
      });
      return response;
    } catch (error) { console.log(error); }
  };

  getFilterProgress = async (v: string) => {
    let inProgress;
    if (v === 'true') { inProgress = true; }
    if (v === 'false') { inProgress = false; }
    try {
      const response = await MatchesModel.findAll({
        where: { inProgress },
        include: this._includeInfoTeams,
      });
      return response;
    } catch (error) { console.log(error); }
  };

  createMatch = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    try {
      const response = await MatchesModel.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return response;
    } catch (error) { console.log(error); }
  };
}

export default MatchesService;
