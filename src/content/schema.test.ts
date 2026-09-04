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

test("normaliza `revisao: 'ok'` (atalho do autor no frontmatter) para 'aprovada'", () => {
  const topico = topicoSchema.parse({
    id: 's/c/t', titulo: 'T', sistemaId: 's', capituloId: 'c', ordem: 1,
    tags: [], referencias: ['Obra X — cap. 1'], revisao: 'ok',
    blocos: [{ tipo: 'conceito', texto: 'x' }],
  });
  expect(topico.revisao).toBe('aprovada');
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

// Task 2: Schema v2 tests
test('aceita bloco secao válido', () => {
  expect(blocoSchema.parse({ tipo: 'secao', titulo: 'Anatomia' }))
    .toMatchObject({ tipo: 'secao', titulo: 'Anatomia' });
});

test('rejeita entendimento sem texto', () => {
  expect(() => blocoSchema.parse({ tipo: 'entendimento', titulo: 'Por que' })).toThrow();
});

test('rejeita ilustracao com svg sem <svg>', () => {
  expect(() =>
    blocoSchema.parse({
      tipo: 'ilustracao',
      svg: 'circle cx="10" cy="10" r="5"',
      legenda: 'Um ponto',
    }),
  ).toThrow();
});

test('aceita nivel avancado em conceito', () => {
  expect(blocoSchema.parse({ tipo: 'conceito', texto: 'A pressão...', nivel: 'avancado' }))
    .toMatchObject({ tipo: 'conceito', nivel: 'avancado' });
});

test('aceita nivel avancado em sinal', () => {
  expect(
    blocoSchema.parse({
      tipo: 'sinal',
      nome: 'Murmúrio',
      descricao: 'Som cardiac...',
      significado: 'Lesão valvular...',
      causas: ['Estenose'],
      nivel: 'avancado',
    }),
  ).toMatchObject({ tipo: 'sinal', nivel: 'avancado' });
});

test('rejeita nivel inválido', () => {
  expect(() =>
    blocoSchema.parse({ tipo: 'conceito', texto: 'A pressão...', nivel: 'x' }),
  ).toThrow();
});

test('cena exige texto', () => {
  expect(blocoSchema.parse({ tipo: 'cena', texto: 'Plantão, 3h...' })).toMatchObject({ tipo: 'cena' });
  expect(() => blocoSchema.parse({ tipo: 'cena' })).toThrow();
});

test('pense exige pergunta e resposta', () => {
  expect(
    blocoSchema.parse({ tipo: 'pense', pergunta: 'Sistólico ou diastólico?', resposta: 'Sistólico.' }),
  ).toMatchObject({ tipo: 'pense' });
  expect(() => blocoSchema.parse({ tipo: 'pense', pergunta: 'Só a pergunta?' })).toThrow();
});

test('resumo exige exatamente três linhas', () => {
  expect(blocoSchema.parse({ tipo: 'resumo', linhas: ['Um.', 'Dois.', 'Três.'] })).toMatchObject({ tipo: 'resumo' });
  expect(() => blocoSchema.parse({ tipo: 'resumo', linhas: ['Um.', 'Dois.'] })).toThrow();
  expect(() => blocoSchema.parse({ tipo: 'resumo', linhas: ['Um.', 'Dois.', 'Três.', 'Quatro.'] })).toThrow();
});
