import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import type { ItemRevisao } from '../revisao/sm2';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    // useFocusEffect fora de um navegador lançaria; roda o efeito ao montar,
    // como uma tela recém-focada.
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// TelaPerfil agora renderiza BlocoConta (Task 6), que passa por AuthContext e
// pelo orquestrador de sync — ambos importam firebaseApp.ts, que importa a
// SDK real do Firebase (firebase/app, firebase/auth, firebase/firestore).
// Mockados aqui pelo mesmo motivo de AuthContext.test.tsx/firebaseApp.test.ts:
// a config committada é `null` (ver src/conta/config.ts), então nada disso é
// de fato chamado — só precisa resolver o import.
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({ name: '[DEFAULT]' })),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  writeBatch: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn(() => () => {}),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
  deleteUser: jest.fn(),
  sendEmailVerification: jest.fn(),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
}));

import { Share } from 'react-native';
import { AuthProvider } from '../conta/AuthContext';
import { SyncProvider } from '../sync/orquestrador';
import { TelaPerfil } from '../app/(tabs)/perfil';
import { aguardarAnalytics, configurarAnalytics, reiniciarAnalytics, track } from '../analytics/analytics';
import { MemoryEventosStore } from '../analytics/memoryEventos';

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderPerfil(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <AuthProvider>
            <SyncProvider>
              <TelaPerfil />
            </SyncProvider>
          </AuthProvider>
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('mostra progresso "1 de 7 tópicos" para sistema com 1 tópico estudado', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('1 de 7 tópicos')).toBeTruthy();
  });
});

test('mostra "Para revisar hoje" e "Itens em dia" a partir dos itens de revisão', async () => {
  const store = new MemoryProgressStore();
  const vencido: ItemRevisao = {
    id: 'pa-1',
    tipo: 'pergunta',
    topicoId: PA_ID,
    facilidade: 2.5,
    repeticoes: 0,
    intervaloDias: 0,
    proximaRevisao: '2000-01-01',
    atualizadoEm: '2000-01-01T00:00:00.000Z',
  };
  const emDia: ItemRevisao = {
    id: 'pa-2',
    tipo: 'pergunta',
    topicoId: PA_ID,
    facilidade: 2.5,
    repeticoes: 1,
    intervaloDias: 6,
    proximaRevisao: '2999-01-01',
    atualizadoEm: '2000-01-01T00:00:00.000Z',
  };
  await store.salvarItemRevisao(vencido);
  await store.salvarItemRevisao(emDia);

  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('Para revisar hoje: 1')).toBeTruthy();
  });
  expect(getByText('Itens em dia: 1')).toBeTruthy();
});

test('mostra o aviso legal exato', async () => {
  const { getByText } = await renderPerfil(new MemoryProgressStore());

  await waitFor(() => {
    expect(getByText('Material educacional. Não substitui o julgamento clínico.')).toBeTruthy();
  });
});

test('tocar "Escuro" grava a preferência de tema no store', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'definirPreferencia');
  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('Escuro')).toBeTruthy();
  });
  fireEvent.press(getByText('Escuro'));

  expect(spy).toHaveBeenCalledWith('tema', 'escuro');
});

test('tocar "Exportar dados de uso" compartilha o JSON com os eventos do aparelho', async () => {
  configurarAnalytics({ store: new MemoryEventosStore() });
  track('app_aberto');
  await aguardarAnalytics();
  const spy = jest.spyOn(Share, 'share').mockResolvedValue({ action: 'sharedAction' } as never);

  const { getByText } = await renderPerfil(new MemoryProgressStore());
  await waitFor(() => {
    expect(getByText('Exportar dados de uso')).toBeTruthy();
  });
  fireEvent.press(getByText('Exportar dados de uso'));

  await waitFor(() => {
    expect(spy).toHaveBeenCalledTimes(1);
  });
  const { message } = spy.mock.calls[0][0] as { message: string };
  const dado = JSON.parse(message) as { app: string; eventos: { evento: string }[] };
  expect(dado.app).toBe('semioguia');
  expect(dado.eventos.map((e) => e.evento)).toEqual(['app_aberto']);

  spy.mockRestore();
  reiniciarAnalytics();
});

test('tocar "Grande" grava a preferência de fonte no store', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'definirPreferencia');
  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('Grande')).toBeTruthy();
  });
  fireEvent.press(getByText('Grande'));

  expect(spy).toHaveBeenCalledWith('fonte', 'grande');
});
