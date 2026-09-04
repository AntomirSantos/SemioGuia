import { PAYWALL_ATIVO, SISTEMAS_GRATUITOS } from '../config/paywall';

// Entitlements locais (beta §9.10): quem pode abrir o quê. Nenhuma
// integração de pagamento: `liberados` é uma lista local (cortesias do
// beta, compras futuras) que hoje ninguém preenche.

export type Entitlement = 'gratuito' | 'premium';

export interface EstadoEntitlements {
  paywallAtivo: boolean;
  /** ids de sistemas destravados localmente; 'tudo' destrava o guia inteiro. */
  liberados: ReadonlySet<string>;
}

export function estadoPadrao(): EstadoEntitlements {
  return { paywallAtivo: PAYWALL_ATIVO, liberados: new Set() };
}

export function entitlementDoSistema(sistemaId: string): Entitlement {
  return (SISTEMAS_GRATUITOS as readonly string[]).includes(sistemaId) ? 'gratuito' : 'premium';
}

export function acessoLiberado(sistemaId: string, estado: EstadoEntitlements): boolean {
  if (!estado.paywallAtivo) return true;
  if (entitlementDoSistema(sistemaId) === 'gratuito') return true;
  return estado.liberados.has(sistemaId) || estado.liberados.has('tudo');
}

/** Conveniência para as telas: usa a flag e a lista locais padrão. */
export function topicoBloqueado(sistemaId: string): boolean {
  return !acessoLiberado(sistemaId, estadoPadrao());
}
