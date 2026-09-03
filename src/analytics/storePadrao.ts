import type { EventosStore } from './types';
import { SqliteEventosStore } from './sqliteEventos';

// Resolução por plataforma do Metro (mesmo padrão de progress/storePadrao):
// nativo usa este arquivo (SQLite); a web usa storePadrao.web.ts.
export function criarStoreEventosPadrao(): EventosStore {
  return new SqliteEventosStore();
}
