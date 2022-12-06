import { compareSync } from 'bcryptjs';
import Token from '../utils/token';
import UserModel from '../database/models/Users';
import ValidateToken from '../utils/verifyJwt.utils';

class LoginService {
  getToken: Token;
  auth: ValidateToken;
  constructor() {
    this.getToken = new Token();
    this.auth = new ValidateToken();
  }

  login = async (email: string, password: string) => {
    try {
      if (!email || !password) { throw Error('All fields must be filled'); }
      const response = await UserModel.findOne({ where: { email } });
      const passwordCrypto = compareSync(password, response?.dataValues?.password);
      if (passwordCrypto && response) {
        const token: string = this.getToken.tokenGenerate(response?.id, response?.role);
        return { type: null, message: token };
      }
      throw Error('Incorrect email or password');
    } catch ({ message }) {
      if (message === 'Illegal arguments: string, undefined') {
        return { type: message, message: 'Incorrect email or password' };
      }
      return { type: message, message };
    }
  };

  validate = async (authorization: string | undefined) => {
    try {
      const auth = this.auth.tokenValidate(authorization);
      if (!auth || typeof auth === 'string') throw new Error('ERROR TOKEN INVALID');
      return { type: null, message: auth.role };
    } catch ({ message }) {
      return { type: message, message };
    }
  };
}

export default LoginService;
