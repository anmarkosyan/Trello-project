import { ConnectionOptions } from "typeorm";
import dotenv from 'dotenv';
// import {User} from './entities/User';

dotenv.config();

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'db',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD ,
    database: process.env.POSTGRES_DB,
    entities: [/*User*/],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    migrations: [/*migrations folder*/]
}

export default config;

