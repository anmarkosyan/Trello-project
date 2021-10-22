import {Router} from 'express';
import { ListController } from '../controllers/listController';

const router = Router();

router
  .route('/')
  .get(ListController.getAllLists)
  .post(ListController.createList);

router
  .route('/:id')
  .get(ListController.getList)
  .patch(ListController.updateList)
  .delete(ListController.deleteList);

  
export { router as listRoutes };