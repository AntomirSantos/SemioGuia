import { PRODUTO_SEM_ANUNCIOS } from '../config/paywall';

// Adaptador dos anúncios. O app inteiro fala com esta interface e NUNCA com o
// SDK nativo, pelo mesmo motivo do adaptador da loja: o regime de liberação,
// as telas e os testes existem e funcionam antes de qualquer integração.
//
// Como ligar os anúncios de verdade (na máquina do autor, com um build de
// desenvolvimento, ver docs/monetizacao.md):
//   1. instalar a biblioteca de anúncios escolhida;
//   2. escrever um objeto que implemente `Anuncios` chamando essa biblioteca;
//   3. chamar `configurarAnuncios(...)` uma vez, no início do app.
// Enquanto isso não acontece vale `anunciosIndisponiveis`, e o app se comporta
// como hoje: tudo aberto, sem anúncio nenhum e sem parede de conexão.

export type ResultadoDoAnuncio =
  /** O aluno assistiu até o fim: o conteúdo abre. */
  | { tipo: 'assistido' }
  /** Fechou o anúncio antes do fim: nada abre, e ele pode tentar de novo. */
  | { tipo: 'desistiu' }
  /**
   * Não havia anúncio para mostrar (sem estoque, sem rede, SDK mudo). O
   * conteúdo abre assim mesmo: um aluno não pode ficar sem estudar porque a
   * rede de anúncios de outra empresa não tinha inventário naquele minuto.
   */
  | { tipo: 'sem_anuncio' }
  | { tipo: 'erro'; mensagem: string };

export interface Anuncios {
  /**
   * Falso na web, nos testes e enquanto o SDK não estiver ligado. Com falso,
   * o app não exibe anúncio nem tranca nada: é o estado de hoje.
   */
  disponivel: boolean;
  /** Abre o anúncio premiado e resolve quando ele termina, ou falha. */
  mostrarPremiado(): Promise<ResultadoDoAnuncio>;
  /** Identificador do produto que remove os anúncios, para o texto da oferta. */
  produtoQueRemove: string;
}

export const anunciosIndisponiveis: Anuncios = {
  disponivel: false,
  produtoQueRemove: PRODUTO_SEM_ANUNCIOS,
  async mostrarPremiado() {
    return { tipo: 'sem_anuncio' };
  },
};

/** Anúncios de mentira para desenvolvimento e testes. */
export function anunciosDeTeste(resultado: ResultadoDoAnuncio = { tipo: 'assistido' }): Anuncios {
  return {
    disponivel: true,
    produtoQueRemove: PRODUTO_SEM_ANUNCIOS,
    async mostrarPremiado() {
      return resultado;
    },
  };
}

let atuais: Anuncios = anunciosIndisponiveis;

export function configurarAnuncios(a: Anuncios | null): void {
  atuais = a ?? anunciosIndisponiveis;
}

export function obterAnuncios(): Anuncios {
  return atuais;
}
