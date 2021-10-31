import { Router, Request, Response, NextFunction } from 'express';
import { ListController } from '../controllers/listController';
import { routeHandler } from '../services/responseHandler';

const router = Router();

router
  .route('/')
  .get(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.getAllLists(req, res)
    )
  )
  .post(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.createList(req, res)
    )
  )
  .put(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.updateCardsLists(req, res)
    )
  );

router
  .route('/:id')
  .get(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.getList(req, res)
    )
  )
  .patch(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.updateList(req, res)
    )
  )
  .delete(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await ListController.deleteList(req, res)
    )
  );

export { router as listRoutes };

