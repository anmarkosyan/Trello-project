/* eslint-disable prettier/prettier */
import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { CommentRepository } from '../services/comment';
import { CommentEntity } from '../entities/Comment';
import HttpStatusCode from '../enums/HttpStatusCode';

const manager = () => getManager().getCustomRepository(CommentRepository);

export class CommentController {
  static async createComment(req: Request, res: Response) {
    const { text } = req.body;
    try {
      const comment = new CommentEntity();
      comment.text = text;

      const commentData = await manager().createComment(comment);
      res.status(HttpStatusCode.CreateRequest).json(commentData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getAllComments(req: Request, res: Response) {
    try {
      const data = await manager().getAllComments();
      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const oneData = await manager().getComment(id);
      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async updateComment(req: Request, res: Response) {
    const { text } = req.body;
    const { id } = req.params;
    try {
      const updateData = await manager().updateComment(id, text);

      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await manager().deleteComment(id);
      res.status(HttpStatusCode.SuccessRequest).json({
        message: 'Comment successfully deleted.',
      });
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }
}
