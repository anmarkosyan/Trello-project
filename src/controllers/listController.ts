import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { ListRepository } from '../services/list';
import { ListEntity } from '../entities/List';
import { IList } from '../interfaces/list.interface';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

const manager = () => getManager().getCustomRepository(ListRepository);

export class ListController {
  static async createList(req: Request, res: Response) {
    const { title, boardId } = req.body;
    const list = new ListEntity();
    if (!title || title.trim() === '') {
      throw new Exception(
        StatusCode.BadRequest,
        ExceptionMessages.INVALID.TITLE
      );
    }
    list.title = title;
    list.board_id = boardId;
    const listData = await manager().createList(list);
    res.status(StatusCode.CreateRequest).json(listData);
  }

  static async getAllLists(req: Request, res: Response) {
    const data = await manager().getAllLists();
    res.status(StatusCode.SuccessRequest).json(data);
  }

  static async getList(req: Request, res: Response) {
    const { id } = req.params;
    const oneData = await manager().getList(id);
    res.status(StatusCode.SuccessRequest).json(oneData);
  }

  static async updateList(req: Request, res: Response) {
    const { title, cards } = req.body;
    const { id } = req.params;
    const updatedData: IList = {};

    if (title) {
      updatedData.title = title;
    }

    if (cards) {
      updatedData.card_ids = cards;
    }

    try {
      const updateData = await manager().updateList(id, updatedData);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(StatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async updateCardsLists(req: Request, res: Response) {
    const { cardId, listId, data } = req.body;

    try {
      const updateData = await manager().updateCardsLists(cardId, listId, data);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(StatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async deleteList(req: Request, res: Response) {
    const { id } = req.params;
    await manager().deleteList(id);
    res.status(StatusCode.SuccessRequest).json({
      message: 'List successfully deleted.',
    });
  }
}
