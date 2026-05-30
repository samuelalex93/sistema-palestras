import mysql from 'mysql2/promise';
import { dbHost, dbName, dbPassword, dbUser } from './env';

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then((connection) => {
    console.log('✅ Conectado ao banco de dados com sucesso!');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao banco de dados:', error.message);
  });

export default pool;
