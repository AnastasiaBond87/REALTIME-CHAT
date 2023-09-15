import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.use('/avatar', UserController.uploadAvatar);

export { router as uploadRouter };
