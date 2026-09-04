import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaOnboarding } from '../app/onboarding';
import { aguardarAnalytics, configurarAnalytics, reiniciarAnalytics } from '../analytics/analytics';
import { MemoryEventosStore } from '../analytics/memoryEventos';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../sync/orquestrador', () => ({
  useSync: () => ({
    ultimaSync: null,
    sincronizando: false,
    erro: null,
    sincronizarAgora: jest.fn(async () => {}),
    notificarEscrita: jest.fn(),
  }),
}));

function renderOnboarding(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaOnboarding />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.replace as jest.Mock).mockClear();
});

afterEach(() => {
  reiniciarAnalytics();
});

test('percorre os 3 passos e "Começar" com data válida grava preferências e emite o evento', async () => {
  const eventos = new MemoryEventosStore();
  configurarAnalytics({ store: eventos });
  const store = new MemoryProgressStore();
  const { getByText, getByLabelText } = await renderOnboarding(store);

  expect(getByText('Passo 1 de 3')).toBeTruthy();
  await fireEvent.changeText(getByLabelText('Período do curso'), '4º período');
  await fireEvent.press(getByText('Próxima'));
  await waitFor(() => expect(getByText('Passo 2 de 3')).toBeTruthy());
  await fireEvent.changeText(getByLabelText('Faculdade'), 'UFPB');
  await fireEvent.press(getByText('Próxima'));
  await waitFor(() => expect(getByText('Passo 3 de 3')).toBeTruthy());

  await fireEvent.changeText(getByLabelText('Data da prova'), '07/10/2026');
  await fireEvent.press(getByText('Aparelho cardiovascular'));
  await fireEvent.press(getByText('Começar'));

  await waitFor(() => {
    expect(router.replace).toHaveBeenCalledWith('/');
  });
  expect(await store.obterPreferencia('onboarding')).toBe('concluido');
  expect(await store.obterPreferencia('periodo')).toBe('4º período');
  expect(await store.obterPreferencia('faculdade')).toBe('UFPB');
  expect(await store.obterPreferencia('dataProva')).toBe('2026-10-07');
  expect(await store.obterPreferencia('sistemaProva')).toBe('aparelho-cardiovascular');

  await aguardarAnalytics();
  const registrados = await eventos.listar();
  expect(registrados.map((e) => e.evento)).toEqual(['onboarding_concluido']);
  expect(registrados[0].propriedades).toEqual({
    periodo: '4º período',
    faculdade: 'UFPB',
    dataProva: '2026-10-07',
    sistemaProva: 'aparelho-cardiovascular',
  });
});

test('data inválida mostra erro e não conclui', async () => {
  const store = new MemoryProgressStore();
  const { getByText, getByLabelText } = await renderOnboarding(store);

  await fireEvent.press(getByText('Próxima'));
  await fireEvent.press(getByText('Próxima'));
  await fireEvent.changeText(getByLabelText('Data da prova'), '31/02/2026');
  await fireEvent.press(getByText('Começar'));

  await waitFor(() => {
    expect(getByText('Data inválida: use o formato DD/MM/AAAA.')).toBeTruthy();
  });
  expect(router.replace).not.toHaveBeenCalled();
  expect(await store.obterPreferencia('onboarding')).toBeNull();
});

test('"Deixar para depois" conclui sem data', async () => {
  const eventos = new MemoryEventosStore();
  configurarAnalytics({ store: eventos });
  const store = new MemoryProgressStore();
  const { getByText } = await renderOnboarding(store);

  await fireEvent.press(getByText('Próxima'));
  await fireEvent.press(getByText('Próxima'));
  await fireEvent.press(getByText('Deixar para depois'));

  await waitFor(() => {
    expect(router.replace).toHaveBeenCalledWith('/');
  });
  expect(await store.obterPreferencia('onboarding')).toBe('concluido');
  expect(await store.obterPreferencia('dataProva')).toBeNull();

  await aguardarAnalytics();
  expect((await eventos.listar())[0].propriedades).toEqual({
    periodo: '',
    faculdade: '',
    dataProva: '',
    sistemaProva: '',
  });
});
