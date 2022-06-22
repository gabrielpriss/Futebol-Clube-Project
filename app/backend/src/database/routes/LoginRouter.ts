import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import JwtMiddleware from '../middlewares;'
import LoginMiddleware from '../../middlewares/LoginMiddleware';

const router = Router();

router.get('./login/validate', JwtMiddleware.validate, LoginController.validate);
router.post('/login', LoginMiddleware.entriesValidation, LoginController.login);

export default router;
