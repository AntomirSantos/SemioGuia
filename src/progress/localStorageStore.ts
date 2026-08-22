import type { ConclusaoCaso, ProgressStore, RespostaRegistrada } from './types';
import type { ItemRevisao } from '../revisao/sm2';

// Adaptador de ProgressStore para a versão web: persiste no localStorage do
// navegador. Mesma semântica do MemoryProgressStore/SqliteProgressStore.
// Toda leitura/escrita é guardada por try/catch — em navegadores que bloqueiam
// storage (aba privada, preview), o adaptador degrada para memória volátil.

interface Estado {
  estudados: string[];
  favoritos: string[];
  respostas: RespostaRegistrada[];
  buscas: string[]; // mais recente primeiro, sem duplicatas
  preferencias: Record<string, string>;
}

const CHAVE = 'semioguia.progresso.v1';
const CHAVE_ITENS = 'semioguia.itensRevisao';
const CHAVE_CONCLUSOES_CASOS = 'semioguia.conclusoesCasos';

const vazio = (): Estado => ({
  estudados: [],
  favoritos: [],
  respostas: [],
  buscas: [],
  preferencias: {},
});

export class LocalStorageProgressStore implements ProgressStore {
  private cache: Estado;
  private cacheItens: Record<string, ItemRevisao>;
  private cacheConclusoesCasos: ConclusaoCaso[];

  constructor(private armazenamento?: Pick<Storage, 'getItem' | 'setItem'>) {
    this.cache = this.ler();
    this.cacheItens = this.lerItens();
    this.cacheConclusoesCasos = this.lerConclusoesCasos();
  }

  private obterStorage(): Pick<Storage, 'getItem' | 'setItem'> | undefined {
    if (this.armazenamento) return this.armazenamento;
    try {
      // globalThis para não referenciar `window` em ambientes sem DOM
      return (globalThis as { localStorage?: Storage }).localStorage;
    } catch {
      return undefined;
    }
  }

  private ler(): Estado {
    try {
      const bruto = this.obterStorage()?.getItem(CHAVE);
      if (!bruto) return vazio();
      const dado = JSON.parse(bruto) as Partial<Estado>;
      return { ...vazio(), ...dado };
    } catch {
      return vazio();
    }
  }

  private gravar(): void {
    try {
      this.obterStorage()?.setItem(CHAVE, JSON.stringify(this.cache));
    } catch {
      // storage indisponível: segue só em memória
    }
  }

  private lerItens(): Record<string, ItemRevisao> {
    try {
      const bruto = this.obterStorage()?.getItem(CHAVE_ITENS);
      if (!bruto) return {};
      const dado = JSON.parse(bruto) as Record<string, ItemRevisao>;
      return { ...dado };
    } catch {
      return {};
    }
  }

  private gravarItens(): void {
    try {
      this.obterStorage()?.setItem(CHAVE_ITENS, JSON.stringify(this.cacheItens));
    } catch {
      // storage indisponível: segue só em memória
    }
  }

  private lerConclusoesCasos(): ConclusaoCaso[] {
    try {
      const bruto = this.obterStorage()?.getItem(CHAVE_CONCLUSOES_CASOS);
      if (!bruto) return [];
      const dado = JSON.parse(bruto) as ConclusaoCaso[];
      return Array.isArray(dado) ? dado : [];
    } catch {
      return [];
    }
  }

  private gravarConclusoesCasos(): void {
    try {
      this.obterStorage()?.setItem(CHAVE_CONCLUSOES_CASOS, JSON.stringify(this.cacheConclusoesCasos));
    } catch {
      // storage indisponível: segue só em memória
    }
  }

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    const semEle = this.cache.estudados.filter((id) => id !== topicoId);
    this.cache.estudados = estudado ? [...semEle, topicoId] : semEle;
    this.gravar();
  }

  async listarEstudados(): Promise<string[]> {
    return [...this.cache.estudados];
  }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    const semEle = this.cache.favoritos.filter((id) => id !== topicoId);
    this.cache.favoritos = favorito ? [...semEle, topicoId] : semEle;
    this.gravar();
  }

  async listarFavoritos(): Promise<string[]> {
    return [...this.cache.favoritos];
  }

  async registrarResposta(r: RespostaRegistrada): Promise<void> {
    this.cache.respostas.push(r);
    this.gravar();
  }

  async listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]> {
    return topicoId
      ? this.cache.respostas.filter((r) => r.topicoId === topicoId)
      : [...this.cache.respostas];
  }

  async registrarBusca(termo: string): Promise<void> {
    this.cache.buscas = [termo, ...this.cache.buscas.filter((t) => t !== termo)];
    this.gravar();
  }

  async listarBuscasRecentes(limite = 10): Promise<string[]> {
    return this.cache.buscas.slice(0, limite);
  }

  async obterPreferencia(chave: string): Promise<string | null> {
    return this.cache.preferencias[chave] ?? null;
  }

  async definirPreferencia(chave: string, valor: string): Promise<void> {
    this.cache.preferencias[chave] = valor;
    this.gravar();
  }

  async salvarItemRevisao(item: ItemRevisao): Promise<void> {
    this.cacheItens[item.id] = item;
    this.gravarItens();
  }

  async listarItensRevisao(): Promise<ItemRevisao[]> {
    return Object.values(this.cacheItens);
  }

  async registrarConclusaoCaso(c: ConclusaoCaso): Promise<void> {
    this.cacheConclusoesCasos.push(c);
    this.gravarConclusoesCasos();
  }

  async listarConclusoesCasos(casoId?: string): Promise<ConclusaoCaso[]> {
    const todas = casoId
      ? this.cacheConclusoesCasos.filter((c) => c.casoId === casoId)
      : [...this.cacheConclusoesCasos];
    return todas.sort((a, b) => a.concluidaEm - b.concluidaEm);
  }
}
