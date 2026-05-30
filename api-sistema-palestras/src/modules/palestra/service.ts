import palestraRepository, { Palestra } from './repository';

export interface CriarPalestraData {
  titulo: string;
  descricao: string;
  nomePalestrante: string;
  localEvento: string;
  dataEvento: string;
}

export class PalestraService {
  async criar(dados: CriarPalestraData): Promise<void> {
    if (!dados.titulo || !dados.nomePalestrante || !dados.dataEvento) {
      throw new Error('Título, nome do palestrante e data são obrigatórios');
    }

    await palestraRepository.create(dados);
  }

  async listar(): Promise<Palestra[]> {
    return palestraRepository.findAll();
  }

  async obterPorId(id: number): Promise<Palestra | null> {
    return palestraRepository.findById(id);
  }

  async atualizar(id: number, dados: Partial<CriarPalestraData>): Promise<void> {
    const palestra = await palestraRepository.findById(id);

    if (!palestra) {
      throw new Error('Palestra não encontrada');
    }

    await palestraRepository.update(id, dados as any);
  }

  async deletar(id: number): Promise<void> {
    const palestra = await palestraRepository.findById(id);

    if (!palestra) {
      throw new Error('Palestra não encontrada');
    }

    await palestraRepository.delete(id);
  }
}

export default new PalestraService();
