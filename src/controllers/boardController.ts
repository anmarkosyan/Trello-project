import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';
import { BoardEntity } from '../entities/Board';
import { BoardEntityInterface, BoardInterface, IBoard } from '../interfaces';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

const manager = () => getManager().getCustomRepository(BoardRepository);

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const { title } = req.body;
    const board: BoardEntityInterface = new BoardEntity();
    if (!title || title.trim() === '') {
      throw new Exception(
        StatusCode.BadRequest,
        ExceptionMessages.INVALID.TITLE
      );
    }
    board.title = title;
    const boardData: BoardInterface = await manager().createBoard(board);
    res.status(StatusCode.CreateRequest).json(boardData);
  }

  static async getAllBoards(req: Request, res: Response) {
    const data: BoardInterface[] = await manager().getAllBoards();
    res.status(StatusCode.SuccessRequest).json(data);
  }

  static async getBoard(req: Request, res: Response) {
    const { id } = req.params;
    const oneData = await manager().getBoard(id);
    res.status(StatusCode.SuccessRequest).json(oneData);
  }

  static async updateBoard(req: Request, res: Response) {
    const { title, lists } = req.body;
    const { id } = req.params;
    const updatedData: IBoard = {};

    // if (title.trim() === "") {
    //   throw new Exception(StatusCode.BadRequest, ExceptionMessages.INVALID.TITLE);
    // }
    // if (!Array.isArray(lists)) {
    //   throw new Exception(StatusCode.BadRequest, ExceptionMessages.INVALID.LISTS);
    // }
    if (title) {
      updatedData.title = title;
    }

    if (lists) {
      updatedData.list_ids = lists;
    }

    const updateData = await manager().updateBoard(id, updatedData);
    res.status(StatusCode.SuccessRequest).json(updateData);
  }

  static async deleteBoard(req: Request, res: Response) {
    const { id } = req.params;
    await manager().deleteBoard(id);
    res.status(StatusCode.SuccessRequest).json({
      message: 'Board successfully deleted.',
    });
  }
}
