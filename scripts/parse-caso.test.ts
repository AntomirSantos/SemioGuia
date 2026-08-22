import * as fs from 'fs';
import * as path from 'path';
import { parseCaso } from './parse-caso';

const fixture = fs.readFileSync(path.join(__dirname, '__fixtures__', 'caso-valido.md'), 'utf8');

test('parse feliz: extrai frontmatter e nós na ordem', () => {
  const caso = parseCaso(fixture, 'scripts/__fixtures__/caso-valido.md');
  expect(caso.id).toBe('caso-teste');
  expect(caso.inicio).toBe('c1');
  expect(caso.nos).toHaveLength(4);
  expect(caso.nos[0]).toMatchObject({ tipo: 'cena', id: 'c1', proximo: 'd1' });
  expect(caso.nos[1]).toMatchObject({ tipo: 'decisao', id: 'd1' });
});

test('frontmatter faltando campo → erro com caminho do arquivo', () => {
  const semTitulo = fixture.replace('titulo: Caso de teste\n', '');
  expect(() => parseCaso(semTitulo, 'x/y/caso.md')).toThrow(/x\/y\/caso\.md/);
});

test('YAML inválido num nó → erro apontando o bloco', () => {
  const doc = `---
id: caso-teste
titulo: Caso de teste
contexto: Você é o interno.
tags: []
topicosDeApoio: [a/b/c]
referencias: ["Ref"]
revisao: pendente
inicio: c1
---

::: no
tipo: cena
id: c1
a: : b
:::
`;
  expect(() => parseCaso(doc, 'a/b/c.md')).toThrow(/a\/b\/c\.md.*bloco "no"/s);
});

test('texto fora de bloco cita o caminho', () => {
  const doc = fixture.replace('::: no\ntipo: cena', 'texto solto\n::: no\ntipo: cena');
  expect(() => parseCaso(doc, 'docs/file.md')).toThrow(/docs\/file\.md.*texto fora de bloco/);
});

test('bloco sem fechamento cita o caminho', () => {
  const doc = `---
id: caso-teste
titulo: Caso de teste
contexto: Você é o interno.
tags: []
topicosDeApoio: [a/b/c]
referencias: ["Ref"]
revisao: pendente
inicio: c1
---

::: no
tipo: cena
id: c1
`;
  expect(() => parseCaso(doc, 'a/b/c.md')).toThrow(/a\/b\/c\.md/);
});
