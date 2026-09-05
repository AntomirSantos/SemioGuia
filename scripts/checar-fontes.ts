// Gate editorial: NENHUMA menção às obras de referência no CORPO dos
// conteúdos. Decisão do autor (2026-09-05): a prosa afirma direto, sem
// "segundo Porto" nem "McGee registra"; a bibliografia vive na aba Perfil.
// O frontmatter (campo `referencias`, entre os `---`) continua carregando a
// atribuição detalhada, como trilha de auditoria: o gate ignora o
// frontmatter e vigia só o corpo dos .md de content/.
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const PADROES: Array<[string, RegExp]> = [
  ['McGee', /McGee/],
  ['Porto (obra)', /\bPorto\b/],
  ['Semiologia Clínica', /Semiologia Cl[ií]nica/],
  ['Semiologia Médica', /Semiologia M[eé]dica/],
  ['Exame Clínico (obra)', /Exame Cl[ií]nico/],
  ['boxe EBM', /boxe EBM/i],
  ['Tabela do livro', /Tabela \d+\.\d+/],
  ['Figura do livro', /Figura \d/],
  ['Quadro do livro', /Quadro \d/],
  ['capítulo do livro', /\bcap\. ?\d/],
  ['boxe do livro', /\bboxe\b/i],
  ['quatro obras', /quatro obras/],
  ['fontes adotadas', /fontes adotadas/],
];

function* arquivosMd(dir: string): Generator<string> {
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) {
      yield* arquivosMd(caminho);
    } else if (caminho.endsWith('.md')) {
      yield caminho;
    }
  }
}

function corpoSemFrontmatter(texto: string): { corpo: string; deslocamento: number } {
  const m = texto.match(/^---\n[\s\S]*?\n---\n/);
  if (!m) return { corpo: texto, deslocamento: 0 };
  const cabecalho = m[0];
  return { corpo: texto.slice(cabecalho.length), deslocamento: cabecalho.split('\n').length - 1 };
}

export function checarFontes(raiz = '.'): string[] {
  const problemas: string[] = [];
  for (const caminho of arquivosMd(join(raiz, 'content'))) {
    const texto = readFileSync(caminho, 'utf-8');
    const { corpo, deslocamento } = corpoSemFrontmatter(texto);
    const linhas = corpo.split('\n');
    linhas.forEach((linha, i) => {
      for (const [nome, padrao] of PADROES) {
        if (padrao.test(linha)) {
          problemas.push(`${caminho}:${deslocamento + i + 1}: ${nome}: ${linha.trim().slice(0, 90)}`);
        }
      }
    });
  }
  return problemas;
}

if (require.main === module) {
  const problemas = checarFontes();
  if (problemas.length > 0) {
    console.error(`ERRO: ${problemas.length} menção(ões) às obras no corpo dos conteúdos:`);
    for (const p of problemas.slice(0, 40)) console.error('  ' + p);
    if (problemas.length > 40) console.error(`  ... e mais ${problemas.length - 40}`);
    process.exit(1);
  }
  console.log('OK: nenhuma menção às obras de referência no corpo dos conteúdos.');
}
