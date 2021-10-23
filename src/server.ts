import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';
import env from './config';
import config from '../ormconfig';

(async () => {
  try {
    await createConnection(config);
  } catch(e) {
    console.error('💥 ERROR: Database connection failed!!', e);
    process.exit(1)
  }
  console.log('DB connection...');
  const { port } = env.app;
  app.listen(port, () => {
    console.log(`Starting listen server on port ${port}...`);
  });
})();
