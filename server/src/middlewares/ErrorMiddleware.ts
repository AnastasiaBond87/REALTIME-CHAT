import { Response, Request, NextFunction } from 'express';
import AppError from '../helpers/AppError.js';
import { MulterError } from 'multer';

class ErrorMiddleware {
  static errorHandler(err: AppError, _req: Request, res: Response, next: NextFunction) {
    const { message: errMessage, statusCode } = err;
    let message = errMessage;

    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'File is too large. Max file size 2MB';
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Allowed file format . jpg, .jpeg and .png';
      }
    }

    const status = statusCode || 400;
    res.status(status).json({ error: true, message });
    next();
  }
}

export default ErrorMiddleware;
