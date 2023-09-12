import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.patch('/updateProfile', UserController.updateProfile);
router.patch('/updatePassword', UserController.updatePassword);

export { router };
