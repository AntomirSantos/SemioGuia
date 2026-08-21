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
