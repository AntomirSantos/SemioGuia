import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaRevisao } from '../app/revisao';
import { idDeChecklist } from '../revisao/fila';
import type { ItemRevisao } from '../revisao/sm2';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// TelaRevisao chama useSync() (notificarEscrita após cada item salvo). O
// teste não monta SyncProvider (que exige AuthProvider), então mockamos como
// as telas mockam providers em outros arquivos (ex.: BlocoConta.test.tsx).
const mockNotificarEscrita = jest.fn();
jest.mock('../sync/orquestrador', () => ({
  useSync: () => ({
    ultimaSync: null,
    sincronizando: false,
    erro: null,
    sincronizarAgora: jest.fn(async () => {}),
    notificarEscrita: mockNotificarEscrita,
  }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';
const FC_ID = 'exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso';
const TITULO_CHECKLIST = 'Avaliação do pulso em 60 segundos';

// Data bem no passado: sempre "vencida" independente de quando o teste roda.
const VENCIDA = '2000-01-01';

function item(parcial: Partial<ItemRevisao> & Pick<ItemRevisao, 'id' | 'tipo' | 'topicoId'>): ItemRevisao {
  return {
    facilidade: 2.5,
    repeticoes: 0,
    intervaloDias: 0,
    proximaRevisao: VENCIDA,
    atualizadoEm: '2000-01-01T00:00:00.000Z',
    ...parcial,
  };
}

function renderRevisao(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaRevisao />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.back as jest.Mock).mockClear();
  (router.push as jest.Mock).mockClear();
  mockNotificarEscrita.mockClear();
});

test('fila vazia mostra "Nada para revisar hoje" e oferece "Abrir o Guia"', async () => {
  const { getByText } = await renderRevisao(new MemoryProgressStore());
  await waitFor(() => {
    expect(getByText('Nada para revisar hoje')).toBeTruthy();
  });
  expect(getByText('Estude um tópico no Guia para semear a revisão')).toBeTruthy();

  await fireEvent.press(getByText('Abrir o Guia'));
  expect(router.push).toHaveBeenCalledWith('/');
});

test('sessão com 1 pergunta certa salva o item com repeticoes: 1 e mostra o resultado', async () => {
  const store = new MemoryProgressStore();
  await store.salvarItemRevisao(item({ id: 'pa-1', tipo: 'pergunta', topicoId: PA_ID }));

  const { getByText } = await renderRevisao(store);

  await waitFor(() => {
    expect(getByText('1 de 1')).toBeTruthy();
  });
  // pa-1: alternativa 0 é a correta.
  await fireEvent.press(getByText('2 a 3 mmHg por segundo'));

  await waitFor(() => {
    expect(getByText('Ver resultado')).toBeTruthy();
  });

  await waitFor(async () => {
    const itens = await store.listarItensRevisao();
    const atualizado = itens.find((i) => i.id === 'pa-1');
    expect(atualizado?.repeticoes).toBe(1);
  });

  await fireEvent.press(getByText('Ver resultado'));

  await waitFor(() => {
    expect(getByText('Revisão concluída')).toBeTruthy();
  });
  expect(getByText('1 acerto · 0 erros')).toBeTruthy();

  // pa-1 acabou de ser reagendado para amanhã (repeticoes: 1, intervaloDias:
  // 1) — a "próxima leva" deve contá-lo.
  await waitFor(() => {
    expect(getByText('Próxima leva: 1 item amanhã')).toBeTruthy();
  });

  await fireEvent.press(getByText('Voltar'));
  expect(router.back).toHaveBeenCalled();
});

test('responder um item chama notificarEscrita() (spec §3.2, gatilho de escrita de progresso)', async () => {
  const store = new MemoryProgressStore();
  await store.salvarItemRevisao(item({ id: 'pa-1', tipo: 'pergunta', topicoId: PA_ID }));

  const { getByText } = await renderRevisao(store);

  await waitFor(() => {
    expect(getByText('1 de 1')).toBeTruthy();
  });
  expect(mockNotificarEscrita).not.toHaveBeenCalled();

  await fireEvent.press(getByText('2 a 3 mmHg por segundo'));

  await waitFor(() => {
    expect(mockNotificarEscrita).toHaveBeenCalled();
  });
});

test('item de checklist usa EstacaoOsce e avalia ao concluir', async () => {
  const store = new MemoryProgressStore();
  const id = idDeChecklist(FC_ID, TITULO_CHECKLIST);
  await store.salvarItemRevisao(item({ id, tipo: 'checklist', topicoId: FC_ID }));

  const { getByText } = await renderRevisao(store);

  await waitFor(() => {
    expect(getByText(TITULO_CHECKLIST)).toBeTruthy();
  });

  for (let i = 0; i < 10; i++) {
    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));
  }

  await waitFor(() => {
    expect(getByText('100%')).toBeTruthy();
  });
  await waitFor(() => {
    expect(getByText('Ver resultado')).toBeTruthy();
  });

  const itens = await store.listarItensRevisao();
  const atualizado = itens.find((i) => i.id === id);
  expect(atualizado?.repeticoes).toBe(1);

  await fireEvent.press(getByText('Ver resultado'));
  await waitFor(() => {
    expect(getByText('Revisão concluída')).toBeTruthy();
  });
});
