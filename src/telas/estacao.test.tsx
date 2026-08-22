import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaEstacao } from '../app/estacao/[...caminho]';
import { idDeChecklist } from '../revisao/fila';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// TelaEstacao chama useSync() (notificarEscrita ao concluir). O teste não
// monta SyncProvider (que exige AuthProvider), então mockamos como as telas
// mockam providers em outros arquivos (ex.: BlocoConta.test.tsx).
jest.mock('../sync/orquestrador', () => ({
  useSync: () => ({
    ultimaSync: null,
    sincronizando: false,
    erro: null,
    sincronizarAgora: jest.fn(async () => {}),
    notificarEscrita: jest.fn(),
  }),
}));

const TOPICO_ID = 'exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso';
const TITULO_CHECKLIST = 'Avaliação do pulso em 60 segundos';
const TOTAL_ITENS = 10;

function renderEstacao(store: MemoryProgressStore, topicoId = TOPICO_ID, titulo = TITULO_CHECKLIST) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaEstacao topicoId={topicoId} titulo={titulo} />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.back as jest.Mock).mockClear();
});

test('conclui a estação lembrando de tudo e agenda o checklist (nota 5, revisa amanhã)', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderEstacao(store);

  await waitFor(() => {
    expect(getByText(TITULO_CHECKLIST)).toBeTruthy();
  });

  for (let i = 0; i < TOTAL_ITENS; i++) {
    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));
  }

  await waitFor(() => {
    expect(getByText('100%')).toBeTruthy();
  });

  const id = idDeChecklist(TOPICO_ID, TITULO_CHECKLIST);
  await waitFor(async () => {
    const itens = await store.listarItensRevisao();
    expect(itens.some((i) => i.id === id)).toBe(true);
  });

  const itens = await store.listarItensRevisao();
  const item = itens.find((i) => i.id === id);
  expect(item?.tipo).toBe('checklist');
  expect(item?.topicoId).toBe(TOPICO_ID);
  expect(item?.repeticoes).toBe(1);
});

test('reavalia um item de checklist já existente em vez de recriar', async () => {
  const store = new MemoryProgressStore();
  const id = idDeChecklist(TOPICO_ID, TITULO_CHECKLIST);
  await store.salvarItemRevisao({
    id,
    tipo: 'checklist',
    topicoId: TOPICO_ID,
    facilidade: 2.5,
    repeticoes: 1,
    intervaloDias: 1,
    proximaRevisao: '2026-08-20',
    atualizadoEm: '2026-08-19T00:00:00.000Z',
  });

  const { getByText } = await renderEstacao(store);
  await waitFor(() => {
    expect(getByText(TITULO_CHECKLIST)).toBeTruthy();
  });

  // Esquece 3 dos 10 passos -> 70% -> nota 2 (< 80) -> reinicia repetições
  for (let i = 0; i < TOTAL_ITENS; i++) {
    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText(i < 3 ? 'Esqueci' : 'Lembrei'));
  }

  await waitFor(() => {
    expect(getByText('70%')).toBeTruthy();
  });

  const itens = await store.listarItensRevisao();
  expect(itens).toHaveLength(1);
  const item = itens.find((i) => i.id === id)!;
  expect(item.repeticoes).toBe(0);
  expect(item.intervaloDias).toBe(1);
});

test('tópico inexistente mostra estado vazio', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderEstacao(store, 'sistema-inexistente/capitulo/topico');
  await waitFor(() => {
    expect(getByText('Tópico não encontrado')).toBeTruthy();
  });
  await fireEvent.press(getByText('Voltar'));
  expect(router.back).toHaveBeenCalled();
});

test('checklist inexistente no tópico mostra estado vazio', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderEstacao(store, TOPICO_ID, 'Checklist que não existe');
  await waitFor(() => {
    expect(getByText('Checklist não encontrado')).toBeTruthy();
  });
});
