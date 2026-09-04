// Relatório do beta (plano de validação §2/§9.1): consome os JSONs que os
// alunos exportam pelo botão "Exportar dados de uso" no Perfil e calcula as
// métricas de decisão: retenção D1/D7 e sessões por semana.
//
// Uso: npm run relatorio:beta -- exports/*.json
//
// Definições (documentadas aqui porque o número depende delas):
// - Dia 0 de um aluno = dia UTC do seu primeiro evento.
// - Retido em D(n) = tem ao menos um evento no dia 0 + n (retenção clássica
//   de dia calendário, não "n dias ou mais").
// - Elegível para D(n) = o dia 0 + n não é depois do último dia observado em
//   TODO o conjunto (quem entrou ontem ainda não pode contar contra o D7).
// - Sessão = sequência de eventos do mesmo aluno com intervalos ≤ 30 min;
//   um intervalo maior abre nova sessão. Semana = semana ISO (UTC) do
//   primeiro evento da sessão.

import { readFileSync } from 'node:fs';
import type { RegistroEvento } from '../src/analytics/types';

export interface ExportacaoBeta {
  userId: string;
  eventos: RegistroEvento[];
}

export interface Retencao {
  n: number;
  elegiveis: number;
  retidos: number;
  proporcao: number | null; // null quando não há elegíveis
}

export interface SemanaDeSessoes {
  semana: string; // ex.: 2026-S37
  sessoes: number;
  usuarios: number;
  sessoesPorUsuario: number;
}

export interface RelatorioBeta {
  usuarios: number;
  eventosTotais: number;
  eventosPorTipo: Record<string, number>;
  retencaoD1: Retencao;
  retencaoD7: Retencao;
  sessoesPorSemana: SemanaDeSessoes[];
}

export const INTERVALO_SESSAO_MS = 30 * 60 * 1000;
const DIA_MS = 24 * 60 * 60 * 1000;

/** Aceita o envelope do app ({app, formato, userId, eventos}) ou um array puro. */
export function lerExportacao(json: string): ExportacaoBeta {
  const dado = JSON.parse(json) as
    | { userId?: string; eventos?: RegistroEvento[] }
    | RegistroEvento[];
  if (Array.isArray(dado)) {
    const userId = dado[0]?.userId ?? 'desconhecido';
    return { userId, eventos: dado };
  }
  if (!Array.isArray(dado.eventos)) {
    throw new Error('exportação sem a lista `eventos`');
  }
  return { userId: dado.userId ?? dado.eventos[0]?.userId ?? 'desconhecido', eventos: dado.eventos };
}

/** Dia UTC (YYYY-MM-DD) de um carimbo epoch-ms. */
export function diaUtc(em: number): string {
  return new Date(em).toISOString().slice(0, 10);
}

/** Semana ISO 8601 (UTC) de um carimbo, ex.: "2026-S37". */
export function semanaIso(em: number): string {
  const d = new Date(em);
  const dt = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const diaSemana = dt.getUTCDay() || 7; // ISO: segunda=1 … domingo=7
  dt.setUTCDate(dt.getUTCDate() + 4 - diaSemana); // quinta-feira da mesma semana
  const ano = dt.getUTCFullYear();
  const inicioDoAno = Date.UTC(ano, 0, 1);
  const semana = Math.ceil(((dt.getTime() - inicioDoAno) / DIA_MS + 1) / 7);
  return `${ano}-S${String(semana).padStart(2, '0')}`;
}

function porUsuario(exportacoes: ExportacaoBeta[]): Map<string, number[]> {
  const mapa = new Map<string, number[]>();
  for (const exp of exportacoes) {
    const carimbos = mapa.get(exp.userId) ?? [];
    for (const e of exp.eventos) carimbos.push(e.em);
    mapa.set(exp.userId, carimbos);
  }
  for (const carimbos of mapa.values()) carimbos.sort((a, b) => a - b);
  return mapa;
}

export function calcularRetencao(exportacoes: ExportacaoBeta[], n: number): Retencao {
  const usuarios = porUsuario(exportacoes);
  let ultimoDiaObservado = '';
  for (const carimbos of usuarios.values()) {
    for (const em of carimbos) {
      const dia = diaUtc(em);
      if (dia > ultimoDiaObservado) ultimoDiaObservado = dia;
    }
  }

  let elegiveis = 0;
  let retidos = 0;
  for (const carimbos of usuarios.values()) {
    if (carimbos.length === 0) continue;
    const dia0Ms = Date.parse(`${diaUtc(carimbos[0])}T00:00:00.000Z`);
    const diaAlvo = diaUtc(dia0Ms + n * DIA_MS);
    if (diaAlvo > ultimoDiaObservado) continue; // janela ainda não fechou
    elegiveis += 1;
    if (carimbos.some((em) => diaUtc(em) === diaAlvo)) retidos += 1;
  }
  return { n, elegiveis, retidos, proporcao: elegiveis > 0 ? retidos / elegiveis : null };
}

/** Divide os carimbos ordenados de um usuário em sessões (gap > 30 min abre nova). */
export function dividirEmSessoes(carimbosOrdenados: number[]): number[][] {
  const sessoes: number[][] = [];
  let atual: number[] = [];
  for (const em of carimbosOrdenados) {
    if (atual.length > 0 && em - atual[atual.length - 1] > INTERVALO_SESSAO_MS) {
      sessoes.push(atual);
      atual = [];
    }
    atual.push(em);
  }
  if (atual.length > 0) sessoes.push(atual);
  return sessoes;
}

export function calcularSessoesPorSemana(exportacoes: ExportacaoBeta[]): SemanaDeSessoes[] {
  const usuarios = porUsuario(exportacoes);
  const porSemana = new Map<string, { sessoes: number; usuarios: Set<string> }>();
  for (const [userId, carimbos] of usuarios) {
    for (const sessao of dividirEmSessoes(carimbos)) {
      const semana = semanaIso(sessao[0]);
      const acc = porSemana.get(semana) ?? { sessoes: 0, usuarios: new Set<string>() };
      acc.sessoes += 1;
      acc.usuarios.add(userId);
      porSemana.set(semana, acc);
    }
  }
  return Array.from(porSemana.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([semana, acc]) => ({
      semana,
      sessoes: acc.sessoes,
      usuarios: acc.usuarios.size,
      sessoesPorUsuario: acc.sessoes / acc.usuarios.size,
    }));
}

export function calcularRelatorio(exportacoes: ExportacaoBeta[]): RelatorioBeta {
  const eventosPorTipo: Record<string, number> = {};
  let eventosTotais = 0;
  for (const exp of exportacoes) {
    for (const e of exp.eventos) {
      eventosTotais += 1;
      eventosPorTipo[e.evento] = (eventosPorTipo[e.evento] ?? 0) + 1;
    }
  }
  return {
    usuarios: porUsuario(exportacoes).size,
    eventosTotais,
    eventosPorTipo,
    retencaoD1: calcularRetencao(exportacoes, 1),
    retencaoD7: calcularRetencao(exportacoes, 7),
    sessoesPorSemana: calcularSessoesPorSemana(exportacoes),
  };
}

function formatarRetencao(r: Retencao): string {
  if (r.proporcao === null) return `D${r.n}: sem elegíveis ainda`;
  return `D${r.n}: ${(r.proporcao * 100).toFixed(1)}% (${r.retidos}/${r.elegiveis} elegíveis)`;
}

function main() {
  const arquivos = process.argv.slice(2);
  if (arquivos.length === 0) {
    console.error('Uso: npm run relatorio:beta -- <exportacao1.json> [exportacao2.json ...]');
    process.exit(1);
  }
  const exportacoes = arquivos.map((caminho) => lerExportacao(readFileSync(caminho, 'utf8')));
  const r = calcularRelatorio(exportacoes);

  console.log(`Exportações lidas: ${arquivos.length}`);
  console.log(`Alunos (userIds distintos): ${r.usuarios}`);
  console.log(`Eventos totais: ${r.eventosTotais}`);
  console.log('\nEventos por tipo:');
  for (const [evento, n] of Object.entries(r.eventosPorTipo).sort(([, a], [, b]) => b - a)) {
    console.log(`  ${evento}: ${n}`);
  }
  console.log('\nRetenção (dia calendário UTC):');
  console.log(`  ${formatarRetencao(r.retencaoD1)}`);
  console.log(`  ${formatarRetencao(r.retencaoD7)}  ← critério de decisão: ≥ 40%`);
  console.log('\nSessões por semana (gap de 30 min abre nova sessão):');
  for (const s of r.sessoesPorSemana) {
    console.log(
      `  ${s.semana}: ${s.sessoes} sessões · ${s.usuarios} alunos ativos · ${s.sessoesPorUsuario.toFixed(1)} sessões/aluno`,
    );
  }
}

if (require.main === module) {
  main();
}
