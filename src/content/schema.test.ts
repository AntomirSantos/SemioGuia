import { blocoSchema, quizPerguntaSchema, topicoSchema } from './schema';

test('aceita bloco conceito válido', () => {
  expect(blocoSchema.parse({ tipo: 'conceito', texto: 'A pressão arterial...' }))
    .toMatchObject({ tipo: 'conceito' });
});

test('rejeita manobra sem passos', () => {
  expect(() => blocoSchema.parse({ tipo: 'manobra', titulo: 'X', passos: [] })).toThrow();
});

test('rejeita quiz com corretaIndex fora do intervalo', () => {
  expect(() =>
    quizPerguntaSchema.parse({
      id: 'q1', enunciado: 'E?', alternativas: ['a', 'b'], corretaIndex: 2, explicacao: 'x',
    }),
  ).toThrow();
});

test('rejeita topico sem referencias', () => {
  expect(() =>
    topicoSchema.parse({
      id: 's/c/t', titulo: 'T', sistemaId: 's', capituloId: 'c', ordem: 1,
      tags: [], referencias: [], revisao: 'pendente',
      blocos: [{ tipo: 'conceito', texto: 'x' }],
    }),
  ).toThrow();
});
