import usuarioRepository, { Usuario } from './repository';

interface CadastroData {
  nome: string;
  email: string;
  senha: string;
}

interface LoginData {
  email: string;
  senha: string;
}

interface UserResponse {
  id: number;
  email: string;
  nome: string;
  admin: boolean;
}

export class UsuarioService {
  async cadastrar(data: CadastroData): Promise<void> {
    const usuarioExistente = await usuarioRepository.findByEmail(data.email);

    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    await usuarioRepository.create(data.nome, data.email, data.senha);
  }

  async login(data: LoginData): Promise<UserResponse> {
    const usuario = await usuarioRepository.findByEmail(data.email);

    if (!usuario) {
      throw new Error('Email ou senha inválidos');
    }

    if (usuario.senha !== data.senha) {
      throw new Error('Senha inválida');
    }

    return {
      id: usuario.ID,
      email: usuario.email,
      nome: usuario.nome,
      admin: usuario.admin
    };
  }

  async obterPorId(id: number): Promise<UserResponse | null> {
    const usuario = await usuarioRepository.findById(id);

    if (!usuario) {
      return null;
    }

    return {
      id: usuario.ID,
      email: usuario.email,
      nome: usuario.nome,
      admin: usuario.admin
    };
  }

  async listarTodos(): Promise<UserResponse[]> {
    const usuarios = await usuarioRepository.findAll();

    return usuarios.map(u => ({
      id: u.ID,
      email: u.email,
      nome: u.nome,
      admin: u.admin
    }));
  }
}

export default new UsuarioService();
