import { conteudoSchema, type Conteudo, type Sistema, type Topico } from './schema';
import type { Caso } from './casoSchema';

export function carregarConteudo(dados: unknown): Conteudo {
  return conteudoSchema.parse(dados);
}

export function listarSistemas(c: Conteudo): Sistema[] {
  return [...c.sistemas].sort((a, b) => a.ordem - b.ordem);
}

export function obterSistema(c: Conteudo, sistemaId: string): Sistema | undefined {
  return c.sistemas.find((s) => s.id === sistemaId);
}

export function listarTodosTopicos(c: Conteudo): Topico[] {
  return c.sistemas.flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
}

export function obterTopico(c: Conteudo, topicoId: string): Topico | undefined {
  return listarTodosTopicos(c).find((t) => t.id === topicoId);
}

export function listarCasos(c: Conteudo): Caso[] {
  return c.casos;
}

export function obterCaso(c: Conteudo, casoId: string): Caso | undefined {
  return c.casos.find((caso) => caso.id === casoId);
}

/**
 * Um sistema conta como revisado quando TODOS os seus tópicos passaram pela
 * revisão do autor (`revisao: 'aprovada'`; 'ok' no frontmatter é normalizado
 * para 'aprovada' pelo schema). Beta §9.4: a home ordena revisados primeiro
 * com o marcador "Revisado".
 */
export function sistemaRevisado(s: Sistema): boolean {
  const topicos = s.capitulos.flatMap((k) => k.topicos);
  return topicos.length > 0 && topicos.every((t) => t.revisao === 'aprovada');
}
