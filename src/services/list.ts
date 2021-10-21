import { EntityRepository, Repository } from 'typeorm';
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

  createList(newList: List) {
    return this.save(newList);
  }

  updateList(id: string, list: IList) {
    return this.createQueryBuilder('list')
      .update(List)
      .set({ ...list })
      .where('list.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  deleteList(id: string) {
    return this.createQueryBuilder('list')
      .delete()
      .from(List)
      .where('list.id = :query', { query: id })
      .execute();
  }
}