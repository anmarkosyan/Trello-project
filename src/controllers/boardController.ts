import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { BoardEntityInterface, BoardInterface, IBoard } from '../interfaces';
import { BoardEntity } from '../entities/Board';
import { BoardRepository } from '../services/board';

import StatusCode from '../exceptions/statusCodes';
import ExceptionMessages from '../exceptions/messages';
import { HttpErr } from '../exceptions/HttpError';

const manager = () => getManager().getCustomRepository(BoardRepository);
export class BoardController {
  static async createBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const board: BoardEntityInterface = new BoardEntity();
      if (!title || title.trim() === '') {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.TITLE));
      }
      board.title = title;
      const boardData: BoardInterface = await manager().createBoard(board);
      res.status(StatusCode.CreateRequest).json(boardData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getAllBoards(req: Request, res: Response, next: NextFunction) {
    try {
      const data: BoardInterface[] = await manager().getAllBoards();
      res.status(StatusCode.SuccessRequest).json(data);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getBoard(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const oneData = await manager().getBoard(id);

      if (!oneData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch (err) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateBoard(req: Request, res: Response, next: NextFunction) {
    const { title, lists } = req.body;
    const { id } = req.params;
    try {
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const updatedData: IBoard = {};
      if (title && title.trim()) {
        updatedData.title = title;
      }
      if (lists && Array.isArray(lists)) {
        updatedData.list_ids = lists;
      }
      if (!Object.entries(updatedData).length) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }
      const updateData = await manager().updateBoard(id, updatedData);

      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async deleteBoard(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const data = await manager().deleteBoard(id);

      if (!data) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      res.status(StatusCode.SuccessRequest).json({
        message: 'Board successfully deleted.',
      });
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}
