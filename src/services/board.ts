import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board';
import { IBoard } from '../interfaces';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  getAllBoards() {
    return this.createQueryBuilder('board').getMany();
  }

  getBoard(boardId: string) {
    return this.createQueryBuilder('board')
      .select()
      .where('board.id = :query', { query: boardId })
      .getOne();
  }

  createBoard(newBoard: Board) {
    return this.save(newBoard);
  }

  updateBoard(id: string, board: IBoard) {
    return this.createQueryBuilder('board')
      .update(Board)
      .set({ ...board })
      .where('board.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  deleteBoard(id: string) {
    return this.createQueryBuilder('board')
      .delete()
      .from(Board)
      .where('board.id = :query', { query: id })
      .execute();
  }
}
