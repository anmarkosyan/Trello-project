import { EntityRepository, Repository } from 'typeorm';
import { Card } from '../entities/Card';

@EntityRepository(Card)
export class CardRepository extends Repository<Card> {
  getAllCards() {
    return this.createQueryBuilder('card').getMany();
  }

  getCard(cardId: string) {
    return this.createQueryBuilder('board')
      .select()
      .where('board.id = :query', { query: cardId })
      .getOne();
  }

  createBoard(newCard: Card) {
    return this.save(newCard);
  }

  updateCard(id: string, title: string) {
    return this.createQueryBuilder('card')
      .update(Card)
      .set({ title })
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
