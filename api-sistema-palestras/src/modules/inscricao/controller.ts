import { Request, Response } from 'express';
import inscricaoService from './service';

export class InscricaoController {
  async criar(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario, idPalestra } = req.body;

      await inscricaoService.criar(idUsuario, idPalestra);

      res.status(201).json({
        message: 'Inscrição realizada :)'
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('já se inscreveu')) {
        res.status(400).json({
          message: error.message
        });
      } else if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao realizar a inscrição :('
        });
      }
    }
  }

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const inscricoes = await inscricaoService.listar();
      res.json(inscricoes);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar inscrições'
      });
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const inscricao = await inscricaoService.obterPorId(parseInt(id));

      if (!inscricao) {
        res.status(404).json({
          message: 'Inscrição não encontrada'
        });
        return;
      }

      res.json(inscricao);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao obter inscrição'
      });
    }
  }

  async listarPorUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario } = req.params;
      const inscricoes = await inscricaoService.listarPorUsuario(parseInt(idUsuario));
      res.json(inscricoes);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar inscrições do usuário'
      });
    }
  }

  async listarPorPalestra(req: Request, res: Response): Promise<void> {
    try {
      const { idPalestra } = req.params;
      const inscricoes = await inscricaoService.listarPorPalestra(parseInt(idPalestra));
      res.json(inscricoes);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar inscrições da palestra'
      });
    }
  }

  async deletar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await inscricaoService.deletar(parseInt(id));

      res.json({
        message: 'Inscrição cancelada com sucesso!'
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao deletar inscrição'
        });
      }
    }
  }
}

export default new InscricaoController();
