import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaPerfil } from '../app/(tabs)/perfil';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    router: { push: jest.fn(), back: jest.fn() },
    // useFocusEffect fora de um navegador lançaria; roda o efeito ao montar,
    // como uma tela recém-focada.
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const PA_ID = 'exame-fisico-geral/sinais-vitais/pressao-arterial';

function renderPerfil(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <TelaPerfil />
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('mostra progresso "1 de 3 tópicos" para sistema com 1 tópico estudado', async () => {
  const store = new MemoryProgressStore();
  await store.marcarEstudado(PA_ID, true);

  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('1 de 3 tópicos')).toBeTruthy();
  });
});

test('mostra o aviso legal exato', async () => {
  const { getByText } = await renderPerfil(new MemoryProgressStore());

  await waitFor(() => {
    expect(getByText('Material educacional. Não substitui o julgamento clínico.')).toBeTruthy();
  });
});

test('tocar "Escuro" grava a preferência de tema no store', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'definirPreferencia');
  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('Escuro')).toBeTruthy();
  });
  fireEvent.press(getByText('Escuro'));

  expect(spy).toHaveBeenCalledWith('tema', 'escuro');
});

test('tocar "Grande" grava a preferência de fonte no store', async () => {
  const store = new MemoryProgressStore();
  const spy = jest.spyOn(store, 'definirPreferencia');
  const { getByText } = await renderPerfil(store);

  await waitFor(() => {
    expect(getByText('Grande')).toBeTruthy();
  });
  fireEvent.press(getByText('Grande'));

  expect(spy).toHaveBeenCalledWith('fonte', 'grande');
});
