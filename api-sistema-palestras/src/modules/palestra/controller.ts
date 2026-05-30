import { Request, Response } from 'express';
import palestraService from './service';

export class PalestraController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const {
        titulo,
        descricao,
        nomePalestrante,
        localEvento,
        dataEvento
      } = req.body;

      await palestraService.criar({
        titulo,
        descricao,
        nomePalestrante,
        localEvento,
        dataEvento
      });

      res.status(201).json({
        message: 'Evento cadastrado com sucesso!'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao cadastrar evento!'
        });
      }
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const palestras = await palestraService.listar();
      res.json(palestras);
    } catch (error) {
      res.status(500).json({
        message: 'Erro interno'
      });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const palestra = await palestraService.obterPorId(parseInt(id));

      if (!palestra) {
        res.status(404).json({
          message: 'Palestra não encontrada'
        });
        return;
      }

      res.json(palestra);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao obter palestra'
      });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await palestraService.atualizar(parseInt(id), req.body);

      res.json({
        message: 'Palestra atualizada com sucesso!'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao atualizar palestra'
        });
      }
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await palestraService.deletar(parseInt(id));

      res.json({
        message: 'Palestra deletada com sucesso!'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao deletar palestra'
        });
      }
    }
  }
}

export default new PalestraController();
