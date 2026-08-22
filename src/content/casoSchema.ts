import { z } from 'zod';

export type Avaliacao = 'otima' | 'aceitavel' | 'erro';
export type ClasseDesfecho = 'otimo' | 'aceitavel' | 'dano';

const opcaoSchema = z.object({
  texto: z.string().min(1),
  avaliacao: z.enum(['otima', 'aceitavel', 'erro']),
  feedback: z.string().min(1),
  proximo: z.string().min(1),
});

export const noSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('cena'),
    id: z.string().min(1),
    texto: z.string().min(1),
    dados: z.array(z.string().min(1)).optional(),
    proximo: z.string().min(1),
  }),
  z.object({
    tipo: z.literal('decisao'),
    id: z.string().min(1),
    pergunta: z.string().min(1),
    opcoes: z.array(opcaoSchema).min(2).max(4),
  }),
  z.object({
    tipo: z.literal('desfecho'),
    id: z.string().min(1),
    classe: z.enum(['otimo', 'aceitavel', 'dano']),
    texto: z.string().min(1),
    ensino: z.string().min(1),
  }),
]);

export const casoSchema = z.object({
  id: z.string().min(1),
  titulo: z.string().min(1),
  contexto: z.string().min(1),
  tags: z.array(z.string()),
  // topicosDeApoio references real topic ids — verified against whole content in the build pipeline (Task 2), not here.
  topicosDeApoio: z.array(z.string().min(1)).min(1),
  referencias: z.array(z.string().min(1)).min(1),
  revisao: z.enum(['pendente', 'aprovada']),
  inicio: z.string().min(1),
  nos: z.array(noSchema).min(3),
});
// Case-id uniqueness across the app is verified in the build pipeline (Task 2), where all cases are loaded together.

export type Caso = z.infer<typeof casoSchema>;
export type No = Caso['nos'][number];

/**
 * Validates the branching graph of a clinical case, beyond what zod's shape
 * check can express. Returns an empty array when valid; otherwise one
 * pt-BR message per violation, naming the offending node/field.
 */
export function validarGrafoCaso(caso: Caso): string[] {
  const violacoes: string[] = [];

  // Map id -> node, recording duplicates as a violation.
  const porId = new Map<string, No>();
  const duplicados = new Set<string>();
  for (const no of caso.nos) {
    if (porId.has(no.id)) {
      duplicados.add(no.id);
    } else {
      porId.set(no.id, no);
    }
  }
  for (const id of duplicados) {
    violacoes.push(`Id de nó duplicado: "${id}"`);
  }

  if (!porId.has(caso.inicio)) {
    violacoes.push(`Nó inicial "${caso.inicio}" não existe`);
  }

  // Collect outgoing edges per node id, flagging any target that doesn't exist.
  function arestasDoNo(no: No): string[] {
    if (no.tipo === 'cena') return [no.proximo];
    if (no.tipo === 'decisao') return no.opcoes.map((o) => o.proximo);
    return [];
  }

  for (const no of caso.nos) {
    for (const alvo of arestasDoNo(no)) {
      if (!porId.has(alvo)) {
        violacoes.push(`Nó "${no.id}" aponta (proximo) para nó inexistente "${alvo}"`);
      }
    }
  }

  // Decisao rules: exactly one 'otima' option per decisao.
  for (const no of caso.nos) {
    if (no.tipo === 'decisao') {
      const otimas = no.opcoes.filter((o) => o.avaliacao === 'otima').length;
      if (otimas === 0) {
        violacoes.push(`Decisão "${no.id}" não tem nenhuma opção "otima"`);
      } else if (otimas > 1) {
        violacoes.push(`Decisão "${no.id}" tem mais de uma opção "otima"`);
      }
    }
  }

  // BFS reachability from inicio (only over edges pointing at nodes that exist).
  const alcancaveis = new Set<string>();
  if (porId.has(caso.inicio)) {
    const fila: string[] = [caso.inicio];
    alcancaveis.add(caso.inicio);
    while (fila.length > 0) {
      const atualId = fila.shift() as string;
      const atual = porId.get(atualId);
      if (!atual) continue;
      for (const alvo of arestasDoNo(atual)) {
        if (porId.has(alvo) && !alcancaveis.has(alvo)) {
          alcancaveis.add(alvo);
          fila.push(alvo);
        }
      }
    }
  }
  for (const no of caso.nos) {
    if (!alcancaveis.has(no.id)) {
      violacoes.push(`Nó "${no.id}" é inalcançável a partir do início`);
    }
  }

  // Cycle detection via DFS with an explicit recursion stack, over existing-target edges only.
  const estado = new Map<string, 'visitando' | 'concluido'>();
  const nosEmCiclo = new Set<string>();
  const pilha: string[] = [];
  function dfsCiclo(id: string): void {
    const atual = porId.get(id);
    if (!atual) return;
    estado.set(id, 'visitando');
    pilha.push(id);
    for (const alvo of arestasDoNo(atual)) {
      if (!porId.has(alvo)) continue;
      const estadoAlvo = estado.get(alvo);
      if (estadoAlvo === 'visitando') {
        // Back edge id -> alvo: every node on the stack from alvo to id
        // (inclusive) is part of this cycle, not just its two endpoints.
        const inicioCiclo = pilha.indexOf(alvo);
        for (let i = inicioCiclo; i < pilha.length; i += 1) {
          nosEmCiclo.add(pilha[i]);
        }
      } else if (estadoAlvo === undefined) {
        dfsCiclo(alvo);
      }
    }
    pilha.pop();
    estado.set(id, 'concluido');
  }
  for (const no of caso.nos) {
    if (!estado.has(no.id)) {
      dfsCiclo(no.id);
    }
  }
  for (const id of nosEmCiclo) {
    violacoes.push(`Nó "${id}" participa de um ciclo`);
  }

  // Every leaf (node with no outgoing edges) must be a desfecho.
  for (const no of caso.nos) {
    const semSaida = arestasDoNo(no).length === 0;
    if (semSaida && no.tipo !== 'desfecho') {
      violacoes.push(`Nó "${no.id}" não tem saída e não é um desfecho`);
    }
  }

  // There must exist a path following only 'otima' options (and cena's proximo)
  // from inicio to a desfecho of classe 'otimo'.
  function existeCaminhoOtimo(id: string, visitados: Set<string>): boolean {
    if (visitados.has(id)) return false; // avoid infinite loop on cycles
    const no = porId.get(id);
    if (!no) return false;
    if (no.tipo === 'desfecho') {
      return no.classe === 'otimo';
    }
    const proximosVisitados = new Set(visitados).add(id);
    if (no.tipo === 'cena') {
      return existeCaminhoOtimo(no.proximo, proximosVisitados);
    }
    // decisao: follow only the 'otima' option(s)
    return no.opcoes
      .filter((o) => o.avaliacao === 'otima')
      .some((o) => existeCaminhoOtimo(o.proximo, proximosVisitados));
  }
  if (porId.has(caso.inicio) && !existeCaminhoOtimo(caso.inicio, new Set())) {
    violacoes.push('Não há caminho seguindo só opções "otima" do início até um desfecho de classe "otimo"');
  }

  return violacoes;
}
