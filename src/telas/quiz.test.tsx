import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaQuiz } from '../app/quiz/[...caminho]';
import { TelaEstudar } from '../app/(tabs)/estudar';
import { router } from 'expo-router';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    useLocalSearchParams: () => ({ caminho: ['exame-fisico-geral', 'sinais-vitais', 'pressao-arterial'] }),
    // useFocusEffect fora de um navegador lançaria; roda o efeito ao montar,
    // como uma tela recém-focada.
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

// Primeira alternativa (índice 0) de cada uma das 5 perguntas do quiz de PA,
// na ordem em que aparecem no conteúdo.
const PRIMEIRAS_ALTERNATIVAS = [
  '2 a 3 mmHg por segundo',
  'Superestima a PA',
  'Estimar a sistólica pelo método palpatório antes de auscultar',
  'Pré-hipertensão',
  'Considerar a diastólica igual a zero',
];

function renderQuiz(store: MemoryProgressStore, topicoId: string = PA_ID) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaQuiz topicoId={topicoId} />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

function renderEstudar(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaEstudar />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
  (router.back as jest.Mock).mockClear();
});

test('responder as 5 perguntas do quiz de PA leva ao resultado e persiste as respostas', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderQuiz(store);

  await waitFor(() => {
    expect(getByText('1 de 5')).toBeTruthy();
  });

  for (let i = 0; i < PRIMEIRAS_ALTERNATIVAS.length; i++) {
    const ultima = i === PRIMEIRAS_ALTERNATIVAS.length - 1;
    await fireEvent.press(getByText(PRIMEIRAS_ALTERNATIVAS[i]));

    await waitFor(() => {
      expect(getByText(ultima ? 'Ver resultado' : 'Próxima')).toBeTruthy();
    });
    await fireEvent.press(getByText(ultima ? 'Ver resultado' : 'Próxima'));

    if (!ultima) {
      await waitFor(() => {
        expect(getByText(`${i + 2} de 5`)).toBeTruthy();
      });
    }
  }

  await waitFor(() => {
    expect(getByText('Resultado')).toBeTruthy();
  });
  expect(getByText('3 de 5 corretas')).toBeTruthy();

  const respostas = await store.listarRespostas(PA_ID);
  expect(respostas).toHaveLength(5);
  respostas.forEach((r) => {
    expect(r.respondidaEm).toBeGreaterThan(0);
  });
});

test('tópico inexistente mostra estado vazio amigável', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderQuiz(store, 'sistema-inexistente/capitulo/topico');

  await waitFor(() => {
    expect(getByText('Tópico não encontrado')).toBeTruthy();
  });
  expect(getByText('Voltar')).toBeTruthy();
});

test('aba Estudar lista os 3 tópicos com quiz e o número de perguntas', async () => {
  const store = new MemoryProgressStore();
  const { getByText, getAllByText } = await renderEstudar(store);

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });
  expect(getByText('Frequência cardíaca e pulso')).toBeTruthy();
  expect(getByText('Temperatura e frequência respiratória')).toBeTruthy();
  expect(getAllByText('5 perguntas')).toHaveLength(3);
});
