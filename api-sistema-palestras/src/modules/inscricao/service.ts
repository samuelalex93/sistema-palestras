import inscricaoRepository, { Inscricao } from './repository';

export class InscricaoService {
  async criar(idUsuario: number, idPalestra: number): Promise<void> {
    if (!idUsuario || !idPalestra) {
      throw new Error('ID do usuário e ID da palestra são obrigatórios');
    }

    const jaInscrito = await inscricaoRepository.verificarInscricao(
      idUsuario,
      idPalestra
    );

    if (jaInscrito) {
      throw new Error('Você já se inscreveu nesse evento!');
    }

    await inscricaoRepository.criar(idUsuario, idPalestra);
  }

  async listar(): Promise<Inscricao[]> {
    return inscricaoRepository.listar();
  }

  async obterPorId(id: number): Promise<Inscricao | null> {
    return inscricaoRepository.obterPorId(id);
  }

  async listarPorUsuario(idUsuario: number): Promise<Inscricao[]> {
    return inscricaoRepository.listarPorUsuario(idUsuario);
  }

  async listarPorPalestra(idPalestra: number): Promise<Inscricao[]> {
    return inscricaoRepository.listarPorPalestra(idPalestra);
  }

  async deletar(id: number): Promise<void> {
    const inscricao = await inscricaoRepository.obterPorId(id);

    if (!inscricao) {
      throw new Error('Inscrição não encontrada');
    }

    await inscricaoRepository.deletar(id);
  }
}

export default new InscricaoService();
