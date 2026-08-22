import type { Caso } from '../content/casoSchema';
import { iniciar, avancar, decidir, nota, desfechoAtual, noAtual } from './motor';

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

test('iniciar aponta para inicio com trilha vazia', () => {
  const estado = iniciar(base);
  expect(estado).toEqual({ casoId: 'caso-teste', noAtual: 'c1', trilha: [] });
});

test('avancar em cena move para o proximo nó', () => {
  const estado = iniciar(base);
  const proximo = avancar(base, estado);
  expect(proximo.noAtual).toBe('d1');
  expect(proximo.trilha).toEqual([]);
});

test('avancar em decisao lança', () => {
  const estado = avancar(base, iniciar(base));
  expect(() => avancar(base, estado)).toThrow();
});

test('decidir(0) registra a trilha e move para o desfecho ótimo', () => {
  const estado = avancar(base, iniciar(base));
  const proximo = decidir(base, estado, 0);
  expect(proximo.noAtual).toBe('fim-otimo');
  expect(proximo.trilha).toEqual([{ decisaoId: 'd1', opcaoIndex: 0, avaliacao: 'otima' }]);
});

test('decidir com index inválido lança', () => {
  const estado = avancar(base, iniciar(base));
  expect(() => decidir(base, estado, 5)).toThrow();
});

test('nota conta as avaliações da trilha', () => {
  const estado = avancar(base, iniciar(base));
  const proximo = decidir(base, estado, 0);
  expect(nota(proximo)).toEqual({ otimas: 1, aceitaveis: 0, erros: 0 });
});

test('nota conta erro quando a opção escolhida é erro', () => {
  const estado = avancar(base, iniciar(base));
  const proximo = decidir(base, estado, 1);
  expect(nota(proximo)).toEqual({ otimas: 0, aceitaveis: 0, erros: 1 });
});

test('desfechoAtual é null no meio do caso', () => {
  const estado = iniciar(base);
  expect(desfechoAtual(base, estado)).toBeNull();
});

test('desfechoAtual retorna o nó quando o estado está no fim', () => {
  const estado = decidir(base, avancar(base, iniciar(base)), 0);
  const desfecho = desfechoAtual(base, estado);
  expect(desfecho).not.toBeNull();
  expect(desfecho?.id).toBe('fim-otimo');
  expect(desfecho?.tipo).toBe('desfecho');
});

test('noAtual lança se o id não existe', () => {
  const estado = iniciar(base);
  const estadoInvalido = { ...estado, noAtual: 'nao-existe' };
  expect(() => noAtual(base, estadoInvalido)).toThrow();
});

test('estado é imutável: avancar não altera o estado anterior', () => {
  const estado = iniciar(base);
  const copia = clonar(estado as unknown as Caso);
  avancar(base, estado);
  expect(estado).toEqual(copia);
});

test('estado é imutável: decidir não altera o estado anterior', () => {
  const estado = avancar(base, iniciar(base));
  const copia = clonar(estado as unknown as Caso);
  decidir(base, estado, 0);
  expect(estado).toEqual(copia);
});
