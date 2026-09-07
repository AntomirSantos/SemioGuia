import { SISTEMAS_SEMPRE_ABERTOS } from '../config/paywall';

// A regra de liberação por anúncio (decisão do autor, 2026-09-07).
//
// Anamnese e Exame físico geral ficam abertos, sempre. Cada outro sistema abre
// com um anúncio premiado, e abre por ABA: liberar o cardiovascular no Guia
// não libera o cardiovascular no Plantão. A liberação vale enquanto o app
// estiver aberto e morre quando ele fecha, porque ela mora só na memória.
//
// Módulo puro: quem guarda o estado é o DesbloqueioContext.

export type AbaDeConteudo = 'guia' | 'plantao' | 'checklists' | 'estudar';

export const NOME_DA_ABA: Record<AbaDeConteudo, string> = {
  guia: 'no Guia',
  plantao: 'no modo plantão',
  checklists: 'nos Checklists',
  estudar: 'em Estudar',
};

export function chaveDoDesbloqueio(aba: AbaDeConteudo, sistemaId: string): string {
  return `${aba}:${sistemaId}`;
}

/** Os dois sistemas que nunca pedem anúncio. */
export function sempreAberto(sistemaId: string): boolean {
  return (SISTEMAS_SEMPRE_ABERTOS as readonly string[]).includes(sistemaId);
}

export interface EstadoDesbloqueio {
  /**
   * Falso quando o app não está no regime de anúncios: comprou a remoção, ou
   * está na web, ou o SDK ainda não foi ligado. Aí nada pede anúncio.
   */
  regimeDeAnuncios: boolean;
  desbloqueados: ReadonlySet<string>;
}

/** A pergunta das telas: este conteúdo está aberto agora? */
export function liberado(aba: AbaDeConteudo, sistemaId: string, estado: EstadoDesbloqueio): boolean {
  if (!estado.regimeDeAnuncios) return true;
  // Sistema desconhecido não tranca: defeito de conteúdo não vira porta
  // fechada na cara de quem estuda.
  if (sistemaId === '') return true;
  if (sempreAberto(sistemaId)) return true;
  return estado.desbloqueados.has(chaveDoDesbloqueio(aba, sistemaId));
}

/** Conveniência para as listas: precisa assistir a um anúncio para abrir? */
export function precisaDeAnuncio(aba: AbaDeConteudo, sistemaId: string, estado: EstadoDesbloqueio): boolean {
  return !liberado(aba, sistemaId, estado);
}

/** Junta a liberação nova ao que já estava aberto. */
export function comDesbloqueio(
  desbloqueados: ReadonlySet<string>,
  aba: AbaDeConteudo,
  sistemaId: string,
): Set<string> {
  const proximo = new Set(desbloqueados);
  proximo.add(chaveDoDesbloqueio(aba, sistemaId));
  return proximo;
}
