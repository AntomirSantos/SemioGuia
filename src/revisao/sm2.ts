export type TipoItem = 'pergunta' | 'checklist';
export interface ItemRevisao {
  id: string;
  tipo: TipoItem;
  topicoId: string;
  facilidade: number;
  repeticoes: number;
  intervaloDias: number;
  proximaRevisao: string;
  atualizadoEm: string;
}
export type NotaSm2 = 2 | 4 | 5;

const EF_INICIAL = 2.5;
const EF_PISO = 1.3;

export function notaDePergunta(correta: boolean): NotaSm2 {
  return correta ? 4 : 2;
}

export function notaDeEstacao(percentual: number): NotaSm2 {
  if (percentual >= 100) return 5;
  return percentual >= 80 ? 4 : 2;
}

export function amanha(hoje: string): string {
  return somarDias(hoje, 1);
}

function somarDias(dia: string, n: number): string {
  const d = new Date(`${dia}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function criarItem(
  id: string,
  tipo: TipoItem,
  topicoId: string,
  hoje: string,
  agoraIso: string,
): ItemRevisao {
  return {
    id,
    tipo,
    topicoId,
    facilidade: EF_INICIAL,
    repeticoes: 0,
    intervaloDias: 0,
    proximaRevisao: amanha(hoje),
    atualizadoEm: agoraIso,
  };
}

export function avaliar(
  item: ItemRevisao,
  nota: NotaSm2,
  hoje: string,
  agoraIso: string,
): ItemRevisao {
  const q = nota;
  const ef = Math.max(
    EF_PISO,
    item.facilidade + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  );
  if (q < 3) {
    return {
      ...item,
      facilidade: ef,
      repeticoes: 0,
      intervaloDias: 1,
      proximaRevisao: amanha(hoje),
      atualizadoEm: agoraIso,
    };
  }
  const repeticoes = item.repeticoes + 1;
  const intervaloDias =
    repeticoes === 1 ? 1 : repeticoes === 2 ? 6 : Math.round(item.intervaloDias * ef);
  return {
    ...item,
    facilidade: ef,
    repeticoes,
    intervaloDias,
    proximaRevisao: somarDias(hoje, intervaloDias),
    atualizadoEm: agoraIso,
  };
}

export function vencidos(itens: ItemRevisao[], hoje: string): ItemRevisao[] {
  return itens
    .filter((i) => i.proximaRevisao <= hoje)
    .sort((a, b) => a.proximaRevisao.localeCompare(b.proximaRevisao) || a.id.localeCompare(b.id));
}
