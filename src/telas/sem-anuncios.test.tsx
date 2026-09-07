import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { EntitlementsProvider } from '../entitlements/EntitlementsContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaSemAnuncios } from '../app/sem-anuncios';
import { BlocoAcesso } from '../entitlements/BlocoAcesso';
import { configurarLoja, lojaDeTeste } from '../entitlements/loja';
import { CHAVE_COMPRA, serializar } from '../entitlements/compra';
import { PRECO_SEM_ANUNCIOS } from '../config/paywall';

// A tela da compra única e o bloco "Seu acesso" do Perfil. A loja de verdade
// não existe aqui: o adaptador `lojaDeTeste` faz o papel dela, que é
// exatamente o motivo de o adaptador existir.

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({}),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

function renderTela(no: React.ReactNode, store = new MemoryProgressStore()) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <EntitlementsProvider>{no}</EntitlementsProvider>
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  configurarLoja(null);
});

test('sem compra, a tela mostra o preço e deixa claro que não é assinatura', async () => {
  const { getByText, getByLabelText } = await renderTela(<TelaSemAnuncios />);
  await waitFor(() => {
    expect(getByText(`${PRECO_SEM_ANUNCIOS}, uma vez só`)).toBeTruthy();
  });
  expect(getByText(/não renova, não é cobrado de novo e não vence/)).toBeTruthy();
  expect(getByLabelText(`Remover os anúncios por ${PRECO_SEM_ANUNCIOS}, uma vez só`)).toBeTruthy();
  expect(getByLabelText('Já comprei, restaurar')).toBeTruthy();
});

test('a tela conta o acervo aberto a partir do conteúdo compilado', async () => {
  const { getByText } = await renderTela(<TelaSemAnuncios />);
  await waitFor(() => {
    expect(getByText(/12 sistemas, com 55 tópicos revisados/)).toBeTruthy();
  });
  expect(getByText(/67 casos clínicos/)).toBeTruthy();
});

test('sem loja no aparelho, a tela avisa que a compra é pelo aplicativo', async () => {
  const { getByText } = await renderTela(<TelaSemAnuncios />);
  await waitFor(() => {
    expect(getByText(/A remoção dos anúncios se faz pelo/)).toBeTruthy();
  });
});

test('com a compra gravada, a tela mostra o estado em vez do botão', async () => {
  const store = new MemoryProgressStore();
  await store.definirPreferencia(
    CHAVE_COMPRA,
    serializar({ origem: 'loja', validaAte: null, confirmadaEm: '2026-09-07' }),
  );
  const { getByText, queryByLabelText } = await renderTela(<TelaSemAnuncios />, store);
  await waitFor(() => {
    expect(getByText('Anúncios removidos')).toBeTruthy();
  });
  expect(queryByLabelText(`Remover os anúncios por ${PRECO_SEM_ANUNCIOS}, uma vez só`)).toBeNull();
});

test('o Perfil mostra o estado com anúncios e o caminho para tirá-los', async () => {
  const { getByText, getByLabelText } = await renderTela(<BlocoAcesso />);
  await waitFor(() => {
    expect(getByText('Tudo aberto, com anúncios')).toBeTruthy();
  });
  expect(getByLabelText('Remover os anúncios')).toBeTruthy();
});

// Teste com toque por último: a animação do Pressionavel deixa trabalho
// pendente que atrapalha os testes seguintes do mesmo arquivo.
test('comprar pela loja grava a compra e tira os anúncios para sempre', async () => {
  configurarLoja(lojaDeTeste());
  const store = new MemoryProgressStore();
  const rotulo = `Remover os anúncios por ${PRECO_SEM_ANUNCIOS}, uma vez só`;
  const { getByLabelText, getByText } = await renderTela(<TelaSemAnuncios />, store);
  await waitFor(() => {
    expect(getByLabelText(rotulo)).toBeTruthy();
  });
  await fireEvent.press(getByLabelText(rotulo));
  await waitFor(() => {
    expect(getByText('Anúncios removidos')).toBeTruthy();
  });
  const gravado = await store.obterPreferencia(CHAVE_COMPRA);
  expect(gravado).toContain('"origem":"loja"');
  expect(gravado).toContain('"validaAte":null');
});
