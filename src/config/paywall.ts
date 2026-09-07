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
 * Os sistemas abertos sem anúncio nenhum (decisão do autor, 2026-09-07): a
 * fundação do curso. Todo o resto abre com um anúncio premiado, por aba, e a
 * liberação dura só enquanto o app estiver aberto.
 */
export const SISTEMAS_SEMPRE_ABERTOS = ['anamnese', 'exame-fisico-geral'] as const;

/**
 * Usar o app sem internet é da compra (decisão do autor, 2026-09-07). Sem
 * conexão e sem compra, o app pede que a pessoa se conecte, inclusive nos dois
 * sistemas sempre abertos.
 *
 * Se um dia parecer duro demais, a alternativa natural é deixar os dois
 * sistemas abertos funcionarem offline e manter o resto exigindo anúncio, que
 * já exige rede por natureza: é trocar esta constante por falso.
 */
export const OFFLINE_EXIGE_COMPRA = true;

/**
 * Produto da loja: compra única (não assinatura, não consumível), que remove
 * os anúncios para sempre. Identificador estável: mudar quebra quem já pagou.
 */
export const PRODUTO_SEM_ANUNCIOS = 'sem_anuncios';

/** Preço mostrado enquanto a loja não responde. Uma vez só, sem renovação. */
export const PRECO_SEM_ANUNCIOS = 'R$ 24,90';
