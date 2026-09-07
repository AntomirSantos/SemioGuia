import { PRECO_ANUAL, PRODUTO_ASSINATURA } from '../config/paywall';
import { umAnoDepois, type Assinatura } from './assinatura';

// Adaptador da cobrança da loja. O app inteiro fala com esta interface e
// NUNCA com o SDK nativo: assim as telas, o prazo e o bloqueio existem,
// funcionam e são testáveis antes de qualquer integração nativa existir.
//
// Como ligar a cobrança de verdade (na máquina do autor, com um build de
// desenvolvimento, ver docs/monetizacao.md):
//   1. instalar a biblioteca de compras escolhida;
//   2. escrever um objeto que implemente `Loja` chamando essa biblioteca;
//   3. chamar `configurarLoja(...)` uma vez, no início do app.
// Enquanto isso não acontece, vale `lojaIndisponivel`, e o app se comporta
// como um aparelho sem loja: mostra o preço, explica e não deixa comprar.

export interface Precos {
  /** O valor do ano, já formatado na moeda do usuário. */
  anual: string;
}

export type ResultadoDaAssinatura =
  | { tipo: 'ok'; assinatura: Assinatura }
  | { tipo: 'cancelado_pelo_usuario' }
  | { tipo: 'nada_a_restaurar' }
  | { tipo: 'indisponivel' }
  | { tipo: 'erro'; mensagem: string };

export interface Loja {
  /** Identificador do produto que esta loja vende. */
  produto: string;
  /** Falso em navegador e em qualquer aparelho sem a loja instalada. */
  disponivel: boolean;
  /** Preços vindos da loja, já formatados na moeda do usuário. */
  precos(): Promise<Precos>;
  /** Abre o fluxo de compra. `hoje` entra como YYYY-MM-DD. */
  assinar(hoje: string): Promise<ResultadoDaAssinatura>;
  /** Recupera uma assinatura já paga nesta conta da loja. */
  restaurar(hoje: string): Promise<ResultadoDaAssinatura>;
}

export const lojaIndisponivel: Loja = {
  produto: PRODUTO_ASSINATURA,
  disponivel: false,
  async precos() {
    return { anual: PRECO_ANUAL };
  },
  async assinar() {
    return { tipo: 'indisponivel' };
  },
  async restaurar() {
    return { tipo: 'indisponivel' };
  },
};

/**
 * Loja de mentira para desenvolvimento e para os testes: aprova na hora e
 * devolve um ano de acesso. Nunca deve ser configurada em produção.
 */
export function lojaDeTeste(opcoes: { restaurar?: boolean } = {}): Loja {
  return {
    produto: PRODUTO_ASSINATURA,
    disponivel: true,
    async precos() {
      return { anual: PRECO_ANUAL };
    },
    async assinar(hoje) {
      return {
        tipo: 'ok',
        assinatura: { origem: 'loja', validaAte: umAnoDepois(hoje), confirmadaEm: hoje, cancelada: false },
      };
    },
    async restaurar(hoje) {
      if (opcoes.restaurar === false) return { tipo: 'nada_a_restaurar' };
      return {
        tipo: 'ok',
        assinatura: { origem: 'loja', validaAte: umAnoDepois(hoje), confirmadaEm: hoje, cancelada: false },
      };
    },
  };
}

let lojaAtual: Loja = lojaIndisponivel;

export function configurarLoja(loja: Loja | null): void {
  lojaAtual = loja ?? lojaIndisponivel;
}

export function obterLoja(): Loja {
  return lojaAtual;
}
