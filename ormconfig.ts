import path from "path";
import { ConnectionOptions } from "typeorm";
import env from './src/config';

const isCompiled = path.extname(__filename).includes('js');

const config: ConnectionOptions = {
    type: 'postgres',
    host: env.db.host,
    port: Number(env.db.port),
    username: env.db.user,
    password: env.db.password,
    database: env.db.db,
    synchronize: false,
    migrationsRun: true,
    entities: [path.join(__dirname, `src/entities/**/*.${isCompiled ? "js" : "ts"}`)],
    migrations: [path.join(__dirname, `src/db/migrations/**/*.${isCompiled ? "js" : "ts"}`)],
    cli: {
        migrationsDir: path.join(__dirname, 'src/db/migrations'),
        entitiesDir: path.join(__dirname, 'src/entities'),
    },
    logging: 'all'
}

export default config;

