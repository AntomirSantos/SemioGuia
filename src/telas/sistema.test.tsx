import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import TelaSistema from '../app/sistema/[sistemaId]';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    useLocalSearchParams: () => ({ sistemaId: 'exame-fisico-geral' }),
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderSistema(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaSistema />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('mostra os capítulos com contagem "estudados de total"', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByText } = await renderSistema(store);

  await waitFor(() => {
    expect(getByText('Sinais vitais')).toBeTruthy();
  });
  expect(getByText('1 de 3 estudados')).toBeTruthy();
});

test('capítulo sem nenhum tópico estudado mostra "0 de N estudados"', async () => {
  const { getByText } = await renderSistema(new MemoryProgressStore());

  await waitFor(() => {
    expect(getByText('0 de 3 estudados')).toBeTruthy();
  });
});

test('tópico estudado tem o rótulo de acessibilidade ", estudado" e tópico não estudado não tem', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByLabelText, queryByLabelText } = await renderSistema(store);

  await waitFor(() => {
    expect(getByLabelText('Pressão arterial, estudado')).toBeTruthy();
  });
  expect(queryByLabelText('Pressão arterial')).toBeNull();
});

test('tocar num tópico navega para a tela do tópico', async () => {
  const { getByText } = await renderSistema(new MemoryProgressStore());

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
  fireEvent.press(getByText('Pressão arterial'));

  expect(router.push).toHaveBeenCalledWith(`/topico/${PA_ID}`);
});
