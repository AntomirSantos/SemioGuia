// Plano até a prova (beta §9.2): funções puras sobre datas ISO locais
// (YYYY-MM-DD, mesmo formato de hojeLocal()) — a UI só formata o resultado.

const DIA_MS = 24 * 60 * 60 * 1000;

/**
 * Converte a data digitada (DD/MM/AAAA, como se escreve no Brasil, ou já
 * ISO YYYY-MM-DD) para ISO. Devolve null para entrada inválida — inclusive
 * datas impossíveis como 31/02.
 */
export function analisarDataProva(entrada: string): string | null {
  const brasileira = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(entrada);
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(entrada);
  let ano: number, mes: number, dia: number;
  if (brasileira) {
    [dia, mes, ano] = [Number(brasileira[1]), Number(brasileira[2]), Number(brasileira[3])];
  } else if (iso) {
    [ano, mes, dia] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else {
    return null;
  }
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  const valida =
    data.getUTCFullYear() === ano && data.getUTCMonth() === mes - 1 && data.getUTCDate() === dia;
  if (!valida) return null;
  return `${String(ano).padStart(4, '0')}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

/** ISO YYYY-MM-DD → DD/MM/AAAA (exibição). */
export function formatarDataProva(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

/** Dias de calendário entre hoje e a prova (negativo = prova passada). */
export function diasAteProva(dataProvaIso: string, hojeIso: string): number {
  return Math.round((Date.parse(dataProvaIso) - Date.parse(hojeIso)) / DIA_MS);
}

export function textoDiasAteProva(dias: number): string {
  if (dias < 0) return 'A prova já passou — atualize a data no Perfil';
  if (dias === 0) return 'A prova é hoje';
  return dias === 1 ? 'Falta 1 dia para a prova' : `Faltam ${dias} dias para a prova`;
}

export interface PlanoDoDia {
  diasRestantes: number;
  paraRevisarHoje: number;
  topicosRestantes: number;
  /** Tópicos novos por dia para ver tudo até a prova; null se não faz sentido. */
  topicosPorDia: number | null;
}

/**
 * O plano do dia cabe em ~15 minutos: a revisão espaçada vencida + tópicos
 * novos no ritmo necessário para cobrir o que falta até a prova.
 */
export function montarPlanoDoDia(args: {
  dataProvaIso: string;
  hojeIso: string;
  paraRevisarHoje: number;
  topicosRestantes: number;
}): PlanoDoDia {
  const diasRestantes = diasAteProva(args.dataProvaIso, args.hojeIso);
  const topicosPorDia =
    diasRestantes > 0 && args.topicosRestantes > 0
      ? Math.ceil(args.topicosRestantes / diasRestantes)
      : null;
  return {
    diasRestantes,
    paraRevisarHoje: args.paraRevisarHoje,
    topicosRestantes: args.topicosRestantes,
    topicosPorDia,
  };
}
