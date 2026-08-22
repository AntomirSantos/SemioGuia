import * as path from 'path';
import { compilarConteudo } from './build-content';

const ok = path.join(__dirname, '__fixtures__', 'content-ok');
const ruim = path.join(__dirname, '__fixtures__', 'content-ruim');
const dup = path.join(__dirname, '__fixtures__', 'content-dup');
const sort = path.join(__dirname, '__fixtures__', 'content-sort');
const casosOk = path.join(__dirname, '__fixtures__', 'content-casos-ok');
const casosInvalido = path.join(__dirname, '__fixtures__', 'content-casos-invalido');
const casosTopicoInexistente = path.join(__dirname, '__fixtures__', 'content-casos-topico-inexistente');
const casosIdDuplicado = path.join(__dirname, '__fixtures__', 'content-casos-id-duplicado');

test('compila diretório válido', () => {
  const c = compilarConteudo(ok);
  expect(c.sistemas).toHaveLength(1);
  const t = c.sistemas[0].capitulos[0].topicos[0];
  expect(t.id).toBe('exame-fisico-geral/sinais-vitais/pressao-arterial');
});

test('agrega erros de diretório inválido', () => {
  expect(() => compilarConteudo(ruim)).toThrow(/corretaIndex/);
  expect(() => compilarConteudo(ruim)).toThrow(/capítulo não declarado/);
});

test('rejeita id de pergunta de quiz duplicado entre tópicos', () => {
  expect(() => compilarConteudo(dup)).toThrow(/p-duplicado/);
});

test('ordena capítulos e sistemas por ordem', () => {
  const c = compilarConteudo(sort);
  const capitulos = c.sistemas[0].capitulos;
  expect(capitulos.map((cap) => cap.id)).toEqual(['capitulo-a', 'capitulo-b']);
});

test('diretório sem content/casos compila com casos vazio', () => {
  const c = compilarConteudo(ok);
  expect(c.casos).toEqual([]);
});

test('inclui caso válido no JSON final', () => {
  const c = compilarConteudo(casosOk);
  expect(c.casos).toHaveLength(1);
  expect(c.casos[0].id).toBe('caso-hipertensao');
});

test('caso com grafo inválido derruba o build com a mensagem', () => {
  expect(() => compilarConteudo(casosInvalido)).toThrow(/caso-quebrado\.md/);
  expect(() => compilarConteudo(casosInvalido)).toThrow(/nó inexistente "nao-existe"/);
});

test('topicosDeApoio referenciando tópico inexistente derruba o build', () => {
  expect(() => compilarConteudo(casosTopicoInexistente)).toThrow(/tópico inexistente/);
});

test('id de caso duplicado derruba o build', () => {
  expect(() => compilarConteudo(casosIdDuplicado)).toThrow(/id de caso duplicado "caso-dup"/);
});
