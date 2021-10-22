import { EntityRepository, Repository } from 'typeorm';
import { Card } from '../entities/Card';
import { ICard } from '../interfaces/card.interface';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  getAllCards() {
    return this.createQueryBuilder('card').getMany();
  }

  getCard(cardId: string) {
    return this.createQueryBuilder('card')
      .select()
      .where('card.id = :query', { query: cardId })
      .getOne();
  }

  async createCard(newCard: Card) {
    return this.save(newCard);
  }

  updateCard(id: string, card: ICard) {
    return this.createQueryBuilder('card')
      .update(Card)
      .set({ ...card })
      .where('card.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  deleteCard(id: string) {
    return this.createQueryBuilder('card')
      .delete()
      .from(Card)
      .where('card.id = :query', { query: id })
      .execute();
  }
}
