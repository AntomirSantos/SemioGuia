import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaQuestoes } from '../app/questoes';
import { router } from 'expo-router';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    useLocalSearchParams: () => ({}),
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

async function renderQuestoes() {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={new MemoryProgressStore()}>
          <TelaQuestoes />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
});

test('lista os tópicos com quiz por sistema e abre o verbete com o que cai', async () => {
  const { getByText, getAllByText, queryByText } = await renderQuestoes();

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
  expect(getByText('Frequência cardíaca e pulso')).toBeTruthy();
  expect(getByText('Temperatura e frequência respiratória')).toBeTruthy();
  // Subtítulo de cada linha fechada: quantas perguntas esperam o aluno.
  expect(getAllByText('5 perguntas').length).toBeGreaterThanOrEqual(3);

  // O verbete só abre ao toque, e aí traz o histórico e a ação principal.
  expect(queryByText('Nenhuma rodada ainda')).toBeNull();
  fireEvent.press(getByText('Pressão arterial'));
  await waitFor(() => {
    expect(getByText('Nenhuma rodada ainda')).toBeTruthy();
  });
  fireEvent.press(getByText('Começar as questões'));
  expect(router.push).toHaveBeenCalledWith(`/quiz/${PA_ID}`);
});

test('a busca filtra por título e avisa quando não há nada', async () => {
  const { getByLabelText, getByText, queryByText } = await renderQuestoes();
  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });

  fireEvent.changeText(getByLabelText('Buscar tópico com questões'), 'pressao arterial');
  await waitFor(() => {
    expect(queryByText('Temperatura e frequência respiratória')).toBeNull();
  });
  expect(getByText('Pressão arterial')).toBeTruthy();

  fireEvent.changeText(getByLabelText('Buscar tópico com questões'), 'zzxyq');
  await waitFor(() => {
    expect(getByText(/Nenhum tópico com esse termo/)).toBeTruthy();
  });
});
