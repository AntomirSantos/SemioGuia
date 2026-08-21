import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';
import { parseTopico } from './parse-topico';
import { conteudoSchema, topicoSchema, type Conteudo, type Topico } from '../src/content/schema';

interface TaxCapitulo { id: string; titulo: string; ordem: number }
interface TaxSistema { id: string; titulo: string; cor: string; icone: string; ordem: number; capitulos: TaxCapitulo[] }
interface Taxonomia { versao: string; sistemas: TaxSistema[] }

export function compilarConteudo(contentDir: string): Conteudo {
  const erros: string[] = [];
  const tax = load(fs.readFileSync(path.join(contentDir, 'sistemas.yaml'), 'utf8')) as Taxonomia;

  const sistemas = tax.sistemas.map((s) => ({
    ...s,
    capitulos: s.capitulos.map((c) => ({ ...c, topicos: [] as Topico[] })),
  }));

  for (const s of sistemas) {
    const dirSistema = path.join(contentDir, s.id);
    if (!fs.existsSync(dirSistema)) continue;
    for (const capDir of fs.readdirSync(dirSistema)) {
      const cap = s.capitulos.find((c) => c.id === capDir);
      if (!cap) {
        erros.push(`${s.id}/${capDir}: capítulo não declarado em sistemas.yaml`);
        continue;
      }
      for (const arq of fs.readdirSync(path.join(dirSistema, capDir)).filter((f) => f.endsWith('.md')).sort()) {
        const caminho = path.join(dirSistema, capDir, arq);
        const slug = arq.replace(/\.md$/, '');
        try {
          const { frontmatter, blocos } = parseTopico(fs.readFileSync(caminho, 'utf8'), caminho);
          const topico = topicoSchema.parse({
            ...frontmatter,
            id: `${s.id}/${cap.id}/${slug}`,
            sistemaId: s.id,
            capituloId: cap.id,
            tags: frontmatter.tags ?? [],
            blocos,
          });
          cap.topicos.push(topico);
        } catch (e) {
          erros.push(`${caminho}: ${(e as Error).message}`);
        }
      }
      cap.topicos.sort((a, b) => a.ordem - b.ordem);
    }
  }

  if (erros.length > 0) throw new Error(`Conteúdo inválido (${erros.length} erro(s)):\n` + erros.join('\n'));
  return conteudoSchema.parse({ versao: tax.versao, sistemas });
}

// CLI
if (require.main === module) {
  const contentDir = path.join(__dirname, '..', 'content');
  const destino = path.join(__dirname, '..', 'assets', 'generated', 'content.json');
  const c = compilarConteudo(contentDir);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, JSON.stringify(c, null, 1));
  const topicos = c.sistemas.flatMap((s) => s.capitulos.flatMap((k) => k.topicos));
  const pendentes = topicos.filter((t) => t.revisao === 'pendente').length;
  console.log(`OK: ${c.sistemas.length} sistemas, ${topicos.length} tópicos (${pendentes} com revisão pendente) → ${destino}`);
}
