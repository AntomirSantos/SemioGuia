// Monetização do SemioGuia.
//
// Decisão do autor (2026-09-07): o conteúdo INTEIRO fica aberto, os doze
// sistemas, para que o aluno veja o trabalho completo e o app ganhe reputação
// pelo que ele é. A conta é paga por anúncios, e quem não quiser vê-los paga
// UMA vez e não vê mais nenhum, para sempre.
//
// Isso muda duas coisas em relação ao desenho anterior: não há mais corte por
// sistema (o interruptor abaixo fica desligado, com a máquina inteira
// preservada para o caso de voltar) e não há mais assinatura anual, e sim uma
// compra única. Na loja, produto avulso, não assinatura.
//
// O plano completo, com o porquê de cada número: docs/monetizacao.md.

/**
 * Interruptor do corte por sistema. DESLIGADO: hoje tudo está aberto e nada
 * fica trancado. A regra e as telas continuam no código (src/entitlements/)
 * e voltam a valer ligando isto, sem reescrever nada.
 */
export const PAYWALL_ATIVO = false;

/**
 * Os sistemas que ficariam abertos se o corte voltasse a valer. Dormente
 * enquanto `PAYWALL_ATIVO` for falso.
 */
export const SISTEMAS_GRATUITOS = [
  'anamnese',
  'exame-fisico-geral',
  'aparelho-cardiovascular',
  'aparelho-respiratorio',
] as const;

/** Anúncios ligados para quem não comprou a remoção. */
export const ANUNCIOS_ATIVOS = true;

/**
 * Produto da loja: compra única (não assinatura, não consumível), que remove
 * os anúncios para sempre. Identificador estável: mudar quebra quem já pagou.
 */
export const PRODUTO_SEM_ANUNCIOS = 'sem_anuncios';

/** Preço mostrado enquanto a loja não responde. Uma vez só, sem renovação. */
export const PRECO_SEM_ANUNCIOS = 'R$ 24,90';
