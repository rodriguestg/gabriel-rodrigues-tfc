import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const secret = process.env.JWT_SECRET || 'agentesecreto';

dotenv.config();

class validateJWT {
  validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      jwt.verify(authorization, secret);

      next();
    } catch (err) {
      return res.status(401).json({ message: err });
    }
  };
}

export default validateJWT;
