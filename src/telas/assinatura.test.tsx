import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { EntitlementsProvider } from '../entitlements/EntitlementsContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaAssinatura } from '../app/assinatura';
import { BlocoAcesso } from '../entitlements/BlocoAcesso';
import { configurarLoja, lojaDeTeste } from '../entitlements/loja';
import { CHAVE_ASSINATURA, serializar, umAnoDepois } from '../entitlements/assinatura';
import { hojeLocal } from '../revisao/hoje';
import { PRECO_LANCAMENTO } from '../config/paywall';

// A tela de compra e o bloco "Seu acesso" do Perfil. A loja de verdade não
// existe aqui: o adaptador `lojaDeTeste` faz o papel dela, que é exatamente o
// motivo de o adaptador existir.

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

test('sem assinatura, a tela mostra o preço, o que abre e como cancelar', async () => {
  const { getByText, getByLabelText } = await renderTela(<TelaAssinatura />);
  await waitFor(() => {
    expect(getByText(`${PRECO_LANCAMENTO} no primeiro ano`)).toBeTruthy();
  });
  expect(getByText(/renovação automática/)).toBeTruthy();
  expect(getByText(/Cancele quando quiser/)).toBeTruthy();
  expect(getByLabelText(`Assinar por ${PRECO_LANCAMENTO} no primeiro ano`)).toBeTruthy();
  expect(getByLabelText('Já assinei, restaurar acesso')).toBeTruthy();
});

test('sem loja no aparelho, a tela avisa que a compra é pelo aplicativo', async () => {
  const { getByText } = await renderTela(<TelaAssinatura />);
  await waitFor(() => {
    expect(getByText(/O acesso completo se assina pelo aplicativo/)).toBeTruthy();
  });
});

test('com assinatura ativa gravada, a tela mostra o estado em vez do botão de compra', async () => {
  const store = new MemoryProgressStore();
  const hoje = hojeLocal();
  await store.definirPreferencia(
    CHAVE_ASSINATURA,
    serializar({ origem: 'loja', validaAte: umAnoDepois(hoje), confirmadaEm: hoje, cancelada: false }),
  );
  const { getByText, queryByLabelText } = await renderTela(<TelaAssinatura />, store);
  await waitFor(() => {
    expect(getByText('Assinatura ativa')).toBeTruthy();
  });
  expect(queryByLabelText(`Assinar por ${PRECO_LANCAMENTO} no primeiro ano`)).toBeNull();
});

test('o Perfil mostra "Acesso gratuito" e o caminho para o acesso completo', async () => {
  const { getByText, getByLabelText } = await renderTela(<BlocoAcesso />);
  await waitFor(() => {
    expect(getByText('Acesso gratuito')).toBeTruthy();
  });
  expect(getByText(/quatro sistemas completos/)).toBeTruthy();
  expect(getByLabelText('Ver o acesso completo')).toBeTruthy();
});

// Testes com toque ficam por último: a animação do Pressionavel deixa
// trabalho pendente que atrapalha os testes seguintes do mesmo arquivo.
test('assinar pela loja grava a assinatura e libera o acesso completo', async () => {
  configurarLoja(lojaDeTeste());
  const store = new MemoryProgressStore();
  const { getByLabelText, getByText } = await renderTela(<TelaAssinatura />, store);
  await waitFor(() => {
    expect(getByLabelText(`Assinar por ${PRECO_LANCAMENTO} no primeiro ano`)).toBeTruthy();
  });
  await fireEvent.press(getByLabelText(`Assinar por ${PRECO_LANCAMENTO} no primeiro ano`));
  await waitFor(() => {
    expect(getByText('Assinatura ativa')).toBeTruthy();
  });
  expect(await store.obterPreferencia(CHAVE_ASSINATURA)).toContain('"origem":"loja"');
});
