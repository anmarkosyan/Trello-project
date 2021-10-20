import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';
import { Board } from '../entities/Board';
import HttpStatusCode from '../enums/HttpStatusCode';
import { IBoard } from '../interfaces';

const manager = () => getManager().getCustomRepository(BoardRepository);

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const board = new Board();
      board.title = title;

      const boardData = await manager().createBoard(board);
      res.status(HttpStatusCode.CreateRequest).json(boardData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getAllBoards(req: Request, res: Response) {
    try {
      const data = await manager().getAllBoards();
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
    const { title, lists }: IBoard = req.body;
    const { id } = req.params;
    const updatedData: IBoard = {};
    if (title) {
      updatedData.title = title;
    }
    if (lists) {
      updatedData.lists = lists;
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
