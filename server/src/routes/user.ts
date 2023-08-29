import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', () => {});
router.post('/logout', () => {});

export { router };
