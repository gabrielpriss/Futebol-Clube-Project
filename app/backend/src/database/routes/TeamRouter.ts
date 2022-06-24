import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('teams', TeamController.getAll);
router.get('teams/:id', TeamController.getOne);

export default router;
