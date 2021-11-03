import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from '../entities/Board';
import { BoardInterface, IBoard } from '../interfaces';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
  async getAllBoards(): Promise<BoardInterface[]> {
    return this.createQueryBuilder('board').getMany();
  }

  async getBoard(boardId: string): Promise<BoardInterface | null> {
    const board = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .where('board.id = :query', { query: boardId })
      .getOne();
    return board || null;
  }

  async createBoard(newBoard: { title: string }): Promise<BoardInterface> {
    return this.save(newBoard);
  }

  async updateBoard(id: string, board: IBoard): Promise<BoardInterface | null> {
    const updatedBoard = await this.createQueryBuilder('board')
      .update(BoardEntity)
      .set({ ...board })
      .where('board.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
    return updatedBoard || null;
  }

  async deleteBoard(id: string): Promise<BoardInterface | null> {
    const data = await this.findOne(id);
    await this.createQueryBuilder('board')
      .delete()
      .from(BoardEntity)
      .where('board.id = :query', { query: id })
      .execute();
    return data || null;
  }
}
