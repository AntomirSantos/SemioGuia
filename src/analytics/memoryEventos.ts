import type { EventosStore, RegistroEvento } from './types';
import { gerarIdAnonimo } from './idAnonimo';

// Adaptador em memória: testes e fallback quando nenhuma persistência
// está disponível (mesmo papel do MemoryProgressStore).
export class MemoryEventosStore implements EventosStore {
  private eventos: RegistroEvento[] = [];
  private userId: string | null = null;

  async obterUserId(): Promise<string> {
    if (!this.userId) this.userId = gerarIdAnonimo();
    return this.userId;
  }

  async registrar(r: RegistroEvento): Promise<void> {
    this.eventos.push(r);
  }

  async listar(): Promise<RegistroEvento[]> {
    return [...this.eventos];
  }
}
