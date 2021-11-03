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
      console.log('enter +++++++++++++++++++++++++=');
      const { title } = req.body;
      const board: BoardEntityInterface = new BoardEntity();
      if (!title || title.trim() === '') {
        console.log('reqError########################');
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.TITLE));
      }
      board.title = title;
      const boardData: BoardInterface = await manager().createBoard(board);
      console.log('dataQuery *****************************');
      res.status(StatusCode.CreateRequest).json(boardData);
    } catch {
      console.log('errorData ****************************');
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getAllBoards(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('enter +++++++++++++++++++++++++=');
      const data: BoardInterface[] = await manager().getAllBoards();
      console.log('dataQuery *****************************');
      res.status(StatusCode.SuccessRequest).json(data);
    } catch {
      console.log('errorData ****************************');
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getBoard(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      console.log('enter +++++++++++++++++++++++++=');
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        console.log('reqError########################');
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const oneData = await manager().getBoard(id);
      console.log('dataQuery *****************************');
      if (!oneData) {
        console.log('errorData1 ****************************');
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch (err) {
      console.log('errorData2 ****************************');
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateBoard(req: Request, res: Response, next: NextFunction) {
    const { title, lists } = req.body;
    const { id } = req.params;
    try {
      console.log('enter +++++++++++++++++++++++++=');
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        console.log('reqError ID ########################');
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
        console.log('reqBody error########################');
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }
      const updateData = await manager().updateBoard(id, updatedData);
      console.log(updateData, '*****************************');
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch {
      console.log('errorData1 ****************************');
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async deleteBoard(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      console.log('enter +++++++++++++++++++++++++=');
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        console.log('reqError id ########################');
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const data = await manager().deleteBoard(id);
      console.log(data, '+++++++++++++');
      if (!data) {
        console.log('errorData not data ****************************');
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      res.status(StatusCode.SuccessRequest).json({
        message: 'Board successfully deleted.',
      });
    } catch {
      console.log('errorData  internal ****************************');
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}
