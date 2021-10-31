import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { CardEntity } from '../entities/Card';
import { CardRepository } from '../services/card';
import { ICard } from '../interfaces/card.interface';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

const manager = () => getManager().getCustomRepository(CardRepository);

export class CardController {

  static async createCard(req: Request, res: Response) {
    const { title, list_id } = req.body;
    const card = new CardEntity();
    if (!title || title.trim() === "") {
      throw new Exception(StatusCode.BadRequest, ExceptionMessages.INVALID.TITLE);
    }
    card.title = title;
    card.list_id = list_id;
    const cardData = await manager().createCard(card);
    res.status(StatusCode.CreateRequest).json(cardData);

  }

  static async getAllCards(req: Request, res: Response) {
    const data = await manager().getAllCards();
    res.status(StatusCode.SuccessRequest).json(data);

  }

  static async getCard(req: Request, res: Response) {
    const { id } = req.params;
    const oneData = await manager().getCard(id);
    res.status(StatusCode.SuccessRequest).json(oneData);

  }

  static async updateCard(req: Request, res: Response) {
    const { title, description, list_id } = req.body;
    const { id } = req.params;
    const updatedData: ICard = {};
    if (title && title.trim()) {
      updatedData.title = title;
    }
    if (description) {
      updatedData.description = description;
    }
    if (list_id) {
      updatedData.list_id = list_id;
    }

    const updateData = await manager().updateCard(id, updatedData);
    res.status(StatusCode.SuccessRequest).json(updateData);

  }

  static async deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    await manager().deleteCard(id);
    res.status(StatusCode.SuccessRequest).json({
      message: 'Card successfully deleted.',
    });
  }
}
