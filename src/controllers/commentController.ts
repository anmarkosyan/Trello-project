import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CommentRepository } from '../services/comment';
import { CommentEntity } from '../entities/Comment';
import {
  IComment,
  CommentEntityInterface,
  CommentInterface,
} from '../interfaces';
import StatusCode from '../exceptions/statusCodes';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';

const manager = () => getManager().getCustomRepository(CommentRepository);

export class CommentController {
  static async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { text, card_id } = req.body;
      const comment: CommentEntityInterface = new CommentEntity();
      if (!text || text.trim() === '') {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.TITLE));
      }
      comment.text = text;
      comment.card_id = card_id;
      const commentData: CommentInterface = await manager().createComment(
        comment
      );
      res.status(StatusCode.CreateRequest).json(commentData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async getAllComments(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CommentInterface[] = await manager().getAllComments();
      res.status(StatusCode.SuccessRequest).json(data);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const oneData = await manager().getComment(id);
      if (!oneData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.COMMENT));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const updatedData: IComment = {};

      if (text && text.trim()) {
        updatedData.text = text;
      }

      const updateData = await manager().updateComment(id, updatedData);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const data = await manager().deleteComment(id);
      if (!data) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }

      res.status(StatusCode.SuccessRequest).json({
        message: 'Comment successfully deleted.',
      });
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }
}
