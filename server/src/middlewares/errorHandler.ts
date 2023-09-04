import { Response, Request, NextFunction } from 'express';
import AppError from '../helpers/AppError.js';

const errorHandler = (err: AppError, _req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode } = err;
  const status = statusCode || 400;

  res.status(status).json({ error: true, message });
  next();
};

export { errorHandler };
