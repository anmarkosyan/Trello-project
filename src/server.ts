import { createConnection } from "typeorm";
import config from "./ormconfig";
import dotenv from 'dotenv';
import { appendFile } from "fs";
import app from './app';

dotenv.config();

createConnection(config)
    .then(async connection => {
        console.log('Connecting to DB...');

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Listening server on port ${port}...`);
        });
    })
    .catch(error => {
        console.error('Connection failed...', error);
        throw error;
    })

