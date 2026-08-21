import * as path from 'path';
import { compilarConteudo } from './build-content';

const ok = path.join(__dirname, '__fixtures__', 'content-ok');
const ruim = path.join(__dirname, '__fixtures__', 'content-ruim');

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
