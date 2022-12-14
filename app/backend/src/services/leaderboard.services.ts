import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';

class LeaderboardService {
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
        where: { inProgress: false },
        // include: this._includeInfoTeams,
      });
      return response;
    } catch (error) { console.log(error); }
  };
}

export default LeaderboardService;
