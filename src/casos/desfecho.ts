import type { Paleta } from '../design/tokens';
import type { ClasseDesfecho } from '../content/casoSchema';

// Helpers de domínio sobre o desfecho de um caso clínico — compartilhados
// entre a lista (Estudar) e o player (caso/[id]), por isso vivem aqui (ao
// lado de motor.ts) em vez de num arquivo de rota.

export const RANK_CLASSE: Record<ClasseDesfecho, number> = { dano: 1, aceitavel: 2, otimo: 3 };

export const CLASSE_LABEL: Record<ClasseDesfecho, string> = {
  otimo: 'Ótimo',
  aceitavel: 'Aceitável',
  dano: 'Dano',
};

// Melhor desfecho já alcançado dentre uma lista de classes (histórico de
// conclusões de um caso). Ordenação: otimo > aceitavel > dano. Lista vazia
// (caso nunca concluído) retorna null.
export function melhorClasse(classes: ClasseDesfecho[]): ClasseDesfecho | null {
  if (classes.length === 0) return null;
  return classes.reduce((melhor, atual) => (RANK_CLASSE[atual] > RANK_CLASSE[melhor] ? atual : melhor));
}

// Cor de destaque de uma classe de desfecho no tema atual (otimo→ok,
// aceitavel→perolaTexto, dano→erro) — usada tanto no rótulo "Melhor
// resultado: …" da lista quanto no destaque do desfecho no player.
export function corDaClasse(paleta: Paleta, classe: ClasseDesfecho): string {
  if (classe === 'otimo') return paleta.ok;
  if (classe === 'aceitavel') return paleta.perolaTexto;
  return paleta.erro;
}
