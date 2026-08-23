export interface Paleta {
  fundo: string;
  superficie: string;
  superficie2: string;
  tinta: string;
  tinta2: string;
  linha: string;
  acento: string;
  acentoTinta: string;
  perolaFundo: string;
  perolaTexto: string;
  perolaBorda: string;
  ok: string;
  okFundo: string;
  erro: string;
  erroFundo: string;
}

export const paletaClara: Paleta = {
  fundo: '#f3f6fb',
  superficie: '#FFFFFF',
  superficie2: '#e5ebf8',
  tinta: '#181b2d',
  tinta2: '#535a72',
  linha: '#d3d9e5',
  acento: '#3655cd',
  acentoTinta: '#2942ab',
  perolaFundo: '#fcedcd',
  perolaTexto: '#734c00',
  perolaBorda: '#e8d1a8',
  ok: '#21763c',
  okFundo: '#d9f3dd',
  erro: '#a43b38',
  erroFundo: '#ffe4e1',
};

export const paletaEscura: Paleta = {
  fundo: '#0f121c',
  superficie: '#191e2a',
  superficie2: '#242939',
  tinta: '#e5e8ed',
  tinta2: '#9fa4b2',
  linha: '#333949',
  acento: '#859ff6',
  acentoTinta: '#a4b7fb',
  perolaFundo: '#2f2512',
  perolaTexto: '#e1bf80',
  perolaBorda: '#503f22',
  ok: '#79c289',
  okFundo: '#15291a',
  erro: '#e88f87',
  erroFundo: '#3a1d1b',
};

export const espaco = { xs: 4, s: 8, m: 12, l: 16, xl: 20, xxl: 28 } as const;

export const raio = { s: 8, m: 12, l: 16, pill: 999 } as const;

// Sombra sutil dos cartões (Manobra, Sinal, Checklist, Fluxograma, QuizBloco),
// espelhando o mockup. Único ponto do app com um hex de sombra fora da
// paleta — cor de sombra não integra a Paleta (não varia por tema).
export const sombra = {
  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 1 },
  elevation: 1,
} as const;

// Véu que escurece o conteúdo atrás do menu hambúrguer da navegação web
// (overlay). Como a sombra acima, é um ponto fixo fora da paleta: o véu
// precisa escurecer o conteúdo em ambos os temas, e `paleta.tinta` não serve
// porque no tema escuro ela é clara (deixaria o fundo mais claro, não mais
// escuro).
export const veu = 'rgba(0,0,0,0.45)';

export const fonte = {
  display: 'BricolageGrotesque_700Bold',
  displaySemi: 'BricolageGrotesque_600SemiBold',
  corpo: 'AtkinsonHyperlegible_400Regular',
  corpoBold: 'AtkinsonHyperlegible_700Bold',
} as const;

export const tipo = { h1: 30, h2: 24, h3: 19, corpo: 16, small: 14, tag: 11.5, hero: 64, secao: 22 } as const;
