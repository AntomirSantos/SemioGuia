import type { QuizPergunta } from '../content/schema';

export interface SessaoQuiz {
  perguntas: QuizPergunta[];
  respostas: { perguntaId: string; escolhidaIndex: number; correta: boolean }[];
}

export function criarSessao(perguntas: QuizPergunta[]): SessaoQuiz {
  if (perguntas.length === 0) throw new Error('Sessão de quiz requer ao menos 1 pergunta');
  return { perguntas, respostas: [] };
}

export function responder(s: SessaoQuiz, perguntaId: string, escolhidaIndex: number): SessaoQuiz {
  const pergunta = s.perguntas.find((q) => q.id === perguntaId);
  if (!pergunta) throw new Error(`Pergunta desconhecida: ${perguntaId}`);
  if (s.respostas.some((r) => r.perguntaId === perguntaId)) {
    throw new Error(`Pergunta já respondida: ${perguntaId}`);
  }
  return {
    ...s,
    respostas: [
      ...s.respostas,
      { perguntaId, escolhidaIndex, correta: escolhidaIndex === pergunta.corretaIndex },
    ],
  };
}

export function proximaPergunta(s: SessaoQuiz): QuizPergunta | undefined {
  return s.perguntas.find((q) => !s.respostas.some((r) => r.perguntaId === q.id));
}

export function resultado(s: SessaoQuiz): { total: number; acertos: number; percentual: number } {
  const total = s.perguntas.length;
  const acertos = s.respostas.filter((r) => r.correta).length;
  return { total, acertos, percentual: Math.round((acertos / total) * 100) };
}
