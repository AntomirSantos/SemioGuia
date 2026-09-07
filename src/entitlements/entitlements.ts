import { PAYWALL_ATIVO, SISTEMAS_GRATUITOS } from '../config/paywall';
import { SEM_COMPRA, semAnuncios, type Compra } from './compra';

// Quem pode abrir o quê. O corte é por sistema e vale para tudo o que
// pertence a ele: tópicos, casos, questões, checklists, estações e verbetes
// do plantão. Módulo puro; o estado vem do EntitlementsContext.
//
// DORMENTE desde 2026-09-07: com `PAYWALL_ATIVO` desligado, `acessoLiberado`
// devolve sempre verdadeiro e nada fica trancado. A máquina fica de pé, com
// os testes, para que voltar atrás seja mudar uma constante.

export type Entitlement = 'gratuito' | 'premium';

export interface EstadoEntitlements {
  paywallAtivo: boolean;
  compra: Compra;
  /** Dia de referência, YYYY-MM-DD, para avaliar prazos. */
  hoje: string;
}

export function estadoPadrao(hoje: string): EstadoEntitlements {
  return { paywallAtivo: PAYWALL_ATIVO, compra: SEM_COMPRA, hoje };
}

export function entitlementDoSistema(sistemaId: string): Entitlement {
  return (SISTEMAS_GRATUITOS as readonly string[]).includes(sistemaId) ? 'gratuito' : 'premium';
}

export function acessoLiberado(sistemaId: string, estado: EstadoEntitlements): boolean {
  if (!estado.paywallAtivo) return true;
  // Sem sistema conhecido (um caso cujo tópico de apoio não existe mais, por
  // exemplo) o app não tranca: um defeito de conteúdo não deve virar uma
  // porta fechada na cara de quem estuda.
  if (sistemaId === '') return true;
  if (entitlementDoSistema(sistemaId) === 'gratuito') return true;
  return semAnuncios(estado.compra, estado.hoje);
}

/** Conveniência para filtrar listas: id de sistema bloqueado neste estado. */
export function sistemaBloqueado(sistemaId: string, estado: EstadoEntitlements): boolean {
  return !acessoLiberado(sistemaId, estado);
}

/**
 * O sistema a que um tópico pertence. O id do tópico é
 * `sistema/capitulo/topico`, então o primeiro segmento é a resposta; assim
 * quiz, estação e revisão sabem o corte sem carregar o conteúdo inteiro.
 */
export function sistemaDoTopicoId(topicoId: string): string {
  return topicoId.split('/')[0] ?? '';
}

/**
 * Tira da fila de revisão o que o aparelho não pode mais abrir. Serve para
 * quem assinou, semeou a revisão de um sistema pago e depois deixou a
 * assinatura vencer: o item volta sozinho quando a assinatura voltar.
 */
export function filtrarItensLiberados<T extends { topicoId: string }>(
  itens: T[],
  liberado: (sistemaId: string) => boolean,
): T[] {
  return itens.filter((i) => liberado(sistemaDoTopicoId(i.topicoId)));
}
