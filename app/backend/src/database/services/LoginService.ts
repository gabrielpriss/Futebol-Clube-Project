import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import UserService from './UserService';
import { ILogin, IToken } from '../interfaces/ILogin';

export default class loginService {
  static async getToken(account: ILogin): Promise<IToken | null> {
    const { email, password } = account;
    const user = await UserService.getOne({ email, password });

    if (!user) {
      return user;
    }

    const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

    const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

    console.log(secret);

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };

  }
}