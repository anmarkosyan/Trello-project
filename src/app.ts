import cors from 'cors';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';

import { boardRoutes } from './routes/boardRoutes';
import { listRoutes } from './routes/listRoutes';
import { cardRoutes } from './routes/cardRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { Exception } from './exceptions/exceptions';
import StatusCode from './exceptions/statusCodes';
import { errorHandler } from './services/responseHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/comments', commentRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'OK' });
});

app.all('*', (req, res, next) => {
  next(
    new Exception(
      StatusCode.NotFound,
      `Can't find ${req.originalUrl} on this server!`
    )
  );
});

app.use(errorHandler);

export default app;
