import * as typeorm from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const dataSource = new typeorm.DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'naromaro',
  synchronize: true,
  entities: [
    join(__dirname, '/../entity/Post.ts'),
    join(__dirname, '/../entity/category.ts'),

    join(__dirname, '/../entity/user.ts'),
  ],
});

export default dataSource;
