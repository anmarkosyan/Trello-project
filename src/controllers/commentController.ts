import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { CommentRepository } from '../services/comment';
import { CommentEntity } from '../entities/Comment';
import { IComment } from "../interfaces/comment.interface"
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

const manager = () => getManager().getCustomRepository(CommentRepository);

export class CommentController {

  static async createComment(req: Request, res: Response) {
    const { text, card_id } = req.body;
    const comment = new CommentEntity();
    if (!text || text.trim() === "") {
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.INVALID.TEXT);
    }
    comment.text = text;
    comment.card_id = card_id;
    const commentData = await manager().createComment(comment);
    res.status(StatusCode.CreateRequest).json(commentData);
  }

  static async getAllComments(req: Request, res: Response) {
    const data = await manager().getAllComments();
    res.status(StatusCode.SuccessRequest).json(data);

  }

  static async getComment(req: Request, res: Response) {
    const { id } = req.params;
    const oneData = await manager().getComment(id);
    res.status(StatusCode.SuccessRequest).json(oneData);

  }

  static async updateComment(req: Request, res: Response) {
    const { text } = req.body;
    const { id } = req.params;
    const updatedData: IComment = {};


    if (text && text.trim()) {
      updatedData.text = text;
    }


    const updateData = await manager().updateComment(id, updatedData);
    res.status(StatusCode.SuccessRequest).json(updateData);

  }

  static async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    await manager().deleteComment(id);
    res.status(StatusCode.SuccessRequest).json({
      message: 'Comment successfully deleted.',
    });
  }
}