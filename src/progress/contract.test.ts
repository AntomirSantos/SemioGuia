import { MemoryProgressStore } from './memoryStore';
import { LocalStorageProgressStore } from './localStorageStore';
import { testarContratoProgressStore } from './contract';

testarContratoProgressStore('memória', async () => new MemoryProgressStore());

// Shim mínimo de Storage para rodar o contrato no Node (sem DOM)
function criarStorageFake(): Pick<Storage, 'getItem' | 'setItem'> {
  const dados = new Map<string, string>();
  return {
    getItem: (k) => dados.get(k) ?? null,
    setItem: (k, v) => {
      dados.set(k, v);
    },
  };
}

testarContratoProgressStore(
  'localStorage (web)',
  async () => new LocalStorageProgressStore(criarStorageFake()),
);

test('localStorage: estado sobrevive a nova instância com o mesmo storage', async () => {
  const storage = criarStorageFake();
  const a = new LocalStorageProgressStore(storage);
  await a.marcarEstudado('t1', true);
  await a.definirPreferencia('tema', 'escuro');
  const b = new LocalStorageProgressStore(storage);
  expect(await b.listarEstudados()).toEqual(['t1']);
  expect(await b.obterPreferencia('tema')).toBe('escuro');
});

test('localStorage: storage quebrado degrada para memória sem lançar', async () => {
  const quebrado = {
    getItem: () => {
      throw new Error('bloqueado');
    },
    setItem: () => {
      throw new Error('bloqueado');
    },
  } as unknown as Pick<Storage, 'getItem' | 'setItem'>;
  const s = new LocalStorageProgressStore(quebrado);
  await s.marcarEstudado('t1', true);
  expect(await s.listarEstudados()).toEqual(['t1']);
});
