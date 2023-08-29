import { Response } from 'express';
import type { TRequestBody, IUser } from '../types/index.js';
import UserService from '../services/UserService.js';

class UserController {
  async registration(req: TRequestBody<IUser>, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.registration(name, email, password);

      return res.status(201).json(user);
    } catch (err) {
      const { message } = err as Error;

      return res.status(409).json({
        error: true,
        message,
      });
    }
  }
}

export default new UserController();
