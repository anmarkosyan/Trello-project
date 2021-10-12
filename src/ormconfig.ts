import path from "path";
import { ConnectionOptions } from "typeorm";
import env from './config/index';
// import {User} from './entities/User';


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
    entities: [`src/entities/**/*.${isCompiled ? "js" : "ts"}`],
    migrations: [path.join(__dirname, `src/db/migration/**/*.${isCompiled ? "js" : "ts"}`)],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config;

