import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },

    postgres: {
      dbHost: process.env.POSTGRES_DB_HOST,
      dbName: process.env.POSTGRES_DB,
      dbUser: process.env.POSTGRES_DB_USER,
      dbPass: process.env.POSTGRES_DB_PASSWORD,
      dbPort: parseInt(process.env.POSTGRES_DB_PORT, 10),
      dbType: process.env.POSTGRES_DB_TYPE,
    },

    mysql: {
      dbHost: process.env.MYSQL_DB_HOST,
      dbName: process.env.MYSQL_DB,
      dbUser: process.env.MYSQL_DB_USER,
      dbPass: process.env.MYSQL_DB_PASSWORD,
      dbPort: parseInt(process.env.MYSQL_DB_PORT, 10),
      dbType: process.env.MYSQL_DB_TYPE,
    },

    apiKey: process.env.API_KEY,
  };
});
