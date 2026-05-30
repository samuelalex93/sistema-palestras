import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../../config/database';

export interface Palestra extends RowDataPacket {
  ID: number;
  titulo: string;
  descricao: string;
  nomePalestrante: string;
  localEvento: string;
  dataEvento: string;
}

export class PalestraRepository {
  private pool: Pool = pool;

  async create(dados: {
    titulo: string;
    descricao: string;
    nomePalestrante: string;
    localEvento: string;
    dataEvento: string;
  }): Promise<void> {
    await this.pool.execute<ResultSetHeader>(
      `INSERT INTO palestra(
        titulo,
        descricao,
        nomePalestrante,
        localEvento,
        dataEvento
      ) VALUES(?,?,?,?,?)`,
      [
        dados.titulo,
        dados.descricao,
        dados.nomePalestrante,
        dados.localEvento,
        dados.dataEvento
      ]
    );
  }

  async findAll(): Promise<Palestra[]> {
    const [rows] = await this.pool.execute<Palestra[]>(
      'SELECT * FROM palestra'
    );

    return rows;
  }

  async findById(id: number): Promise<Palestra | null> {
    const [rows] = await this.pool.execute<Palestra[]>(
      'SELECT * FROM palestra WHERE ID = ?',
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async update(id: number, dados: Partial<Palestra>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    Object.entries(dados).forEach(([key, value]) => {
      if (key !== 'ID' && value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return;

    values.push(id);

    await this.pool.execute<ResultSetHeader>(
      `UPDATE palestra SET ${fields.join(', ')} WHERE ID = ?`,
      values
    );
  }

  async delete(id: number): Promise<void> {
    await this.pool.execute<ResultSetHeader>(
      'DELETE FROM palestra WHERE ID = ?',
      [id]
    );
  }
}

export default new PalestraRepository();
