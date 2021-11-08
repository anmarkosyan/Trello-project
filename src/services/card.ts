import { EntityRepository, Repository, getConnection } from 'typeorm';
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
      throw HttpErr.internalServerError(ExceptionMessages.INTERNAL);
    } finally {
      await queryRunner.release();
    }
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
      throw HttpErr.internalServerError(ExceptionMessages.INTERNAL);
    } finally {
      await queryRunner.release();
    }
  }
}
