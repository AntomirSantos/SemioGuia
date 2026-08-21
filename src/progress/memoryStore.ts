import type { ProgressStore, RespostaRegistrada } from './types';

export class MemoryProgressStore implements ProgressStore {
  private estudados = new Set<string>();
  private favoritos = new Set<string>();
  private respostas: RespostaRegistrada[] = [];
  private buscas: string[] = [];
  private preferencias = new Map<string, string>();

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    estudado ? this.estudados.add(topicoId) : this.estudados.delete(topicoId);
  }
  async listarEstudados(): Promise<string[]> { return [...this.estudados]; }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    favorito ? this.favoritos.add(topicoId) : this.favoritos.delete(topicoId);
  }
  async listarFavoritos(): Promise<string[]> { return [...this.favoritos]; }

  async registrarResposta(r: RespostaRegistrada): Promise<void> { this.respostas.push(r); }
  async listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]> {
    return topicoId ? this.respostas.filter((r) => r.topicoId === topicoId) : [...this.respostas];
  }

  async registrarBusca(termo: string): Promise<void> {
    this.buscas = [termo, ...this.buscas.filter((t) => t !== termo)];
  }
  async listarBuscasRecentes(limite = 10): Promise<string[]> {
    return this.buscas.slice(0, limite);
  }

  async obterPreferencia(chave: string): Promise<string | null> {
    return this.preferencias.get(chave) ?? null;
  }
  async definirPreferencia(chave: string, valor: string): Promise<void> {
    this.preferencias.set(chave, valor);
  }
}
