import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { MemoryProgressStore } from '../progress/memoryStore';
import { Provedores } from '../testes/provedores';
import Plantao from '../app/(tabs)/plantao';
import { anunciosDeTeste, configurarAnuncios } from '../anuncios/anuncios';
import { CHAVE_COMPRA, serializar } from '../entitlements/compra';

// O regime de anúncios visto de dentro de uma tela (decisão do autor,
// 2026-09-07): a fundação abre sozinha, o resto abre com um anúncio, e a
// liberação vale numa aba só.

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

afterEach(() => {
  configurarAnuncios(null);
});

test('sem SDK de anúncios ligado, nada pede anúncio e tudo aparece', async () => {
  const { queryAllByText, getByText } = await render(
    <Provedores>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getByText('Modo plantão')).toBeTruthy();
  });
  expect(queryAllByText(/Um anúncio abre tudo isto/)).toHaveLength(0);
});

test('com anúncios ligados, os sistemas fora da fundação pedem um anúncio', async () => {
  configurarAnuncios(anunciosDeTeste());
  const { getAllByText, queryByLabelText } = await render(
    <Provedores>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getAllByText(/Um anúncio abre tudo isto/).length).toBeGreaterThan(0);
  });
  // Anamnese e Exame físico geral não aparecem entre os que pedem anúncio.
  expect(queryByLabelText(/abrir Anamnese no modo plantão/)).toBeNull();
  expect(queryByLabelText(/abrir Exame físico geral no modo plantão/)).toBeNull();
});

test('quem comprou a remoção não vê oferta de anúncio nenhuma', async () => {
  configurarAnuncios(anunciosDeTeste());
  const store = new MemoryProgressStore();
  await store.definirPreferencia(
    CHAVE_COMPRA,
    serializar({ origem: 'loja', validaAte: null, confirmadaEm: '2026-09-07' }),
  );
  const { queryAllByText, getByText } = await render(
    <Provedores store={store}>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getByText('Modo plantão')).toBeTruthy();
  });
  expect(queryAllByText(/Um anúncio abre tudo isto/)).toHaveLength(0);
});

// Teste com toque por último: a animação do Pressionavel deixa trabalho
// pendente que atrapalha os testes seguintes do mesmo arquivo.
test('assistir ao anúncio abre aquele sistema naquela aba', async () => {
  configurarAnuncios(anunciosDeTeste());
  const { getByLabelText, queryByLabelText } = await render(
    <Provedores>
      <Plantao />
    </Provedores>,
  );
  const rotulo = /Assistir a um anúncio para abrir Aparelho cardiovascular no modo plantão/;
  await waitFor(() => {
    expect(getByLabelText(rotulo)).toBeTruthy();
  });
  await fireEvent.press(getByLabelText(rotulo));
  await waitFor(() => {
    expect(queryByLabelText(rotulo)).toBeNull();
  });
});
