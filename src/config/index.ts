export default {
  app: {
    port: process.env.PORT || 8080,
  },
  db: {
    db: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    port: process.env.POSTGRES_PORT,
  },
};
