import { render, waitFor } from '@testing-library/react-native';
import { MemoryProgressStore } from '../progress/memoryStore';
import { Provedores } from '../testes/provedores';
import Plantao from '../app/(tabs)/plantao';
import { anunciosDeTeste, configurarAnuncios } from '../anuncios/anuncios';
import { CHAVE_COMPRA, serializar } from '../entitlements/compra';

// Regra do autor (2026-09-07): estudar sem internet faz parte da compra.
// Este aparelho está sem rede o tempo todo.

jest.mock('expo-network', () => ({
  useNetworkState: () => ({ isConnected: false, isInternetReachable: false, type: 'NONE' }),
}));

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

test('sem internet e sem compra, o app pede conexão e oferece a saída', async () => {
  configurarAnuncios(anunciosDeTeste());
  const { getByText, getByLabelText } = await render(
    <Provedores>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getByText('Este aparelho está sem internet')).toBeTruthy();
  });
  expect(getByLabelText(/Ver a compra por/)).toBeTruthy();
});

test('quem comprou usa o app offline normalmente', async () => {
  configurarAnuncios(anunciosDeTeste());
  const store = new MemoryProgressStore();
  await store.definirPreferencia(
    CHAVE_COMPRA,
    serializar({ origem: 'loja', validaAte: null, confirmadaEm: '2026-09-07' }),
  );
  const { getByText, queryByText } = await render(
    <Provedores store={store}>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getByText('Modo plantão')).toBeTruthy();
  });
  expect(queryByText('Este aparelho está sem internet')).toBeNull();
});

test('sem o SDK de anúncios ligado, a falta de rede não barra ninguém', async () => {
  const { getByText, queryByText } = await render(
    <Provedores>
      <Plantao />
    </Provedores>,
  );
  await waitFor(() => {
    expect(getByText('Modo plantão')).toBeTruthy();
  });
  expect(queryByText('Este aparelho está sem internet')).toBeNull();
});
