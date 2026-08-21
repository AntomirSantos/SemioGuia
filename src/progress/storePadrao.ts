import type { ProgressStore } from './types';
import { SqliteProgressStore } from './sqliteStore';

// Resolução por plataforma do Metro: nativo usa este arquivo (SQLite);
// a web usa storePadrao.web.ts (localStorage), mantendo o expo-sqlite
// e seu wasm fora do bundle web.
export function criarStorePadrao(): ProgressStore {
  return new SqliteProgressStore();
}
