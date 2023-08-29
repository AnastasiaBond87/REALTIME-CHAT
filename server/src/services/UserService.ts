import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';

class UserService {
  async registration(name: string, email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error('User with this email already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    return newUser;
  }
}

export default new UserService();
