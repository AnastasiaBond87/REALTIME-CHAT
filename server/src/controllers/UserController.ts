import { NextFunction, Request, Response } from 'express';
import type { TRequestBody, IUser } from '../types/index.js';
import UserService from '../services/UserService.js';
import TokenService from '../services/TokenService.js';
import UserDto from '../dto/UserDto.js';

class UserController {
  async registration(req: TRequestBody<Omit<IUser, '_id'>>, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registration(name, email, password);
      const userDto = new UserDto(user);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: TokenService.refreshTokenAge,
      });

      return res.status(201).json({ ...userDto });
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: TRequestBody<Pick<IUser, 'email' | 'password'>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      const userDto = new UserDto(user);

      res.cookie('refreshToken', user.refreshToken, {
        httpOnly: true,
        maxAge: TokenService.refreshTokenAge,
      });

      return res.status(200).json({ ...userDto });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await TokenService.deleteToken(refreshToken);

      res.clearCookie('refreshToken');

      return res.status(204).json({ error: false, message: 'User successfully logged out' });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(
    req: TRequestBody<Pick<IUser, '_id' | 'email' | 'name'>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { _id, email, name } = req.body;
      const user = await UserService.updateProfile(email, name, _id);
      const userDto = new UserDto(user);

      return res.status(200).json(userDto);
    } catch (err) {
      next(err);
    }
  }

  async updatePassword(
    req: TRequestBody<Pick<IUser, '_id' | 'password'> & { newPassword: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { _id, password, newPassword } = req.body;
      const user = await UserService.updatePassword(_id, password, newPassword);
      const userDto = new UserDto(user);

      return res.status(200).json(userDto);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
