import type { ConclusaoCaso, ProgressStore, RespostaRegistrada } from './types';
import type { ItemRevisao } from '../revisao/sm2';
import {
  chaveConclusao,
  chaveResposta,
  type EstadoCarimbado,
  type PrefCarimbada,
  type SnapshotSync,
} from '../sync/merge';

// Adaptador de ProgressStore para a versão web: persiste no localStorage do
// navegador. Mesma semântica do MemoryProgressStore/SqliteProgressStore.
// Toda leitura/escrita é guardada por try/catch — em navegadores que bloqueiam
// storage (aba privada, preview), o adaptador degrada para memória volátil.

interface Estado {
  estudados: Record<string, EstadoCarimbado>;
  favoritos: Record<string, EstadoCarimbado>;
  respostas: RespostaRegistrada[];
  buscas: string[]; // mais recente primeiro, sem duplicatas
  preferencias: Record<string, PrefCarimbada>;
}

const CHAVE = 'semioguia.progresso.v1';
const CHAVE_ITENS = 'semioguia.itensRevisao';
const CHAVE_CONCLUSOES_CASOS = 'semioguia.conclusoesCasos';

const vazio = (): Estado => ({
  estudados: {},
  favoritos: {},
  respostas: [],
  buscas: [],
  preferencias: {},
});

// Releases web já publicadas antes do v4 persistiam estudados/favoritos como
// string[] (presença = true) e preferencias como Record<string,string>. Sem
// esta migração, ler() perderia silenciosamente os dados desses usuários
// (ver task-3-report.md). atualizadoEm=0 é proposital: LWW trata dados
// migrados como os mais antigos possíveis.
function migrarEstados(
  bruto: string[] | Record<string, EstadoCarimbado> | undefined,
): Record<string, EstadoCarimbado> {
  if (!bruto) return {};
  if (Array.isArray(bruto)) {
    const migrado: Record<string, EstadoCarimbado> = {};
    for (const id of bruto) migrado[id] = { valor: true, atualizadoEm: 0 };
    return migrado;
  }
  return bruto;
}

function migrarPreferencias(
  bruto: Record<string, string | PrefCarimbada> | undefined,
): Record<string, PrefCarimbada> {
  if (!bruto) return {};
  const migrado: Record<string, PrefCarimbada> = {};
  for (const [chave, valor] of Object.entries(bruto)) {
    migrado[chave] = typeof valor === 'string' ? { valor, atualizadoEm: 0 } : valor;
  }
  return migrado;
}

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
      const dado = JSON.parse(bruto) as Partial<{
        estudados: string[] | Record<string, EstadoCarimbado>;
        favoritos: string[] | Record<string, EstadoCarimbado>;
        respostas: RespostaRegistrada[];
        buscas: string[];
        preferencias: Record<string, string | PrefCarimbada>;
      }>;
      return {
        ...vazio(),
        ...dado,
        estudados: migrarEstados(dado.estudados),
        favoritos: migrarEstados(dado.favoritos),
        preferencias: migrarPreferencias(dado.preferencias),
      };
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
    this.cache.estudados[topicoId] = { valor: estudado, atualizadoEm: Date.now() };
    this.gravar();
  }

  async listarEstudados(): Promise<string[]> {
    return Object.entries(this.cache.estudados)
      .filter(([, e]) => e.valor)
      .map(([id]) => id);
  }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    this.cache.favoritos[topicoId] = { valor: favorito, atualizadoEm: Date.now() };
    this.gravar();
  }

  async listarFavoritos(): Promise<string[]> {
    return Object.entries(this.cache.favoritos)
      .filter(([, e]) => e.valor)
      .map(([id]) => id);
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
    return this.cache.preferencias[chave]?.valor ?? null;
  }

  async definirPreferencia(chave: string, valor: string): Promise<void> {
    this.cache.preferencias[chave] = { valor, atualizadoEm: Date.now() };
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

  async exportarParaSync(): Promise<SnapshotSync> {
    return {
      estudados: { ...this.cache.estudados },
      favoritos: { ...this.cache.favoritos },
      itensRevisao: { ...this.cacheItens },
      respostas: [...this.cache.respostas],
      conclusoesCasos: [...this.cacheConclusoesCasos],
      prefs: { ...this.cache.preferencias },
    };
  }

  async aplicarDoSync(mudancas: SnapshotSync): Promise<void> {
    Object.assign(this.cache.estudados, mudancas.estudados);
    Object.assign(this.cache.favoritos, mudancas.favoritos);
    Object.assign(this.cache.preferencias, mudancas.prefs);
    Object.assign(this.cacheItens, mudancas.itensRevisao);

    const chavesRespostas = new Set(this.cache.respostas.map(chaveResposta));
    for (const r of mudancas.respostas) {
      const chave = chaveResposta(r);
      if (!chavesRespostas.has(chave)) {
        this.cache.respostas.push(r);
        chavesRespostas.add(chave);
      }
    }

    const chavesConclusoes = new Set(this.cacheConclusoesCasos.map(chaveConclusao));
    for (const c of mudancas.conclusoesCasos) {
      const chave = chaveConclusao(c);
      if (!chavesConclusoes.has(chave)) {
        this.cacheConclusoesCasos.push(c);
        chavesConclusoes.add(chave);
      }
    }

    this.gravar();
    this.gravarItens();
    this.gravarConclusoesCasos();
  }
}
