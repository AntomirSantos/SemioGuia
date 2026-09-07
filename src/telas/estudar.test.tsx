import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { MemoryProgressStore } from '../progress/memoryStore';
import { Provedores } from '../testes/provedores';
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
    <Provedores store={new MemoryProgressStore()}>
      <TelaEstudar />
    </Provedores>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
});

// Arquivo próprio para os toques nos caminhos: o trabalho de animação que o
// Pressionavel deixa pendente depois de um press atrasava os testes seguintes
// quando estes moravam junto dos testes de quiz.
// Regressão relatada pelo autor (2026-09-07): o hub anunciava só os casos
// liberados e a tela de Casos mostrava o acervo inteiro. O número da porta
// tem que bater com o que se vê ao entrar. Com o corte por sistema desligado
// (monetização por anúncios), isso quer dizer o acervo inteiro dos dois lados
// e nenhuma menção a conteúdo liberado.
test('o hub conta o acervo inteiro', async () => {
  const conteudo = carregarConteudo(require('../../assets/generated/content.json'));
  const totalCasos = listarCasosDeEstudo(conteudo).length;
  const totalTopicos = listarQuestoes(conteudo).length;
  const { getByText, queryByText } = await renderEstudar();
  await waitFor(() => {
    expect(getByText(new RegExp(`^${totalCasos} casos`))).toBeTruthy();
  });
  expect(getByText(new RegExp(`^${totalTopicos} tópicos`))).toBeTruthy();
  // Nada está trancado hoje, então a conta não fala em conteúdo liberado.
  expect(queryByText(/liberados agora/)).toBeNull();
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
