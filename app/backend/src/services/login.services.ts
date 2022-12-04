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
      if (!email || !password) {
        throw Error('All fields must be filled');
      }
      const response = await UserModel.findOne({ where: { email } });
      const passwordCrypto = compareSync(password, response?.dataValues?.password);
      if (passwordCrypto && response) {
        const token: string = this.getToken.tokenGenerate(response?.id, response?.email);
        return { type: null, message: token };
      }
      throw Error('Dados incorretos');
    } catch ({ message }) {
      return { type: message, message };
    }
  };
}

export default LoginService;
