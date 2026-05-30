import { Request, Response } from 'express';
import usuarioService from './service';

export class UsuarioController {
  async cadastrar(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        res.status(400).json({
          message: 'Nome, email e senha são obrigatórios'
        });
        return;
      }

      await usuarioService.cadastrar({ nome, email, senha });

      res.status(201).json({
        message: 'Usuário cadastrado com sucesso!'
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Email já cadastrado') {
        res.status(400).json({
          message: error.message
        });
      } else {
        res.status(500).json({
          message: 'Erro ao cadastrar usuário'
        });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        res.status(400).json({
          message: 'Email e senha são obrigatórios',
          tipoMensagem: 'danger'
        });
        return;
      }

      const userData = await usuarioService.login({ email, senha });

      res.json({
        message: 'Login realizado com sucesso!',
        userData,
        tipoMensagem: 'success'
      });
    } catch (error) {
      console.log(error)
      if (error instanceof Error && error.message.includes('Email ou senha')) {
        res.json({
          message: error.message,
          tipoMensagem: 'danger'
        });
      } else {
        res.status(500).json({
          message: 'Erro ao logar!'
        });
      }
    }
  }

  async obterPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.obterPorId(parseInt(id));

      if (!usuario) {
        res.status(404).json({
          message: 'Usuário não encontrado'
        });
        return;
      }

      res.json(usuario);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao obter usuário'
      });
    }
  }

  async listarTodos(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await usuarioService.listarTodos();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({
        message: 'Erro ao listar usuários'
      });
    }
  }
}

export default new UsuarioController();
