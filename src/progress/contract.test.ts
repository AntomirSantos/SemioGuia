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

test('localStorage: migra formato legado (string[] / Record<string,string>) sem perder dados de usuários já em produção', async () => {
  const storage = criarStorageFake();
  // formato exato persistido pelas releases web anteriores ao v4
  storage.setItem(
    'semioguia.progresso.v1',
    JSON.stringify({
      estudados: ['t1', 't2'],
      favoritos: ['t2'],
      respostas: [],
      buscas: [],
      preferencias: { tema: 'escuro' },
    }),
  );

  const s = new LocalStorageProgressStore(storage);
  expect(await s.listarEstudados()).toEqual(['t1', 't2']);
  expect(await s.listarFavoritos()).toEqual(['t2']);
  expect(await s.obterPreferencia('tema')).toBe('escuro');

  // uma escrita não deve perder os dados migrados dos outros campos
  await s.marcarEstudado('t3', true);
  const s2 = new LocalStorageProgressStore(storage);
  expect(await s2.listarEstudados()).toEqual(['t1', 't2', 't3']);
  expect(await s2.listarFavoritos()).toEqual(['t2']);
  expect(await s2.obterPreferencia('tema')).toBe('escuro');

  // entradas migradas exportam com atualizadoEm=0 (LWW as trata como as mais antigas)
  const snap = await s2.exportarParaSync();
  expect(snap.estudados.t1).toEqual({ valor: true, atualizadoEm: 0 });
  expect(snap.estudados.t2).toEqual({ valor: true, atualizadoEm: 0 });
  expect(snap.favoritos.t2).toEqual({ valor: true, atualizadoEm: 0 });
  expect(snap.prefs.tema).toEqual({ valor: 'escuro', atualizadoEm: 0 });
});
