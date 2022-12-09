import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

class MatchesController {
  _matchesService: MatchesService;
  constructor() {
    this._matchesService = new MatchesService();
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const matchesFiltered = await this._matchesService.getFilterProgress(inProgress);
      return res.status(200).json(matchesFiltered);
    }
    const getAllMatches = await this._matchesService.getAll();
    return res.status(200).json(getAllMatches);
  };

  createMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const postMatch = await this._matchesService
      .createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201).json(postMatch);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await this._matchesService.finishMatch(Number(id));
    return res.status(200).json({ message });
  };
}

export default MatchesController;
