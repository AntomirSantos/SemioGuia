// Freemium preparado, NÃO ativado (beta §9.10 e §3 do plano): com a flag
// desligada nada muda para nenhum usuário. Quando o autor decidir ligar,
// tópicos de sistemas premium passam a mostrar a tela de bloqueio
// placeholder (sem pagamento integrado ainda).
export const PAYWALL_ATIVO = false;

/** Sistemas gratuitos mesmo com o paywall ligado (plano de beta). */
export const SISTEMAS_GRATUITOS = ['aparelho-cardiovascular', 'aparelho-respiratorio'] as const;
