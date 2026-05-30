import 'dotenv/config';

export const {
  DB_HOST: dbHost = 'localhost',
  DB_USER: dbUser = 'root',
  DB_PASSWORD: dbPassword = '',
  DB_NAME: dbName = 'sistema_palestras',
} = process.env;