import type { EventosStore, Propriedades, RegistroEvento } from './types';
import type { EventoAnalytics } from './types';
import { gerarIdAnonimo } from './idAnonimo';

// Tipagem mínima da API do expo-sqlite que usamos (mesma razão do
// SqliteProgressStore: não depender do pacote fora do runtime nativo).
interface SqliteDatabase {
  execSync(sql: string): void;
  runSync(sql: string, params?: unknown[]): void;
  getAllSync<T>(sql: string, params?: unknown[]): T[];
  getFirstSync<T>(sql: string, params?: unknown[]): T | null;
}

const ESQUEMA = `
CREATE TABLE IF NOT EXISTS eventos (evento TEXT, propriedades TEXT, em INTEGER, user_id TEXT);
CREATE TABLE IF NOT EXISTS analytics_meta (chave TEXT PRIMARY KEY, valor TEXT);
`;

/**
 * Adaptador de EventosStore sobre expo-sqlite (tabela `eventos` no mesmo
 * banco do progresso). Não exercitado pelo Jest: o runtime nativo do
 * expo-sqlite não existe fora do app; o módulo nativo só é importado na
 * primeira construção.
 */
export class SqliteEventosStore implements EventosStore {
  private db: SqliteDatabase;

  constructor(nomeBanco = 'semioguia.db') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { openDatabaseSync } = require('expo-sqlite') as typeof import('expo-sqlite');
    this.db = openDatabaseSync(nomeBanco) as unknown as SqliteDatabase;
    this.db.execSync(ESQUEMA);
  }

  async obterUserId(): Promise<string> {
    const linha = this.db.getFirstSync<{ valor: string }>(
      'SELECT valor FROM analytics_meta WHERE chave = ?',
      ['userId'],
    );
    if (linha) return linha.valor;
    const novo = gerarIdAnonimo();
    this.db.runSync('INSERT OR REPLACE INTO analytics_meta (chave, valor) VALUES (?, ?)', ['userId', novo]);
    return novo;
  }

  async registrar(r: RegistroEvento): Promise<void> {
    this.db.runSync(
      'INSERT INTO eventos (evento, propriedades, em, user_id) VALUES (?, ?, ?, ?)',
      [r.evento, JSON.stringify(r.propriedades), r.em, r.userId],
    );
  }

  async listar(): Promise<RegistroEvento[]> {
    const linhas = this.db.getAllSync<{ evento: string; propriedades: string; em: number; user_id: string }>(
      'SELECT evento, propriedades, em, user_id FROM eventos ORDER BY em, rowid',
    );
    return linhas.map((l) => {
      let propriedades: Propriedades = {};
      try {
        propriedades = JSON.parse(l.propriedades) as Propriedades;
      } catch {
        // linha corrompida: preserva o evento, perde só as propriedades
      }
      return { evento: l.evento as EventoAnalytics, propriedades, em: l.em, userId: l.user_id };
    });
  }
}
