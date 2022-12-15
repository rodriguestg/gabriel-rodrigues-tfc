import * as express from 'express';
import LeaderboardController from './controllers/leaderboard.controller';
import LoginController from './controllers/login.controller';
import MatchesController from './controllers/matches.controller';
import ValidateJWT from './controllers/midllewares/validationJwt.midlleware';
import TeamsController from './controllers/teams.controller';

class App {
  public app: express.Express;

  login = new LoginController();
  teams = new TeamsController();
  matches = new MatchesController();
  validation = new ValidateJWT();
  leaderboard = new LeaderboardController();

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: 'true HAHAH' }));
    this.app.post('/login', (req, res) => this.login.loginController(req, res));
    this.app.get('/login/validate', (req, res) => this.login.loginValidate(req, res));
    this.app.get('/teams', (req, res) => this.teams.teamsController(req, res));
    this.app.get('/teams/:id', (req, res) => this.teams.teamsGetId(req, res));
    this.app.get('/matches', (req, res) => this.matches.getAll(req, res));
    this.app.post('/matches', (req, res, next) => this.validation
      .validateToken(req, res, next), (req, res) => this.matches.createMatch(req, res));
    this.app.patch('/matches/:id/finish', (req, res) => this.matches.finishMatch(req, res));
    this.app.patch('/matches/:id', (req, res) => this.matches.alterMatch(req, res));
    this.app.get('/leaderboard', (req, res) => this.leaderboard.getAll(req, res));
    this.app.get('/leaderboard/home', (req, res) => this.leaderboard.getAllHome(req, res));
    this.app.get('/leaderboard/away', (req, res) => this.leaderboard.getAllAway(req, res));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
