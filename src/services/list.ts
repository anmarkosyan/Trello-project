import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Board } from '../entities/Board';
import { List } from '../entities/List';
import { IList } from '../interfaces/list.interface';

@EntityRepository(List)
export class ListRepository extends Repository<List> {
  getAllLists() {
    return this.createQueryBuilder('list').getMany();
  }

  getList(listId: string) {
    return this.createQueryBuilder('list')
      .select()
      .where('list.id = :query', { query: listId })
      .getOne();
  }

  async createList(newList: List) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const list = await queryRunner.manager.save(List, newList);
      const board = await queryRunner.manager.findOne(Board, {
        id: list.board_id,
      });
      const newBoardLists = [...board!.list_ids, list.id];
      await queryRunner.manager.update(
        Board,
        { id: list.board_id },
        { list_ids: newBoardLists }
      );
      await queryRunner.commitTransaction();
      return list;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }
  }

  updateList(id: string, list: IList) {
    return this.createQueryBuilder('list')
      .update(List)
      .set({ ...list })
      .where('list.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  async deleteList(id: string) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const list = await queryRunner.manager.findOne(List, { id });

      const board = await queryRunner.manager.findOne(Board, {
        id: list!.board_id,
      });
      await queryRunner.manager.delete(List, { id });

      const newBoardLists = [...board!.list_ids];
      newBoardLists.splice(newBoardLists.indexOf(list!.id), 1);
      await queryRunner.manager.update(
        Board,
        { id: board!.id },
        { list_ids: newBoardLists }
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}