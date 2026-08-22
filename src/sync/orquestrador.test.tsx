import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

const mockUseConta = jest.fn();
jest.mock('../conta/AuthContext', () => ({
  useConta: () => mockUseConta(),
}));

const mockSyncDisponivel = jest.fn(() => true);
const DB_FALSO = { marca: 'db-falso' };
const mockObterDb = jest.fn(() => DB_FALSO);
jest.mock('../conta/firebaseApp', () => ({
  syncDisponivel: () => mockSyncDisponivel(),
  obterDb: () => mockObterDb(),
}));

const mockLerSnapshotRemoto = jest.fn();
const mockGravarDeltas = jest.fn();
jest.mock('./firestoreSync', () => ({
  lerSnapshotRemoto: (...args: unknown[]) => mockLerSnapshotRemoto(...args),
  gravarDeltas: (...args: unknown[]) => mockGravarDeltas(...args),
}));

import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { snapshotVazio } from './merge';
import { ERRO_SYNC_GENERICO, SyncProvider, useSync } from './orquestrador';

function criarWrapper(store: MemoryProgressStore) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ProgressProvider store={store}>
        <SyncProvider>{children}</SyncProvider>
      </ProgressProvider>
    );
  };
}

const USUARIO = { uid: 'uid-1', email: 'a@a.com' };

beforeEach(() => {
  jest.clearAllMocks();
  mockSyncDisponivel.mockReturnValue(true);
  mockObterDb.mockReturnValue(DB_FALSO);
  mockUseConta.mockReturnValue({ usuario: null });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('useSync() fora de SyncProvider lança', async () => {
  await expect(renderHook(() => useSync())).rejects.toThrow('useSync requer SyncProvider');
});

test('sem sessão: não sincroniza ao montar e o estado começa neutro', async () => {
  mockUseConta.mockReturnValue({ usuario: null });
  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  expect(result.current.ultimaSync).toBeNull();
  expect(result.current.sincronizando).toBe(false);
  expect(result.current.erro).toBeNull();
  expect(mockLerSnapshotRemoto).not.toHaveBeenCalled();
});

test('sem config (syncDisponivel false): não sincroniza mesmo com sessão', async () => {
  mockSyncDisponivel.mockReturnValue(false);
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await new Promise((r) => setTimeout(r, 0));
  expect(mockLerSnapshotRemoto).not.toHaveBeenCalled();
});

test('fluxo feliz: login dispara a sincronização e seta ultimaSync', async () => {
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockResolvedValue(snapshotVazio());
  mockGravarDeltas.mockResolvedValue(undefined);

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await waitFor(() => expect(result.current.ultimaSync).not.toBeNull());
  expect(result.current.erro).toBeNull();
  expect(result.current.sincronizando).toBe(false);
  expect(mockLerSnapshotRemoto).toHaveBeenCalledWith(DB_FALSO, 'uid-1');
  expect(mockGravarDeltas).toHaveBeenCalledWith(DB_FALSO, 'uid-1', expect.any(Object));
});

test('segue a ordem exportar local → ler remoto → aplicarDoSync → gravarDeltas', async () => {
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockResolvedValue(snapshotVazio());
  mockGravarDeltas.mockResolvedValue(undefined);

  const store = new MemoryProgressStore();
  const ordem: string[] = [];
  const exportarOriginal = store.exportarParaSync.bind(store);
  jest.spyOn(store, 'exportarParaSync').mockImplementation(async () => {
    ordem.push('exportar');
    return exportarOriginal();
  });
  const aplicarOriginal = store.aplicarDoSync.bind(store);
  jest.spyOn(store, 'aplicarDoSync').mockImplementation(async (m) => {
    ordem.push('aplicarDoSync');
    return aplicarOriginal(m);
  });
  mockLerSnapshotRemoto.mockImplementation(async () => {
    ordem.push('lerRemoto');
    return snapshotVazio();
  });
  mockGravarDeltas.mockImplementation(async () => {
    ordem.push('gravarDeltas');
  });

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(store) });

  await waitFor(() => expect(result.current.ultimaSync).not.toBeNull());
  expect(ordem).toEqual(['exportar', 'lerRemoto', 'aplicarDoSync', 'gravarDeltas']);
});

test('falha (ex.: rede) seta erro e não lança — o app segue intacto', async () => {
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockRejectedValue(new Error('falha de rede'));

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await waitFor(() => expect(result.current.erro).toBe(ERRO_SYNC_GENERICO));
  expect(result.current.ultimaSync).toBeNull();
  expect(result.current.sincronizando).toBe(false);

  await expect(result.current.sincronizarAgora()).resolves.toBeUndefined();
});

test('debounce: uma segunda chamada a sincronizarAgora() dentro de 30s é ignorada', async () => {
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockResolvedValue(snapshotVazio());
  mockGravarDeltas.mockResolvedValue(undefined);

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await waitFor(() => expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(1));

  await act(async () => {
    await result.current.sincronizarAgora();
  });

  expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(1);
});

test('retry manual (forcar: true) ignora o debounce mesmo logo após uma falha', async () => {
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockRejectedValueOnce(new Error('falha de rede'));
  mockGravarDeltas.mockResolvedValue(undefined);

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await waitFor(() => expect(result.current.erro).toBe(ERRO_SYNC_GENERICO));
  expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(1);

  // Sem forcar, a mesma janela de 30s ainda vale e o toque é ignorado.
  await act(async () => {
    await result.current.sincronizarAgora();
  });
  expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(1);

  mockLerSnapshotRemoto.mockResolvedValueOnce(snapshotVazio());
  await act(async () => {
    await result.current.sincronizarAgora({ forcar: true });
  });

  expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(2);
  expect(result.current.erro).toBeNull();
  expect(result.current.ultimaSync).not.toBeNull();
});

test('troca de conta dentro da janela do debounce: reseta o estado e sincroniza a nova conta imediatamente', async () => {
  const USUARIO_A = { uid: 'uid-A', email: 'a@a.com' };
  const USUARIO_B = { uid: 'uid-B', email: 'b@b.com' };
  mockUseConta.mockReturnValue({ usuario: USUARIO_A });
  mockLerSnapshotRemoto.mockResolvedValue(snapshotVazio());
  mockGravarDeltas.mockResolvedValue(undefined);

  const { result, rerender } = await renderHook(() => useSync(), {
    wrapper: criarWrapper(new MemoryProgressStore()),
  });

  await waitFor(() => expect(result.current.ultimaSync).not.toBeNull());
  expect(mockLerSnapshotRemoto).toHaveBeenLastCalledWith(DB_FALSO, 'uid-A');

  // Logout: uid vira null — estado não pode vazar para a próxima sessão.
  mockUseConta.mockReturnValue({ usuario: null });
  await rerender(undefined);
  expect(result.current.ultimaSync).toBeNull();
  expect(result.current.erro).toBeNull();

  // Login de outra conta dentro da janela de 30s da sync de A: não pode ser
  // debounced pelo relógio da conta anterior.
  mockUseConta.mockReturnValue({ usuario: USUARIO_B });
  await rerender(undefined);

  await waitFor(() => expect(mockLerSnapshotRemoto).toHaveBeenLastCalledWith(DB_FALSO, 'uid-B'));
  await waitFor(() => expect(result.current.ultimaSync).not.toBeNull());
});

test('depois que os 30s do debounce passam, uma nova chamada sincroniza de novo', async () => {
  let agora = 1_000_000;
  jest.spyOn(Date, 'now').mockImplementation(() => agora);
  mockUseConta.mockReturnValue({ usuario: USUARIO });
  mockLerSnapshotRemoto.mockResolvedValue(snapshotVazio());
  mockGravarDeltas.mockResolvedValue(undefined);

  const { result } = await renderHook(() => useSync(), { wrapper: criarWrapper(new MemoryProgressStore()) });

  await waitFor(() => expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(1));

  agora += 30_001;
  await act(async () => {
    await result.current.sincronizarAgora();
  });

  expect(mockLerSnapshotRemoto).toHaveBeenCalledTimes(2);
});
