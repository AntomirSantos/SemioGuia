import type { Avaliacao, Caso, No } from '../content/casoSchema';

export interface EstadoCaso {
  casoId: string;
  noAtual: string;
  trilha: { decisaoId: string; opcaoIndex: number; avaliacao: Avaliacao }[];
}

export function iniciar(caso: Caso): EstadoCaso {
  return { casoId: caso.id, noAtual: caso.inicio, trilha: [] };
}

export function noAtual(caso: Caso, e: EstadoCaso): No {
  const no = caso.nos.find((n) => n.id === e.noAtual);
  if (!no) {
    throw new Error(`Nó "${e.noAtual}" não existe no caso "${caso.id}"`);
  }
  return no;
}

export function avancar(caso: Caso, e: EstadoCaso): EstadoCaso {
  const no = noAtual(caso, e);
  if (no.tipo !== 'cena') {
    throw new Error(`Não é possível avançar: nó "${no.id}" não é uma cena`);
  }
  return { casoId: e.casoId, noAtual: no.proximo, trilha: e.trilha };
}

export function decidir(caso: Caso, e: EstadoCaso, opcaoIndex: number): EstadoCaso {
  const no = noAtual(caso, e);
  if (no.tipo !== 'decisao') {
    throw new Error(`Não é possível decidir: nó "${no.id}" não é uma decisão`);
  }
  const opcao = no.opcoes[opcaoIndex];
  if (!opcao) {
    throw new Error(`Opção de índice ${opcaoIndex} não existe na decisão "${no.id}"`);
  }
  return {
    casoId: e.casoId,
    noAtual: opcao.proximo,
    trilha: [...e.trilha, { decisaoId: no.id, opcaoIndex, avaliacao: opcao.avaliacao }],
  };
}

export function nota(e: EstadoCaso): { otimas: number; aceitaveis: number; erros: number } {
  let otimas = 0;
  let aceitaveis = 0;
  let erros = 0;
  for (const passo of e.trilha) {
    if (passo.avaliacao === 'otima') otimas += 1;
    else if (passo.avaliacao === 'aceitavel') aceitaveis += 1;
    else erros += 1;
  }
  return { otimas, aceitaveis, erros };
}

export function desfechoAtual(caso: Caso, e: EstadoCaso): (No & { tipo: 'desfecho' }) | null {
  const no = noAtual(caso, e);
  return no.tipo === 'desfecho' ? no : null;
}
