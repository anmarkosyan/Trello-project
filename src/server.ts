import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import env from './config';
import config from './ormconfig';

createConnection(config)
  .then(async connection => {
    await connection.runMigrations();
    console.log('DB connection...');

    const { port } = env.app;
    app.listen(port, () => {
      console.log(`Starting listen server on port ${port}...`);
    });
  })
  .catch(e => {
    console.error('💥 ERROR: Database connection failed!!', e);
    throw e;
  });
