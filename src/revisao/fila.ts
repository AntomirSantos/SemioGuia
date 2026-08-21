import type { Topico } from '../content/schema';
import { criarItem, vencidos, type ItemRevisao } from './sm2';

const LIMITE_NOVOS_PADRAO = 20;

export function idDeChecklist(topicoId: string, titulo: string): string {
  return `${topicoId}#checklist:${titulo}`;
}

export function semearTopico(
  topico: Topico,
  existentes: ItemRevisao[],
  hoje: string,
  agoraIso: string,
): ItemRevisao[] {
  const idsExistentes = new Set(existentes.map((i) => i.id));
  const novos: ItemRevisao[] = [];

  for (const bloco of topico.blocos) {
    if (bloco.tipo === 'quiz') {
      for (const pergunta of bloco.perguntas) {
        if (!idsExistentes.has(pergunta.id)) {
          novos.push(criarItem(pergunta.id, 'pergunta', topico.id, hoje, agoraIso));
        }
      }
    } else if (bloco.tipo === 'checklist') {
      const id = idDeChecklist(topico.id, bloco.titulo);
      if (!idsExistentes.has(id)) {
        novos.push(criarItem(id, 'checklist', topico.id, hoje, agoraIso));
      }
    }
  }

  return novos;
}

export interface FilaDeHoje {
  itens: ItemRevisao[];
  totalPerguntas: number;
  totalChecklists: number;
}

export function montarFila(
  itens: ItemRevisao[],
  idsValidos: Set<string>,
  hoje: string,
  limiteNovos: number = LIMITE_NOVOS_PADRAO,
): FilaDeHoje {
  const vencidosValidos = vencidos(itens, hoje).filter((i) => idsValidos.has(i.id));

  const novos = vencidosValidos.filter((i) => i.repeticoes === 0 && i.intervaloDias === 0);
  const demais = vencidosValidos.filter((i) => !(i.repeticoes === 0 && i.intervaloDias === 0));
  const novosLimitados = novos.slice(0, limiteNovos);

  const selecionados = vencidos([...novosLimitados, ...demais], hoje);

  return {
    itens: selecionados,
    totalPerguntas: selecionados.filter((i) => i.tipo === 'pergunta').length,
    totalChecklists: selecionados.filter((i) => i.tipo === 'checklist').length,
  };
}
