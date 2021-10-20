import { Router } from 'express';
import { BoardController } from '../controllers/boardController';

const router = Router();

router
  .route('/')
  .get(BoardController.getAllBoards)
  .post(BoardController.createBoard);

router
  .route('/:id')
  .get(BoardController.getBoard)
  .patch(BoardController.updateBoard)
  .delete(BoardController.deleteBoard);

export { router as boardRoutes };
