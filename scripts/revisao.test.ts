import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { carregarConteudo } from '../src/content/store';
import { gerarRelatorioRevisao, parsearChecklist, sistemasDaSecao } from './revisao';
import type { Sistema } from '../src/content/schema';

const MD_EXEMPLO = `# Checklist

## A. Divergências entre as referências (o app escolheu um lado)

- [ ] **A1 · Ictus do longilíneo** — 6º × 5º EIC.
  Continuação indentada do item.
- [x] **A2 · Item já resolvido** — texto.

## L. Itens da Fase 13 (mamas e geniturinário)

- [ ] **L6 · Paráfrases herdadas** — reescrever como prosa própria.
`;

test('parsearChecklist extrai id, título, estado e seção', () => {
  const itens = parsearChecklist(MD_EXEMPLO);
  expect(itens).toHaveLength(3);
  expect(itens[0]).toMatchObject({ id: 'A1', aberto: true, titulo: 'Ictus do longilíneo' });
  expect(itens[1]).toMatchObject({ id: 'A2', aberto: false });
  expect(itens[2]).toMatchObject({
    id: 'L6',
    aberto: true,
    secao: 'L. Itens da Fase 13 (mamas e geniturinário)',
  });
});

test('parsearChecklist lê o checklist real inteiro sem perder itens', () => {
  const md = readFileSync(join(__dirname, '..', 'docs/inconsistencias-para-revisao.md'), 'utf8');
  const itens = parsearChecklist(md);
  expect(itens.length).toBeGreaterThan(80); // seções A–O acumulam dezenas de itens
  expect(itens.some((i) => i.id === 'L6')).toBe(true);
  expect(itens.some((i) => i.id === 'O8')).toBe(true);
});

test('sistemasDaSecao casa o título do sistema mesmo com prefixo "Aparelho/Sistema"', () => {
  const sistemas = [
    { id: 'mamas-e-geniturinario', titulo: 'Mamas e geniturinário' },
    { id: 'sistema-nervoso', titulo: 'Sistema nervoso' },
    { id: 'aparelho-cardiovascular', titulo: 'Aparelho cardiovascular' },
  ] as Sistema[];
  expect(sistemasDaSecao('L. Itens da Fase 13 (mamas e geniturinário)', sistemas)).toEqual([
    'mamas-e-geniturinario',
  ]);
  expect(sistemasDaSecao('I. Itens da Fase 10 (sistema nervoso)', sistemas)).toEqual(['sistema-nervoso']);
  expect(sistemasDaSecao('A. Divergências entre as referências', sistemas)).toEqual([]);
});

test('gerarRelatorioRevisao com o conteúdo real traz resumo, L6/O8 e uma seção por sistema', () => {
  const conteudo = carregarConteudo(
    JSON.parse(readFileSync(join(__dirname, '..', 'assets/generated/content.json'), 'utf8')),
  );
  const itens = parsearChecklist(readFileSync(join(__dirname, '..', 'docs/inconsistencias-para-revisao.md'), 'utf8'));
  const md = gerarRelatorioRevisao(conteudo, itens, '2026-09-03');

  expect(md).toContain('# Status da revisão do autor');
  expect(md).toContain('- Tópicos: **55**');
  expect(md).toContain('**L6**');
  expect(md).toContain('**O8**');
  for (const titulo of ['Anamnese', 'Aparelho cardiovascular', 'Semiologia da criança']) {
    expect(md).toContain(`### ${titulo}`);
  }
});
