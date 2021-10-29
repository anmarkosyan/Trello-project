import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';
import { BoardEntity } from '../entities/Board';
import HttpStatusCode from '../enums/HttpStatusCode';
import { BoardEntityInterface, BoardInterface, IBoard } from '../interfaces';

const manager = () => getManager().getCustomRepository(BoardRepository);

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const board: BoardEntityInterface = new BoardEntity();
      board.title = title;

      const boardData: BoardInterface = await manager().createBoard(board);
      res.status(HttpStatusCode.CreateRequest).json(boardData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getAllBoards(req: Request, res: Response) {
    try {
      const data: BoardInterface[] = await manager().getAllBoards();
      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getBoard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const oneData = await manager().getBoard(id);
      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async updateBoard(req: Request, res: Response) {
    const { title, lists } = req.body;
    const { id } = req.params;
    const updatedData: IBoard = {};
    if (title) {
      updatedData.title = title;
    }
    if (lists) {
      updatedData.list_ids = lists;
    }
    try {
      const updateData = await manager().updateBoard(id, updatedData);
      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async deleteBoard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await manager().deleteBoard(id);
      res.status(HttpStatusCode.SuccessRequest).json({
        message: 'Board successfully deleted.',
      });
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }
}
