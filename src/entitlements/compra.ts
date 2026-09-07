// A compra única que remove os anúncios. Módulo puro: não fala com a loja nem
// com o banco, só decide. Quem busca e grava é o EntitlementsContext.

export type OrigemCompra = 'nenhuma' | 'loja' | 'cortesia';

export interface Compra {
  origem: OrigemCompra;
  /**
   * Dia em que o direito expira, YYYY-MM-DD, ou `null` para sempre. Compra na
   * loja é sempre `null`: paga uma vez, vale a vida do aplicativo. A data
   * existe para cortesias com prazo (um período de agradecimento a quem testou).
   */
  validaAte: string | null;
  /** Dia da última confirmação com a loja, YYYY-MM-DD. Informativo. */
  confirmadaEm: string | null;
}

export const SEM_COMPRA: Compra = { origem: 'nenhuma', validaAte: null, confirmadaEm: null };

/**
 * O que mostrar ao aluno:
 * - `nenhuma`: usa o app com anúncios.
 * - `permanente`: comprou, e não vê anúncio nunca mais.
 * - `cortesia`: ganhou, com uma data de fim.
 * - `vencida`: a cortesia acabou, e os anúncios voltaram.
 */
export type EstadoCompra = 'nenhuma' | 'permanente' | 'cortesia' | 'vencida';

function diasEntre(de: string, ate: string): number {
  const a = Date.parse(de + 'T00:00:00');
  const b = Date.parse(ate + 'T00:00:00');
  if (Number.isNaN(a) || Number.isNaN(b)) return Number.POSITIVE_INFINITY;
  return Math.round((b - a) / 86400000);
}

export function estadoDaCompra(c: Compra, hoje: string): EstadoCompra {
  if (c.origem === 'nenhuma') return 'nenhuma';
  // Sem data de fim, o direito é para sempre. Uma compra única não vence, e
  // por isso ela também não depende de reconfirmar com a loja: exigir
  // conexão de quem já pagou seria cobrar duas vezes pela mesma coisa.
  if (c.validaAte === null) return c.origem === 'loja' ? 'permanente' : 'cortesia';
  if (diasEntre(hoje, c.validaAte) < 0) return 'vencida';
  return 'cortesia';
}

/** A pergunta que o app faz o tempo todo: mostro anúncio para esta pessoa? */
export function semAnuncios(c: Compra, hoje: string): boolean {
  const estado = estadoDaCompra(c, hoje);
  return estado === 'permanente' || estado === 'cortesia';
}

/** Dias até o fim de uma cortesia com prazo; `null` quando não há prazo. */
export function diasRestantes(c: Compra, hoje: string): number | null {
  if (c.validaAte === null) return null;
  return Math.max(0, diasEntre(hoje, c.validaAte));
}

/** Um ano a partir de uma data YYYY-MM-DD, para cortesias com prazo. */
export function umAnoDepois(dia: string): string {
  const d = new Date(dia + 'T00:00:00');
  d.setFullYear(d.getFullYear() + 1);
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const diaDoMes = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${diaDoMes}`;
}

export const CHAVE_COMPRA = 'compra';

export function serializar(c: Compra): string {
  return JSON.stringify(c);
}

/** Nunca lança: preferência corrompida vira "não comprou". */
export function desserializar(bruto: string | null): Compra {
  if (!bruto) return SEM_COMPRA;
  try {
    const d = JSON.parse(bruto) as Partial<Compra>;
    const origem: OrigemCompra = d.origem === 'loja' || d.origem === 'cortesia' ? d.origem : 'nenhuma';
    return {
      origem,
      validaAte: typeof d.validaAte === 'string' ? d.validaAte : null,
      confirmadaEm: typeof d.confirmadaEm === 'string' ? d.confirmadaEm : null,
    };
  } catch {
    return SEM_COMPRA;
  }
}
