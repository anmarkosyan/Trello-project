import { EntityRepository, Repository, getConnection } from 'typeorm';
import { BoardEntity } from '../entities/Board';
import { ListEntity } from '../entities/List';
import { CardEntity } from '../entities/Card';
import { IList } from '../interfaces/list.interface';
import  { Exception}  from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

interface newList {
  title: string;
  board_id: string;
}

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {

  async createList(newList: newList) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const list = await queryRunner.manager.save(ListEntity, newList);
      const board = await queryRunner.manager.findOne(BoardEntity, {
        id: list.board_id,
      })
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
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.LIST);
    }
  }

  async getAllLists() {
    const lists = await this.createQueryBuilder('list').getMany()
    .catch(() => {
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.INTERNAL)
    });
    return lists
  }

  async getList(listId: string) {
    const list= await  this.createQueryBuilder('list')
      .select()
      .where('list.id = :query', { query: listId })
      .getOne()
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.LIST)
      });
      return list
  }



  async updateList(id: string, list: IList) {
    return await this.createQueryBuilder('list')
      .update(ListEntity)
      .set({ ...list })
      .where('list.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  async updateCardsLists(cardId: string, listId: string, data: any[]) {

    const listIds = data.map((list) => {
      return list.list_id;
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const listsArray = await queryRunner.manager.findByIds(ListEntity, listIds);

      for (const list of listsArray) {
        const listData = data.find((item) => {
          return list.id === item.list_id;
        });

        list.card_ids = listData.card_ids;
      }

      await queryRunner.manager.update(
        CardEntity,
        cardId,
        { list_id:  listId},
      );

      await queryRunner.manager.save(ListEntity, listsArray);
      await queryRunner.commitTransaction();
      return await queryRunner.manager.findByIds(ListEntity, listIds);;

    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    }
  }

  async deleteList(id: string) {
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
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.LIST)
      
    }
  }
}
