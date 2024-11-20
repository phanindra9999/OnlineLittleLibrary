import { Router } from 'express';
import userLoginController from '../controller/userLoginController';

const router = Router();

router.post('/login', userLoginController.userLogin);
export default router;
