import { EntityRepository, Repository, getConnection } from 'typeorm';
import { CardEntity } from '../entities/Card';
import { ICard } from '../interfaces/card.interface';
import { CardInterface } from '../interfaces';
import { ListEntity } from '../entities/List';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

interface newCard {
  title: string;
  description?: string;
  list_id: string;
}

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {

  async createCard(newCard: newCard): Promise<CardInterface> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const card = await queryRunner.manager.save(CardEntity, newCard);
      const list = await queryRunner.manager.findOne(ListEntity, {
        id: card.list_id,
      });
      const newLists = [...list!.card_ids, card.id];
      await queryRunner.manager.update(
        ListEntity,
        { id: card.list_id },
        { card_ids: newLists }
      );
      await queryRunner.commitTransaction();
      return card;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.LIST);
    }
  }

  async getAllCards(): Promise<CardInterface[]> {
    const cards = await this.createQueryBuilder('card').getMany()
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.INTERNAL)
      });
    return cards
  }

  async getCard(cardId: string): Promise<CardInterface | null> {
    const card = await this.createQueryBuilder('card')
      .select()
      .where('card.id = :query', { query: cardId })
      .getOne()
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.CARD)
      });
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

  async deleteCard(id: string): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const card = await queryRunner.manager.findOne(CardEntity, { id });
      const list = await queryRunner.manager.findOne(ListEntity, {
        id: card!.list_id,
      });
      await queryRunner.manager.delete(CardEntity, { id });

      const newLists = [...list!.card_ids];
      newLists.splice(newLists.indexOf(card!.id), 1);
      await queryRunner.manager.update(
        ListEntity,
        { id: list!.id },
        { card_ids: newLists }
      );
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.NOT_FOUND.CARD)
    }
  }
}
