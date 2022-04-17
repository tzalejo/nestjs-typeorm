import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'nestjs_typeorm',
  password: 'nestjs',
  port: 54321
});

client.connect();

/* client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
}); */


const API_KEY_PROD = 'admin';
const API_KEY = '123456';

@Global() // inidicamos que es un modulo global para que cualquier servicio lo pueda importar
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV=== 'prod' ? API_KEY_PROD: API_KEY,
    },

    {
      provide: 'PG',
      useValue: client,
    },
  ],

 exports: ['API_KEY', 'PG'],

})
export class DatabaseModule {}
