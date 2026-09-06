import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaEstudar } from '../app/(tabs)/estudar';
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

async function renderEstudar() {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={new MemoryProgressStore()}>
          <TelaEstudar />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
});

// Arquivo próprio para os toques nos caminhos: o trabalho de animação que o
// Pressionavel deixa pendente depois de um press atrasava os testes seguintes
// quando estes moravam junto dos testes de quiz.
test('o hub oferece os dois caminhos e cada um leva à sua tela', async () => {
  const { getByText, queryByText } = await renderEstudar();

  await waitFor(() => {
    expect(getByText('Questões')).toBeTruthy();
  });
  expect(getByText('Casos clínicos')).toBeTruthy();
  // Os roteiros de exame moram na aba Checklists, não aqui.
  expect(queryByText('Estações OSCE')).toBeNull();
  expect(getByText(/aba própria: Checklists/)).toBeTruthy();

  fireEvent.press(getByText('Questões'));
  expect(router.push).toHaveBeenCalledWith('/questoes');

  fireEvent.press(getByText('Casos clínicos'));
  expect(router.push).toHaveBeenCalledWith('/casos');
});
