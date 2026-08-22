import type { ConclusaoCaso, ProgressStore, RespostaRegistrada } from './types';
import type { ItemRevisao } from '../revisao/sm2';
import {
  chaveConclusao,
  chaveResposta,
  type EstadoCarimbado,
  type PrefCarimbada,
  type SnapshotSync,
} from '../sync/merge';

// Tipagem mínima da API do expo-sqlite que usamos, para não depender do
// pacote em tempo de compilação de tipos fora do runtime nativo.
interface SqliteDatabase {
  execSync(sql: string): void;
  runSync(sql: string, params?: unknown[]): void;
  getAllSync<T>(sql: string, params?: unknown[]): T[];
  getFirstSync<T>(sql: string, params?: unknown[]): T | null;
}

const ESQUEMA_V1 = `
CREATE TABLE IF NOT EXISTS estudados (topico_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS favoritos (topico_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS respostas (pergunta_id TEXT, topico_id TEXT, correta INTEGER, respondida_em INTEGER);
CREATE TABLE IF NOT EXISTS buscas (termo TEXT PRIMARY KEY, usada_em INTEGER);
CREATE TABLE IF NOT EXISTS preferencias (chave TEXT PRIMARY KEY, valor TEXT);
CREATE TABLE IF NOT EXISTS meta (chave TEXT PRIMARY KEY, valor TEXT);
`;

const ESQUEMA_V2 = `
CREATE TABLE IF NOT EXISTS itens_revisao (
  id TEXT PRIMARY KEY, tipo TEXT, topico_id TEXT,
  facilidade REAL, repeticoes INTEGER, intervalo_dias INTEGER,
  proxima_revisao TEXT, atualizado_em TEXT
);`;

const ESQUEMA_V3 = `
CREATE TABLE IF NOT EXISTS conclusoes_casos (
  caso_id TEXT, classe TEXT, otimas INTEGER, aceitaveis INTEGER, erros INTEGER, concluida_em INTEGER
);`;

const VERSAO_ESQUEMA = '4';

/**
 * Adaptador de ProgressStore sobre expo-sqlite (SQLite nativo).
 * Não exercitado pelo Jest (o runtime nativo do expo-sqlite não existe
 * fora do app) — importa o módulo nativo apenas na primeira construção,
 * de forma que meramente importar este arquivo em testes não quebra.
 */
export class SqliteProgressStore implements ProgressStore {
  private db: SqliteDatabase;

  constructor(nomeBanco = 'semioguia.db') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { openDatabaseSync } = require('expo-sqlite') as typeof import('expo-sqlite');
    this.db = openDatabaseSync(nomeBanco) as unknown as SqliteDatabase;
    this.migrar();
  }

  private colunaExiste(tabela: string, coluna: string): boolean {
    return this.db.getAllSync<{ name: string }>(`PRAGMA table_info(${tabela})`).some((c) => c.name === coluna);
  }

  private migrar(): void {
    this.db.execSync(ESQUEMA_V1); // idempotente (IF NOT EXISTS) — banco v1 abre e evolui sem perder dados
    this.db.execSync(ESQUEMA_V2);
    this.db.execSync(ESQUEMA_V3);
    // ESQUEMA_V4: carimbos de sincronização. ADD COLUMN não tem IF NOT EXISTS,
    // por isso checamos via PRAGMA antes de alterar — idempotente em bancos
    // v1/v2/v3 que já rodaram esta migração.
    for (const tabela of ['estudados', 'favoritos']) {
      if (!this.colunaExiste(tabela, 'valor')) {
        // presença de linha sempre significava valor=true nos esquemas anteriores
        this.db.execSync(`ALTER TABLE ${tabela} ADD COLUMN valor INTEGER DEFAULT 1`);
      }
      if (!this.colunaExiste(tabela, 'atualizado_em')) {
        this.db.execSync(`ALTER TABLE ${tabela} ADD COLUMN atualizado_em INTEGER DEFAULT 0`);
      }
    }
    if (!this.colunaExiste('preferencias', 'atualizado_em')) {
      this.db.execSync('ALTER TABLE preferencias ADD COLUMN atualizado_em INTEGER DEFAULT 0');
    }
    this.db.runSync(
      'INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)',
      ['versao_esquema', VERSAO_ESQUEMA],
    );
  }

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    // gravação (não DELETE) mesmo ao desmarcar, para o carimbo propagar a
    // remoção via LWW entre aparelhos
    this.db.runSync(
      'INSERT OR REPLACE INTO estudados (topico_id, valor, atualizado_em) VALUES (?, ?, ?)',
      [topicoId, estudado ? 1 : 0, Date.now()],
    );
  }
  async listarEstudados(): Promise<string[]> {
    const linhas = this.db.getAllSync<{ topico_id: string }>('SELECT topico_id FROM estudados WHERE valor = 1');
    return linhas.map((l) => l.topico_id);
  }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    this.db.runSync(
      'INSERT OR REPLACE INTO favoritos (topico_id, valor, atualizado_em) VALUES (?, ?, ?)',
      [topicoId, favorito ? 1 : 0, Date.now()],
    );
  }
  async listarFavoritos(): Promise<string[]> {
    const linhas = this.db.getAllSync<{ topico_id: string }>('SELECT topico_id FROM favoritos WHERE valor = 1');
    return linhas.map((l) => l.topico_id);
  }

  async registrarResposta(r: RespostaRegistrada): Promise<void> {
    this.db.runSync(
      'INSERT INTO respostas (pergunta_id, topico_id, correta, respondida_em) VALUES (?, ?, ?, ?)',
      [r.perguntaId, r.topicoId, r.correta ? 1 : 0, r.respondidaEm],
    );
  }
  async listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]> {
    const linhas = topicoId
      ? this.db.getAllSync<{ pergunta_id: string; topico_id: string; correta: number; respondida_em: number }>(
          'SELECT pergunta_id, topico_id, correta, respondida_em FROM respostas WHERE topico_id = ? ORDER BY respondida_em',
          [topicoId],
        )
      : this.db.getAllSync<{ pergunta_id: string; topico_id: string; correta: number; respondida_em: number }>(
          'SELECT pergunta_id, topico_id, correta, respondida_em FROM respostas ORDER BY respondida_em',
        );
    return linhas.map((l) => ({
      perguntaId: l.pergunta_id,
      topicoId: l.topico_id,
      correta: l.correta === 1,
      respondidaEm: l.respondida_em,
    }));
  }

  async registrarBusca(termo: string): Promise<void> {
    this.db.runSync(
      'INSERT OR REPLACE INTO buscas (termo, usada_em) VALUES (?, ?)',
      [termo, Date.now()],
    );
  }
  async listarBuscasRecentes(limite = 10): Promise<string[]> {
    const linhas = this.db.getAllSync<{ termo: string }>(
      'SELECT termo FROM buscas ORDER BY usada_em DESC LIMIT ?',
      [limite],
    );
    return linhas.map((l) => l.termo);
  }

  async obterPreferencia(chave: string): Promise<string | null> {
    const linha = this.db.getFirstSync<{ valor: string }>(
      'SELECT valor FROM preferencias WHERE chave = ?',
      [chave],
    );
    return linha ? linha.valor : null;
  }
  async definirPreferencia(chave: string, valor: string): Promise<void> {
    this.db.runSync(
      'INSERT OR REPLACE INTO preferencias (chave, valor, atualizado_em) VALUES (?, ?, ?)',
      [chave, valor, Date.now()],
    );
  }

  async salvarItemRevisao(item: ItemRevisao): Promise<void> {
    this.db.runSync(
      `INSERT OR REPLACE INTO itens_revisao
        (id, tipo, topico_id, facilidade, repeticoes, intervalo_dias, proxima_revisao, atualizado_em)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        item.tipo,
        item.topicoId,
        item.facilidade,
        item.repeticoes,
        item.intervaloDias,
        item.proximaRevisao,
        item.atualizadoEm,
      ],
    );
  }

  async listarItensRevisao(): Promise<ItemRevisao[]> {
    const linhas = this.db.getAllSync<{
      id: string;
      tipo: string;
      topico_id: string;
      facilidade: number;
      repeticoes: number;
      intervalo_dias: number;
      proxima_revisao: string;
      atualizado_em: string;
    }>('SELECT id, tipo, topico_id, facilidade, repeticoes, intervalo_dias, proxima_revisao, atualizado_em FROM itens_revisao');
    return linhas.map((l) => ({
      id: l.id,
      tipo: l.tipo as ItemRevisao['tipo'],
      topicoId: l.topico_id,
      facilidade: l.facilidade,
      repeticoes: l.repeticoes,
      intervaloDias: l.intervalo_dias,
      proximaRevisao: l.proxima_revisao,
      atualizadoEm: l.atualizado_em,
    }));
  }

  async registrarConclusaoCaso(c: ConclusaoCaso): Promise<void> {
    this.db.runSync(
      'INSERT INTO conclusoes_casos (caso_id, classe, otimas, aceitaveis, erros, concluida_em) VALUES (?, ?, ?, ?, ?, ?)',
      [c.casoId, c.classe, c.otimas, c.aceitaveis, c.erros, c.concluidaEm],
    );
  }

  async listarConclusoesCasos(casoId?: string): Promise<ConclusaoCaso[]> {
    const linhas = casoId
      ? this.db.getAllSync<{ caso_id: string; classe: string; otimas: number; aceitaveis: number; erros: number; concluida_em: number }>(
          'SELECT caso_id, classe, otimas, aceitaveis, erros, concluida_em FROM conclusoes_casos WHERE caso_id = ? ORDER BY concluida_em',
          [casoId],
        )
      : this.db.getAllSync<{ caso_id: string; classe: string; otimas: number; aceitaveis: number; erros: number; concluida_em: number }>(
          'SELECT caso_id, classe, otimas, aceitaveis, erros, concluida_em FROM conclusoes_casos ORDER BY concluida_em',
        );
    return linhas.map((l) => ({
      casoId: l.caso_id,
      classe: l.classe as ConclusaoCaso['classe'],
      otimas: l.otimas,
      aceitaveis: l.aceitaveis,
      erros: l.erros,
      concluidaEm: l.concluida_em,
    }));
  }

  async exportarParaSync(): Promise<SnapshotSync> {
    const estudados: Record<string, EstadoCarimbado> = {};
    for (const l of this.db.getAllSync<{ topico_id: string; valor: number; atualizado_em: number }>(
      'SELECT topico_id, valor, atualizado_em FROM estudados',
    )) {
      estudados[l.topico_id] = { valor: l.valor === 1, atualizadoEm: l.atualizado_em };
    }

    const favoritos: Record<string, EstadoCarimbado> = {};
    for (const l of this.db.getAllSync<{ topico_id: string; valor: number; atualizado_em: number }>(
      'SELECT topico_id, valor, atualizado_em FROM favoritos',
    )) {
      favoritos[l.topico_id] = { valor: l.valor === 1, atualizadoEm: l.atualizado_em };
    }

    const prefs: Record<string, PrefCarimbada> = {};
    for (const l of this.db.getAllSync<{ chave: string; valor: string; atualizado_em: number }>(
      'SELECT chave, valor, atualizado_em FROM preferencias',
    )) {
      prefs[l.chave] = { valor: l.valor, atualizadoEm: l.atualizado_em };
    }

    const itensRevisao: Record<string, ItemRevisao> = {};
    for (const item of await this.listarItensRevisao()) itensRevisao[item.id] = item;

    return {
      estudados,
      favoritos,
      itensRevisao,
      respostas: await this.listarRespostas(),
      conclusoesCasos: await this.listarConclusoesCasos(),
      prefs,
    };
  }

  async aplicarDoSync(mudancas: SnapshotSync): Promise<void> {
    for (const [topicoId, e] of Object.entries(mudancas.estudados)) {
      this.db.runSync(
        'INSERT OR REPLACE INTO estudados (topico_id, valor, atualizado_em) VALUES (?, ?, ?)',
        [topicoId, e.valor ? 1 : 0, e.atualizadoEm],
      );
    }
    for (const [topicoId, e] of Object.entries(mudancas.favoritos)) {
      this.db.runSync(
        'INSERT OR REPLACE INTO favoritos (topico_id, valor, atualizado_em) VALUES (?, ?, ?)',
        [topicoId, e.valor ? 1 : 0, e.atualizadoEm],
      );
    }
    for (const [chave, p] of Object.entries(mudancas.prefs)) {
      this.db.runSync(
        'INSERT OR REPLACE INTO preferencias (chave, valor, atualizado_em) VALUES (?, ?, ?)',
        [chave, p.valor, p.atualizadoEm],
      );
    }
    for (const item of Object.values(mudancas.itensRevisao)) {
      await this.salvarItemRevisao(item);
    }

    const chavesRespostas = new Set((await this.listarRespostas()).map(chaveResposta));
    for (const r of mudancas.respostas) {
      const chave = chaveResposta(r);
      if (!chavesRespostas.has(chave)) {
        await this.registrarResposta(r);
        chavesRespostas.add(chave);
      }
    }

    const chavesConclusoes = new Set((await this.listarConclusoesCasos()).map(chaveConclusao));
    for (const c of mudancas.conclusoesCasos) {
      const chave = chaveConclusao(c);
      if (!chavesConclusoes.has(chave)) {
        await this.registrarConclusaoCaso(c);
        chavesConclusoes.add(chave);
      }
    }
  }
}
