import type { Bloco, QuizPergunta } from '../content/schema';
import { Conceito } from './Conceito';
import { Manobra } from './Manobra';
import { Sinal } from './Sinal';
import { ChecklistBloco } from './Checklist';
import { TabelaBloco } from './Tabela';
import { Fluxograma } from './Fluxograma';
import { Perola } from './Perola';
import { QuizBloco } from './QuizBloco';
import { Secao } from './Secao';
import { Entendimento } from './Entendimento';
import { Ilustracao } from './Ilustracao';
import { Cena } from './Cena';
import { Pense } from './Pense';
import { Resumo } from './Resumo';
import { Relampago } from './Relampago';
import { Som } from './Som';
import { Avancado } from './Avancado';

// Rótulo pt-BR singular por tipo, usado no cabeçalho "Aprofundar · <rótulo>"
// do wrapper colapsável.
const ROTULOS: Record<Bloco['tipo'], string> = {
  conceito: 'Conceito',
  manobra: 'Manobra',
  sinal: 'Sinal',
  checklist: 'Checklist',
  tabela: 'Tabela',
  fluxograma: 'Fluxograma',
  perola: 'Pérola',
  quiz: 'Quiz',
  secao: 'Seção',
  entendimento: 'Entendimento',
  ilustracao: 'Ilustração',
  cena: 'Cena',
  pense: 'Pense',
  resumo: 'Resumo',
  relampago: 'Caso-relâmpago',
  som: 'Ausculta',
};

function renderConteudo(bloco: Bloco, onIniciarQuiz?: (p: QuizPergunta[]) => void, topicoId?: string) {
  switch (bloco.tipo) {
    case 'conceito':
      return <Conceito bloco={bloco} />;
    case 'manobra':
      return <Manobra bloco={bloco} />;
    case 'sinal':
      return <Sinal bloco={bloco} />;
    case 'checklist':
      return <ChecklistBloco bloco={bloco} topicoId={topicoId} />;
    case 'tabela':
      return <TabelaBloco bloco={bloco} />;
    case 'fluxograma':
      return <Fluxograma bloco={bloco} />;
    case 'perola':
      return <Perola bloco={bloco} />;
    case 'quiz':
      return <QuizBloco bloco={bloco} onIniciar={onIniciarQuiz} />;
    case 'secao':
      return <Secao bloco={bloco} />;
    case 'entendimento':
      return <Entendimento bloco={bloco} />;
    case 'ilustracao':
      return <Ilustracao bloco={bloco} />;
    case 'cena':
      return <Cena bloco={bloco} />;
    case 'pense':
      return <Pense bloco={bloco} />;
    case 'resumo':
      return <Resumo bloco={bloco} />;
    case 'relampago':
      return <Relampago bloco={bloco} />;
    case 'som':
      return <Som bloco={bloco} />;
  }
}

export function BlocoView({
  bloco,
  onIniciarQuiz,
  topicoId,
}: {
  bloco: Bloco;
  onIniciarQuiz?: (p: QuizPergunta[]) => void;
  topicoId?: string;
}) {
  const conteudo = renderConteudo(bloco, onIniciarQuiz, topicoId);

  // Exceção deliberada: uma 'secao' com nivel 'avancado' ainda renderiza como
  // Secao simples. Seção é um cabeçalho divisório do tópico, não um conteúdo
  // que faça sentido esconder atrás de um "Aprofundar" — o schema não proíbe
  // a combinação, mas colapsar um título de compartimento confundiria mais
  // do que ajudaria.
  if (bloco.nivel === 'avancado' && bloco.tipo !== 'secao') {
    return <Avancado rotulo={ROTULOS[bloco.tipo]}>{conteudo}</Avancado>;
  }
  return conteudo;
}
