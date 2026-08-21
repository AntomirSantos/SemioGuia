import matter from 'gray-matter';
import { load } from 'js-yaml';

export interface TopicoParseado {
  frontmatter: Record<string, unknown>;
  blocos: unknown[];
}

export function parseTopico(markdown: string, caminho: string): TopicoParseado {
  let data: Record<string, unknown>;
  let content: string;
  try {
    const result = matter(markdown);
    data = result.data;
    content = result.content;
  } catch (e) {
    throw new Error(`${caminho}: YAML inválido no frontmatter: ${(e as Error).message}`);
  }

  const linhas = content.split('\n');
  const blocos: unknown[] = [];
  let dentro: string | null = null;
  let corpo: string[] = [];

  for (const linha of linhas) {
    const abre = linha.match(/^:::\s+([a-z]+)\s*$/);
    if (abre && dentro === null) {
      dentro = abre[1];
      corpo = [];
    } else if (linha.trim() === ':::' && dentro !== null) {
      let dados: unknown;
      try {
        dados = load(corpo.join('\n'));
      } catch (e) {
        throw new Error(`${caminho}: YAML inválido no bloco "${dentro}": ${(e as Error).message}`);
      }
      if (typeof dados !== 'object' || dados === null || Array.isArray(dados)) {
        throw new Error(`${caminho}: bloco "${dentro}" não contém um mapa YAML`);
      }
      blocos.push({ tipo: dentro, ...(dados as Record<string, unknown>) });
      dentro = null;
    } else if (dentro !== null) {
      corpo.push(linha);
    } else if (linha.trim() !== '') {
      throw new Error(`${caminho}: texto fora de bloco: "${linha.trim().slice(0, 40)}"`);
    }
  }
  if (dentro !== null) throw new Error(`${caminho}: bloco "${dentro}" sem fechamento ":::"`);
  return { frontmatter: data, blocos };
}
