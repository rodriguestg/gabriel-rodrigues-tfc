import * as express from 'express';
import LoginController from './controllers/login.controller';

class App {
  public app: express.Express;

  constructor() {
    const login = new LoginController();
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: 'true HAHAH' }));
    this.app.post('/login', (req, res) => login.loginController(req, res));
    this.app.get('/login/validate', (req, res) => login.loginValidate(req, res));
    // this.app.get('/login', (req, res) => login.loginController(req, res));
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
