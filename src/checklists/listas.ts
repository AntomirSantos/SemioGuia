import type { Conteudo } from '../content/schema';

// Tela de checklists (pedido do autor, 2026-09): reunir todos os blocos
// `checklist` dos tópicos em um só lugar, para o aluno marcar item a item e
// ver o que esqueceu. A fonte é o conteúdo revisado: este módulo só reúne,
// nada aqui inventa texto novo.

export interface ChecklistDeExame {
  titulo: string;
  itens: string[];
  topicoId: string;
  topicoTitulo: string;
  sistemaTitulo: string;
  sistemaCor: string;
}

// Ao contrário do plantão, os checklists NÃO são ordenados alfabeticamente:
// eles seguem a ordem craniocaudal do guia e a ordem dos tópicos, porque um
// checklist é um roteiro de exame e a sequência é parte do que se confere.
export function listarChecklists(conteudo: Conteudo): ChecklistDeExame[] {
  const listas: ChecklistDeExame[] = [];
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo !== 'checklist') continue;
          listas.push({
            titulo: bloco.titulo,
            itens: bloco.itens,
            topicoId: topico.id,
            topicoTitulo: topico.titulo,
            sistemaTitulo: sistema.titulo,
            sistemaCor: sistema.cor,
          });
        }
      }
    }
  }
  return listas;
}

export interface GrupoDeChecklists {
  sistemaTitulo: string;
  sistemaCor: string;
  checklists: ChecklistDeExame[];
}

/**
 * Agrupa por sistema preservando a ordem de entrada (a ordem do guia quando
 * a lista vem de listarChecklists). Grupos vazios não aparecem, então também
 * serve para agrupar um resultado de busca já filtrado.
 */
export function agruparPorSistema(listas: ChecklistDeExame[]): GrupoDeChecklists[] {
  const grupos: GrupoDeChecklists[] = [];
  for (const lista of listas) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.sistemaTitulo === lista.sistemaTitulo) {
      ultimo.checklists.push(lista);
    } else {
      grupos.push({ sistemaTitulo: lista.sistemaTitulo, sistemaCor: lista.sistemaCor, checklists: [lista] });
    }
  }
  return grupos;
}

export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Filtra por título, tópico ou texto dos itens, sem acento e sem caixa. */
export function filtrarChecklists(listas: ChecklistDeExame[], termo: string): ChecklistDeExame[] {
  const alvo = normalizar(termo.trim());
  if (!alvo) return listas;
  return listas.filter(
    (lista) =>
      normalizar(lista.titulo).includes(alvo) ||
      normalizar(lista.topicoTitulo).includes(alvo) ||
      lista.itens.some((item) => normalizar(item).includes(alvo)),
  );
}
