// Freemium do SemioGuia (decisão do autor, 2026-09-06): acesso por assinatura
// anual, com preço acessível, publicado já com o paywall funcionando. O
// gratuito é a fundação do curso, e a especialidade é o que se paga.
//
// Plano completo, com o porquê de cada número: docs/monetizacao.md.

/** Interruptor mestre. Desligado, ninguém vê bloqueio nenhum. */
export const PAYWALL_ATIVO = true;

/**
 * Sistemas abertos, com TUDO deles liberado: tópicos, casos, questões,
 * checklists, estações e verbetes do plantão. O aluno de primeiro contato
 * aprende a entrevistar, a fazer o exame geral e os dois aparelhos que mais
 * aparecem na prova, e só esbarra na assinatura ao entrar na especialidade.
 */
export const SISTEMAS_GRATUITOS = [
  'anamnese',
  'exame-fisico-geral',
  'aparelho-cardiovascular',
  'aparelho-respiratorio',
] as const;

/** Identificador do produto na loja. Estável: mudar quebra quem já assinou. */
export const PRODUTO_ASSINATURA = 'acesso_anual';

/** Textos de preço mostrados na tela de assinatura enquanto a loja não responde. */
export const PRECO_LANCAMENTO = 'R$ 24,90';
export const PRECO_RENOVACAO = 'R$ 39,90';

/**
 * Quantos dias o aparelho continua liberando o conteúdo pago sem conseguir
 * confirmar a assinatura com a loja. O app é offline por princípio: fechar na
 * primeira viagem sem sinal seria punir quem pagou.
 */
export const DIAS_DE_CARENCIA_OFFLINE = 30;
