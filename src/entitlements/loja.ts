import { PRECO_SEM_ANUNCIOS, PRODUTO_SEM_ANUNCIOS } from '../config/paywall';
import type { Compra } from './compra';

// Adaptador da cobrança da loja. O app inteiro fala com esta interface e
// NUNCA com o SDK nativo: assim as telas, o direito e a restauração existem,
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
  /** O valor da remoção dos anúncios, já formatado na moeda do usuário. */
  remocao: string;
}

export type ResultadoDaCompra =
  | { tipo: 'ok'; compra: Compra }
  | { tipo: 'cancelado_pelo_usuario' }
  | { tipo: 'nada_a_restaurar' }
  | { tipo: 'indisponivel' }
  | { tipo: 'erro'; mensagem: string };

export interface Loja {
  /** Identificador do produto que esta loja vende. */
  produto: string;
  /** Falso em navegador e em qualquer aparelho sem a loja instalada. */
  disponivel: boolean;
  /** Preço vindo da loja, já formatado na moeda do usuário. */
  precos(): Promise<Precos>;
  /** Abre o fluxo de compra. `hoje` entra como YYYY-MM-DD. */
  comprar(hoje: string): Promise<ResultadoDaCompra>;
  /** Recupera uma compra já feita nesta conta da loja. */
  restaurar(hoje: string): Promise<ResultadoDaCompra>;
}

/** Compra única: sem data de fim, para sempre. */
function compraPermanente(hoje: string): Compra {
  return { origem: 'loja', validaAte: null, confirmadaEm: hoje };
}

export const lojaIndisponivel: Loja = {
  produto: PRODUTO_SEM_ANUNCIOS,
  disponivel: false,
  async precos() {
    return { remocao: PRECO_SEM_ANUNCIOS };
  },
  async comprar() {
    return { tipo: 'indisponivel' };
  },
  async restaurar() {
    return { tipo: 'indisponivel' };
  },
};

/**
 * Loja de mentira para desenvolvimento e para os testes: aprova na hora e
 * devolve a compra permanente. Nunca deve ser configurada em produção.
 */
export function lojaDeTeste(opcoes: { restaurar?: boolean } = {}): Loja {
  return {
    produto: PRODUTO_SEM_ANUNCIOS,
    disponivel: true,
    async precos() {
      return { remocao: PRECO_SEM_ANUNCIOS };
    },
    async comprar(hoje) {
      return { tipo: 'ok', compra: compraPermanente(hoje) };
    },
    async restaurar(hoje) {
      if (opcoes.restaurar === false) return { tipo: 'nada_a_restaurar' };
      return { tipo: 'ok', compra: compraPermanente(hoje) };
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
