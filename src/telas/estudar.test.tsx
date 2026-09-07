import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { EntitlementsProvider } from '../entitlements/EntitlementsContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaEstudar } from '../app/(tabs)/estudar';
import { carregarConteudo } from '../content/store';
import { listarCasosDeEstudo, listarQuestoes } from '../estudo/listas';
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
          <EntitlementsProvider>
            <TelaEstudar />
          </EntitlementsProvider>
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
// Regressão relatada pelo autor (2026-09-07): o hub anunciava só os casos
// liberados e a tela de Casos mostrava o acervo inteiro, com os pagos
// trancados. O número da porta tem que bater com o que se vê ao entrar.
test('o hub conta o acervo inteiro e diz separadamente quanto está liberado', async () => {
  const conteudo = carregarConteudo(require('../../assets/generated/content.json'));
  const totalCasos = listarCasosDeEstudo(conteudo).length;
  const totalTopicos = listarQuestoes(conteudo).length;
  const { getByText, getAllByText } = await renderEstudar();
  await waitFor(() => {
    expect(getByText(new RegExp(`^${totalCasos} casos`))).toBeTruthy();
  });
  expect(getByText(new RegExp(`^${totalTopicos} tópicos`))).toBeTruthy();
  // Sem assinatura, parte do acervo está trancada, e a conta precisa dizer isso.
  expect(getAllByText(/liberados agora/)).toHaveLength(2);
});

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
