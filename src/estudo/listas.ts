import type { Bloco, Conteudo, Topico } from '../content/schema';
import type { Caso } from '../content/casoSchema';

// Listas da aba Estudar (reorganização pedida pelo autor, 2026-09): questões
// e casos viram duas telas separadas, cada uma organizada como o modo
// plantão: busca instantânea no topo, grupos por sistema na ordem
// craniocaudal e linhas que abrem no lugar. Este módulo só reúne e filtra o
// que já existe no conteúdo compilado; nada aqui inventa texto novo.

/** Minúsculas e sem acentos, para casar "torcao" com "torção". */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function quizDoTopico(topico: Topico) {
  return topico.blocos.find((b): b is Extract<Bloco, { tipo: 'quiz' }> => b.tipo === 'quiz');
}

// --------------------------------------------------------------- Questões

export interface TopicoDeQuestoes {
  topicoId: string;
  topicoTitulo: string;
  capituloTitulo: string;
  sistemaId: string;
  sistemaTitulo: string;
  sistemaCor: string;
  nPerguntas: number;
  /** Enunciados, só para a busca: quem procura "Traube" quer o tópico que pergunta sobre isso. */
  enunciados: string[];
  tags: string[];
}

/** Tópicos com quiz, na ordem craniocaudal do guia (sistema, capítulo, tópico). */
export function listarQuestoes(conteudo: Conteudo): TopicoDeQuestoes[] {
  const lista: TopicoDeQuestoes[] = [];
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        const quiz = quizDoTopico(topico);
        if (!quiz) continue;
        lista.push({
          topicoId: topico.id,
          topicoTitulo: topico.titulo,
          capituloTitulo: capitulo.titulo,
          sistemaId: sistema.id,
          sistemaTitulo: sistema.titulo,
          sistemaCor: sistema.cor,
          nPerguntas: quiz.perguntas.length,
          enunciados: quiz.perguntas.map((p) => p.enunciado),
          tags: topico.tags,
        });
      }
    }
  }
  return lista;
}

/** Busca: título do tópico primeiro, depois capítulo, tags e enunciados. */
export function filtrarQuestoes(lista: TopicoDeQuestoes[], termo: string): TopicoDeQuestoes[] {
  const t = normalizar(termo.trim());
  if (t.length === 0) return lista;
  const porTitulo: TopicoDeQuestoes[] = [];
  const porCorpo: TopicoDeQuestoes[] = [];
  for (const item of lista) {
    if (normalizar(item.topicoTitulo).includes(t)) {
      porTitulo.push(item);
      continue;
    }
    const corpo = normalizar(`${item.capituloTitulo} ${item.tags.join(' ')} ${item.enunciados.join(' ')}`);
    if (corpo.includes(t)) porCorpo.push(item);
  }
  return [...porTitulo, ...porCorpo];
}

// ------------------------------------------------------------------ Casos

export interface CasoDeEstudo {
  caso: Caso;
  sistemaId: string;
  sistemaTitulo: string;
  sistemaCor: string;
  /** Títulos dos tópicos de apoio, para mostrar no verbete aberto e na busca. */
  topicosDeApoio: string[];
  /** Quantas decisões o caso pede: a medida honesta do tamanho dele. */
  nDecisoes: number;
}

/**
 * Casos na ordem craniocaudal, pelo sistema do PRIMEIRO tópico de apoio (a
 * âncora que o autor escolhe ao escrever o caso). Um caso cujo tópico de
 * apoio não exista mais fica no fim, sem sistema, em vez de sumir da tela.
 */
export function listarCasosDeEstudo(conteudo: Conteudo): CasoDeEstudo[] {
  const titulos = new Map<string, string>();
  const sistemaDoTopico = new Map<string, { id: string; titulo: string; cor: string }>();
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        titulos.set(topico.id, topico.titulo);
        sistemaDoTopico.set(topico.id, { id: sistema.id, titulo: sistema.titulo, cor: sistema.cor });
      }
    }
  }
  const ordemDoSistema = new Map(conteudo.sistemas.map((s, i) => [s.id, i] as const));

  const lista = conteudo.casos.map((caso) => {
    const sistema = sistemaDoTopico.get(caso.topicosDeApoio[0] ?? '');
    return {
      caso,
      sistemaId: sistema?.id ?? '',
      sistemaTitulo: sistema?.titulo ?? 'Outros casos',
      sistemaCor: sistema?.cor ?? '#6B6B6B',
      topicosDeApoio: caso.topicosDeApoio.map((id) => titulos.get(id) ?? id),
      nDecisoes: caso.nos.filter((n) => n.tipo === 'decisao').length,
    };
  });

  return lista.sort((a, b) => {
    const ia = ordemDoSistema.get(a.sistemaId) ?? Number.MAX_SAFE_INTEGER;
    const ib = ordemDoSistema.get(b.sistemaId) ?? Number.MAX_SAFE_INTEGER;
    return ia - ib;
  });
}

/** Busca: título do caso primeiro, depois contexto, tags e tópicos de apoio. */
export function filtrarCasos(lista: CasoDeEstudo[], termo: string): CasoDeEstudo[] {
  const t = normalizar(termo.trim());
  if (t.length === 0) return lista;
  const porTitulo: CasoDeEstudo[] = [];
  const porCorpo: CasoDeEstudo[] = [];
  for (const item of lista) {
    if (normalizar(item.caso.titulo).includes(t)) {
      porTitulo.push(item);
      continue;
    }
    const corpo = normalizar(
      `${item.caso.contexto} ${item.caso.tags.join(' ')} ${item.topicosDeApoio.join(' ')} ${item.sistemaTitulo}`,
    );
    if (corpo.includes(t)) porCorpo.push(item);
  }
  return [...porTitulo, ...porCorpo];
}

// ------------------------------------------------------------- Agrupamento

export interface GrupoDeEstudo<T> {
  sistemaTitulo: string;
  sistemaCor: string;
  itens: T[];
}

/**
 * Agrupa por sistema preservando a ordem de entrada (a ordem do guia quando
 * a lista vem das funções acima). Grupos vazios não aparecem, então também
 * serve para agrupar um resultado de busca já filtrado.
 */
export function agruparPorSistema<T extends { sistemaTitulo: string; sistemaCor: string }>(
  itens: T[],
): GrupoDeEstudo<T>[] {
  const grupos: GrupoDeEstudo<T>[] = [];
  const porTitulo = new Map<string, GrupoDeEstudo<T>>();
  for (const item of itens) {
    let grupo = porTitulo.get(item.sistemaTitulo);
    if (!grupo) {
      grupo = { sistemaTitulo: item.sistemaTitulo, sistemaCor: item.sistemaCor, itens: [] };
      porTitulo.set(item.sistemaTitulo, grupo);
      grupos.push(grupo);
    }
    grupo.itens.push(item);
  }
  return grupos;
}
