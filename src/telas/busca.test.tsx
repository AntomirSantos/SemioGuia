import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaBusca } from '../app/(tabs)/busca';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderBusca(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaBusca />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
});

test('digitar "PA" encontra Pressão arterial', async () => {
  const { getByLabelText, getByText } = await renderBusca(new MemoryProgressStore());
  const campo = getByLabelText('Buscar sinal, manobra ou tópico');

  fireEvent.changeText(campo, 'PA');

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
});

test('tocar um resultado registra a busca e navega ao tópico', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'registrarBusca');
  const { getByLabelText, getByText } = await renderBusca(store);
  const campo = getByLabelText('Buscar sinal, manobra ou tópico');

  fireEvent.changeText(campo, 'pressao');

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });

  fireEvent.press(getByText('Pressão arterial'));

  expect(spy).toHaveBeenCalledWith('pressao');
  expect(router.push).toHaveBeenCalledWith('/topico/' + PA_ID);
});

test('campo vazio mostra recentes e favoritos', async () => {
  const store = new MemoryProgressStore();
  await store.favoritar(PA_ID, true);
  await store.registrarBusca('osler');

  const { getByText } = await renderBusca(store);

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
  expect(getByText('osler')).toBeTruthy();
  expect(getByText('Recentes')).toBeTruthy();
  expect(getByText('Favoritos')).toBeTruthy();
});

test('termo sem resultado mostra estado vazio amigável', async () => {
  const { getByLabelText, getByText } = await renderBusca(new MemoryProgressStore());
  const campo = getByLabelText('Buscar sinal, manobra ou tópico');

  fireEvent.changeText(campo, 'zzzzzzz');

  await waitFor(() => {
    expect(getByText('Nada com esse nome. Tente o epônimo ou uma sigla.')).toBeTruthy();
  });
});

test('tocar uma busca recente re-executa a busca preenchendo o campo', async () => {
  const store = new MemoryProgressStore();
  await store.registrarBusca('pressao');

  const { getByLabelText, getByText } = await renderBusca(store);

  await waitFor(() => {
    expect(getByText('pressao')).toBeTruthy();
  });

  fireEvent.press(getByText('pressao'));

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
});
