import type { Conteudo } from '../content/schema';

// Modo plantão (produto 2026-09): "achei X no exame, e agora?". A fonte é o
// conteúdo já revisado: cada bloco `sinal` dos tópicos carrega nome,
// descrição, significado e causas; este módulo só os reúne e filtra. Nada
// aqui inventa texto novo.

export interface SinalDePlantao {
  nome: string;
  descricao: string;
  significado: string;
  causas: string[];
  topicoId: string;
  topicoTitulo: string;
  sistemaTitulo: string;
  sistemaCor: string;
}

// A lista sai na ordem craniocaudal do guia (sistema a sistema) e, dentro de
// cada sistema, em ordem alfabética: no plantão se folheia por região e se
// acha o nome pelo olho.
export function listarSinais(conteudo: Conteudo): SinalDePlantao[] {
  const sinais: SinalDePlantao[] = [];
  for (const sistema of conteudo.sistemas) {
    const doSistema: SinalDePlantao[] = [];
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo !== 'sinal') continue;
          doSistema.push({
            nome: bloco.nome,
            descricao: bloco.descricao,
            significado: bloco.significado,
            causas: bloco.causas,
            topicoId: topico.id,
            topicoTitulo: topico.titulo,
            sistemaTitulo: sistema.titulo,
            sistemaCor: sistema.cor,
          });
        }
      }
    }
    doSistema.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    sinais.push(...doSistema);
  }
  return sinais;
}

export interface GrupoDeSinais {
  sistemaTitulo: string;
  sistemaCor: string;
  sinais: SinalDePlantao[];
}

/**
 * Agrupa por sistema preservando a ordem de entrada (a ordem do guia quando
 * a lista vem de listarSinais). Grupos vazios não aparecem, então também
 * serve para agrupar um resultado de busca já filtrado.
 */
export function agruparPorSistema(sinais: SinalDePlantao[]): GrupoDeSinais[] {
  const grupos: GrupoDeSinais[] = [];
  const porTitulo = new Map<string, GrupoDeSinais>();
  for (const sinal of sinais) {
    let grupo = porTitulo.get(sinal.sistemaTitulo);
    if (!grupo) {
      grupo = { sistemaTitulo: sinal.sistemaTitulo, sistemaCor: sinal.sistemaCor, sinais: [] };
      porTitulo.set(sinal.sistemaTitulo, grupo);
      grupos.push(grupo);
    }
    grupo.sinais.push(sinal);
  }
  return grupos;
}

/** Minúsculas e sem acentos, para casar "deficit" com "Déficit". */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

// Filtro do plantão: nome primeiro (quem digita "sopro" quer os sopros),
// depois o corpo do verbete (descrição, significado, causas). Termo vazio
// devolve a lista inteira: no plantão, folhear também é uso legítimo.
export function filtrarSinais(sinais: SinalDePlantao[], termo: string): SinalDePlantao[] {
  const t = normalizar(termo.trim());
  if (t.length === 0) return sinais;
  const porNome: SinalDePlantao[] = [];
  const porCorpo: SinalDePlantao[] = [];
  for (const sinal of sinais) {
    if (normalizar(sinal.nome).includes(t)) {
      porNome.push(sinal);
      continue;
    }
    const corpo = normalizar(`${sinal.descricao} ${sinal.significado} ${sinal.causas.join(' ')} ${sinal.topicoTitulo}`);
    if (corpo.includes(t)) porCorpo.push(sinal);
  }
  return [...porNome, ...porCorpo];
}
