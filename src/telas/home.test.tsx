import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import Guia from '../app/(tabs)/index';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    // useFocusEffect fora de um navegador lançaria; roda o efeito ao montar,
    // como uma tela recém-focada (mesmo mock de perfil.test.tsx).
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderHome(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <Guia />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('cartão de sistema mostra progresso "estudados de total tópicos"', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByText } = await renderHome(store);

  await waitFor(() => {
    expect(getByText('1 de 7 tópicos')).toBeTruthy();
  });
});

test('cartão de sistema sem nenhum tópico estudado mostra "0 de N"', async () => {
  const { getByText } = await renderHome(new MemoryProgressStore());

  await waitFor(() => {
    expect(getByText('0 de 7 tópicos')).toBeTruthy();
  });
});

test('barra de progresso do sistema expõe accessibilityRole e valor', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByRole } = await renderHome(store);

  // `getByRole('progressbar')` só encontra o elemento porque a View leva
  // `accessible` — sem isso, RNTL (e o leitor de tela real) nunca expõe o
  // role/valor como um controle distinto, mesmo com accessibilityRole
  // presente. Filtra pelo `name` (accessibilityLabel) porque há uma barra
  // por sistema (uma para cada sistema do guia).
  const barra = await waitFor(() => getByRole('progressbar', { name: '1 de 7 tópicos estudados' }));
  expect(barra.props.accessibilityValue).toEqual({ min: 0, max: 7, now: 1 });
});

test('sem "ultimoTopico" salvo, não mostra o cartão "Continuar de onde parou"', async () => {
  const { queryByText } = await renderHome(new MemoryProgressStore());

  await waitFor(() => {
    // espera o resto da tela assentar antes de checar a ausência.
    expect(queryByText('SemioGuia')).toBeTruthy();
  });
  expect(queryByText('Continuar de onde parou')).toBeNull();
});

test('com "ultimoTopico" salvo, mostra o cartão e navega para o tópico ao tocar', async () => {
  const store = new MemoryProgressStore();
  await store.definirPreferencia('ultimoTopico', PA_ID);

  const { getAllByText, getByText } = await renderHome(store);

  await waitFor(() => {
    expect(getByText('Continuar de onde parou')).toBeTruthy();
  });
  expect(getByText('Pressão arterial')).toBeTruthy();
  // "Exame físico geral" aparece 2x (cartão "Continuar" + cartão do próprio
  // sistema na grade) — confirma só a presença, sem exigir unicidade.
  expect(getAllByText('Exame físico geral').length).toBe(2);

  fireEvent.press(getByText('Pressão arterial'));

  expect(router.push).toHaveBeenCalledWith(`/topico/${PA_ID}`);
});

test('"ultimoTopico" apontando para um id inexistente não quebra a tela nem mostra o cartão', async () => {
  const store = new MemoryProgressStore();
  await store.definirPreferencia('ultimoTopico', 'sistema-removido/capitulo/topico');

  const { queryByText, getByText } = await renderHome(store);

  await waitFor(() => {
    expect(getByText('SemioGuia')).toBeTruthy();
  });
  expect(queryByText('Continuar de onde parou')).toBeNull();
});
