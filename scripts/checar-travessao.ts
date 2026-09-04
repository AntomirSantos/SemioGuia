// Gate editorial: NENHUM travessão (U+2014) ou meia-risca (U+2013) em
// nenhum texto do projeto. Decisão do autor (2026-09): esse sinal virou
// marca registrada de texto de IA, e o guia escreve com vírgula,
// dois-pontos, ponto e parênteses. Roda no build junto dos demais gates.
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const PROIBIDOS = /[—–]/;
const RAIZES = ['content', 'src', 'docs', 'scripts', 'assets/sons'];
const ARQUIVOS_SOLTOS = ['README.md', 'CHANGELOG.md', 'AGENTS.md'];
const EXTENSOES = new Set(['.md', '.ts', '.tsx', '.py', '.json']);

function* arquivos(dir: string): Generator<string> {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      yield* arquivos(caminho);
    } else if (EXTENSOES.has(caminho.slice(caminho.lastIndexOf('.')))) {
      yield caminho;
    }
  }
}

export function checarTravessoes(raiz = '.'): string[] {
  const problemas: string[] = [];
  const alvos: string[] = [];
  for (const r of RAIZES) alvos.push(...arquivos(join(raiz, r)));
  alvos.push(...ARQUIVOS_SOLTOS.map((a) => join(raiz, a)));
  for (const caminho of alvos) {
    // Este próprio gate usa os códigos por escape, nunca o caractere.
    if (caminho.endsWith('checar-travessao.ts')) continue;
    const linhas = readFileSync(caminho, 'utf-8').split('\n');
    linhas.forEach((linha, i) => {
      if (PROIBIDOS.test(linha)) {
        problemas.push(`${caminho}:${i + 1}: ${linha.trim().slice(0, 90)}`);
      }
    });
  }
  return problemas;
}

if (process.argv[1]?.endsWith('checar-travessao.ts')) {
  const problemas = checarTravessoes();
  if (problemas.length > 0) {
    console.error(`Travessão/meia-risca proibidos encontrados (${problemas.length}):`);
    for (const p of problemas.slice(0, 40)) console.error('  ' + p);
    process.exit(1);
  }
  console.log('OK: nenhum travessão ou meia-risca nos textos do projeto.');
}
