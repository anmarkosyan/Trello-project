import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { BoardRepository } from '../services/board';

export class BoardController {
  static async createBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    await manager.createBoard(req, res);
  }

  static async getAllBoards(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    await manager.getAllBoards(req, res);
  }

  static async getBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    await manager.getBoard(req, res);
  }

  static async updateBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    await manager.updateBoard(req, res);
  }

  static async deleteBoard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(BoardRepository);
    await manager.deleteBoard(req, res);
  }
}
