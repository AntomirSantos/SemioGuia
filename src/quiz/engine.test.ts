import { criarSessao, responder, proximaPergunta, resultado } from './engine';
import type { QuizPergunta } from '../content/schema';

const p = (id: string, corretaIndex = 0): QuizPergunta => ({
  id, enunciado: `E${id}`, alternativas: ['certa', 'errada'], corretaIndex, explicacao: 'porque sim',
});

test('fluxo completo: responder tudo e calcular resultado', () => {
  let s = criarSessao([p('q1'), p('q2', 1)]);
  s = responder(s, 'q1', 0);            // acerto
  s = responder(s, 'q2', 0);            // erro
  expect(proximaPergunta(s)).toBeUndefined();
  expect(resultado(s)).toEqual({ total: 2, acertos: 1, percentual: 50 });
});

test('responder é imutável e marca correta', () => {
  const s0 = criarSessao([p('q1')]);
  const s1 = responder(s0, 'q1', 0);
  expect(s0.respostas).toHaveLength(0);
  expect(s1.respostas[0]).toMatchObject({ perguntaId: 'q1', correta: true });
});

test('lanca em sessão vazia, id desconhecido e resposta dupla', () => {
  expect(() => criarSessao([])).toThrow();
  const s = responder(criarSessao([p('q1')]), 'q1', 1);
  expect(() => responder(s, 'q1', 0)).toThrow(/já respondida/);
  expect(() => responder(s, 'qx', 0)).toThrow(/desconhecida/);
});
