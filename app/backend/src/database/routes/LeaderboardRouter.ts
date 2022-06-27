import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderBoardController';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getAllByPlace);
router.get('/leaderboard/away', LeaderboardController.getAllByPlace);
router.get('/leaderboard', LeaderboardController.getAll);

export default router;
