import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { ListRepository } from '../services/list';
import { List } from '../entities/List';
import HttpStatusCode from '../enums/HttpStatusCode';

export class ListController {
  static async createList(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(ListRepository);
    const { title,boardId} = req.body;
  

    try {
      const list = new List();
      list.title = title;
      list.boardId=boardId;
    
     

      const listData = await manager.createList(list);
  

      res.status(HttpStatusCode.CreateRequest).json(listData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getAllLists(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(ListRepository);
    try {
      const data = await manager.getAllLists();

      res.status(HttpStatusCode.SuccessRequest).json(data);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async getList(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(ListRepository);
    const { id } = req.params;
    try {
      const oneData = await manager.getList(id);

      res.status(HttpStatusCode.SuccessRequest).json(oneData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async updateList(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(ListRepository);
    const { title } = req.body;
    const { id } = req.params;
    try {
      const updateData = await manager.updateList(id, title);

      res.status(HttpStatusCode.SuccessRequest).json(updateData);
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }

  static async deleteList(req: Request, res: Response) {
    const manager = getManager().getCustomRepository(ListRepository);
    const { id } = req.params;
    try {
      await manager.deleteList(id);

      res.status(HttpStatusCode.SuccessRequest).end();
    } catch (e) {
      res.status(HttpStatusCode.BadRequest).json({
        message: 'Something went wrong!!',
      });
    }
  }
}