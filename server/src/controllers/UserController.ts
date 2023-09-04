import { NextFunction, Response } from 'express';
import type { TRequestBody, IUser } from '../types/index.js';
import UserService from '../services/UserService.js';
import TokenService from '../services/TokenService.js';
import AppError from '../helpers/AppError.js';

class UserController {
  async registration(req: TRequestBody<IUser>, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registration(name, email, password);

      return res.status(201).json(user);
    } catch (err) {
      next(new AppError(409, (err as Error).message));
    }
  }

  async login(req: TRequestBody<IUser>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserService.login(email, password);
      const { accessToken, refreshToken } = TokenService.generateTokens(email);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: TokenService.accessTokenAge,
      });

      return res.status(200).json({ ...user, accessToken });
    } catch (err) {
      next(new AppError(401, (err as Error).message));
    }
  }
}

export default new UserController();
