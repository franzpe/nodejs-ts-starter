import { ConnectionOptions } from 'typeorm';
import config from '.';

export const ormOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'hackers_and_painters',
  synchronize: config.env === config.dev,
  logging: false,
  entities: ['src/**/*entity.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
