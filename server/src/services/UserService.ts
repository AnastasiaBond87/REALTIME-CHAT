import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import TokenService from './TokenService.js';
import AppError from '../helpers/AppError.js';

class UserService {
  async registration(name: string, email: string, password: string) {
    if (!email || !password || !name) {
      throw new AppError(400, 'Enter name, email and password');
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      throw new AppError(409, `User with email ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await UserModel.create({ name, email, password: hashedPassword });
    const { accessToken, refreshToken } = TokenService.generateTokens(email);
    await TokenService.saveToken(refreshToken, newUser._id);

    return { accessToken, refreshToken, ...newUser.toObject() };
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new AppError(400, 'Invalid email or password');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new AppError(404, `User with email ${email} does not exist`);
    }

    const { password: userPassword, _id } = user;

    const pwdMatch = await bcrypt.compare(password, userPassword);

    if (!pwdMatch) {
      throw new AppError(400, 'Invalid password');
    }

    const { accessToken, refreshToken } = TokenService.generateTokens(email);

    await TokenService.saveToken(refreshToken, _id);

    return { accessToken, refreshToken, ...user.toObject() };
  }

  async updateProfile(email: string, name: string, id: string) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    if (name) {
      user.name = name;
    }

    if (email && email !== user.email) {
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
        throw new AppError(409, `User with email ${email} already exist`);
      }
      user.email = email;
    }

    await user.save();

    return user;
  }

  async updatePassword(id: string, password: string, newPassword: string) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) {
      throw new AppError(400, 'Invalid password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 5);
    user.password = hashedPassword;
    await user.save();

    return user;
  }
}

export default new UserService();
