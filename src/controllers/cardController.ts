import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { CardEntity } from '../entities/Card';
import { CardRepository } from '../services/card';
import { ICard, CardInterface, CardEntityInterface } from '../interfaces';
import StatusCode from '../exceptions/statusCodes';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';

const manager = () => getManager().getCustomRepository(CardRepository);

export class CardController {
  static async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, list_id } = req.body;
      const card: CardEntityInterface = new CardEntity();
      if (!title || title.trim() === '') {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.TITLE));
      }
      card.title = title;
      card.list_id = list_id;
      const cardData = await manager().createCard(card);
      res.status(StatusCode.CreateRequest).json(cardData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async getAllCards(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CardInterface[] = await manager().getAllCards();
      res.status(StatusCode.SuccessRequest).json(data);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async getCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const oneData = await manager().getCard(id);

      if (!oneData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.CARD));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, list_id } = req.body;
      const { id } = req.params;
      const updatedData: ICard = {};
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }

      if (title && title.trim()) {
        updatedData.title = title;
      }
      if (description && description.trim()) {
        updatedData.description = description;
      }
      if (list_id) {
        updatedData.list_id = list_id;
      }
      if (!Object.entries(updatedData).length) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.LIST));
      }

      const updateData = await manager().updateCard(id, updatedData);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const data = await manager().deleteCard(id);
      if (!data) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.BOARD));
      }
      res.status(StatusCode.SuccessRequest).json({
        message: 'Card successfully deleted.',
      });
    } catch {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}
