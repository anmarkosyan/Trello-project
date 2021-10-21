import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import HttpStatusCode from '../enums/HttpStatusCode';
import { Card } from '../entities/Card';
import { CardRepository } from '../services/card';
import { ICard } from '../interfaces/card.interface';

const manager = () => getManager().getCustomRepository(CardRepository);

export class CardController {
  static async createCard(req: Request, res: Response) {
    const { title, listId } = req.body;
    try {
      const card = new Card();
      card.title = title;
      card.list = listId;

      const cardData = await manager().createCard(card);
      res.status(HttpStatusCode.CreateRequest).json(cardData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getAllCards(req: Request, res: Response) {
    try {
      const data = await manager().getAllCards();
      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getCard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const oneData = await manager().getCard(id);
      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async updateCard(req: Request, res: Response) {
    const { title, description, listId } = req.body;
    const { id } = req.params;
    const updatedData: ICard = {};
    if (title) {
      updatedData.title = title;
    }
    if (description) {
      updatedData.description = description;
    }
    if (listId) {
      updatedData.listId = listId;
    }

    try {
      const updateData = await manager().updateCard(id, updatedData);
      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await manager().deleteCard(id);
      res.status(HttpStatusCode.SuccessRequest).json({
        message: 'Card successfully deleted.',
      });
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }
}
