// Painel de revisão do autor (beta §9.9): cruza o status `revisao` de cada
// tópico (conteúdo compilado) com os itens ainda abertos do checklist
// docs/inconsistencias-para-revisao.md e destaca as pendências L6/O8.
// Gera docs/revisao-status.md e imprime um resumo.
// Uso: npm run revisao:status

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { carregarConteudo, listarSistemas } from '../src/content/store';
import type { Conteudo, Sistema } from '../src/content/schema';

export interface ItemChecklist {
  id: string; // ex.: A1, L6, O8
  titulo: string;
  aberto: boolean;
  secao: string; // título da seção (## ...)
}

/** Extrai os itens `- [ ] **X1 · Título** — ...` do checklist, por seção. */
export function parsearChecklist(md: string): ItemChecklist[] {
  const itens: ItemChecklist[] = [];
  let secao = '';
  for (const linha of md.split('\n')) {
    const cabecalho = /^## (.+)$/.exec(linha);
    if (cabecalho) {
      secao = cabecalho[1].trim();
      continue;
    }
    const item = /^- \[( |x|X)\] \*\*([A-Z]\d+)\s*·\s*([^*]+)\*\*/.exec(linha);
    if (item) {
      itens.push({
        id: item[2],
        titulo: item[3].trim(),
        aberto: item[1] === ' ',
        secao,
      });
    }
  }
  return itens;
}

function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Associa uma seção do checklist aos sistemas cujo título aparece nela
 * (ex.: "Itens da Fase 13 (mamas e geniturinário)" → mamas-e-geniturinario).
 * Seções sem sistema nomeado são "globais" (divergências A, convenções B…).
 */
export function sistemasDaSecao(tituloSecao: string, sistemas: Sistema[]): string[] {
  const secao = normalizar(tituloSecao);
  return sistemas
    .filter((s) => {
      const titulo = normalizar(s.titulo);
      const semPrefixo = titulo.replace(/^(aparelho|sistema|exame)\s+/, '');
      return secao.includes(titulo) || secao.includes(semPrefixo);
    })
    .map((s) => s.id);
}

export function gerarRelatorioRevisao(conteudo: Conteudo, itens: ItemChecklist[], agoraIso: string): string {
  const sistemas = listarSistemas(conteudo);
  const abertos = itens.filter((i) => i.aberto);
  const topicos = sistemas.flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
  const aprovados = topicos.filter((t) => t.revisao === 'aprovada');

  const porSistema = new Map<string, ItemChecklist[]>();
  const globais: ItemChecklist[] = [];
  for (const item of abertos) {
    const ids = sistemasDaSecao(item.secao, sistemas);
    if (ids.length === 0) {
      globais.push(item);
    } else {
      for (const id of ids) {
        porSistema.set(id, [...(porSistema.get(id) ?? []), item]);
      }
    }
  }

  const l6 = itens.find((i) => i.id === 'L6');
  const o8 = itens.find((i) => i.id === 'O8');
  const linhaPendencia = (rotulo: string, item: ItemChecklist | undefined) =>
    item
      ? `- **${rotulo}** (${item.aberto ? 'ABERTO' : 'resolvido'}): ${item.titulo}`
      : `- **${rotulo}**: não encontrado no checklist`;

  const partes: string[] = [];
  partes.push('# Status da revisão do autor');
  partes.push('');
  partes.push(`Gerado por \`npm run revisao:status\` em ${agoraIso}. Não edite à mão.`);
  partes.push('');
  partes.push('## Resumo');
  partes.push('');
  partes.push(`- Tópicos: **${topicos.length}** · aprovados: **${aprovados.length}** · pendentes: **${topicos.length - aprovados.length}**`);
  partes.push(`- Itens do checklist: **${abertos.length} abertos** de ${itens.length}`);
  partes.push('');
  partes.push('## Pendências de reescrita (plano de beta, semana 1)');
  partes.push('');
  partes.push(linhaPendencia('L6', l6));
  partes.push(linhaPendencia('O8', o8));
  partes.push('');
  partes.push('## Por sistema');
  for (const s of sistemas) {
    const topicosDoSistema = s.capitulos.flatMap((k) => k.topicos);
    const aprovadosDoSistema = topicosDoSistema.filter((t) => t.revisao === 'aprovada').length;
    partes.push('');
    partes.push(`### ${s.titulo} — ${aprovadosDoSistema}/${topicosDoSistema.length} aprovados`);
    partes.push('');
    for (const t of topicosDoSistema) {
      partes.push(`- [${t.revisao === 'aprovada' ? 'x' : ' '}] ${t.titulo} (\`${t.id}\`)`);
    }
    const doSistema = porSistema.get(s.id) ?? [];
    if (doSistema.length > 0) {
      partes.push('');
      partes.push(`Itens do checklist abertos desta fase: ${doSistema.map((i) => `**${i.id}**`).join(', ')}`);
    }
  }
  partes.push('');
  partes.push('## Itens globais abertos (divergências e convenções sem sistema único)');
  partes.push('');
  if (globais.length === 0) {
    partes.push('Nenhum.');
  } else {
    for (const item of globais) {
      partes.push(`- **${item.id}** · ${item.titulo} _(${item.secao})_`);
    }
  }
  partes.push('');
  return partes.join('\n');
}

function main() {
  const raiz = join(__dirname, '..');
  const conteudo = carregarConteudo(JSON.parse(readFileSync(join(raiz, 'assets/generated/content.json'), 'utf8')));
  const itens = parsearChecklist(readFileSync(join(raiz, 'docs/inconsistencias-para-revisao.md'), 'utf8'));
  const relatorio = gerarRelatorioRevisao(conteudo, itens, new Date().toISOString().slice(0, 10));
  writeFileSync(join(raiz, 'docs/revisao-status.md'), relatorio);

  const abertos = itens.filter((i) => i.aberto).length;
  const topicos = listarSistemas(conteudo).flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
  const aprovados = topicos.filter((t) => t.revisao === 'aprovada').length;
  console.log(`Tópicos aprovados: ${aprovados}/${topicos.length}`);
  console.log(`Itens do checklist abertos: ${abertos}/${itens.length}`);
  for (const id of ['L6', 'O8']) {
    const item = itens.find((i) => i.id === id);
    console.log(`${id}: ${item ? (item.aberto ? 'ABERTO' : 'resolvido') : 'não encontrado'}`);
  }
  console.log('Relatório: docs/revisao-status.md');
}

if (require.main === module) {
  main();
}
