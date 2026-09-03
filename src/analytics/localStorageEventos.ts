import type { EventosStore, RegistroEvento } from './types';
import { gerarIdAnonimo } from './idAnonimo';

const CHAVE_EVENTOS = 'semioguia.analytics.eventos.v1';
const CHAVE_USER_ID = 'semioguia.analytics.userId.v1';

// Teto de eventos gravados (mais antigos são descartados): o beta dura
// 4 semanas e o localStorage é compartilhado com o progresso — um aluno
// intenso gera poucos milhares de eventos, longe do limite do navegador,
// mas o teto impede crescimento sem fim depois do beta.
const MAX_EVENTOS = 4000;

// Adaptador web: eventos no localStorage do navegador. Toda leitura/escrita
// guardada por try/catch — em aba privada/preview degrada para memória
// volátil, como o LocalStorageProgressStore.
export class LocalStorageEventosStore implements EventosStore {
  private cache: RegistroEvento[];
  private userId: string | null = null;

  constructor(private armazenamento?: Pick<Storage, 'getItem' | 'setItem'>) {
    this.cache = this.ler();
  }

  private obterStorage(): Pick<Storage, 'getItem' | 'setItem'> | undefined {
    if (this.armazenamento) return this.armazenamento;
    try {
      return (globalThis as { localStorage?: Storage }).localStorage;
    } catch {
      return undefined;
    }
  }

  private ler(): RegistroEvento[] {
    try {
      const bruto = this.obterStorage()?.getItem(CHAVE_EVENTOS);
      if (!bruto) return [];
      const dado = JSON.parse(bruto) as RegistroEvento[];
      return Array.isArray(dado) ? dado : [];
    } catch {
      return [];
    }
  }

  private gravar(): void {
    try {
      this.obterStorage()?.setItem(CHAVE_EVENTOS, JSON.stringify(this.cache));
    } catch {
      // storage indisponível: segue só em memória
    }
  }

  async obterUserId(): Promise<string> {
    if (this.userId) return this.userId;
    try {
      const gravado = this.obterStorage()?.getItem(CHAVE_USER_ID);
      if (gravado) {
        this.userId = gravado;
        return gravado;
      }
    } catch {
      // segue para gerar um novo (volátil, se o storage estiver bloqueado)
    }
    const novo = gerarIdAnonimo();
    this.userId = novo;
    try {
      this.obterStorage()?.setItem(CHAVE_USER_ID, novo);
    } catch {
      // storage indisponível: id vale só para esta sessão
    }
    return novo;
  }

  async registrar(r: RegistroEvento): Promise<void> {
    this.cache.push(r);
    if (this.cache.length > MAX_EVENTOS) {
      this.cache = this.cache.slice(this.cache.length - MAX_EVENTOS);
    }
    this.gravar();
  }

  async listar(): Promise<RegistroEvento[]> {
    return [...this.cache];
  }
}
