import { casoSchema, validarGrafoCaso, type Caso, type No } from './casoSchema';

const base: Caso = {
  id: 'caso-teste',
  titulo: 'T',
  contexto: 'Você é o interno.',
  tags: [],
  topicosDeApoio: ['a/b/c'],
  referencias: ['Ref'],
  revisao: 'pendente',
  inicio: 'c1',
  nos: [
    { tipo: 'cena', id: 'c1', texto: 'Chega o paciente.', dados: ['PA 210 × 130 mmHg'], proximo: 'd1' },
    {
      tipo: 'decisao',
      id: 'd1',
      pergunta: 'O que fazer?',
      opcoes: [
        { texto: 'A conduta certa', avaliacao: 'otima', feedback: 'Isso.', proximo: 'fim-otimo' },
        { texto: 'A conduta errada', avaliacao: 'erro', feedback: 'Não.', proximo: 'fim-dano' },
      ],
    },
    { tipo: 'desfecho', id: 'fim-otimo', classe: 'otimo', texto: 'Melhora.', ensino: 'Lição.' },
    { tipo: 'desfecho', id: 'fim-dano', classe: 'dano', texto: 'Piora.', ensino: 'Lição.' },
  ],
};

// Helper to clone the fixture deeply so mutations don't leak between tests.
function clonar(caso: Caso): Caso {
  return JSON.parse(JSON.stringify(caso)) as Caso;
}

test('caso base é válido', () => {
  expect(casoSchema.parse(base)).toBeTruthy();
  expect(validarGrafoCaso(base)).toEqual([]);
});

test('inicio inexistente', () => {
  expect(validarGrafoCaso({ ...base, inicio: 'x' })).not.toEqual([]);
});

test('proximo apontando para nó inexistente', () => {
  const caso = clonar(base);
  const cena = caso.nos.find((n) => n.id === 'c1') as Extract<No, { tipo: 'cena' }>;
  cena.proximo = 'x';
  expect(validarGrafoCaso(caso)).not.toEqual([]);
});

test('nó inalcançável', () => {
  const caso = clonar(base);
  caso.nos.push({ tipo: 'cena', id: 'orfa', texto: 'Cena órfã.', proximo: 'fim-otimo' });
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

test('ciclo detectado', () => {
  const caso = clonar(base);
  const desfecho = caso.nos.find((n) => n.id === 'fim-dano') as No;
  const indice = caso.nos.indexOf(desfecho);
  caso.nos[indice] = { tipo: 'cena', id: 'fim-dano', texto: 'Vira cena.', proximo: 'c1' };
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

test('ciclo de 3+ nós nomeia todos os nós intermediários', () => {
  const caso: Caso = {
    ...clonar(base),
    inicio: 'c1',
    nos: [
      { tipo: 'cena', id: 'c1', texto: 'Chega o paciente.', proximo: 'd1' },
      {
        tipo: 'decisao',
        id: 'd1',
        pergunta: 'O que fazer?',
        opcoes: [
          { texto: 'A', avaliacao: 'otima', feedback: 'B', proximo: 'c2' },
          { texto: 'C', avaliacao: 'erro', feedback: 'D', proximo: 'c2' },
        ],
      },
      { tipo: 'cena', id: 'c2', texto: 'Volta ao início.', proximo: 'c1' },
    ],
  };
  const resultado = validarGrafoCaso(caso);
  expect(resultado.some((m) => m.includes('"c1"'))).toBe(true);
  expect(resultado.some((m) => m.includes('"d1"'))).toBe(true);
  expect(resultado.some((m) => m.includes('"c2"'))).toBe(true);
});

test('decisao sem opção otima', () => {
  const caso = clonar(base);
  const decisao = caso.nos.find((n) => n.id === 'd1') as Extract<No, { tipo: 'decisao' }>;
  decisao.opcoes[0].avaliacao = 'aceitavel';
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

test('decisao com duas opções otimas', () => {
  const caso = clonar(base);
  const decisao = caso.nos.find((n) => n.id === 'd1') as Extract<No, { tipo: 'decisao' }>;
  decisao.opcoes[1].avaliacao = 'otima';
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

test('sem caminho todo-otima até desfecho otimo', () => {
  const caso = clonar(base);
  const decisao = caso.nos.find((n) => n.id === 'd1') as Extract<No, { tipo: 'decisao' }>;
  decisao.opcoes[0].proximo = 'fim-dano';
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

test('ids de nó duplicados', () => {
  const caso = clonar(base);
  caso.nos.push({ tipo: 'cena', id: 'c1', texto: 'Duplicada.', proximo: 'd1' });
  const resultado = validarGrafoCaso(caso);
  expect(resultado).not.toEqual([]);
});

// Zod shape validation (malformed shapes independent of graph semantics)

test('rejeita decisao com 1 opção', () => {
  expect(() =>
    casoSchema.parse({
      ...base,
      nos: [
        base.nos[0],
        {
          tipo: 'decisao',
          id: 'd1',
          pergunta: 'O que fazer?',
          opcoes: [{ texto: 'A conduta certa', avaliacao: 'otima', feedback: 'Isso.', proximo: 'fim-otimo' }],
        },
        base.nos[2],
        base.nos[3],
      ],
    }),
  ).toThrow();
});

test('rejeita decisao com 5 opções', () => {
  const opcao = { texto: 'X', avaliacao: 'aceitavel' as const, feedback: 'Y', proximo: 'fim-otimo' };
  expect(() =>
    casoSchema.parse({
      ...base,
      nos: [
        base.nos[0],
        {
          tipo: 'decisao',
          id: 'd1',
          pergunta: 'O que fazer?',
          opcoes: [opcao, opcao, opcao, opcao, opcao],
        },
        base.nos[2],
        base.nos[3],
      ],
    }),
  ).toThrow();
});

test('rejeita classe de desfecho inválida', () => {
  expect(() =>
    casoSchema.parse({
      ...base,
      nos: [
        base.nos[0],
        base.nos[1],
        { tipo: 'desfecho', id: 'fim-otimo', classe: 'excelente', texto: 'Melhora.', ensino: 'Lição.' },
        base.nos[3],
      ],
    }),
  ).toThrow();
});

test('rejeita avaliacao de opção inválida', () => {
  expect(() =>
    casoSchema.parse({
      ...base,
      nos: [
        base.nos[0],
        {
          tipo: 'decisao',
          id: 'd1',
          pergunta: 'O que fazer?',
          opcoes: [
            { texto: 'A', avaliacao: 'perfeita', feedback: 'B', proximo: 'fim-otimo' },
            { texto: 'C', avaliacao: 'erro', feedback: 'D', proximo: 'fim-dano' },
          ],
        },
        base.nos[2],
        base.nos[3],
      ],
    }),
  ).toThrow();
});

test('rejeita caso com menos de 3 nós', () => {
  expect(() =>
    casoSchema.parse({
      ...base,
      nos: [base.nos[0], base.nos[2]],
    }),
  ).toThrow();
});

test('rejeita caso sem topicosDeApoio', () => {
  expect(() => casoSchema.parse({ ...base, topicosDeApoio: [] })).toThrow();
});

test('rejeita caso sem referencias', () => {
  expect(() => casoSchema.parse({ ...base, referencias: [] })).toThrow();
});
