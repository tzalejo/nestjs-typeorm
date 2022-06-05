import { Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { Client } from 'pg';

// import config from './config';

@Injectable()
export class AppService {
  constructor() // @Inject(config.KEY) private configService: ConfigType<typeof config>, // @Inject('TASKS') private tasks: any[], // @Inject('PG') private clientPg: Client,
  {}

  /* getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Hello World como va, el apikey = ${apiKey} ${name}`;
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  } */
}
