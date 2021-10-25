import express, { Request, Response, NextFunction } from 'express';

import { boardRoutes } from './routes/boardRoutes';
import {listRoutes} from './routes/listRoutes';
import {cardRoutes} from './routes/cardRoutes';
import {commentRoutes} from './routes/commentRoutes';


const app = express();
app.use(express.json());

app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/comments', commentRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('OK');
});

export default app;
