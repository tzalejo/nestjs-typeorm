import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbHost: process.env.POSTGRES_DB_HOST,
      dbName: process.env.POSTGRES_DB ,
      dbUser: process.env.POSTGRES_DB_USER,
      dbPass: process.env.POSTGRES_DB_PASSWORD,
      dbPort: process.env.POSTGRES_DB_PORT,
    },
    apiKey: process.env.API_KEY,
  };
});
