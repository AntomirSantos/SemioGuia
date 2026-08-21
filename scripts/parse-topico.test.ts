import { parseTopico } from './parse-topico';

const doc = `---
titulo: Teste
ordem: 1
tags: [a]
referencias: ["Ref"]
revisao: pendente
---

::: conceito
texto: |
  Um conceito.
:::

::: perola
texto: Uma pérola.
:::
`;

test('extrai frontmatter e blocos na ordem', () => {
  const r = parseTopico(doc, 'x/y/z.md');
  expect(r.frontmatter.titulo).toBe('Teste');
  expect(r.blocos).toHaveLength(2);
  expect(r.blocos[0]).toMatchObject({ tipo: 'conceito', texto: 'Um conceito.\n' });
  expect(r.blocos[1]).toMatchObject({ tipo: 'perola' });
});

test('erro em bloco sem fechamento cita o caminho', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\n::: conceito\ntexto: x\n', 'a/b/c.md'))
    .toThrow(/a\/b\/c\.md/);
});

test('erro em YAML inválido dentro do bloco', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\n::: conceito\na: : b\n:::\n', 'a/b/c.md'))
    .toThrow();
});

test('erro em frontmatter YAML malformado inclui caminho', () => {
  expect(() => parseTopico('---\ntitulo: : bad\n---\n::: conceito\ntexto: x\n:::\n', 'src/bad.md'))
    .toThrow(/src\/bad\.md.*frontmatter/);
});

test('erro em bloco com corpo array (não mapa) cita o caminho', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\n::: lista\n- a\n- b\n:::\n', 'x/y.md'))
    .toThrow(/x\/y\.md.*não contém um mapa YAML/);
});

test('erro em texto fora de bloco cita o caminho', () => {
  expect(() => parseTopico('---\ntitulo: T\n---\ntexto inválido aqui\n::: conceito\ntexto: x\n:::\n', 'docs/file.md'))
    .toThrow(/docs\/file\.md.*texto fora de bloco/);
});
