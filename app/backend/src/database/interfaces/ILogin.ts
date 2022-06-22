import { IUser } from './IUser';

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  user: IUser;
  token: string;
}
