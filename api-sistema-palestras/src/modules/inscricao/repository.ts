import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import pool from '../../config/database';

export interface Inscricao extends RowDataPacket {
  ID: number;
  idUsuario: number;
  idPalestra: number;
}

export class InscricaoRepository {
  private pool: Pool = pool;

  async criar(idUsuario: number, idPalestra: number): Promise<void> {
    await this.pool.execute<ResultSetHeader>(
      'INSERT INTO inscricoes (idUsuario, idPalestra) VALUES (?, ?)',
      [idUsuario, idPalestra]
    );
  }

  async obterPorId(id: number): Promise<Inscricao | null> {
    const [rows] = await this.pool.execute<Inscricao[]>(
      'SELECT * FROM inscricoes WHERE ID = ?',
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  async listar(): Promise<Inscricao[]> {
    const [rows] = await this.pool.execute<Inscricao[]>(
      'SELECT * FROM inscricoes'
    );

    return rows;
  }

  async listarPorUsuario(idUsuario: number): Promise<Inscricao[]> {
    const [rows] = await this.pool.execute<Inscricao[]>(
      'SELECT * FROM inscricoes WHERE idUsuario = ?',
      [idUsuario]
    );

    return rows;
  }

  async listarPorPalestra(idPalestra: number): Promise<Inscricao[]> {
    const [rows] = await this.pool.execute<Inscricao[]>(
      'SELECT * FROM inscricoes WHERE idPalestra = ?',
      [idPalestra]
    );

    return rows;
  }

  async deletar(id: number): Promise<void> {
    await this.pool.execute<ResultSetHeader>(
      'DELETE FROM inscricoes WHERE ID = ?',
      [id]
    );
  }

  async verificarInscricao(idUsuario: number, idPalestra: number): Promise<boolean> {
    const [rows] = await this.pool.execute<Inscricao[]>(
      'SELECT * FROM inscricoes WHERE idUsuario = ? AND idPalestra = ?',
      [idUsuario, idPalestra]
    );

    return rows.length > 0;
  }
}

export default new InscricaoRepository();
