import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../../config/database';

export interface Usuario extends RowDataPacket {
  ID: number;
  nome: string;
  email: string;
  senha: string;
  admin: boolean;
}

export class UsuarioRepository {
  private pool: Pool = pool;

  async findByEmail(email: string): Promise<Usuario | null> {
    const [rows] = await this.pool.execute<Usuario[]>(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async findById(id: number): Promise<Usuario | null> {
    const [rows] = await this.pool.execute<Usuario[]>(
      'SELECT * FROM usuarios WHERE ID = ?',
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async create(nome: string, email: string, senha: string): Promise<void> {
    await this.pool.execute<ResultSetHeader>(
      'INSERT INTO usuarios(nome, email, senha) VALUES(?,?,?)',
      [nome, email, senha]
    );
  }

  async findAll(): Promise<Usuario[]> {
    const [rows] = await this.pool.execute<Usuario[]>(
      'SELECT ID, nome, email, admin FROM usuarios'
    );

    return rows;
  }
}

export default new UsuarioRepository();
