import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'agentesecreto';

export default class Token {
  public tokenGenerate = (id: number, email: string) => {
    const token = jwt.sign({ id, email }, secret);
    return token;
  };
}
