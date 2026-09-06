import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { carregarConteudo } from '../content/store';
import { TelaCasos } from '../app/casos';
import { TelaCaso } from '../app/caso/[id]';
import type { Caso } from '../content/casoSchema';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    useLocalSearchParams: () => ({ id: 'caso-dor-toracica' }),
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// TelaCaso chama useSync() (notificarEscrita ao concluir o caso). O teste
// não monta SyncProvider (que exige AuthProvider), então mockamos como as
// telas mockam providers em outros arquivos (ex.: BlocoConta.test.tsx).
jest.mock('../sync/orquestrador', () => ({
  useSync: () => ({
    ultimaSync: null,
    sincronizando: false,
    erro: null,
    sincronizarAgora: jest.fn(async () => {}),
    notificarEscrita: jest.fn(),
  }),
}));

// Conteúdo real (Task 6 ainda não semeou casos): injetamos um caso próprio
// via ContentProvider (prop `conteudo`), do mesmo jeito que ProgressProvider
// aceita um `store` de teste.
const CASO_TESTE: Caso = {
  id: 'caso-dor-toracica',
  titulo: 'Dor torácica súbita',
  contexto: 'Homem de 58 anos chega à emergência com dor torácica intensa iniciada há 30 minutos.',
  tags: ['cardiovascular'],
  topicosDeApoio: ['sistema-cardiovascular/exame/ausculta-cardiaca'],
  referencias: ['Diretriz de Síndrome Coronariana Aguda'],
  revisao: 'aprovada',
  inicio: 'cena-1',
  nos: [
    {
      tipo: 'cena',
      id: 'cena-1',
      texto: 'Você é o primeiro a atender o paciente na sala de emergência.',
      dados: ['PA 90x60 mmHg', 'FC 118 bpm', 'SatO2 94%'],
      proximo: 'decisao-1',
    },
    {
      tipo: 'decisao',
      id: 'decisao-1',
      pergunta: 'Qual a conduta inicial mais adequada?',
      opcoes: [
        {
          texto: 'Solicitar ECG de 12 derivações imediatamente',
          avaliacao: 'otima',
          feedback: 'Conduta correta: o ECG imediato confirma ou exclui uma síndrome coronariana aguda.',
          proximo: 'desfecho-otimo',
        },
        {
          texto: 'Aguardar os exames laboratoriais antes de agir',
          avaliacao: 'erro',
          feedback: 'Atraso perigoso: em uma síndrome coronariana aguda, minutos importam.',
          proximo: 'desfecho-dano',
        },
      ],
    },
    {
      tipo: 'desfecho',
      id: 'desfecho-otimo',
      classe: 'otimo',
      texto: 'O ECG revelou supradesnivelamento de ST; o paciente foi encaminhado a tempo para reperfusão.',
      ensino: 'Na suspeita de síndrome coronariana aguda, o ECG deve ser feito em até 10 minutos da chegada.',
    },
    {
      tipo: 'desfecho',
      id: 'desfecho-dano',
      classe: 'dano',
      texto: 'O atraso na investigação levou à piora do quadro clínico do paciente.',
      ensino: 'Minutos importam: não atrase o ECG à espera de exames laboratoriais.',
    },
  ],
};

const CONTEUDO = carregarConteudo({ versao: '1', sistemas: [], casos: [CASO_TESTE] });

function renderCasos(store: MemoryProgressStore, casos?: Caso[]) {
  const conteudo = casos ? carregarConteudo({ versao: '1', sistemas: [], casos }) : CONTEUDO;
  return render(
    <ThemeProvider>
      <ContentProvider conteudo={conteudo}>
        <ProgressProvider store={store}>
          <TelaCasos />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

function renderCaso(store: MemoryProgressStore, casoId = CASO_TESTE.id) {
  return render(
    <ThemeProvider>
      <ContentProvider conteudo={CONTEUDO}>
        <ProgressProvider store={store}>
          <TelaCaso casoId={casoId} />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
  (router.back as jest.Mock).mockClear();
});

test('tela de Casos lista o caso, abre a cena ao tocar e navega em "Começar o caso"', async () => {
  const store = new MemoryProgressStore();
  const { getByText, queryByText } = await renderCasos(store);

  await waitFor(() => {
    expect(getByText(CASO_TESTE.titulo)).toBeTruthy();
  });
  // A linha nasce fechada: o contexto só aparece quando o caso é aberto.
  expect(queryByText(CASO_TESTE.contexto)).toBeNull();
  expect(getByText('1 decisão · não iniciado')).toBeTruthy();

  fireEvent.press(getByText(CASO_TESTE.titulo));
  await waitFor(() => {
    expect(getByText(CASO_TESTE.contexto)).toBeTruthy();
  });
  expect(getByText('Não iniciado')).toBeTruthy();
  // O caso do teste está aprovado: o selo de revisão pendente não aparece.
  expect(queryByText('Em revisão pelo autor')).toBeNull();

  fireEvent.press(getByText('Começar o caso'));
  expect(router.push).toHaveBeenCalledWith('/caso/caso-dor-toracica');
});

test('caso concluído com desfecho "otimo" mostra o melhor desfecho já na linha fechada', async () => {
  const store = new MemoryProgressStore();
  await store.registrarConclusaoCaso({
    casoId: CASO_TESTE.id,
    classe: 'otimo',
    otimas: 1,
    aceitaveis: 0,
    erros: 0,
    concluidaEm: Date.now(),
  });

  const { getByText } = await renderCasos(store);
  await waitFor(() => {
    expect(getByText('1 decisão · melhor desfecho: Ótimo')).toBeTruthy();
  });
  // E, aberto, o caso convida a refazer em vez de começar.
  fireEvent.press(getByText(CASO_TESTE.titulo));
  await waitFor(() => {
    expect(getByText('Melhor desfecho: Ótimo')).toBeTruthy();
  });
  expect(getByText('Refazer o caso')).toBeTruthy();
});

test('sem casos no conteúdo, a tela de Casos mostra estado vazio em vez de lista', async () => {
  const store = new MemoryProgressStore();
  const conteudoVazio = carregarConteudo({ versao: '1', sistemas: [], casos: [] });
  const { getByText, queryByText } = await render(
    <ThemeProvider>
      <ContentProvider conteudo={conteudoVazio}>
        <ProgressProvider store={store}>
          <TelaCasos />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
  await waitFor(() => {
    expect(getByText('0 casos · 0 concluídos')).toBeTruthy();
  });
  expect(queryByText(CASO_TESTE.titulo)).toBeNull();
});

test('player: cena mostra dados e avança para a decisão ao tocar Continuar', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderCaso(store);

  await waitFor(() => {
    expect(getByText('Você é o primeiro a atender o paciente na sala de emergência.')).toBeTruthy();
  });
  expect(getByText('PA 90x60 mmHg')).toBeTruthy();

  fireEvent.press(getByText('Continuar'));

  await waitFor(() => {
    expect(getByText('Qual a conduta inicial mais adequada?')).toBeTruthy();
  });
});

test('escolher a opção de erro mostra o feedback e "Seguir" leva ao desfecho de dano com o ensino visível, gravando 1 conclusão; refazer + concluir grava a 2ª', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderCaso(store);

  await waitFor(() => {
    expect(getByText('Continuar')).toBeTruthy();
  });
  fireEvent.press(getByText('Continuar'));

  await waitFor(() => {
    expect(getByText('Qual a conduta inicial mais adequada?')).toBeTruthy();
  });

  fireEvent.press(getByText('Aguardar os exames laboratoriais antes de agir'));

  await waitFor(() => {
    expect(getByText('Atraso perigoso: em uma síndrome coronariana aguda, minutos importam.')).toBeTruthy();
  });
  expect(getByText('Seguir')).toBeTruthy();

  fireEvent.press(getByText('Seguir'));

  await waitFor(() => {
    expect(getByText('Dano')).toBeTruthy();
  });
  expect(getByText('Minutos importam: não atrase o ECG à espera de exames laboratoriais.')).toBeTruthy();
  expect(getByText('O que este caso ensina')).toBeTruthy();

  // Trilha mostra a pergunta, a opção escolhida e a melhor conduta (já que a
  // escolhida não foi a ótima).
  expect(getByText('Qual a conduta inicial mais adequada?')).toBeTruthy();
  expect(getByText('Melhor conduta: Solicitar ECG de 12 derivações imediatamente')).toBeTruthy();

  await waitFor(async () => {
    const conclusoes = await store.listarConclusoesCasos(CASO_TESTE.id);
    expect(conclusoes).toHaveLength(1);
  });
  const [primeira] = await store.listarConclusoesCasos(CASO_TESTE.id);
  expect(primeira.classe).toBe('dano');

  fireEvent.press(getByText('Refazer o caso'));

  await waitFor(() => {
    expect(getByText('Você é o primeiro a atender o paciente na sala de emergência.')).toBeTruthy();
  });
  fireEvent.press(getByText('Continuar'));
  await waitFor(() => {
    expect(getByText('Qual a conduta inicial mais adequada?')).toBeTruthy();
  });
  fireEvent.press(getByText('Solicitar ECG de 12 derivações imediatamente'));
  await waitFor(() => {
    expect(getByText('Seguir')).toBeTruthy();
  });
  fireEvent.press(getByText('Seguir'));

  await waitFor(async () => {
    const conclusoes = await store.listarConclusoesCasos(CASO_TESTE.id);
    expect(conclusoes).toHaveLength(2);
  });
  const conclusoes = await store.listarConclusoesCasos(CASO_TESTE.id);
  expect(conclusoes[1].classe).toBe('otimo');
});

test('id de caso inexistente mostra tela vazia amigável com Voltar, sem quebrar', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderCaso(store, 'caso-que-nao-existe');

  await waitFor(() => {
    expect(getByText('Caso não encontrado')).toBeTruthy();
  });
  fireEvent.press(getByText('Voltar'));
  expect(router.back).toHaveBeenCalled();
});

test('caso ainda em revisão traz o selo "Em revisão pelo autor" ao ser aberto', async () => {
  const pendente = { ...CASO_TESTE, revisao: 'pendente' as const };
  const { getByText, queryByText } = await renderCasos(new MemoryProgressStore(), [pendente]);

  await waitFor(() => {
    expect(getByText(pendente.titulo)).toBeTruthy();
  });
  expect(queryByText('Em revisão pelo autor')).toBeNull();

  fireEvent.press(getByText(pendente.titulo));
  await waitFor(() => {
    expect(getByText('Em revisão pelo autor')).toBeTruthy();
  });
});
