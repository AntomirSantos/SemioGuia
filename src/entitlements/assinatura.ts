import { DIAS_DE_CARENCIA_OFFLINE } from '../config/paywall';

// Estado da assinatura anual, com prazo. Módulo puro: não fala com a loja
// nem com o banco, só decide. Quem busca e grava é o EntitlementsContext.

export type OrigemAcesso = 'nenhuma' | 'loja' | 'cortesia';

export interface Assinatura {
  origem: OrigemAcesso;
  /** Dia em que o acesso expira, no formato YYYY-MM-DD. */
  validaAte: string | null;
  /** Dia da última confirmação com a loja, no formato YYYY-MM-DD. */
  confirmadaEm: string | null;
  /** Renovação cancelada, mas o período já pago continua valendo. */
  cancelada: boolean;
}

export const SEM_ASSINATURA: Assinatura = {
  origem: 'nenhuma',
  validaAte: null,
  confirmadaEm: null,
  cancelada: false,
};

/**
 * O que mostrar ao aluno:
 * - `gratuito`: nunca assinou, ou a cortesia acabou.
 * - `ativa`: em dia, renova sozinha.
 * - `cancelada`: não renova mais, mas ainda vale até `validaAte`.
 * - `vencida`: passou de `validaAte`.
 * - `sem_confirmacao`: o prazo ainda não venceu, mas o aparelho passou tempo
 *   demais sem falar com a loja. Reconecta e volta.
 */
export type EstadoAcesso = 'gratuito' | 'ativa' | 'cancelada' | 'vencida' | 'sem_confirmacao';

function diasEntre(de: string, ate: string): number {
  const a = Date.parse(de + 'T00:00:00');
  const b = Date.parse(ate + 'T00:00:00');
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.POSITIVE_INFINITY;
  return Math.round((b - a) / 86400000);
}

export function estadoDaAssinatura(a: Assinatura, hoje: string): EstadoAcesso {
  if (a.origem === 'nenhuma' || !a.validaAte) return 'gratuito';
  if (diasEntre(hoje, a.validaAte) < 0) return a.origem === 'cortesia' ? 'gratuito' : 'vencida';
  // Cortesia é aplicada localmente pelo autor e não depende da loja.
  if (a.origem === 'loja') {
    const desdeConfirmacao = a.confirmadaEm ? diasEntre(a.confirmadaEm, hoje) : Number.POSITIVE_INFINITY;
    if (desdeConfirmacao > DIAS_DE_CARENCIA_OFFLINE) return 'sem_confirmacao';
  }
  return a.cancelada ? 'cancelada' : 'ativa';
}

export function acessoCompleto(a: Assinatura, hoje: string): boolean {
  const estado = estadoDaAssinatura(a, hoje);
  return estado === 'ativa' || estado === 'cancelada';
}

/** Dias que faltam até o fim do acesso, ou null quando não há assinatura. */
export function diasRestantes(a: Assinatura, hoje: string): number | null {
  if (!a.validaAte) return null;
  return Math.max(0, diasEntre(hoje, a.validaAte));
}

/** Um ano a partir de uma data YYYY-MM-DD, para a validade da assinatura. */
export function umAnoDepois(dia: string): string {
  const d = new Date(dia + 'T00:00:00');
  d.setFullYear(d.getFullYear() + 1);
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const diaDoMes = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${diaDoMes}`;
}

export const CHAVE_ASSINATURA = 'assinatura';

export function serializar(a: Assinatura): string {
  return JSON.stringify(a);
}

/** Nunca lança: preferência corrompida vira "sem assinatura". */
export function desserializar(bruto: string | null): Assinatura {
  if (!bruto) return SEM_ASSINATURA;
  try {
    const d = JSON.parse(bruto) as Partial<Assinatura>;
    const origem: OrigemAcesso =
      d.origem === 'loja' || d.origem === 'cortesia' ? d.origem : 'nenhuma';
    return {
      origem,
      validaAte: typeof d.validaAte === 'string' ? d.validaAte : null,
      confirmadaEm: typeof d.confirmadaEm === 'string' ? d.confirmadaEm : null,
      cancelada: d.cancelada === true,
    };
  } catch {
    return SEM_ASSINATURA;
  }
}
