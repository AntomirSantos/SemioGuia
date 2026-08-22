import matter from 'gray-matter';
import { load } from 'js-yaml';
import { casoSchema, type Caso } from '../src/content/casoSchema';

/**
 * Parses a clinical-case markdown file: YAML frontmatter (top-level case
 * fields) followed by one or more fenced `::: no` blocks, each holding the
 * YAML of a single node (its own `tipo` field selects cena/decisao/desfecho).
 * Mirrors the mechanics and error style of parse-topico.ts.
 */
export function parseCaso(markdown: string, caminho: string): Caso {
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
  const nos: unknown[] = [];
  let dentro = false;
  let corpo: string[] = [];
  let indiceBloco = 0;

  for (const linha of linhas) {
    const abre = linha.match(/^:::\s+no\s*$/);
    if (abre && !dentro) {
      dentro = true;
      corpo = [];
      indiceBloco += 1;
    } else if (linha.trim() === ':::' && dentro) {
      let dados: unknown;
      try {
        dados = load(corpo.join('\n'));
      } catch (e) {
        throw new Error(`${caminho}: YAML inválido no bloco "no" (nº ${indiceBloco}): ${(e as Error).message}`);
      }
      if (typeof dados !== 'object' || dados === null || Array.isArray(dados)) {
        throw new Error(`${caminho}: bloco "no" (nº ${indiceBloco}) não contém um mapa YAML`);
      }
      nos.push(dados);
      dentro = false;
    } else if (dentro) {
      corpo.push(linha);
    } else if (linha.trim() !== '') {
      throw new Error(`${caminho}: texto fora de bloco: "${linha.trim().slice(0, 40)}"`);
    }
  }
  if (dentro) throw new Error(`${caminho}: bloco "no" (nº ${indiceBloco}) sem fechamento ":::"`);

  try {
    return casoSchema.parse({ ...data, nos });
  } catch (e) {
    const mensagem =
      e instanceof Error && 'issues' in e
        ? (e as unknown as { issues: { path: (string | number)[]; message: string }[] }).issues
            .map((i) => `${i.path.join('.') || '(raiz)'}: ${i.message}`)
            .join('; ')
        : (e as Error).message;
    throw new Error(`${caminho}: dados do caso inválidos: ${mensagem}`);
  }
}
