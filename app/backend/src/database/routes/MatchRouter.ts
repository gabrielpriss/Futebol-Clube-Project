import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

router.get('/matches', MatchController.getAll);
router.post('/matches', MatchController.create);
router.patch('/matches/:id/finish', MatchController.finishMatch);
router.patch('/matches/:id', MatchController.updateGoals);

export default router;
