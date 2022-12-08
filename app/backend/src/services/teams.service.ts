import TeamModel from '../database/models/Teams';

class TeamsService {
  getAll = async () => {
    try {
      const response = await TeamModel.findAll();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getTeamId = async (id: number) => {
    try {
      const response = await TeamModel.findOne({ where: { id } });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default TeamsService;
