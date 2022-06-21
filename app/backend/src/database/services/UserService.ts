import bcrypt from 'bcryptjs';

import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';

export default class UserService {
  static async getOne({ email, password }: ILogin): Promise<IUser | null> {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });

    if (user) {
      const passwordEncrypted = user?.password;
      const passwordValidate = await bcrypt.compare(password, passwordEncrypted);

      if (passwordValidate) {
        return user;
      }
    }
  }
}