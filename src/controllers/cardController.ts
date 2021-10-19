import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { CardRepository } from '../services/card';
import { Card } from '../entities/Card';
import HttpStatusCode from '../enums/HttpStatusCode';

export class CardController {
  static async createCard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(CardRepository);
    const { title, listId } = req.body;
    try {
      const card = new Card();
      card.title = title;
      card.listId = listId;

      const cardData = await manager.createBoard(card);

      res.status(HttpStatusCode.CreateRequest).json(cardData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getAllCards(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(CardRepository);
    try {
      const data = await manager.getAllCards();

      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async getCard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(CardRepository);
    const { id } = req.params;
    try {
      const oneData = await manager.getCard(id);

      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async updateCard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(CardRepository);
    const { title } = req.body;
    const { id } = req.params;

    try {
      const updateData = await manager.updateCard(id, title);

      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }

  static async deleteCard(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(CardRepository);
    const { id } = req.params;
    try {
      await manager.deleteCard(id);

      res.status(HttpStatusCode.SuccessRequest).end();
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something want wrong!!',
      });
    }
  }
}
