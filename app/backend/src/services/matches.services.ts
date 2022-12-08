import TeamModel from '../database/models/Teams';
import MatchesModel from '../database/models/Matches';

class MatchesService {
  getAll = async () => {
    try {
      const response = await MatchesModel.findAll({ include: [
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
      ] });
      return response;
    } catch (error) { console.log(error); }
  };
}

export default MatchesService;
