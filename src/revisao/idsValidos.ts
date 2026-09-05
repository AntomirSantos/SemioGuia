import type { Conteudo } from '../content/schema';
import { listarTodosTopicos } from '../content/store';
import { idDeChecklist, idDeSinal } from './fila';

// Conjunto de ids "válidos" para `montarFila`: toda pergunta de quiz + todo
// checklist com título, em todos os tópicos do conteúdo atual. Usado para
// filtrar itens de revisão órfãos (conteúdo removido/renomeado desde que o
// item foi semeado) tanto no card da aba Estudar quanto na sessão /revisao: 
// mantém as duas leituras da fila consistentes entre si.
export function idsValidosDoConteudo(conteudo: Conteudo): Set<string> {
  const ids = new Set<string>();
  for (const topico of listarTodosTopicos(conteudo)) {
    for (const bloco of topico.blocos) {
      if (bloco.tipo === 'quiz') {
        for (const pergunta of bloco.perguntas) {
          ids.add(pergunta.id);
        }
      } else if (bloco.tipo === 'checklist') {
        ids.add(idDeChecklist(topico.id, bloco.titulo));
      } else if (bloco.tipo === 'sinal') {
        ids.add(idDeSinal(topico.id, bloco.nome));
      }
    }
  }
  return ids;
}
