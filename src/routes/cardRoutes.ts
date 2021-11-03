import { Router } from 'express';
import { CardController } from '../controllers/cardController';

const router = Router();
router
  .route('/')
  .get(CardController.getAllCards)
  .post(CardController.createCard);

router
  .route('/:id')
  .get(CardController.getCard)
  .patch(CardController.updateCard)
  .delete(CardController.deleteCard);

export { router as cardRoutes };
