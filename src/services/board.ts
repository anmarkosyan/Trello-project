import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from '../entities/Board';
import { BoardInterface, IBoard } from '../interfaces';
import  { Exception}  from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {

  async createBoard(newBoard: { title: string }): Promise<BoardInterface> {
     return await  this.save(newBoard);
  }

  async getAllBoards(): Promise<BoardInterface[]> {
    const boards= await this.createQueryBuilder('board').getMany()
    .catch(() => {
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.INTERNAL)
    });

    return boards ;
  }

  async getBoard(boardId: string): Promise<BoardInterface | null> {
    const board = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.lists', 'list')
      .leftJoinAndSelect('list.cards', 'card')
      .where('board.id = :query', { query: boardId })
      .getOne()
      .catch(() => {
              throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.BOARD)
            })
    return board || null;
  }

 

  async updateBoard(id: string, board: IBoard): Promise<BoardInterface | null> {
    const updatedBoard = await this.createQueryBuilder('board')
      .update(BoardEntity)
      .set({ ...board })
      .where('board.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id))
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.INTERNAL)
      });
  ;
    return updatedBoard || null;
  }

  async deleteBoard(id: string): Promise<void> {
    await this.createQueryBuilder('board')
      .delete()
      .from(BoardEntity)
      .where('board.id = :query', { query: id })
      .execute() 
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.BOARD)
      });
  }
}
