import * as path from 'path';
import { compilarConteudo } from './build-content';

const ok = path.join(__dirname, '__fixtures__', 'content-ok');
const ruim = path.join(__dirname, '__fixtures__', 'content-ruim');
const dup = path.join(__dirname, '__fixtures__', 'content-dup');
const sort = path.join(__dirname, '__fixtures__', 'content-sort');

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
