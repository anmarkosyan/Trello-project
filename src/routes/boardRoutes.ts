import { Router, Request, Response, NextFunction } from 'express';
import { BoardController } from '../controllers/boardController';
import routeHandler from '../services/responseHandler';

const router = Router();


router
  .route('/')
  .get(
    routeHandler(async (req: Request, res: Response, next: NextFunction) => {
      return await BoardController.getAllBoards(req, res);
    }))
  .post(
    routeHandler(async (req: Request, res: Response, next: NextFunction) => {
      return await BoardController.createBoard(req, res);
    }));

router
  .route('/:id')
  .get(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
    return await BoardController.getBoard(req, res);
  }))
  .patch(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
    return await BoardController.updateBoard(req, res);
  }))
  .delete(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
    return await BoardController.deleteBoard(req, res);
  }));

export { router as boardRoutes };
