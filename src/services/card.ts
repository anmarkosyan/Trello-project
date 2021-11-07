import { EntityRepository, Repository } from 'typeorm';
import { ICard, CardInterface } from '../interfaces';
import { CardEntity } from '../entities/Card';
import { ListEntity } from '../entities/List';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';

interface newCard {
  title: string;
  description?: string;
  list_id: string;
}

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {
  async createCard(newCard: newCard): Promise<CardInterface | null> {
    const card = await this.save(newCard);
    const list = await ListEntity.createQueryBuilder('list')
      .select()
      .where('list.id = :query', { query: card.list_id })
      .getOne();
    const newLists = [...list!.card_ids, card.id];
    await ListEntity.createQueryBuilder('list')
      .update(ListEntity)
      .set({ card_ids: newLists })
      .where('list.id = :query', { query: card.list_id })
      .execute();

    return card || null;
  }

  async getAllCards(): Promise<CardInterface[]> {
    const cards = await this.createQueryBuilder('card').getMany();
    return cards || null;
  }

  async getCard(cardId: string): Promise<CardInterface | null> {
    const card = await this.createQueryBuilder('card')
      .select()
      .where('card.id = :query', { query: cardId })
      .getOne();
    return card || null;
  }

  async updateCard(id: string, card: ICard): Promise<CardInterface | null> {
    const updatedCard = await this.createQueryBuilder('card')
      .update(CardEntity)
      .set({ ...card })
      .where('card.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
    return updatedCard || null;
  }

  async deleteCard(id: string): Promise<CardInterface | null> {
    const cardData = await this.findOne(id);
    await this.createQueryBuilder('card')
      .delete()
      .from(CardEntity)
      .where('card.id = :query', { query: id })
      .execute();

    const list = await ListEntity.createQueryBuilder('list')
      .select()
      .where('list.id = :query', { query: cardData!.list_id })
      .getOne();

    const newData = [...list!.card_ids];
    newData.splice(newData.indexOf(cardData!.id), 1);

    await ListEntity.createQueryBuilder('list')
      .update(ListEntity)
      .set({ card_ids: newData })
      .where('list.id = :query', { query: cardData!.list_id })
      .execute();
    return cardData || null;
  }
}
