import { EntityRepository, Repository } from 'typeorm';
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
  async createList(newList: newList): Promise<ListInterface | null> {
    const list = await this.save(newList);
    const board = await BoardEntity.createQueryBuilder('board')
      .select()
      .where('board.id = :query', { query: list.board_id })
      .getOne();

    const newBoardLists = [...board!.list_ids, list.id];
    await BoardEntity.createQueryBuilder('board')
      .update(BoardEntity)
      .set({ list_ids: newBoardLists })
      .where('board.id = :query', { query: list.board_id })
      .execute();

    return list || null;
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
    try {
      const listIds = data.map(list => list.list_id);

      const listsArray = await this.findByIds(listIds);

      for (const list of listsArray) {
        const listData = data.find(item => list.id === item.list_id);

        list.card_ids = listData.card_ids;
      }
      await CardEntity.createQueryBuilder('card')
        .update(CardEntity)
        .set({ list_id: listId })
        .where('card.id = :query', { query: cardId })
        .execute();
      await this.save(listsArray);

      return await this.findByIds(listIds);
    } catch {
      throw HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT);
    }
  }

  async deleteList(id: string): Promise<void> {
    const listData = await this.findOne(id);
    await this.createQueryBuilder('list')
      .delete()
      .from(ListEntity)
      .where('list.id = :query', { query: id })
      .execute();

    const board = await BoardEntity.createQueryBuilder('board')
      .select()
      .where('board.id = :query', { query: listData?.board_id })
      .getOne();

    const newData = [...board!.list_ids];
    newData.splice(newData.indexOf(listData!.id), 1);

    await BoardEntity.createQueryBuilder('board')
      .update(BoardEntity)
      .set({ list_ids: newData })
      .where('board.id = :query', { query: listData!.board_id })
      .execute();
  }
}
