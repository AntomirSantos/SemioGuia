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
