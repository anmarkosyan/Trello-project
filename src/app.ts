import cors from 'cors';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from './controllers/errorController';
import { HttpErr } from './exceptions/HttpError';
import { boardRoutes } from './routes/boardRoutes';
import { listRoutes } from './routes/listRoutes';
import { cardRoutes } from './routes/cardRoutes';
import { commentRoutes } from './routes/commentRoutes';

const app = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(compression());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'OK' });
});

app.use('/api/v1/boards', boardRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/comments', commentRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(HttpErr.notFound(`Can't find ${req.originalUrl} on this server!`));
});

app.use(errorHandler);

export default app;
