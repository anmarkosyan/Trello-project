import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';
import { Board } from '../entities/Board';

enum Status {
  Success = 200,
  Fail = 400,
  Crated = 201,
}

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { title } = req.body;
    try {
      const board = new Board();
      board.title = title;

      const boardData = await manager.createBoard(board);

      res.status(Status.Crated).json(boardData);
    } catch (e) {
      res.status(Status.Fail).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getAllBoards(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    try {
      const data = await manager.getAllBoards();

      res.status(Status.Success).json(data);
    } catch (e) {
      res.status(Status.Fail).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { id } = req.params;
    try {
      const oneData = await manager.getBoard(id);

      res.status(Status.Success).json(oneData);
    } catch (e) {
      res.status(Status.Fail).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async updateBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { title, lists } = req.body;
    const { id } = req.params;
    try {
      const updateData = await manager.updateBoard(title, lists, id);

      res.status(Status.Success).json(updateData);
    } catch (e) {
      res.status(Status.Fail).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async deleteBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    const { id } = req.params;
    try {
      await manager.deleteBoard(id);

      res.status(Status.Success).json({
        data: null,
      });
    } catch (e) {
      res.status(Status.Fail).json({
        message: 'Something want wrong!!',
      });
    }
  }
}
