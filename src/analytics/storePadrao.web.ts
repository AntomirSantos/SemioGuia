import type { EventosStore } from './types';
import { LocalStorageEventosStore } from './localStorageEventos';

// Variante web (ver storePadrao.ts): eventos no localStorage do navegador.
export function criarStoreEventosPadrao(): EventosStore {
  return new LocalStorageEventosStore();
}
