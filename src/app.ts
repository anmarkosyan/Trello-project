import express from 'express';

import { boardRoute } from './routes/boardRoutes';
import {listRoutes} from './routes/listRoutes';
import {cardRoutes} from './routes/cardRoutes';
import {commentRoutes} from './routes/commentRoutes';


const app = express();
app.use(express.json());

app.use('/api/v1/boards', boardRoute);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/cards', cardRoutes);
app.use('/api/v1/comments', commentRoutes);

export default app;
