import MiniSearch from 'minisearch';
import { listarTodosTopicos, obterSistema } from '../content/store';
import { APELIDOS_DE_SINAIS } from './apelidos';
import type { Conteudo } from '../content/schema';

// Busca insensível a acento (pedido do autor, 2026-09): o mesmo
// processamento vale para indexação e consulta, então "punhopercussao"
// encontra "punhopercussão" e vice-versa.
function processarTermo(termo: string): string | null {
  const limpo = termo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  return limpo.length > 0 ? limpo : null;
}

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
    processTerm: processarTermo,
    // O nome pesa mais que tags e corpo: "Blumberg" deve trazer o sinal de
    // Blumberg à frente do tópico que só o cita. O processTerm da consulta
    // repete o da indexação, tirando os acentos dos dois lados.
    searchOptions: { prefix: true, fuzzy: 0.2, boost: { titulo: 3, tags: 1.5 }, processTerm: processarTermo },
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
          // Apelidos de enfermaria, siglas e nomes em inglês: só para busca.
          tags: (APELIDOS_DE_SINAIS[bloco.nome] ?? []).join(' '),
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
