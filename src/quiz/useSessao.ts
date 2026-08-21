import { useState } from 'react';
import { criarSessao, responder, proximaPergunta, resultado, type SessaoQuiz } from './engine';
import type { QuizPergunta } from '../content/schema';

export interface UseSessaoResultado {
  sessao: SessaoQuiz;
  atual: QuizPergunta | undefined;
  responderAtual: (escolhidaIndex: number) => void;
  resultado: { total: number; acertos: number; percentual: number } | null;
  reiniciar: () => void;
}

export function useSessao(perguntas: QuizPergunta[]): UseSessaoResultado {
  const [sessao, setSessao] = useState(() => criarSessao(perguntas));
  const atual = proximaPergunta(sessao);
  const responderAtual = (escolhidaIndex: number) => {
    if (!atual) return;
    setSessao((s) => responder(s, atual.id, escolhidaIndex));
  };
  const reiniciar = () => setSessao(criarSessao(perguntas));
  return { sessao, atual, responderAtual, resultado: atual ? null : resultado(sessao), reiniciar };
}
