import type { ConfigFeedback } from '../config/feedback';

// Lógica pura do feedback in-app (beta §9.5) — a folha (FolhaFeedback) só
// coleta os campos e delega para cá.

export const CATEGORIAS_FEEDBACK = ['Erro no conteúdo', 'Sugestão', 'Problema técnico'] as const;
export type CategoriaFeedback = (typeof CATEGORIAS_FEEDBACK)[number];

export interface ContextoFeedback {
  topicoId: string; // '' fora de um tópico
  versao: string;
  plataforma: string;
}

export function montarContextoTexto(c: ContextoFeedback): string {
  return [c.topicoId ? `tópico: ${c.topicoId}` : 'fora de tópico', `versão: ${c.versao}`, `plataforma: ${c.plataforma}`].join(
    ' · ',
  );
}

/** URL do Google Forms pré-preenchida (viewform?usp=pp_url&entry.N=...). */
export function montarUrlFormulario(
  config: ConfigFeedback,
  dados: { categoria: CategoriaFeedback; texto: string; contexto: ContextoFeedback },
): string {
  const pares = [
    ['usp', 'pp_url'],
    [config.campos.categoria, dados.categoria],
    [config.campos.texto, dados.texto],
    [config.campos.contexto, montarContextoTexto(dados.contexto)],
  ];
  const query = pares.map(([chave, valor]) => `${chave}=${encodeURIComponent(valor)}`).join('&');
  return `${config.urlBase}?${query}`;
}
