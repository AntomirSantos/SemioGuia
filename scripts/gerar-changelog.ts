// Gera o CHANGELOG.md na raiz a partir da fonte única em
// src/versao/changelog.ts (beta §9.8). Uso: npm run changelog
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHANGELOG, changelogConsistente, gerarMarkdownChangelog } from '../src/versao/changelog';

function main() {
  if (!changelogConsistente(CHANGELOG)) {
    console.error('A entrada mais recente do changelog não bate com VERSAO_APP (src/config/versao.ts).');
    process.exit(1);
  }
  const destino = join(__dirname, '..', 'CHANGELOG.md');
  writeFileSync(destino, gerarMarkdownChangelog(CHANGELOG));
  console.log(`CHANGELOG.md gerado com ${CHANGELOG.length} entradas (topo: ${CHANGELOG[0].versao}).`);
}

if (require.main === module) {
  main();
}
