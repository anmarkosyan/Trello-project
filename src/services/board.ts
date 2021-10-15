import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board';

enum Alias {
  BoardTable = 'board',
}

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // 1️⃣ get all boards
  getAllBoards() {
    return this.createQueryBuilder(Alias.BoardTable).getMany();
  }

  // 2️⃣ get board
  getBoard(boardId: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .select()
      .where('board.id = :query', { query: boardId })
      .getOne();
  }

  // 3️⃣ create new board
  createBoard(newBoard: Board) {
    return this.save(newBoard);
  }

  // 4️⃣ update board
  updateBoard(title: string, lists: [], id: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .update(Board)
      .set({ title, lists })
      .where('board.id = :query', { query: id })
      .execute();
  }

  // 5️⃣ delete board
  deleteBoard(id: string) {
    return this.createQueryBuilder(Alias.BoardTable)
      .select()
      .where('board.id = :query', { query: id })
      .getOne();
  }
}
