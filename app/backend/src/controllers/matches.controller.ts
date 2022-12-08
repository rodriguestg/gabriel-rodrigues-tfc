import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

class MatchesController {
  _matchesService: MatchesService;
  constructor() {
    this._matchesService = new MatchesService();
  }

  getAll = async (_req: Request, res: Response) => {
    const getAllMatches = await this._matchesService.getAll();
    // console.log(getAllMatches);
    return res.status(200).json(getAllMatches);
  };
}

export default MatchesController;
