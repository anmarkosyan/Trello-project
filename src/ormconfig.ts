import path from "path";
import { ConnectionOptions } from "typeorm";
// import {User} from './entities/User';


const isCompiled = path.extname(__filename).includes('js');

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'db',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    migrationsRun: true,
    logging: false,
    entities: [`src/entities/**/*.${isCompiled ? "js" : "ts"}`],
    migrations: [path.join(__dirname, 'src/db/migration/**/*.${isCompiled ? "js" : "ts"}')],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
}

export default config;

