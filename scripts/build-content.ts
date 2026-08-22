import * as fs from 'fs';
import * as path from 'path';
import { load } from 'js-yaml';
import { parseTopico } from './parse-topico';
import { parseCaso } from './parse-caso';
import { conteudoSchema, topicoSchema, type Conteudo, type Topico } from '../src/content/schema';
import { casoSchema, validarGrafoCaso, type Caso } from '../src/content/casoSchema';

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

  const sistemaIdsVistos = new Set<string>();
  for (const s of sistemas) {
    if (sistemaIdsVistos.has(s.id)) {
      erros.push(`sistemas.yaml: id de sistema duplicado "${s.id}"`);
    }
    sistemaIdsVistos.add(s.id);

    const capituloIdsVistos = new Set<string>();
    for (const c of s.capitulos) {
      if (capituloIdsVistos.has(c.id)) {
        erros.push(`sistemas.yaml: id de capítulo duplicado "${c.id}" no sistema "${s.id}"`);
      }
      capituloIdsVistos.add(c.id);
    }
  }

  const perguntaIdOrigem = new Map<string, string>();

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
          for (const bloco of topico.blocos) {
            if (bloco.tipo !== 'quiz') continue;
            for (const pergunta of bloco.perguntas) {
              const origem = perguntaIdOrigem.get(pergunta.id);
              if (origem) {
                erros.push(
                  `id de pergunta de quiz duplicado "${pergunta.id}" em ${topico.id} (${caminho}) e ${origem}`
                );
              } else {
                perguntaIdOrigem.set(pergunta.id, `${topico.id} (${caminho})`);
              }
            }
          }

          cap.topicos.push(topico);
        } catch (e) {
          erros.push(`${caminho}: ${(e as Error).message}`);
        }
      }
      cap.topicos.sort((a, b) => a.ordem - b.ordem);
    }
    s.capitulos.sort((a, b) => a.ordem - b.ordem);
  }
  sistemas.sort((a, b) => a.ordem - b.ordem);

  const idsDeTopicos = new Set(
    sistemas.flatMap((s) => s.capitulos.flatMap((c) => c.topicos.map((t) => t.id)))
  );

  const casos: Caso[] = [];
  const dirCasos = path.join(contentDir, 'casos');
  if (fs.existsSync(dirCasos)) {
    const idsDeCasosVistos = new Map<string, string>();
    for (const arq of fs.readdirSync(dirCasos).filter((f) => f.endsWith('.md')).sort()) {
      const caminho = path.join(dirCasos, arq);
      try {
        const bruto = parseCaso(fs.readFileSync(caminho, 'utf8'), caminho);
        const caso = casoSchema.parse(bruto);

        const origem = idsDeCasosVistos.get(caso.id);
        if (origem) {
          erros.push(`${caminho}: id de caso duplicado "${caso.id}" (também em ${origem})`);
        } else {
          idsDeCasosVistos.set(caso.id, caminho);
        }

        for (const topicoId of caso.topicosDeApoio) {
          if (!idsDeTopicos.has(topicoId)) {
            erros.push(`${caminho}: topicosDeApoio referencia tópico inexistente "${topicoId}"`);
          }
        }

        const violacoes = validarGrafoCaso(caso);
        for (const v of violacoes) {
          erros.push(`${caminho}: ${v}`);
        }

        casos.push(caso);
      } catch (e) {
        erros.push(`${caminho}: ${(e as Error).message}`);
      }
    }
  }

  if (erros.length > 0) throw new Error(`Conteúdo inválido (${erros.length} erro(s)):\n` + erros.join('\n'));
  return conteudoSchema.parse({ versao: tax.versao, sistemas, casos });
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
  console.log(
    `OK: ${c.sistemas.length} sistemas, ${topicos.length} tópicos (${pendentes} com revisão pendente), ` +
      `${c.casos.length} casos → ${destino}`
  );
}
