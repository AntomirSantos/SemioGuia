import type { ProgressStore } from './types';
import { LocalStorageProgressStore } from './localStorageStore';

// Variante web (ver storePadrao.ts): progresso no localStorage do navegador.
export function criarStorePadrao(): ProgressStore {
  return new LocalStorageProgressStore();
}
