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
      if (homeTeam === awayTeam) {
        return 'It is not possible to create a match with two equal teams';
      }
      const response = await MatchesModel.create({
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true,
      });
      return response;
    } catch (error) { console.log(error); return error; }
  };

  finishMatch = async (id: number) => {
    try {
      const match = await MatchesModel.findOne({ where: { id } });
      if (match) {
        match.inProgress = false;
        await match.save();
        return 'Finished';
      }
      throw new Error('MATCH NOT FOUND');
    } catch (error) {
      console.log(error);
    }
  };
}

export default MatchesService;
