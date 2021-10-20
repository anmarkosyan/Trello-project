import { EntityRepository, Repository } from 'typeorm';
import { List } from '../entities/List';

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

  updateList(id: string, title: string) {
    return this.createQueryBuilder('list')
      .update(List)
      .set({ title })
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