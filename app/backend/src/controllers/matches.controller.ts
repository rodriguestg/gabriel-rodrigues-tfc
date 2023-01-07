import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.services';

class MatchesController {
  _matchesService: MatchesService;
  _teamsService: TeamsService;
  constructor() {
    this._matchesService = new MatchesService();
    this._teamsService = new TeamsService();
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
    const team1 = await this._teamsService.getTeamId(Number(homeTeam));
    const team2 = await this._teamsService.getTeamId(Number(awayTeam));
    if (!team1 || !team2) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const matchPost = await this._matchesService
      .createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    if (typeof matchPost === 'string') {
      return res.status(422).json({ message: matchPost });
    }
    return res.status(201).json(matchPost);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const message = await this._matchesService.finishMatch(Number(id));
    return res.status(200).json({ message });
  };

  alterMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const response = await this._matchesService
      .alterMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json(response);
  };
}

export default MatchesController;
