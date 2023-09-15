import { Router } from 'express';
import { userRouter } from './user.js';
import { uploadRouter } from './upload.js';
import uploader from '../multer.js';

const router = Router();
router.use('/user', userRouter);
router.use('/upload', uploader, uploadRouter);

export { router };
