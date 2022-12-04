import { Request, Response } from 'express';
import LoginService from '../services/login.services';

class LoginController {
  _loginService: LoginService;
  constructor() {
    this._loginService = new LoginService();
  }

  loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const postLogin = await this._loginService.login(email, password);
    const { type, message } = postLogin;
    if (type) {
      return res.status(400).json({ message });
    }
    return res.status(200).json({ token: message });
  };
}

export default LoginController;
