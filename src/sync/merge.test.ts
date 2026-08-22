import type { ItemRevisao } from '../revisao/sm2';
import type { RespostaRegistrada, ConclusaoCaso } from '../progress/types';
import {
  snapshotVazio,
  merge,
  chaveResposta,
  chaveConclusao,
  type SnapshotSync,
} from './merge';

function deepFreeze<T>(obj: T): T {
  Object.getOwnPropertyNames(obj as object).forEach((prop) => {
    const value = (obj as Record<string, unknown>)[prop];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

function resposta(over: Partial<RespostaRegistrada> = {}): RespostaRegistrada {
  return {
    perguntaId: 'p1',
    topicoId: 't1',
    correta: true,
    respondidaEm: 1000,
    ...over,
  };
}

function conclusao(over: Partial<ConclusaoCaso> = {}): ConclusaoCaso {
  return {
    casoId: 'c1',
    classe: 'otimo',
    otimas: 3,
    aceitaveis: 1,
    erros: 0,
    concluidaEm: 1000,
    ...over,
  };
}

function itemRevisao(over: Partial<ItemRevisao> = {}): ItemRevisao {
  return {
    id: 'i1',
    tipo: 'pergunta',
    topicoId: 't1',
    facilidade: 2.5,
    repeticoes: 0,
    intervaloDias: 0,
    proximaRevisao: '2026-08-23',
    atualizadoEm: '2026-08-22T10:00:00.000Z',
    ...over,
  };
}

// Applies a merge delta into a snapshot, simulating what a caller would do
// after receiving paraLocal/paraRemoto from merge().
function aplicar(base: SnapshotSync, delta: SnapshotSync): SnapshotSync {
  return {
    estudados: { ...base.estudados, ...delta.estudados },
    favoritos: { ...base.favoritos, ...delta.favoritos },
    itensRevisao: { ...base.itensRevisao, ...delta.itensRevisao },
    respostas: [...base.respostas, ...delta.respostas],
    conclusoesCasos: [...base.conclusoesCasos, ...delta.conclusoesCasos],
    prefs: { ...base.prefs, ...delta.prefs },
  };
}

test('snapshotVazio produz estruturas vazias', () => {
  expect(snapshotVazio()).toEqual({
    estudados: {},
    favoritos: {},
    itensRevisao: {},
    respostas: [],
    conclusoesCasos: [],
    prefs: {},
  });
});

test('chaveResposta combina perguntaId e respondidaEm', () => {
  expect(chaveResposta(resposta({ perguntaId: 'p9', respondidaEm: 555 }))).toBe('p9_555');
});

test('chaveConclusao combina casoId e concluidaEm', () => {
  expect(chaveConclusao(conclusao({ casoId: 'c9', concluidaEm: 777 }))).toBe('c9_777');
});

test('merge de snapshots vazios produz deltas vazios', () => {
  const resultado = merge(snapshotVazio(), snapshotVazio());
  expect(resultado.paraLocal).toEqual(snapshotVazio());
  expect(resultado.paraRemoto).toEqual(snapshotVazio());
});

test('históricos: duplicata exata (mesma chave) não duplica', () => {
  const r = resposta();
  const local: SnapshotSync = { ...snapshotVazio(), respostas: [r] };
  const remoto: SnapshotSync = { ...snapshotVazio(), respostas: [{ ...r }] };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.respostas).toEqual([]);
  expect(resultado.paraRemoto.respostas).toEqual([]);
});

test('históricos: conclusoesCasos duplicata exata não duplica', () => {
  const c = conclusao();
  const local: SnapshotSync = { ...snapshotVazio(), conclusoesCasos: [c] };
  const remoto: SnapshotSync = { ...snapshotVazio(), conclusoesCasos: [{ ...c }] };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.conclusoesCasos).toEqual([]);
  expect(resultado.paraRemoto.conclusoesCasos).toEqual([]);
});

test('históricos: item só no local vai para paraRemoto', () => {
  const r = resposta({ perguntaId: 'somente-local' });
  const local: SnapshotSync = { ...snapshotVazio(), respostas: [r] };
  const remoto = snapshotVazio();
  const resultado = merge(local, remoto);
  expect(resultado.paraRemoto.respostas).toEqual([r]);
  expect(resultado.paraLocal.respostas).toEqual([]);
});

test('históricos: item só no remoto vai para paraLocal', () => {
  const c = conclusao({ casoId: 'somente-remoto' });
  const local = snapshotVazio();
  const remoto: SnapshotSync = { ...snapshotVazio(), conclusoesCasos: [c] };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.conclusoesCasos).toEqual([c]);
  expect(resultado.paraRemoto.conclusoesCasos).toEqual([]);
});

test('históricos: mescla itens distintos de ambos os lados sem perder nenhum', () => {
  const rLocal = resposta({ perguntaId: 'local-only', respondidaEm: 1 });
  const rComum = resposta({ perguntaId: 'comum', respondidaEm: 2 });
  const rRemoto = resposta({ perguntaId: 'remoto-only', respondidaEm: 3 });
  const local: SnapshotSync = { ...snapshotVazio(), respostas: [rLocal, rComum] };
  const remoto: SnapshotSync = { ...snapshotVazio(), respostas: [{ ...rComum }, rRemoto] };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.respostas).toEqual([rRemoto]);
  expect(resultado.paraRemoto.respostas).toEqual([rLocal]);
});

test('estados: carimbo maior no local vence e vai para paraRemoto', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: true, atualizadoEm: 200 } },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: false, atualizadoEm: 100 } },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraRemoto.estudados).toEqual({ t1: { valor: true, atualizadoEm: 200 } });
  expect(resultado.paraLocal.estudados).toEqual({});
});

test('estados: carimbo maior no remoto vence e vai para paraLocal', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    favoritos: { t1: { valor: false, atualizadoEm: 100 } },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    favoritos: { t1: { valor: true, atualizadoEm: 200 } },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.favoritos).toEqual({ t1: { valor: true, atualizadoEm: 200 } });
  expect(resultado.paraRemoto.favoritos).toEqual({});
});

test('estados: empate exato de carimbo com valores diferentes vence o remoto (entra em paraLocal, nunca em paraRemoto)', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    prefs: { tema: { valor: 'claro', atualizadoEm: 500 } },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    prefs: { tema: { valor: 'escuro', atualizadoEm: 500 } },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.prefs).toEqual({ tema: { valor: 'escuro', atualizadoEm: 500 } });
  expect(resultado.paraRemoto.prefs).toEqual({});
});

test('estados: valores já idênticos (mesmo valor e carimbo) não geram delta em nenhuma direção', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: true, atualizadoEm: 300 } },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: true, atualizadoEm: 300 } },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.estudados).toEqual({});
  expect(resultado.paraRemoto.estudados).toEqual({});
});

test('itensRevisao: comparados por Date.parse(atualizadoEm), remoto mais novo vai para paraLocal', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    itensRevisao: { i1: itemRevisao({ atualizadoEm: '2026-08-20T10:00:00.000Z', repeticoes: 1 }) },
  };
  const itemRemoto = itemRevisao({ atualizadoEm: '2026-08-22T10:00:00.000Z', repeticoes: 3 });
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    itensRevisao: { i1: itemRemoto },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraLocal.itensRevisao).toEqual({ i1: itemRemoto });
  expect(resultado.paraRemoto.itensRevisao).toEqual({});
});

test('itensRevisao: local mais novo por Date.parse vai para paraRemoto', () => {
  const itemLocal = itemRevisao({ atualizadoEm: '2026-08-22T10:00:00.000Z', repeticoes: 3 });
  const local: SnapshotSync = {
    ...snapshotVazio(),
    itensRevisao: { i1: itemLocal },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    itensRevisao: { i1: itemRevisao({ atualizadoEm: '2026-08-20T10:00:00.000Z', repeticoes: 1 }) },
  };
  const resultado = merge(local, remoto);
  expect(resultado.paraRemoto.itensRevisao).toEqual({ i1: itemLocal });
  expect(resultado.paraLocal.itensRevisao).toEqual({});
});

test('itensRevisao: só no local vai para paraRemoto, só no remoto vai para paraLocal', () => {
  const soLocal = itemRevisao({ id: 'so-local' });
  const soRemoto = itemRevisao({ id: 'so-remoto' });
  const local: SnapshotSync = { ...snapshotVazio(), itensRevisao: { 'so-local': soLocal } };
  const remoto: SnapshotSync = { ...snapshotVazio(), itensRevisao: { 'so-remoto': soRemoto } };
  const resultado = merge(local, remoto);
  expect(resultado.paraRemoto.itensRevisao).toEqual({ 'so-local': soLocal });
  expect(resultado.paraLocal.itensRevisao).toEqual({ 'so-remoto': soRemoto });
});

test('snapshot vazio de um lado: local vazio traz tudo do remoto em paraLocal e nada em paraRemoto', () => {
  const remoto: SnapshotSync = {
    estudados: { t1: { valor: true, atualizadoEm: 10 } },
    favoritos: { t2: { valor: true, atualizadoEm: 20 } },
    itensRevisao: { i1: itemRevisao() },
    respostas: [resposta()],
    conclusoesCasos: [conclusao()],
    prefs: { p1: { valor: 'x', atualizadoEm: 30 } },
  };
  const resultado = merge(snapshotVazio(), remoto);
  expect(resultado.paraLocal).toEqual(remoto);
  expect(resultado.paraRemoto).toEqual(snapshotVazio());
});

test('snapshot vazio de um lado: remoto vazio traz tudo do local em paraRemoto e nada em paraLocal', () => {
  const local: SnapshotSync = {
    estudados: { t1: { valor: true, atualizadoEm: 10 } },
    favoritos: { t2: { valor: true, atualizadoEm: 20 } },
    itensRevisao: { i1: itemRevisao() },
    respostas: [resposta()],
    conclusoesCasos: [conclusao()],
    prefs: { p1: { valor: 'x', atualizadoEm: 30 } },
  };
  const resultado = merge(local, snapshotVazio());
  expect(resultado.paraRemoto).toEqual(local);
  expect(resultado.paraLocal).toEqual(snapshotVazio());
});

test('idempotência: aplicar os deltas e re-rodar merge devolve deltas vazios', () => {
  const local: SnapshotSync = {
    estudados: {
      t1: { valor: true, atualizadoEm: 200 },
      t2: { valor: false, atualizadoEm: 50 },
    },
    favoritos: { f1: { valor: true, atualizadoEm: 500 } },
    itensRevisao: {
      i1: itemRevisao({ atualizadoEm: '2026-08-22T10:00:00.000Z', repeticoes: 3 }),
    },
    respostas: [resposta({ perguntaId: 'a', respondidaEm: 1 })],
    conclusoesCasos: [conclusao({ casoId: 'ca', concluidaEm: 1 })],
    prefs: { tema: { valor: 'claro', atualizadoEm: 500 } },
  };
  const remoto: SnapshotSync = {
    estudados: {
      t1: { valor: false, atualizadoEm: 100 },
      t3: { valor: true, atualizadoEm: 90 },
    },
    favoritos: {},
    itensRevisao: {
      i1: itemRevisao({ atualizadoEm: '2026-08-20T10:00:00.000Z', repeticoes: 1 }),
      i2: itemRevisao({ id: 'i2', atualizadoEm: '2026-08-21T10:00:00.000Z' }),
    },
    respostas: [resposta({ perguntaId: 'b', respondidaEm: 2 })],
    conclusoesCasos: [conclusao({ casoId: 'cb', concluidaEm: 2 })],
    prefs: { tema: { valor: 'escuro', atualizadoEm: 500 } },
  };

  const primeiro = merge(local, remoto);
  const localAtualizado = aplicar(local, primeiro.paraLocal);
  const remotoAtualizado = aplicar(remoto, primeiro.paraRemoto);

  const segundo = merge(localAtualizado, remotoAtualizado);
  expect(segundo.paraLocal).toEqual(snapshotVazio());
  expect(segundo.paraRemoto).toEqual(snapshotVazio());
});

test('motor puro: não chama Date.now e não muta as entradas', () => {
  const dateNowSpy = jest.spyOn(Date, 'now');
  const local: SnapshotSync = deepFreeze({
    estudados: { t1: { valor: true, atualizadoEm: 200 } },
    favoritos: { f1: { valor: true, atualizadoEm: 20 } },
    itensRevisao: { i1: itemRevisao() },
    respostas: [resposta()],
    conclusoesCasos: [conclusao()],
    prefs: { p1: { valor: 'x', atualizadoEm: 30 } },
  });
  const remoto: SnapshotSync = deepFreeze({
    estudados: { t1: { valor: false, atualizadoEm: 100 }, t2: { valor: true, atualizadoEm: 5 } },
    favoritos: {},
    itensRevisao: {},
    respostas: [resposta({ perguntaId: 'outra', respondidaEm: 999 })],
    conclusoesCasos: [],
    prefs: {},
  });

  expect(() => merge(local, remoto)).not.toThrow();
  expect(dateNowSpy).not.toHaveBeenCalled();
  dateNowSpy.mockRestore();
});

test('chamar merge duas vezes com as mesmas entradas produz o mesmo resultado (determinístico)', () => {
  const local: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: true, atualizadoEm: 200 } },
  };
  const remoto: SnapshotSync = {
    ...snapshotVazio(),
    estudados: { t1: { valor: false, atualizadoEm: 100 }, t2: { valor: true, atualizadoEm: 10 } },
  };
  expect(merge(local, remoto)).toEqual(merge(local, remoto));
});
