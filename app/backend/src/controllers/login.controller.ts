import { Request, Response } from 'express';
import LoginService from '../services/login.services';

class LoginController {
  _loginService: LoginService;
  constructor() {
    this._loginService = new LoginService();
  }

  loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('TA INDOOO!');
    const postLogin = await this._loginService.login(email, password);
    if (postLogin === 'Dados incorretos') { return res.status(404).json({ message: postLogin }); }
    return res.status(200).json({ token: postLogin });
  };
}

export default LoginController;
