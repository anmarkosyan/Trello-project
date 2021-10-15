import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board';

enum Alias {
  BoardTable = 'board',
}

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  getAllBoards() {
    return this.createQueryBuilder(Alias.BoardTable).getMany();
  }

  getBoard(boardId: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .select()
      .where('board.id = :query', { query: boardId })
      .getOne();
  }

  createBoard(newBoard: Board) {
    return this.save(newBoard);
  }

  updateBoard(title: string, lists: [], id: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .update(Board)
      .set({ title, lists })
      .where('board.id = :query', { query: id })
      .execute();
  }

  deleteBoard(id: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .select()
      .where('board.id = :query', { query: id })
      .getOne();
  }
}
