import { Router, Request, Response, NextFunction } from 'express';
import { CardController } from '../controllers/cardController';
import { routeHandler } from '../services/responseHandler';

const router = Router();
router
  .route('/')
  .get(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await CardController.getAllCards(req, res)
    )
  )
  .post(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await CardController.createCard(req, res)
    )
  );

router
  .route('/:id')
  .get(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await CardController.getCard(req, res)
    )
  )
  .patch(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await CardController.updateCard(req, res)
    )
  )
  .delete(
    routeHandler(
      async (req: Request, res: Response, next: NextFunction) =>
        await CardController.deleteCard(req, res)
    )
  );

export { router as cardRoutes };

