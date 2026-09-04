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

export function listarSinais(conteudo: Conteudo): SinalDePlantao[] {
  const sinais: SinalDePlantao[] = [];
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo !== 'sinal') continue;
          sinais.push({
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
  }
  return sinais.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
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
