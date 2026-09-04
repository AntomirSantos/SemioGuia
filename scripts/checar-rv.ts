import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Regra editorial das razões de verossimilhança (didática 2026-09): o leitor
// de semiologia não pensa em RV, pensa em "isso confirma ou não". Toda RV
// numérica citada em PROSA precisa vir acompanhada, no mesmo parágrafo, de
// uma tradução interpretativa — para onde a probabilidade se move, ou que o
// achado quase não muda o raciocínio. Tabelas e ilustrações ficam de fora:
// elas listam; a prosa vizinha é que interpreta.

const RAIZ_CONTEUDO = join(__dirname, '..', 'content');

// Uma RV numérica em prosa: "razão de verossimilhança 4,5", "RV 4,5",
// "RV+ 6,8", "razão de verossimilhança positiva é próxima de 6".
const PADRAO_RV_NUMERICA =
  /(?:raz(?:ão|ões) de verossimilhança[^.\n]{0,40}?|\bRV\s*[+−-]?\s*(?:de\s*)?)\d+(?:[.,]\d+)?/;

// Marcadores de tradução interpretativa aceitos no mesmo parágrafo.
const MARCADORES = [
  'probabilidade',
  'sobe',
  'cai',
  'eleva',
  'elevam',
  'reduz',
  'aumenta',
  'aumentam',
  'diminui',
  'afasta',
  'confirma',
  'exclui',
  'argumenta contra',
  'praticamente',
  'quase não muda',
  'sem significância',
  'pouco valor',
  'não discrimina',
  'discrimina',
  'decide',
  'decisiv',
  'tranquiliza',
  'informa',
  'aponta',
  'sugere',
  'prediz',
  'preditor',
  'desempenho',
  'acurác',
  'sensibilidade',
  'especificidade',
  'modest',
  'peso',
  'pesa',
  'diagnóstic',
  'suspeita',
  'alarme',
];

interface Achado {
  arquivo: string;
  linha: number;
  trecho: string;
}

function listarMarkdown(dir: string): string[] {
  const saida: string[] = [];
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) saida.push(...listarMarkdown(caminho));
    else if (nome.endsWith('.md')) saida.push(caminho);
  }
  return saida;
}

// Remove os blocos que não são prosa (tabela e ilustracao), preservando o
// número das linhas restantes para o relatório apontar o lugar certo.
function linhasDeProsa(texto: string): { texto: string; numero: number }[] {
  const linhas = texto.split('\n');
  const saida: { texto: string; numero: number }[] = [];
  let pular = false;
  for (let i = 0; i < linhas.length; i++) {
    const abre = linhas[i].match(/^:::\s+([a-z]+)\s*$/);
    if (abre) {
      pular = abre[1] === 'tabela' || abre[1] === 'ilustracao';
      continue;
    }
    if (linhas[i].trim() === ':::') {
      pular = false;
      continue;
    }
    if (!pular) saida.push({ texto: linhas[i], numero: i + 1 });
  }
  return saida;
}

// Agrupa linhas contíguas não vazias em parágrafos.
function paragrafos(linhas: { texto: string; numero: number }[]) {
  const grupos: { texto: string; numero: number }[] = [];
  let atual: string[] = [];
  let inicio = 0;
  for (const l of linhas) {
    if (l.texto.trim() === '') {
      if (atual.length) grupos.push({ texto: atual.join('\n'), numero: inicio });
      atual = [];
      continue;
    }
    if (!atual.length) inicio = l.numero;
    atual.push(l.texto);
  }
  if (atual.length) grupos.push({ texto: atual.join('\n'), numero: inicio });
  return grupos;
}

export function checarRVs(raiz: string = RAIZ_CONTEUDO): Achado[] {
  const problemas: Achado[] = [];
  for (const arquivo of listarMarkdown(raiz)) {
    const texto = readFileSync(arquivo, 'utf8');
    for (const par of paragrafos(linhasDeProsa(texto))) {
      const m = par.texto.match(PADRAO_RV_NUMERICA);
      if (!m) continue;
      const minusculas = par.texto.toLowerCase();
      const traduzida = MARCADORES.some((marca) => minusculas.includes(marca));
      if (!traduzida) {
        problemas.push({
          arquivo: arquivo.replace(`${raiz}/`, ''),
          linha: par.numero,
          trecho: m[0].slice(0, 80),
        });
      }
    }
  }
  return problemas;
}

function main() {
  const problemas = checarRVs();
  if (problemas.length === 0) {
    console.log('OK: toda RV numérica em prosa vem com tradução interpretativa no mesmo parágrafo.');
    return;
  }
  console.error(`${problemas.length} RV(s) sem tradução interpretativa:`);
  for (const p of problemas) {
    console.error(`  ${p.arquivo}:${p.linha} — "${p.trecho}"`);
  }
  process.exitCode = 1;
}

if (require.main === module) main();
