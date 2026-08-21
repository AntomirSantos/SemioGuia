import { paletaClara, paletaEscura, type Paleta } from '../src/design/tokens';

// Razão de contraste WCAG 2.x entre duas cores hex (#RRGGBB).
// Fórmula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
function paraCanalLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminanciaRelativa(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const [rl, gl, bl] = [r, g, b].map(paraCanalLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

export function razaoContraste(hexA: string, hexB: string): number {
  const lA = luminanciaRelativa(hexA);
  const lB = luminanciaRelativa(hexB);
  const claro = Math.max(lA, lB);
  const escuro = Math.min(lA, lB);
  return (claro + 0.05) / (escuro + 0.05);
}

// Pares de tokens a verificar (chave de texto, chave de fundo). `superficie/acento`
// é exceção: só é usado como texto grande/em negrito sobre o botão de acento
// (ex.: "Praticar" em QuizBloco/quiz), então o WCAG permite o limiar reduzido
// de large-text (>= 3.0) em vez do limiar de texto normal (>= 4.5).
export const PARES: Array<{ texto: keyof Paleta; fundo: keyof Paleta; minimo: number }> = [
  { texto: 'tinta', fundo: 'fundo', minimo: 4.5 },
  { texto: 'tinta', fundo: 'superficie', minimo: 4.5 },
  { texto: 'tinta2', fundo: 'superficie', minimo: 4.5 },
  { texto: 'acentoTinta', fundo: 'fundo', minimo: 4.5 },
  { texto: 'perolaTexto', fundo: 'perolaFundo', minimo: 4.5 },
  { texto: 'superficie', fundo: 'acento', minimo: 3.0 },
];

export interface ResultadoPar {
  paleta: 'clara' | 'escura';
  texto: keyof Paleta;
  fundo: keyof Paleta;
  razao: number;
  minimo: number;
  ok: boolean;
}

export function checarContraste(): ResultadoPar[] {
  const resultados: ResultadoPar[] = [];
  for (const [nome, paleta] of [
    ['clara', paletaClara],
    ['escura', paletaEscura],
  ] as const) {
    for (const { texto, fundo, minimo } of PARES) {
      const razao = razaoContraste(paleta[texto], paleta[fundo]);
      resultados.push({ paleta: nome, texto, fundo, razao, minimo, ok: razao >= minimo });
    }
  }
  return resultados;
}

function main() {
  const resultados = checarContraste();
  let falhou = false;
  for (const r of resultados) {
    const status = r.ok ? 'OK' : 'FALHOU';
    console.log(
      `[${status}] ${r.paleta}: ${String(r.texto)}/${String(r.fundo)} = ${r.razao.toFixed(2)} (mínimo ${r.minimo.toFixed(1)})`,
    );
    if (!r.ok) falhou = true;
  }
  if (falhou) {
    console.error('\nUm ou mais pares de contraste ficaram abaixo do mínimo WCAG AA.');
    process.exit(1);
  }
  console.log('\nTodos os pares atendem o mínimo WCAG AA.');
}

if (require.main === module) {
  main();
}
