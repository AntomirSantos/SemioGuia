import { conteudoSchema, type Conteudo, type Sistema, type Topico } from './schema';

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
