import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import { ConnectionOptions } from 'typeorm';

import config from '../config';
const API_KEY_PROD = 'admin';
const API_KEY = '123456';

@Global() // inidicamos que es un modulo global para que cualquier servicio lo pueda importar
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: configService.mysql.dbType,
          host: configService.mysql.dbHost,
          port: configService.mysql.dbPort,
          username: configService.mysql.dbUser,
          password: configService.mysql.dbPass,
          database: configService.mysql.dbName,
          synchronize: true,
          autoLoadEntities: true,
        } as ConnectionOptions;
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },

    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          user: configService.postgres.dbUser,
          host: configService.postgres.dbHost,
          database: configService.postgres.dbName,
          password: configService.postgres.dbPass,
          port: configService.postgres.dbPort,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
