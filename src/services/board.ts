import { Request, Response } from 'express';
import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // 1️⃣ get all boards
  async getAllBoards(req: Request, res: Response) {
    try {
      const data = await this.createQueryBuilder('board').getMany();

      res.status(200).json({
        status: 'success',
        results: data.length,
        data: {
          data,
        },
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Something want wrong!!',
      });
    }
  }

  // 2️⃣ get board
  async getBoard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const oneData = await this.createQueryBuilder('board')
        .select()
        .where('board.id = :query', { query: id })
        .getOne();

      res.status(200).json({
        status: 'success',
        data: {
          oneData,
        },
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Something want wrong!!',
      });
    }
  }

  // 3️⃣ create new board
  async createBoard(req: Request, res: Response) {
    const { title } = req.body;
    try {
      const board = new Board();
      board.title = title;

      const boardData = await this.save(board);

      res.status(201).json({
        status: 'success',
        data: boardData,
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Something want wrong!!',
      });
    }
  }

  // 4️⃣ update board
  async updateBoard(req: Request, res: Response) {
    const { title, lists } = req.body;
    const { id } = req.params;
    try {
      await this.createQueryBuilder('board')
        .update(Board)
        .set({ title, lists })
        .where('board.id = :query', { query: id })
        .execute();

      const updatedData = await this.findOne(id);

      res.status(200).json({
        status: 'success',
        data: {
          updatedData,
        },
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Something want wrong!!',
      });
    }
  }

  // 5️⃣ delete board
  async deleteBoard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.createQueryBuilder('board')
        .update(Board)
        .set({ is_active: false })
        .where('board.id = :query', { query: id })
        .execute();

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (e) {
      res.status(400).json({
        status: 'fail',
        message: 'Something want wrong!!',
      });
    }
  }
}
