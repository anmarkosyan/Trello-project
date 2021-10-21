import path from 'path';
import { ConnectionOptions } from 'typeorm';
import env from './config/index';
// import {User} from './entities/User';
import { Board } from './entities/Board';
import { Common } from './entities/Common';
import { List } from './entities/List';
import { Card } from './entities/Card';
import { Comment } from './entities/Comment';

// const isCompiled = path.extname(__filename).includes('js');
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'pgtrello',
  password: 'trello1234',
  database: 'dbtrello',
  entities: [Common, Board, List, Comment, Card],
  synchronize: true,
  migrationsRun: true,
  // extra: { ssl: true, rejectUnauthorized: false },

  // const config: ConnectionOptions = {
  //     type: 'postgres',
  //     host: env.db.host,
  //     port: Number(env.db.port),
  //     username: env.db.user,
  //     password: env.db.password,
  //     database: env.db.db,
  //     synchronize: false,
  //     migrationsRun: true,
  //     entities: [`src/entities/**/*.${isCompiled ? "js" : "ts"}`],
  //     migrations: [path.join(__dirname, `src/db/migration/**/*.${isCompiled ? "js" : "ts"}`)],
  //     cli: {
  //         migrationsDir: 'src/db/migrations'
  //     }
  //     extra: { ssl: true, rejectUnauthorized: false },
  // }
};
export default config;
