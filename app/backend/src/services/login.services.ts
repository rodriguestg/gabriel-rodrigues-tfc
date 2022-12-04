import { compareSync } from 'bcryptjs';
import Token from '../utils/token';
import UserModel from '../database/models/Users';

class LoginService {
  getToken: Token;
  constructor() {
    this.getToken = new Token();
  }

  login = async (email: string, password: string) => {
    try {
      console.log('CHEGOOOOU!!!');
      const response = await UserModel.findOne({ where: { email } });
      const passwordCrypto = compareSync(password, response?.dataValues?.password);
      if (passwordCrypto && response) {
        const token: string = this.getToken.tokenGenerate(response?.id, response?.email);
        return token;
      }
      throw new Error('Dados incorretos');
    } catch (error) {
      return 'Dados incorretos';
    }
  };
}

export default LoginService;
