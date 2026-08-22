import type { ConclusaoCaso, ProgressStore, RespostaRegistrada } from './types';
import type { ItemRevisao } from '../revisao/sm2';
import {
  chaveConclusao,
  chaveResposta,
  type EstadoCarimbado,
  type PrefCarimbada,
  type SnapshotSync,
} from '../sync/merge';

export class MemoryProgressStore implements ProgressStore {
  private estudados = new Map<string, EstadoCarimbado>();
  private favoritos = new Map<string, EstadoCarimbado>();
  private respostas: RespostaRegistrada[] = [];
  private buscas: string[] = [];
  private preferencias = new Map<string, PrefCarimbada>();
  private itensRevisao = new Map<string, ItemRevisao>();
  private conclusoesCasos: ConclusaoCaso[] = [];

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    this.estudados.set(topicoId, { valor: estudado, atualizadoEm: Date.now() });
  }
  async listarEstudados(): Promise<string[]> {
    return [...this.estudados.entries()].filter(([, e]) => e.valor).map(([id]) => id);
  }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    this.favoritos.set(topicoId, { valor: favorito, atualizadoEm: Date.now() });
  }
  async listarFavoritos(): Promise<string[]> {
    return [...this.favoritos.entries()].filter(([, e]) => e.valor).map(([id]) => id);
  }

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
    return this.preferencias.get(chave)?.valor ?? null;
  }
  async definirPreferencia(chave: string, valor: string): Promise<void> {
    this.preferencias.set(chave, { valor, atualizadoEm: Date.now() });
  }

  async salvarItemRevisao(item: ItemRevisao): Promise<void> {
    this.itensRevisao.set(item.id, item);
  }
  async listarItensRevisao(): Promise<ItemRevisao[]> {
    return [...this.itensRevisao.values()];
  }

  async registrarConclusaoCaso(c: ConclusaoCaso): Promise<void> {
    this.conclusoesCasos.push(c);
  }
  async listarConclusoesCasos(casoId?: string): Promise<ConclusaoCaso[]> {
    const todas = casoId
      ? this.conclusoesCasos.filter((c) => c.casoId === casoId)
      : [...this.conclusoesCasos];
    return todas.sort((a, b) => a.concluidaEm - b.concluidaEm);
  }

  async exportarParaSync(): Promise<SnapshotSync> {
    return {
      estudados: Object.fromEntries(this.estudados),
      favoritos: Object.fromEntries(this.favoritos),
      itensRevisao: Object.fromEntries(this.itensRevisao),
      respostas: [...this.respostas],
      conclusoesCasos: [...this.conclusoesCasos],
      prefs: Object.fromEntries(this.preferencias),
    };
  }

  async aplicarDoSync(mudancas: SnapshotSync): Promise<void> {
    for (const [chave, estado] of Object.entries(mudancas.estudados)) this.estudados.set(chave, estado);
    for (const [chave, estado] of Object.entries(mudancas.favoritos)) this.favoritos.set(chave, estado);
    for (const [chave, pref] of Object.entries(mudancas.prefs)) this.preferencias.set(chave, pref);
    for (const [chave, item] of Object.entries(mudancas.itensRevisao)) this.itensRevisao.set(chave, item);

    const chavesRespostas = new Set(this.respostas.map(chaveResposta));
    for (const r of mudancas.respostas) {
      const chave = chaveResposta(r);
      if (!chavesRespostas.has(chave)) {
        this.respostas.push(r);
        chavesRespostas.add(chave);
      }
    }

    const chavesConclusoes = new Set(this.conclusoesCasos.map(chaveConclusao));
    for (const c of mudancas.conclusoesCasos) {
      const chave = chaveConclusao(c);
      if (!chavesConclusoes.has(chave)) {
        this.conclusoesCasos.push(c);
        chavesConclusoes.add(chave);
      }
    }
  }
}
