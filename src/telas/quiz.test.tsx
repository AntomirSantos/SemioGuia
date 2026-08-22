import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaQuiz } from '../app/quiz/[...caminho]';
import { TelaEstudar } from '../app/(tabs)/estudar';
import { router } from 'expo-router';
import type { ItemRevisao } from '../revisao/sm2';

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

  // Quiz avulso também alimenta o agendador SM-2 de cada pergunta respondida.
  const itens = await store.listarItensRevisao();
  expect(itens).toHaveLength(5);
  const pa1 = itens.find((i) => i.id === 'pa-1');
  expect(pa1?.tipo).toBe('pergunta');
  expect(pa1?.topicoId).toBe(PA_ID);
  expect(pa1?.repeticoes).toBe(1);
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

test('card "Revisão de hoje" mostra a contagem de itens vencidos e navega para /revisao ao tocar', async () => {
  const store = new MemoryProgressStore();
  const vencido: ItemRevisao = {
    id: 'pa-1',
    tipo: 'pergunta',
    topicoId: PA_ID,
    facilidade: 2.5,
    repeticoes: 0,
    intervaloDias: 0,
    proximaRevisao: '2000-01-01',
    atualizadoEm: '2000-01-01T00:00:00.000Z',
  };
  await store.salvarItemRevisao(vencido);

  const { getByText } = await renderEstudar(store);

  await waitFor(() => {
    expect(getByText('Revisão de hoje')).toBeTruthy();
  });
  await waitFor(() => {
    expect(getByText('1 pergunta · 0 estações')).toBeTruthy();
  });

  fireEvent.press(getByText('1 pergunta · 0 estações'));
  expect(router.push).toHaveBeenCalledWith('/revisao');
});

test('card "Revisão de hoje" vazio mostra "Nada para revisar hoje" sem navegação', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderEstudar(store);

  await waitFor(() => {
    expect(getByText('Nada para revisar hoje')).toBeTruthy();
  });
  expect(getByText('Estude um tópico no Guia para semear a revisão')).toBeTruthy();

  fireEvent.press(getByText('Nada para revisar hoje'));
  expect(router.push).not.toHaveBeenCalledWith('/revisao');
});
