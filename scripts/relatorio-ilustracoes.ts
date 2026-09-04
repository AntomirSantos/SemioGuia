// Relatório de cobertura de ilustrações (didática 2026-09): quantos blocos
// `ilustracao` cada tópico tem, com destaque para os tópicos sem nenhuma.
// Dual coding rende mais onde o texto descreve geometria ou padrão temporal;
// este relatório aponta onde olhar. Lê o conteúdo compilado, então rode
// `npm run build:content` antes se o content/ mudou.
import { readFileSync } from 'fs';
import { join } from 'path';

interface Bloco {
  tipo: string;
}
interface Topico {
  id: string;
  titulo: string;
  blocos: Bloco[];
}
interface Capitulo {
  topicos: Topico[];
}
interface Sistema {
  titulo: string;
  capitulos: Capitulo[];
}

export interface LinhaRelatorio {
  id: string;
  titulo: string;
  sistema: string;
  ilustracoes: number;
}

export function relatorioIlustracoes(raiz = '.'): LinhaRelatorio[] {
  const conteudo = JSON.parse(readFileSync(join(raiz, 'assets/generated/content.json'), 'utf-8')) as {
    sistemas: Sistema[];
  };
  const linhas: LinhaRelatorio[] = [];
  for (const sistema of conteudo.sistemas) {
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        linhas.push({
          id: topico.id,
          titulo: topico.titulo,
          sistema: sistema.titulo,
          ilustracoes: topico.blocos.filter((b) => b.tipo === 'ilustracao').length,
        });
      }
    }
  }
  return linhas.sort((a, b) => a.ilustracoes - b.ilustracoes || a.id.localeCompare(b.id));
}

if (process.argv[1]?.endsWith('relatorio-ilustracoes.ts')) {
  const linhas = relatorioIlustracoes();
  const total = linhas.reduce((soma, l) => soma + l.ilustracoes, 0);
  const semNenhuma = linhas.filter((l) => l.ilustracoes === 0);

  console.log(`Ilustrações: ${total} em ${linhas.length} tópicos\n`);
  if (semNenhuma.length > 0) {
    console.log(`Tópicos SEM ilustração (${semNenhuma.length}):`);
    for (const l of semNenhuma) console.log(`  0  ${l.id} (${l.titulo})`);
    console.log('');
  } else {
    console.log('Todos os tópicos têm ao menos uma ilustração.\n');
  }
  console.log('Cobertura completa (crescente):');
  for (const l of linhas) console.log(`  ${l.ilustracoes}  ${l.id}`);
}
