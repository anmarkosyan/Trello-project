import { EntityRepository, Repository } from 'typeorm';
import { CardEntity } from '../entities/Card';
import { ICard } from '../interfaces/card.interface';
import { CardInterface } from '../interfaces';

interface newCard {
  title: string;
  description?: string;
  list_id: string;
}

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {
  async getAllCards(): Promise<CardInterface[]> {
    return this.createQueryBuilder('card').getMany();
  }

  async getCard(cardId: string): Promise<CardInterface|null> {
    const card = await this.createQueryBuilder('card')
      .select()
      .where('card.id = :query', { query: cardId })
      .getOne();
    return card || null;
  }

  async createCard(newCard: newCard): Promise<CardInterface> {
    return this.save(newCard);
  }

  async updateCard(id: string, card: ICard): Promise<CardInterface|null> {
    const updatedCard = await this.createQueryBuilder('card')
      .update(CardEntity)
      .set({ ...card })
      .where('card.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
    return updatedCard || null;
  }

  async deleteCard(id: string): Promise<void> {
    await this.createQueryBuilder('card')
      .delete()
      .from(CardEntity)
      .where('card.id = :query', { query: id })
      .execute();
  }
}
