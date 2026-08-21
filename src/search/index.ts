import MiniSearch from 'minisearch';
import { listarTodosTopicos, obterSistema } from '../content/store';
import type { Conteudo } from '../content/schema';

export interface ResultadoBusca {
  topicoId: string; titulo: string; sistemaId: string; sistemaTitulo: string;
}

interface DocBusca { id: string; titulo: string; tags: string; sistemaId: string; sistemaTitulo: string }

export function criarIndice(c: Conteudo): MiniSearch<DocBusca> {
  const indice = new MiniSearch<DocBusca>({
    fields: ['titulo', 'tags', 'sistemaTitulo'],
    storeFields: ['titulo', 'sistemaId', 'sistemaTitulo'],
    searchOptions: { prefix: true, fuzzy: 0.2 },
  });
  indice.addAll(
    listarTodosTopicos(c).map((t) => ({
      id: t.id,
      titulo: t.titulo,
      tags: t.tags.join(' '),
      sistemaId: t.sistemaId,
      sistemaTitulo: obterSistema(c, t.sistemaId)?.titulo ?? t.sistemaId,
    })),
  );
  return indice;
}

export function buscar(indice: MiniSearch<DocBusca>, termo: string): ResultadoBusca[] {
  if (termo.trim() === '') return [];
  return indice.search(termo).map((r) => ({
    topicoId: String(r.id),
    titulo: r.titulo as string,
    sistemaId: r.sistemaId as string,
    sistemaTitulo: r.sistemaTitulo as string,
  }));
}
