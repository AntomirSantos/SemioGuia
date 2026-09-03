import { MemoryEventosStore } from './memoryEventos';
import { LocalStorageEventosStore } from './localStorageEventos';
import type { EventosStore, RegistroEvento } from './types';

// Storage falso em memória para exercitar o adaptador web fora do navegador.
function storageFalso(): Pick<Storage, 'getItem' | 'setItem'> & { dados: Map<string, string> } {
  const dados = new Map<string, string>();
  return {
    dados,
    getItem: (chave: string) => dados.get(chave) ?? null,
    setItem: (chave: string, valor: string) => {
      dados.set(chave, valor);
    },
  };
}

function registro(parcial: Partial<RegistroEvento> = {}): RegistroEvento {
  return { evento: 'app_aberto', propriedades: {}, em: 1, userId: 'u-teste', ...parcial };
}

/** Contrato compartilhado entre adaptadores de EventosStore (como progress/contract.ts). */
function testarContratoEventosStore(nome: string, criar: () => EventosStore): void {
  describe(`EventosStore (${nome})`, () => {
    test('obterUserId é estável entre chamadas', async () => {
      const s = criar();
      const id = await s.obterUserId();
      expect(id.length).toBeGreaterThan(7);
      expect(await s.obterUserId()).toBe(id);
    });

    test('registrar acumula e listar devolve em ordem de chegada', async () => {
      const s = criar();
      await s.registrar(registro({ evento: 'app_aberto', em: 10 }));
      await s.registrar(registro({ evento: 'topico_aberto', em: 20, propriedades: { topicoId: 'a/b/c' } }));
      const eventos = await s.listar();
      expect(eventos.map((e) => e.evento)).toEqual(['app_aberto', 'topico_aberto']);
      expect(eventos[1].propriedades).toEqual({ topicoId: 'a/b/c' });
    });

    test('listar devolve cópia (mutar o retorno não muda o store)', async () => {
      const s = criar();
      await s.registrar(registro());
      const eventos = await s.listar();
      eventos.pop();
      expect(await s.listar()).toHaveLength(1);
    });
  });
}

testarContratoEventosStore('memória', () => new MemoryEventosStore());
testarContratoEventosStore('localStorage', () => new LocalStorageEventosStore(storageFalso()));

describe('LocalStorageEventosStore (persistência)', () => {
  test('eventos e userId sobrevivem a uma nova instância sobre o mesmo storage', async () => {
    const storage = storageFalso();
    const a = new LocalStorageEventosStore(storage);
    const id = await a.obterUserId();
    await a.registrar(registro({ userId: id }));

    const b = new LocalStorageEventosStore(storage);
    expect(await b.obterUserId()).toBe(id);
    expect(await b.listar()).toHaveLength(1);
  });

  test('degrada para memória volátil quando o storage lança', async () => {
    const quebrado: Pick<Storage, 'getItem' | 'setItem'> = {
      getItem: () => {
        throw new Error('bloqueado');
      },
      setItem: () => {
        throw new Error('bloqueado');
      },
    };
    const s = new LocalStorageEventosStore(quebrado);
    const id = await s.obterUserId();
    await s.registrar(registro({ userId: id }));
    expect(await s.listar()).toHaveLength(1);
    expect(await s.obterUserId()).toBe(id);
  });

  test('aplica o teto de eventos descartando os mais antigos', async () => {
    const storage = storageFalso();
    const s = new LocalStorageEventosStore(storage);
    for (let i = 0; i < 4005; i++) {
      await s.registrar(registro({ em: i }));
    }
    const eventos = await s.listar();
    expect(eventos).toHaveLength(4000);
    expect(eventos[0].em).toBe(5);
  });
});
