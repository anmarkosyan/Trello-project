/* eslint-disable prettier/prettier */
import { Router, Request, Response, NextFunction } from 'express';
import { CommentController } from '../controllers/commentController';
import routeHandler from '../services/responseHandler';

const router = Router();

router
.route('/')
.get(
  routeHandler(async (req: Request, res: Response, next: NextFunction) => {
    return await CommentController.getAllComments(req, res);
  }))
.post(
  routeHandler(async (req: Request, res: Response, next: NextFunction) => {
    return await CommentController.createComment(req, res);
  }));

router
.route('/:id')
.get(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
  return await CommentController.getComment(req, res);
}))
.patch(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
  return await CommentController.updateComment(req, res);
}))
.delete(routeHandler(async (req: Request, res: Response, next: NextFunction) => {
  return await CommentController.deleteComment(req, res);
}));

export { router as commentRoutes };