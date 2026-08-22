const mockAuthObj: { currentUser: { email: string | null } | null } = { currentUser: null };

// firestoreSync.ts é a única camada que toca o Firestore; mockamos o SDK
// modular usado por ela e o `obterAuth` de firebaseApp.ts diretamente (em vez
// de mockar firebase/auth/app também), já que só o e-mail vivo do usuário
// logado importa aqui — não o ciclo de vida completo do Auth.
jest.mock('../conta/firebaseApp', () => ({
  obterAuth: () => mockAuthObj,
}));

interface DocFalso {
  id: string;
  data: () => unknown;
  ref: { path: string };
}
interface SnapshotFalso {
  docs: DocFalso[];
  forEach: (cb: (d: DocFalso) => void) => void;
}

function snapshotDe(itens: Record<string, unknown>): SnapshotFalso {
  const docs = Object.entries(itens).map(([id, data]) => ({ id, data: () => data, ref: { path: `doc/${id}` } }));
  return { docs, forEach: (cb) => docs.forEach(cb) };
}

function snapshotDeLista(itens: unknown[]): SnapshotFalso {
  const docs = itens.map((data, i) => ({ id: String(i), data: () => data, ref: { path: `doc/${i}` } }));
  return { docs, forEach: (cb) => docs.forEach(cb) };
}

interface LoteFalso {
  set: jest.Mock;
  delete: jest.Mock;
  commit: jest.Mock;
}

function criarLoteFalso(): LoteFalso {
  const lote: LoteFalso = {
    set: jest.fn(() => lote),
    delete: jest.fn(() => lote),
    commit: jest.fn(async () => undefined),
  };
  return lote;
}

const mockCollection = jest.fn((_db: unknown, ...segs: string[]) => ({ path: segs.join('/') }));
const mockDoc = jest.fn((_db: unknown, ...segs: string[]) => ({ path: segs.join('/') }));
const mockGetDoc = jest.fn();
const mockGetDocs = jest.fn();
const lotesCriados: LoteFalso[] = [];
const mockWriteBatch = jest.fn(() => {
  const lote = criarLoteFalso();
  lotesCriados.push(lote);
  return lote;
});

jest.mock('firebase/firestore', () => ({
  collection: (...args: unknown[]) => (mockCollection as (...a: unknown[]) => unknown)(...args),
  doc: (...args: unknown[]) => (mockDoc as (...a: unknown[]) => unknown)(...args),
  getDoc: (...args: unknown[]) => (mockGetDoc as (...a: unknown[]) => unknown)(...args),
  getDocs: (...args: unknown[]) => (mockGetDocs as (...a: unknown[]) => unknown)(...args),
  writeBatch: (...args: unknown[]) => (mockWriteBatch as (...a: unknown[]) => unknown)(...args),
}));

import { apagarDadosDoUsuario, gravarDeltas, lerSnapshotRemoto } from './firestoreSync';
import { snapshotVazio, type SnapshotSync } from './merge';

const DB_FALSO = {} as never;

beforeEach(() => {
  mockAuthObj.currentUser = null;
  lotesCriados.length = 0;
  jest.clearAllMocks();
});

describe('lerSnapshotRemoto', () => {
  test('monta o SnapshotSync a partir das 6 coleções, decodificando os ids de documento', async () => {
    mockGetDocs.mockImplementation((ref: { path: string }) => {
      const colecao = ref.path.split('/').pop();
      switch (colecao) {
        case 'estudados':
          return Promise.resolve(
            snapshotDe({ [encodeURIComponent('sistema/topico-a')]: { valor: true, atualizadoEm: 10 } }),
          );
        case 'favoritos':
          return Promise.resolve(
            snapshotDe({ [encodeURIComponent('sistema/topico-b')]: { valor: true, atualizadoEm: 20 } }),
          );
        case 'itensRevisao':
          return Promise.resolve(
            snapshotDe({
              [encodeURIComponent('sistema/topico-a#1')]: {
                id: 'sistema/topico-a#1',
                tipo: 'pergunta',
                topicoId: 'sistema/topico-a',
                facilidade: 2.5,
                repeticoes: 0,
                intervaloDias: 0,
                proximaRevisao: '2020-01-01',
                atualizadoEm: '2020-01-01T00:00:00.000Z',
              },
            }),
          );
        case 'prefs':
          return Promise.resolve(snapshotDe({ tema: { valor: 'escuro', atualizadoEm: 5 } }));
        case 'respostas':
          return Promise.resolve(
            snapshotDeLista([{ perguntaId: 'p1', topicoId: 't1', correta: true, respondidaEm: 1 }]),
          );
        case 'conclusoesCasos':
          return Promise.resolve(
            snapshotDeLista([
              { casoId: 'c1', classe: 'otimo', otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 1 },
            ]),
          );
        default:
          return Promise.resolve(snapshotDe({}));
      }
    });

    const resultado = await lerSnapshotRemoto(DB_FALSO, 'uid-1');

    expect(resultado.estudados).toEqual({ 'sistema/topico-a': { valor: true, atualizadoEm: 10 } });
    expect(resultado.favoritos).toEqual({ 'sistema/topico-b': { valor: true, atualizadoEm: 20 } });
    expect(Object.keys(resultado.itensRevisao)).toEqual(['sistema/topico-a#1']);
    expect(resultado.prefs).toEqual({ tema: { valor: 'escuro', atualizadoEm: 5 } });
    expect(resultado.respostas).toEqual([{ perguntaId: 'p1', topicoId: 't1', correta: true, respondidaEm: 1 }]);
    expect(resultado.conclusoesCasos).toEqual([
      { casoId: 'c1', classe: 'otimo', otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 1 },
    ]);
  });

  test('lê sempre por coleção sob users/{uid}/… — nunca collectionGroup', async () => {
    mockGetDocs.mockResolvedValue(snapshotDe({}));
    await lerSnapshotRemoto(DB_FALSO, 'uid-1');
    for (const chamada of mockCollection.mock.calls) {
      expect(chamada[1]).toBe('users');
      expect(chamada[2]).toBe('uid-1');
    }
  });
});

describe('gravarDeltas', () => {
  function deltasComUm(campo: keyof SnapshotSync, valor: unknown): SnapshotSync {
    return { ...snapshotVazio(), [campo]: valor };
  }

  test('cria o doc de perfil só quando ausente, com o e-mail vivo de auth.currentUser', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false });
    mockAuthObj.currentUser = { email: 'pessoa@exemplo.com' };

    await gravarDeltas(DB_FALSO, 'uid-1', snapshotVazio());

    expect(lotesCriados).toHaveLength(1);
    expect(lotesCriados[0].set).toHaveBeenCalledWith(
      { path: 'users/uid-1/perfil/dados' },
      { email: 'pessoa@exemplo.com', criadoEm: expect.any(Number) },
    );
  });

  test('não regrava o perfil quando já existe (criadoEm imutável) e não grava nada se não há deltas', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true });

    await gravarDeltas(DB_FALSO, 'uid-1', snapshotVazio());

    expect(mockWriteBatch).not.toHaveBeenCalled();
  });

  test('sem e-mail vivo (auth.currentUser.email ausente): adia o perfil em vez de derrubar o lote inteiro', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => false });
    mockAuthObj.currentUser = null; // sem usuário/e-mail resolvido ainda

    const deltas: SnapshotSync = {
      ...snapshotVazio(),
      estudados: { 'sistema/topico-a': { valor: true, atualizadoEm: 1 } },
    };

    await gravarDeltas(DB_FALSO, 'uid-1', deltas);

    expect(lotesCriados).toHaveLength(1);
    const lote = lotesCriados[0];
    // Nenhuma operação de perfil (um e-mail vazio derrubaria o lote inteiro
    // nas regras — texto(email, ...) exige size() > 0); os deltas de dados
    // são gravados normalmente.
    expect(lote.set).toHaveBeenCalledTimes(1);
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/estudados/${encodeURIComponent('sistema/topico-a')}` },
      { valor: true, atualizadoEm: 1 },
    );
    expect(lote.set).not.toHaveBeenCalledWith({ path: 'users/uid-1/perfil/dados' }, expect.anything());
  });

  test('grava estudados/favoritos/itensRevisao com a chave percent-encoded', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true });
    const deltas: SnapshotSync = {
      ...snapshotVazio(),
      estudados: { 'sistema/topico-a': { valor: true, atualizadoEm: 1 } },
      favoritos: { 'sistema/topico-b': { valor: true, atualizadoEm: 2 } },
      itensRevisao: {
        'sistema/topico-a#1': {
          id: 'sistema/topico-a#1',
          tipo: 'pergunta',
          topicoId: 'sistema/topico-a',
          facilidade: 2.5,
          repeticoes: 0,
          intervaloDias: 0,
          proximaRevisao: '2020-01-01',
          atualizadoEm: '2020-01-01T00:00:00.000Z',
        },
      },
    };

    await gravarDeltas(DB_FALSO, 'uid-1', deltas);

    const lote = lotesCriados[0];
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/estudados/${encodeURIComponent('sistema/topico-a')}` },
      { valor: true, atualizadoEm: 1 },
    );
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/favoritos/${encodeURIComponent('sistema/topico-b')}` },
      { valor: true, atualizadoEm: 2 },
    );
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/itensRevisao/${encodeURIComponent('sistema/topico-a#1')}` },
      deltas.itensRevisao['sistema/topico-a#1'],
    );
  });

  test('grava respostas/conclusoesCasos com a chave natural (chaveResposta/chaveConclusao) percent-encoded', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true });
    const resposta = { perguntaId: 'p1', topicoId: 'sistema/topico-a', correta: true, respondidaEm: 1000 };
    const conclusao = { casoId: 'c1', classe: 'otimo' as const, otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 2000 };
    const deltas = deltasComUm('respostas', [resposta]);
    deltas.conclusoesCasos = [conclusao];

    await gravarDeltas(DB_FALSO, 'uid-1', deltas);

    const lote = lotesCriados[0];
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/respostas/${encodeURIComponent('p1_1000')}` },
      resposta,
    );
    expect(lote.set).toHaveBeenCalledWith(
      { path: `users/uid-1/conclusoesCasos/${encodeURIComponent('c1_2000')}` },
      conclusao,
    );
  });

  test('particiona em lotes de <= 400 operações', async () => {
    mockGetDoc.mockResolvedValue({ exists: () => true }); // sem op extra de perfil
    const estudados: SnapshotSync['estudados'] = {};
    for (let i = 0; i < 450; i++) {
      estudados[`topico-${i}`] = { valor: true, atualizadoEm: i };
    }

    await gravarDeltas(DB_FALSO, 'uid-1', { ...snapshotVazio(), estudados });

    expect(lotesCriados).toHaveLength(2);
    expect(lotesCriados[0].set).toHaveBeenCalledTimes(400);
    expect(lotesCriados[1].set).toHaveBeenCalledTimes(50);
    expect(lotesCriados[0].commit).toHaveBeenCalledTimes(1);
    expect(lotesCriados[1].commit).toHaveBeenCalledTimes(1);
  });
});

describe('apagarDadosDoUsuario', () => {
  test('apaga o perfil e os documentos das 6 subcoleções restantes (7 no total)', async () => {
    mockGetDocs.mockImplementation((ref: { path: string }) => {
      const colecao = ref.path.split('/').pop();
      if (colecao === 'estudados') {
        return Promise.resolve(snapshotDe({ a: {}, b: {} }));
      }
      if (colecao === 'respostas') {
        return Promise.resolve(snapshotDeLista([{}]));
      }
      return Promise.resolve(snapshotDe({}));
    });

    await apagarDadosDoUsuario(DB_FALSO, 'uid-1');

    const lote = lotesCriados[0];
    // perfil (1) + estudados (2) + respostas (1) = 4 deletes
    expect(lote.delete).toHaveBeenCalledTimes(4);
    expect(lote.delete).toHaveBeenCalledWith({ path: 'users/uid-1/perfil/dados' });
  });

  test('idempotente: apaga o perfil mesmo com todas as subcoleções vazias, sem lançar', async () => {
    mockGetDocs.mockResolvedValue(snapshotDe({}));

    await expect(apagarDadosDoUsuario(DB_FALSO, 'uid-1')).resolves.toBeUndefined();

    const lote = lotesCriados[0];
    expect(lote.delete).toHaveBeenCalledTimes(1);
    expect(lote.delete).toHaveBeenCalledWith({ path: 'users/uid-1/perfil/dados' });
  });

  test('lê as subcoleções sempre por coleção sob users/{uid}/…', async () => {
    mockGetDocs.mockResolvedValue(snapshotDe({}));
    await apagarDadosDoUsuario(DB_FALSO, 'uid-1');
    for (const chamada of mockCollection.mock.calls) {
      expect(chamada[1]).toBe('users');
      expect(chamada[2]).toBe('uid-1');
    }
  });
});
