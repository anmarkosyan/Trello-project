import {
  EntityRepository,
  Repository,
  getConnection,
  getManager,
} from 'typeorm';
import { BoardEntity } from '../entities/Board';
import { ListEntity } from '../entities/List';
import { CardEntity } from '../entities/Card';
import { ListInterface, IList } from '../interfaces';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';

interface newList {
  title: string;
  board_id: string;
}

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {
  async createList(newList: newList): Promise<ListInterface> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const list = await queryRunner.manager.save(ListEntity, newList);

      const board = await queryRunner.manager.findOne(BoardEntity, {
        id: list.board_id,
      });
      const newBoardLists = [...board!.list_ids, list.id];
      await queryRunner.manager.update(
        BoardEntity,
        { id: list.board_id },
        { list_ids: newBoardLists }
      );

      await queryRunner.commitTransaction();
      return list;
    } catch {
      await queryRunner.rollbackTransaction();
      throw HttpErr.internalServerError(ExceptionMessages.INTERNAL);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllLists(): Promise<ListInterface[]> {
    const lists = await this.createQueryBuilder('list').getMany();
    return lists;
  }

  async getList(listId: string): Promise<ListInterface | null> {
    const list = await this.createQueryBuilder('list')
      .leftJoinAndSelect('list.cards', 'card')
      .where('list.id = :query', { query: listId })
      .getOne();
    return list || null;
  }

  async updateList(id: string, list: IList): Promise<ListInterface | null> {
    const updatedList = await this.createQueryBuilder('list')
      .update(ListEntity)
      .set({ ...list })
      .where('list.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
    return updatedList || null;
  }

  async updateCardsLists(
    cardId: string,
    listId: string,
    data: any[]
  ): Promise<ListInterface[]> {
    const listIds = data.map(list => list.list_id);

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const listsArray = await queryRunner.manager.findByIds(
        ListEntity,
        listIds
      );

      for (const list of listsArray) {
        const listData = data.find(item => list.id === item.list_id);

        list.card_ids = listData.card_ids;
      }

      await queryRunner.manager.update(CardEntity, cardId, { list_id: listId });

      await queryRunner.manager.save(ListEntity, listsArray);
      await queryRunner.commitTransaction();
      return await queryRunner.manager.findByIds(ListEntity, listIds);
    } catch {
      await queryRunner.rollbackTransaction();
      throw HttpErr.notFound('internal server error');
    } finally {
      await queryRunner.release();
    }
  }

  async deleteList(id: string): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const list = await queryRunner.manager.findOne(ListEntity, { id });

      const board = await queryRunner.manager.findOne(BoardEntity, {
        id: list!.board_id,
      });
      await queryRunner.manager.delete(ListEntity, { id });

      const newBoardLists = [...board!.list_ids];
      newBoardLists.splice(newBoardLists.indexOf(list!.id), 1);
      await queryRunner.manager.update(
        BoardEntity,
        { id: board!.id },
        { list_ids: newBoardLists }
      );
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      throw HttpErr.internalServerError(ExceptionMessages.INTERNAL);
    } finally {
      await queryRunner.release();
    }
  }
}
