import type { Bloco, QuizPergunta } from '../content/schema';
import { Conceito } from './Conceito';
import { Manobra } from './Manobra';
import { Sinal } from './Sinal';
import { ChecklistBloco } from './Checklist';
import { TabelaBloco } from './Tabela';
import { Fluxograma } from './Fluxograma';
import { Perola } from './Perola';
import { QuizBloco } from './QuizBloco';

export function BlocoView({ bloco, onIniciarQuiz }: { bloco: Bloco; onIniciarQuiz?: (p: QuizPergunta[]) => void }) {
  switch (bloco.tipo) {
    case 'conceito':
      return <Conceito bloco={bloco} />;
    case 'manobra':
      return <Manobra bloco={bloco} />;
    case 'sinal':
      return <Sinal bloco={bloco} />;
    case 'checklist':
      return <ChecklistBloco bloco={bloco} />;
    case 'tabela':
      return <TabelaBloco bloco={bloco} />;
    case 'fluxograma':
      return <Fluxograma bloco={bloco} />;
    case 'perola':
      return <Perola bloco={bloco} />;
    case 'quiz':
      return <QuizBloco bloco={bloco} onIniciar={onIniciarQuiz} />;
    case 'secao':
      // Task 3 implementa
      return null;
    case 'entendimento':
      // Task 3 implementa
      return null;
    case 'ilustracao':
      // Task 3 implementa
      return null;
  }
}
