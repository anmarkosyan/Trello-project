import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';
import { Board } from '../entities/Board';
import HttpStatusCode from '../enums/HttpStatusCode';

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { title } = req.body;

    try {
      const board = new Board();
      board.title = title;

      const boardData = await manager.createBoard(board);

      res.status(HttpStatusCode.CreateRequest).json(boardData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getAllBoards(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    try {
      const data = await manager.getAllBoards();

      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { id } = req.params;
    try {
      const oneData = await manager.getBoard(id);

      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async updateBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { title } = req.body;
    const { id } = req.params;
    try {
      const updateData = await manager.updateBoard(id, title);

      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async deleteBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { id } = req.params;
    try {
      await manager.deleteBoard(id);

      res.status(HttpStatusCode.SuccessRequest).json(null);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }
}
