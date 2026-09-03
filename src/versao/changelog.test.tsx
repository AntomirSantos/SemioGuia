import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import { VERSAO_APP } from '../config/versao';
import { CHANGELOG, changelogConsistente, gerarMarkdownChangelog, linhasMaisRecentes } from './changelog';
import { CartaoOQueMudou } from './CartaoOQueMudou';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

test('a entrada mais recente do changelog é a versão corrente do app', () => {
  expect(changelogConsistente(CHANGELOG)).toBe(true);
  expect(CHANGELOG[0].linhas.length).toBeGreaterThanOrEqual(3);
});

test('linhasMaisRecentes devolve até 3 linhas da entrada do topo', () => {
  expect(linhasMaisRecentes(CHANGELOG)).toEqual(CHANGELOG[0].linhas.slice(0, 3));
  expect(linhasMaisRecentes([])).toEqual([]);
});

test('gerarMarkdownChangelog produz um cabeçalho e uma seção por entrada', () => {
  const md = gerarMarkdownChangelog(CHANGELOG);
  expect(md.startsWith('# Changelog')).toBe(true);
  for (const e of CHANGELOG) {
    expect(md).toContain(`## ${e.versao} — ${e.data}`);
    expect(md).toContain(`- ${e.linhas[0]}`);
  }
});

function renderCartao(store: MemoryProgressStore) {
  return render(
    <ThemeProvider>
      <ProgressProvider store={store}>
        <CartaoOQueMudou />
      </ProgressProvider>
    </ThemeProvider>,
  );
}

test('após atualização (versaoVista antiga), mostra o cartão uma vez e grava a versão corrente', async () => {
  const store = new MemoryProgressStore();
  await store.definirPreferencia('versaoVista', '0.9.0');

  const { getByText } = await renderCartao(store);
  await waitFor(() => {
    expect(getByText(`O que mudou na versão ${VERSAO_APP}`)).toBeTruthy();
  });
  await waitFor(async () => {
    expect(await store.obterPreferencia('versaoVista')).toBe(VERSAO_APP);
  });

  await fireEvent.press(getByText('Entendi'));
});

test('na mesma versão, não mostra nada; na primeira abertura, só grava a versão', async () => {
  const mesmaVersao = new MemoryProgressStore();
  await mesmaVersao.definirPreferencia('versaoVista', VERSAO_APP);
  const a = await renderCartao(mesmaVersao);
  expect(a.queryByText(/O que mudou/)).toBeNull();
  a.unmount();

  const primeira = new MemoryProgressStore();
  const b = await renderCartao(primeira);
  expect(b.queryByText(/O que mudou/)).toBeNull();
  await waitFor(async () => {
    expect(await primeira.obterPreferencia('versaoVista')).toBe(VERSAO_APP);
  });
});
