import { VERSAO_APP } from '../config/versao';

// Changelog do app (beta §9.8): esta lista é a FONTE ÚNICA — o CHANGELOG.md
// na raiz é gerado dela por `npm run changelog`, e o cartão "O que mudou"
// lê as linhas da entrada mais recente. A cada publicação em gh-pages:
// bump em src/config/versao.ts + nova entrada aqui + `npm run changelog`.

export interface EntradaChangelog {
  versao: string;
  data: string; // YYYY-MM-DD da publicação em gh-pages
  linhas: string[];
}

export const CHANGELOG: EntradaChangelog[] = [
  {
    versao: '1.1.1',
    data: '2026-09-03',
    linhas: [
      'Cardiovascular e respiratório revisados: selo "Em revisão" removido e marcador "Revisado" na home',
      'Valores de evidência conferidos com a literatura; divergências entre fontes citadas ao lado dos números',
      'Nada mudou de direção — os achados do guia foram confirmados',
    ],
  },
  {
    versao: '1.1.0',
    data: '2026-09-03',
    linhas: [
      'Onboarding com data da prova e plano de estudo diário na home',
      'Compartilhar resultado das estações OSCE e feedback dentro do app',
      'Abrir links diretos de tópicos sem aviso de erro (correção do #418)',
    ],
  },
  {
    versao: '1.0.0',
    data: '2026-09-02',
    linhas: [
      'Guia completo: 12 sistemas e 55 tópicos, da anamnese à criança',
      'Design Editorial (tipografia serifada, papel e tinta) com animações',
      'Quiz, revisão espaçada, estações OSCE e 3 casos clínicos',
    ],
  },
];

/** As N linhas mais recentes (da entrada do topo) para o cartão da home. */
export function linhasMaisRecentes(entradas: EntradaChangelog[], n = 3): string[] {
  return entradas[0]?.linhas.slice(0, n) ?? [];
}

export function gerarMarkdownChangelog(entradas: EntradaChangelog[]): string {
  const corpo = entradas
    .map((e) => `## ${e.versao} — ${e.data}\n\n${e.linhas.map((l) => `- ${l}`).join('\n')}\n`)
    .join('\n');
  return `# Changelog\n\nUma entrada por publicação em gh-pages, a mais recente primeiro.\nGerado de \`src/versao/changelog.ts\` por \`npm run changelog\` — edite lá.\n\n${corpo}`;
}

/** Consistência: a entrada mais recente deve ser a versão corrente do app. */
export function changelogConsistente(entradas: EntradaChangelog[]): boolean {
  return entradas[0]?.versao === VERSAO_APP;
}
