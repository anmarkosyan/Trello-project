import 'reflect-metadata';
import {createConnection} from 'typeorm';
import app from './app';
import config from './config';
import ormconfig from './ormconfig';


//ormconfig file by Hayk
createConnection(ormconfig)
  .then(async connection => {
    console.log('DB connection...');
    app.listen(config.app.port, () => {
      console.log(`Starting listen server on port ${config.app.port}...`);
    });
  })
  .catch(e => {
    console.error('💥 ERROR: Database connection failed!!', e);
    throw e;
  });
