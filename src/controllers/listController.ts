import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';
import { ListRepository } from '../services/list';
import { ListEntity } from '../entities/List';

import { ListEntityInterface, ListInterface, IList } from '../interfaces';
import StatusCode from '../exceptions/statusCodes';
import { HttpErr } from '../exceptions/HttpError';
import ExceptionMessages from '../exceptions/messages';

const manager = () => getManager().getCustomRepository(ListRepository);

export class ListController {
  static async createList(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, boardId } = req.body;
      const list: ListEntityInterface = new ListEntity();
      if (!title || title.trim() === '') {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.TITLE));
      }
      list.title = title;
      list.board_id = boardId;
      const listData = await manager().createList(list);
      res.status(StatusCode.CreateRequest).json(listData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INVALID.INPUT));
    }
  }

  static async getAllLists(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ListInterface[] = await manager().getAllLists();
      res.status(StatusCode.SuccessRequest).json(data);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const oneData = await manager().getList(id);
      if (!oneData) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.LIST));
      }
      res.status(StatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateList(req: Request, res: Response, next: NextFunction) {
    const { title, cards } = req.body;
    const { id } = req.params;
    try {
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const updatedData: IList = {};
      if (title && title.trim()) {
        updatedData.title = title;
      }
      if (cards && Array.isArray(cards)) {
        updatedData.card_ids = cards;
      }
      if (!Object.entries(updatedData).length) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.LIST));
      }

      const updateData = await manager().updateList(id, updatedData);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async updateCardsLists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { cardId, listId, data } = req.body;

      const updateData = await manager().updateCardsLists(cardId, listId, data);
      res.status(StatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }

  static async deleteList(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (
        !id.match(
          '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
        )
      ) {
        return next(HttpErr.badRequest(ExceptionMessages.INVALID.ID));
      }
      const data = await manager().deleteList(id);
      if (!data) {
        return next(HttpErr.notFound(ExceptionMessages.NOT_FOUND.LIST));
      }
      res.status(StatusCode.SuccessRequest).json({
        message: 'List successfully deleted.',
      });
    } catch (e) {
      next(HttpErr.internalServerError(ExceptionMessages.INTERNAL));
    }
  }
}
