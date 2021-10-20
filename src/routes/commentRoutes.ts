/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { CommentController } from '../controllers/commentController';

const router = Router();

router
  .route('/')
  .get(CommentController.getAllComments)
  .post(CommentController.createComment);

router
  .route('/:id')
  .get(CommentController.getComment)
  .patch(CommentController.updateComment)
  .delete(CommentController.deleteComment);

export { router as commentRoutes };