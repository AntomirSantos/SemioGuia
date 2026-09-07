import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { EntitlementsProvider } from '../entitlements/EntitlementsContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { TelaQuestoes } from '../app/questoes';
import { TelaCasos } from '../app/casos';
import Plantao from '../app/(tabs)/plantao';
import Checklists from '../app/(tabs)/checklists';
import { CHAVE_ASSINATURA, serializar, umAnoDepois } from '../entitlements/assinatura';
import { hojeLocal } from '../revisao/hoje';
import type { ReactNode } from 'react';

// O paywall visto pelas listas (decisão do autor, 2026-09-06): o conteúdo dos
// oito sistemas pagos não some, aparece trancado, com o nome à vista. Estes
// testes vigiam justamente isso, porque esconder seria a regressão fácil.

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

function renderComAcesso(tela: ReactNode, store = new MemoryProgressStore()) {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <ProgressProvider store={store}>
          <EntitlementsProvider>{tela}</EntitlementsProvider>
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>,
  );
}

test('Questões tranca os tópicos dos sistemas pagos e deixa os gratuitos abertos', async () => {
  const { getByLabelText, getAllByLabelText } = await renderComAcesso(<TelaQuestoes />);
  await waitFor(() => {
    expect(getByLabelText('Pressão arterial, abrir')).toBeTruthy();
  });
  const trancados = getAllByLabelText(/da assinatura anual, ver o acesso completo$/);
  expect(trancados.length).toBeGreaterThan(0);
  expect(getByLabelText('Palpação do abdome, questões da assinatura anual, ver o acesso completo')).toBeTruthy();
});

test('Casos tranca os casos dos sistemas pagos', async () => {
  const { getAllByLabelText } = await renderComAcesso(<TelaCasos />);
  await waitFor(() => {
    expect(getAllByLabelText(/caso clínico da assinatura anual, ver o acesso completo$/).length).toBeGreaterThan(0);
  });
});

test('modo plantão tranca os verbetes dos sistemas pagos', async () => {
  const { getAllByLabelText } = await renderComAcesso(<Plantao />);
  await waitFor(() => {
    expect(
      getAllByLabelText(/verbete do plantão da assinatura anual, ver o acesso completo$/).length,
    ).toBeGreaterThan(0);
  });
});

test('Checklists tranca os roteiros dos sistemas pagos', async () => {
  const { getAllByLabelText } = await renderComAcesso(<Checklists />);
  await waitFor(() => {
    expect(getAllByLabelText(/checklist da assinatura anual, ver o acesso completo$/).length).toBeGreaterThan(0);
  });
});

test('com assinatura ativa, nada aparece trancado', async () => {
  const store = new MemoryProgressStore();
  const hoje = hojeLocal();
  await store.definirPreferencia(
    CHAVE_ASSINATURA,
    serializar({ origem: 'loja', validaAte: umAnoDepois(hoje), confirmadaEm: hoje, cancelada: false }),
  );
  const { getByLabelText, queryAllByLabelText } = await renderComAcesso(<TelaQuestoes />, store);
  await waitFor(() => {
    expect(getByLabelText('Palpação do abdome, abrir')).toBeTruthy();
  });
  expect(queryAllByLabelText(/da assinatura anual, ver o acesso completo$/)).toHaveLength(0);
});

// Teste com toque por último: a animação do Pressionavel deixa trabalho
// pendente que atrapalha os testes seguintes do mesmo arquivo.
test('tocar numa linha trancada leva à tela de assinatura', async () => {
  const { getByLabelText } = await renderComAcesso(<TelaQuestoes />);
  await waitFor(() => {
    expect(getByLabelText('Palpação do abdome, questões da assinatura anual, ver o acesso completo')).toBeTruthy();
  });
  await fireEvent.press(getByLabelText('Palpação do abdome, questões da assinatura anual, ver o acesso completo'));
  expect(router.push).toHaveBeenCalledWith('/assinatura');
});
