export default {
  app: {
    port: process.env.PORT || 8080,
  },
  db: {
    db: process.env.TYPEORM_DATABASE,
    user: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    port: process.env.TYPEORM_PORT,
    host: process.env.TYPEORM_HOST,
  },
};
