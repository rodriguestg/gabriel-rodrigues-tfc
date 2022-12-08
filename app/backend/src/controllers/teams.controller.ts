import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  _teamsService: TeamsService;
  constructor() {
    this._teamsService = new TeamsService();
  }

  teamsController = async (_req: Request, res: Response) => {
    // console.log(req, res);
    const getAllTeams = await this._teamsService.getAll();
    return res.status(200).json(getAllTeams);
  };

  teamsGetId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const getAllId = await this._teamsService.getTeamId(Number(id));
    return res.status(200).json(getAllId);
  };
}

export default TeamsController;
