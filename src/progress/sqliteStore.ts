import type { ProgressStore, RespostaRegistrada } from './types';

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

const VERSAO_ESQUEMA = '1';

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

  private migrar(): void {
    this.db.execSync(ESQUEMA_V1);
    this.db.runSync(
      'INSERT OR REPLACE INTO meta (chave, valor) VALUES (?, ?)',
      ['versao_esquema', VERSAO_ESQUEMA],
    );
  }

  async marcarEstudado(topicoId: string, estudado: boolean): Promise<void> {
    if (estudado) {
      this.db.runSync('INSERT OR REPLACE INTO estudados (topico_id) VALUES (?)', [topicoId]);
    } else {
      this.db.runSync('DELETE FROM estudados WHERE topico_id = ?', [topicoId]);
    }
  }
  async listarEstudados(): Promise<string[]> {
    const linhas = this.db.getAllSync<{ topico_id: string }>('SELECT topico_id FROM estudados');
    return linhas.map((l) => l.topico_id);
  }

  async favoritar(topicoId: string, favorito: boolean): Promise<void> {
    if (favorito) {
      this.db.runSync('INSERT OR REPLACE INTO favoritos (topico_id) VALUES (?)', [topicoId]);
    } else {
      this.db.runSync('DELETE FROM favoritos WHERE topico_id = ?', [topicoId]);
    }
  }
  async listarFavoritos(): Promise<string[]> {
    const linhas = this.db.getAllSync<{ topico_id: string }>('SELECT topico_id FROM favoritos');
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
          'SELECT pergunta_id, topico_id, correta, respondida_em FROM respostas WHERE topico_id = ?',
          [topicoId],
        )
      : this.db.getAllSync<{ pergunta_id: string; topico_id: string; correta: number; respondida_em: number }>(
          'SELECT pergunta_id, topico_id, correta, respondida_em FROM respostas',
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
    this.db.runSync('INSERT OR REPLACE INTO preferencias (chave, valor) VALUES (?, ?)', [chave, valor]);
  }
}
