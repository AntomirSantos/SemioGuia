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

// TelaTopico chama useSync() (notificarEscrita ao marcar estudado). O teste
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
  // Leitura por seções (Fase 8 §3.1): a tela abre só na 1ª seção
  // ("O essencial"), que não tem bloco de manobra — ele está na 2ª seção
  // ("Como aferir"). Navega antes de asserir, como orientado para testes
  // que dependiam de conteúdo fora da seção inicial. `await` no press: a
  // troca de seção dispara a transição de entrada (Animated), cujo efeito
  // só assenta na árvore depois de resolvido.
  await fireEvent.press(getByText('Próxima seção'));
  expect(getByText('Manobra')).toBeTruthy();
});

test('tópico inexistente mostra estado vazio amigável', async () => {
  const { getByText } = await renderTopico(new MemoryProgressStore(), 'sistema-inexistente/capitulo/topico');
  await waitFor(() => {
    expect(getByText('Tópico não encontrado')).toBeTruthy();
  });
  expect(getByText('Voltar')).toBeTruthy();
});

test('reflete estado já persistido no store ao montar', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(TOPICO_ID, true);
  await store.favoritar(TOPICO_ID, true);

  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Estudado')).toBeTruthy();
    expect(getByText('Favoritado')).toBeTruthy();
  });
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

test('marcar como estudado semeia a revisão espaçada com os itens do tópico', async () => {
  const store = new MemoryProgressStore();
  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Pressão arterial')).toBeTruthy();
  });

  fireEvent.press(getByText('Marcar estudado'));

  await waitFor(async () => {
    const itens = await store.listarItensRevisao();
    expect(itens.length).toBeGreaterThan(0);
  });

  const itens = await store.listarItensRevisao();
  // Quiz de PA tem 5 perguntas e nenhum checklist.
  expect(itens).toHaveLength(5);
  expect(itens.every((i) => i.topicoId === TOPICO_ID && i.tipo === 'pergunta')).toBe(true);
});

test('desmarcar como estudado não semeia novos itens de revisão', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(TOPICO_ID, true);
  const { getByText } = await renderTopico(store);

  await waitFor(() => {
    expect(getByText('Estudado')).toBeTruthy();
  });

  fireEvent.press(getByText('Estudado'));

  await waitFor(() => {
    expect(getByText('Marcar estudado')).toBeTruthy();
  });
  const itens = await store.listarItensRevisao();
  expect(itens).toHaveLength(0);
});

// Leitura por seções — spec Fase 8 §3.1/§3.2.
describe('leitura por seções', () => {
  test('abre na 1ª seção, com a chip correspondente marcada como selecionada', async () => {
    const { getByText, getAllByRole } = await renderTopico(new MemoryProgressStore());

    await waitFor(() => {
      expect(getByText('Pressão arterial')).toBeTruthy();
    });

    const abas = getAllByRole('tab');
    expect(abas[0].props.accessibilityState?.selected).toBe(true);
    expect(abas.slice(1).every((aba) => aba.props.accessibilityState?.selected === false)).toBe(true);
    expect(getByText('Seção 1 de 5')).toBeTruthy();

    // Conteúdo da 2ª seção ("Como aferir") não está no DOM ainda.
    expect(() => getByText('Manobra')).toThrow();
  });

  test('tocar numa chip do sumário navega para a seção e atualiza a seleção e o indicador', async () => {
    const { getByText, getAllByRole } = await renderTopico(new MemoryProgressStore());

    await waitFor(() => {
      expect(getByText('Pressão arterial')).toBeTruthy();
    });

    // `await`: a troca de seção dispara EntradaAnimada (fade + deslize via
    // Animated), cujo efeito de montagem só assenta na árvore depois de
    // resolvido — sem isso a asserção seguinte roda contra a árvore antiga.
    await fireEvent.press(getByText('Classificação'));

    expect(getByText('Seção 3 de 5')).toBeTruthy();
    expect(getByText('Como ler a tabela')).toBeTruthy();

    const abas = getAllByRole('tab');
    expect(abas[2].props.accessibilityState?.selected).toBe(true);
    expect(abas[0].props.accessibilityState?.selected).toBe(false);
  });

  test('"Próxima seção" e "Seção anterior" avançam e recuam uma seção por vez', async () => {
    const { getByText, queryByText } = await renderTopico(new MemoryProgressStore());

    await waitFor(() => {
      expect(getByText('Pressão arterial')).toBeTruthy();
    });
    expect(queryByText('Seção anterior')).toBeNull();

    await fireEvent.press(getByText('Próxima seção'));
    expect(getByText('Seção 2 de 5')).toBeTruthy();

    await fireEvent.press(getByText('Seção anterior'));
    expect(getByText('Seção 1 de 5')).toBeTruthy();
    expect(queryByText('Seção anterior')).toBeNull();
  });

  test('bloco nível avançado dentro de uma seção continua atrás do "Aprofundar"', async () => {
    const { getAllByText, getByText, queryByText } = await renderTopico(new MemoryProgressStore());

    await waitFor(() => {
      expect(getByText('Pressão arterial')).toBeTruthy();
    });
    await fireEvent.press(getByText('Próxima seção')); // "Como aferir", tem 2 conceitos nível avançado

    const gatilhos = getAllByText('Aprofundar · Conceito');
    expect(gatilhos.length).toBe(2);
    expect(queryByText('As cinco fases, uma a uma')).toBeNull();

    await fireEvent.press(gatilhos[0]);

    expect(getByText('As cinco fases, uma a uma')).toBeTruthy();
    // Revisão de fase P3b: o Conceito revelado não duplica a identidade —
    // "Aprofundar · Conceito" já basta, sem um "Conceito" solto dentro.
    expect(queryByText('Conceito')).toBeNull();
  });
});
