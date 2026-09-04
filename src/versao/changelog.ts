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
    versao: '1.2.3',
    data: '2026-09-04',
    linhas: [
      'Revisão do autor encerrada: os 86 itens do checklist estão fechados',
      'Livedo reticular corrigido pela literatura: a malha cianótica circunda centros pálidos',
      'Flegmasias com as formas consagradas (alba dolens e cerulea dolens)',
    ],
  },
  {
    versao: '1.2.2',
    data: '2026-09-04',
    linhas: [
      'Cabeça e pescoço com lados eleitos pela hierarquia: anisocoria e enoftalmia por McGee, Rinne por intensidade, palpação da tireoide pelo movimento',
      'Manobra de oclusão arterial transitória entra nas manobras dinâmicas dos sopros',
      'Casos clínicos e periodicidades de rastreamento endossados pelo autor',
    ],
  },
  {
    versao: '1.2.1',
    data: '2026-09-04',
    linhas: [
      'Triagem de literatura concluída nos 12 sistemas: todos os 55 tópicos agora "Revisado"',
      'Selo "Em revisão pelo autor" sai do app inteiro',
      'Valores conferidos na literatura aberta e nas obras de referência, com divergências atribuídas',
    ],
  },
  {
    versao: '1.2.0',
    data: '2026-09-04',
    linhas: [
      'Anamnese e exame físico geral revisados pela literatura: 19 tópicos agora "Revisado" na home',
      'Quiz cobra só o nível básico, sem viés de resposta longa; cores de sistema re-otimizadas para daltonismo',
      'Duas ilustrações novas: padrões de perda sensitiva e membro ameaçado × inviável',
    ],
  },
  {
    versao: '1.1.3',
    data: '2026-09-03',
    linhas: [
      'Hierarquia editorial completa: McGee primeiro, Semiologia Clínica como desempate',
      'Guia adota: Traube semilunar, escala de pulso 0–3+, reflexos 0–++++, faixas de FR da criança',
      'Também: espéculo na paciente com hímen perfurado (SC), posições do toque retal e ITB de McGee',
    ],
  },
  {
    versao: '1.1.2',
    data: '2026-09-03',
    linhas: [
      'Regra editorial do autor: em conflito direto entre fontes, prevalece McGee',
      'Joelho passa a adotar flexão normal de 130°; relógio de Wolf-Klein sem ajuste por escolaridade',
      'Dez divergências do checklist fechadas com a posição contrária mantida e atribuída',
    ],
  },
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
