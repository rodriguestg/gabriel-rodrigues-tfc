import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const secret = process.env.JWT_SECRET || 'agentesecreto';

dotenv.config();

export default class ValidateToken {
  public tokenValidate = (token: string | undefined) => {
    try {
      if (token) {
        const data = jwt.verify(token, secret);
        return data;
      }
      throw new Error('NOT FOUND TOKEN');
    } catch ({ message }) {
      console.log(message);
      return console.log({ type: 'ERROR 400', message });
    }
  };
}
