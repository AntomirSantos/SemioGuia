import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaTopico } from '../app/topico/[...caminho]';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({ caminho: ['exame-fisico-geral', 'sinais-vitais', 'pressao-arterial'] }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const TOPICO_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderTopico(store: MemoryProgressStore, topicoId: string = TOPICO_ID) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaTopico topicoId={topicoId} />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('renderiza o título do tópico e um bloco', async () => {
  const { getByText } = await renderTopico(new MemoryProgressStore());
  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
  expect(getByText('Manobra')).toBeTruthy();
});

test('tópico inexistente mostra estado vazio amigável', async () => {
  const { getByText } = await renderTopico(new MemoryProgressStore(), 'sistema-inexistente/capitulo/topico');
  await waitFor(() => {
    expect(getByText('Tópico não encontrado')).toBeTruthy();
  });
  expect(getByText('Voltar')).toBeTruthy();
});

test('reflete estado já persistido no store ao montar', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(TOPICO_ID, true);
  await store.favoritar(TOPICO_ID, true);

  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Estudado')).toBeTruthy();
    expect(getByText('Favoritado')).toBeTruthy();
  });
});

test('pressionar "marcar estudado" chama o store injetado', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'marcarEstudado');
  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });

  fireEvent.press(getByText('Marcar estudado'));

  expect(spy).toHaveBeenCalledWith(TOPICO_ID, true);
});

test('marcar como estudado semeia a revisão espaçada com os itens do tópico', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });

  fireEvent.press(getByText('Marcar estudado'));

  await waitFor(async () => {
    const itens = await store.listarItensRevisao();
    expect(itens.length).toBeGreaterThan(0);
  });

  const itens = await store.listarItensRevisao();
  // Quiz de PA tem 5 perguntas e nenhum checklist.
  expect(itens).toHaveLength(5);
  expect(itens.every((i) => i.topicoId === TOPICO_ID && i.tipo === 'pergunta')).toBe(true);
});

test('desmarcar como estudado não semeia novos itens de revisão', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(TOPICO_ID, true);
  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Estudado')).toBeTruthy();
  });

  fireEvent.press(getByText('Estudado'));

  await waitFor(() => {
    expect(getByText('Marcar estudado')).toBeTruthy();
  });
  const itens = await store.listarItensRevisao();
  expect(itens).toHaveLength(0);
});
