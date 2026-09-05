import MiniSearch from 'minisearch';
import { listarTodosTopicos, obterSistema } from '../content/store';
import type { Conteudo } from '../content/schema';

// Busca offline do app. Além dos tópicos (título + tags), o índice carrega
// um documento por bloco `sinal` e por bloco `checklist`: quem digita
// "Blumberg" precisa ver "Sinal de Blumberg" como resultado, não só o
// título do tópico que o contém. Cada resultado de bloco leva uma `ancora`
// que a tela do tópico usa para abrir já na parte certa do material.

export type TipoDeResultado = 'topico' | 'sinal' | 'checklist';

export interface ResultadoBusca {
  id: string;
  tipo: TipoDeResultado;
  titulo: string;
  topicoId: string;
  topicoTitulo: string;
  sistemaId: string;
  sistemaTitulo: string;
  /** Presente nos resultados de bloco: `sinal:{nome}` ou `checklist:{titulo}`. */
  ancora?: string;
}

interface DocBusca {
  id: string;
  tipo: TipoDeResultado;
  titulo: string;
  tags: string;
  corpo: string;
  topicoId: string;
  topicoTitulo: string;
  sistemaId: string;
  sistemaTitulo: string;
  ancora?: string;
}

export function criarIndice(c: Conteudo): MiniSearch<DocBusca> {
  const indice = new MiniSearch<DocBusca>({
    fields: ['titulo', 'tags', 'corpo', 'sistemaTitulo'],
    storeFields: ['tipo', 'titulo', 'topicoId', 'topicoTitulo', 'sistemaId', 'sistemaTitulo', 'ancora'],
    // O nome pesa mais que tags e corpo: "Blumberg" deve trazer o sinal de
    // Blumberg à frente do tópico que só o cita.
    searchOptions: { prefix: true, fuzzy: 0.2, boost: { titulo: 3, tags: 1.5 } },
  });
  const docs: DocBusca[] = [];
  for (const t of listarTodosTopicos(c)) {
    const sistemaTitulo = obterSistema(c, t.sistemaId)?.titulo ?? t.sistemaId;
    docs.push({
      id: t.id,
      tipo: 'topico',
      titulo: t.titulo,
      tags: t.tags.join(' '),
      corpo: '',
      topicoId: t.id,
      topicoTitulo: t.titulo,
      sistemaId: t.sistemaId,
      sistemaTitulo,
    });
    for (const bloco of t.blocos) {
      if (bloco.tipo === 'sinal') {
        docs.push({
          id: `sinal|${t.id}|${bloco.nome}`,
          tipo: 'sinal',
          titulo: bloco.nome,
          tags: '',
          // Descrição e causas entram como corpo, com peso menor: recall
          // para quem busca pelo fenômeno ("dor à descompressão") e não
          // pelo epônimo.
          corpo: `${bloco.descricao} ${bloco.causas.join(' ')}`,
          topicoId: t.id,
          topicoTitulo: t.titulo,
          sistemaId: t.sistemaId,
          sistemaTitulo,
          ancora: `sinal:${bloco.nome}`,
        });
      } else if (bloco.tipo === 'checklist') {
        docs.push({
          id: `checklist|${t.id}|${bloco.titulo}`,
          tipo: 'checklist',
          titulo: bloco.titulo,
          tags: '',
          corpo: '',
          topicoId: t.id,
          topicoTitulo: t.titulo,
          sistemaId: t.sistemaId,
          sistemaTitulo,
          ancora: `checklist:${bloco.titulo}`,
        });
      }
    }
  }
  indice.addAll(docs);
  return indice;
}

export function buscar(indice: MiniSearch<DocBusca>, termo: string): ResultadoBusca[] {
  if (termo.trim() === '') return [];
  return indice.search(termo).map((r) => ({
    id: String(r.id),
    tipo: r.tipo as TipoDeResultado,
    titulo: r.titulo as string,
    topicoId: r.topicoId as string,
    topicoTitulo: r.topicoTitulo as string,
    sistemaId: r.sistemaId as string,
    sistemaTitulo: r.sistemaTitulo as string,
    ancora: r.ancora as string | undefined,
  }));
}
