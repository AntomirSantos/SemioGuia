import type { ItemRevisao } from '../revisao/sm2';
import type { RespostaRegistrada, ConclusaoCaso } from '../progress/types';

export interface EstadoCarimbado {
  valor: boolean;
  atualizadoEm: number;
}
export interface PrefCarimbada {
  valor: string;
  atualizadoEm: number;
}

export interface SnapshotSync {
  estudados: Record<string, EstadoCarimbado>;
  favoritos: Record<string, EstadoCarimbado>;
  itensRevisao: Record<string, ItemRevisao>;
  respostas: RespostaRegistrada[];
  conclusoesCasos: ConclusaoCaso[];
  prefs: Record<string, PrefCarimbada>;
}

export interface ResultadoMerge {
  paraLocal: SnapshotSync;
  paraRemoto: SnapshotSync;
}

export function snapshotVazio(): SnapshotSync {
  return {
    estudados: {},
    favoritos: {},
    itensRevisao: {},
    respostas: [],
    conclusoesCasos: [],
    prefs: {},
  };
}

export function chaveResposta(r: RespostaRegistrada): string {
  return `${r.perguntaId}_${r.respondidaEm}`;
}

export function chaveConclusao(c: ConclusaoCaso): string {
  return `${c.casoId}_${c.concluidaEm}`;
}

// União por chave natural: cada lado recebe apenas o que lhe falta (delta, não
// o estado completo). Duplicatas com a mesma chave não são repetidas.
function mergeHistorico<T>(
  local: T[],
  remoto: T[],
  chave: (item: T) => string,
): { paraLocal: T[]; paraRemoto: T[] } {
  const chavesLocal = new Set(local.map(chave));
  const chavesRemoto = new Set(remoto.map(chave));
  return {
    paraLocal: remoto.filter((item) => !chavesLocal.has(chave(item))),
    paraRemoto: local.filter((item) => !chavesRemoto.has(chave(item))),
  };
}

// LWW (last-write-wins) genérico por carimbo numérico. Empate exato de
// carimbo: vence o remoto, e o item entra em paraLocal (nunca em paraRemoto).
// Quando os dois lados já têm o mesmo valor e o mesmo carimbo, não há delta.
function mergeCarimbado<T extends { valor: unknown; atualizadoEm: number }>(
  local: Record<string, T>,
  remoto: Record<string, T>,
): { paraLocal: Record<string, T>; paraRemoto: Record<string, T> } {
  const paraLocal: Record<string, T> = {};
  const paraRemoto: Record<string, T> = {};
  const chaves = new Set([...Object.keys(local), ...Object.keys(remoto)]);
  for (const chave of chaves) {
    const l = local[chave];
    const r = remoto[chave];
    if (l === undefined && r !== undefined) {
      paraLocal[chave] = r;
    } else if (r === undefined && l !== undefined) {
      paraRemoto[chave] = l;
    } else if (l !== undefined && r !== undefined) {
      if (l.valor === r.valor && l.atualizadoEm === r.atualizadoEm) {
        continue;
      }
      if (l.atualizadoEm > r.atualizadoEm) {
        paraRemoto[chave] = l;
      } else {
        paraLocal[chave] = r;
      }
    }
  }
  return { paraLocal, paraRemoto };
}

function itensRevisaoIguais(a: ItemRevisao, b: ItemRevisao): boolean {
  return (
    a.id === b.id &&
    a.tipo === b.tipo &&
    a.topicoId === b.topicoId &&
    a.facilidade === b.facilidade &&
    a.repeticoes === b.repeticoes &&
    a.intervaloDias === b.intervaloDias &&
    a.proximaRevisao === b.proximaRevisao &&
    a.atualizadoEm === b.atualizadoEm
  );
}

// LWW por Date.parse(atualizadoEm) — mesmas regras de empate de mergeCarimbado.
function mergeItensRevisao(
  local: Record<string, ItemRevisao>,
  remoto: Record<string, ItemRevisao>,
): { paraLocal: Record<string, ItemRevisao>; paraRemoto: Record<string, ItemRevisao> } {
  const paraLocal: Record<string, ItemRevisao> = {};
  const paraRemoto: Record<string, ItemRevisao> = {};
  const chaves = new Set([...Object.keys(local), ...Object.keys(remoto)]);
  for (const chave of chaves) {
    const l = local[chave];
    const r = remoto[chave];
    if (l === undefined && r !== undefined) {
      paraLocal[chave] = r;
    } else if (r === undefined && l !== undefined) {
      paraRemoto[chave] = l;
    } else if (l !== undefined && r !== undefined) {
      if (itensRevisaoIguais(l, r)) {
        continue;
      }
      const carimboLocal = Date.parse(l.atualizadoEm);
      const carimboRemoto = Date.parse(r.atualizadoEm);
      if (carimboLocal > carimboRemoto) {
        paraRemoto[chave] = l;
      } else {
        paraLocal[chave] = r;
      }
    }
  }
  return { paraLocal, paraRemoto };
}

export function merge(local: SnapshotSync, remoto: SnapshotSync): ResultadoMerge {
  const respostas = mergeHistorico(local.respostas, remoto.respostas, chaveResposta);
  const conclusoesCasos = mergeHistorico(
    local.conclusoesCasos,
    remoto.conclusoesCasos,
    chaveConclusao,
  );
  const estudados = mergeCarimbado(local.estudados, remoto.estudados);
  const favoritos = mergeCarimbado(local.favoritos, remoto.favoritos);
  const prefs = mergeCarimbado(local.prefs, remoto.prefs);
  const itensRevisao = mergeItensRevisao(local.itensRevisao, remoto.itensRevisao);

  return {
    paraLocal: {
      estudados: estudados.paraLocal,
      favoritos: favoritos.paraLocal,
      itensRevisao: itensRevisao.paraLocal,
      respostas: respostas.paraLocal,
      conclusoesCasos: conclusoesCasos.paraLocal,
      prefs: prefs.paraLocal,
    },
    paraRemoto: {
      estudados: estudados.paraRemoto,
      favoritos: favoritos.paraRemoto,
      itensRevisao: itensRevisao.paraRemoto,
      respostas: respostas.paraRemoto,
      conclusoesCasos: conclusoesCasos.paraRemoto,
      prefs: prefs.paraRemoto,
    },
  };
}
