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

// Identidade Editorial R2 (DECISAO.md): papel branco, tinta quase-preta,
// acento vinho: o acento é da MARCA e nunca substitui as 12 cores de
// sistema do conteúdo. Cartões não têm sombra: separação por regras
// tipográficas (hairline `linha` + regras de 2.5px em `tinta`).
export const paletaClara: Paleta = {
  fundo: '#FFFFFF',
  superficie: '#FFFFFF',
  superficie2: '#F4F2EE', // wash de papel (busca, botões neutros)
  tinta: '#111111',
  tinta2: '#6B6B6B', // tinta suave (meta, bylines)
  linha: '#DDDDDD', // hairline
  acento: '#8E1F2F', // vinho editorial
  acentoTinta: '#8E1F2F',
  perolaFundo: '#FFFFFF', // pull-quote vive no papel, sem cartão
  perolaTexto: '#111111',
  perolaBorda: '#8E1F2F', // barra vinho à esquerda da pull-quote
  ok: '#21763c',
  okFundo: '#d9f3dd',
  erro: '#a43b38',
  erroFundo: '#ffe4e1',
};

// Variante noturna "editorial tinta" (refino R5): o mesmo papel-e-tinta,
// invertido: fundo carvão, tinta de papel envelhecido, vinho mais claro
// para vencer o contraste sobre o escuro.
export const paletaEscura: Paleta = {
  fundo: '#141414',
  superficie: '#141414',
  superficie2: '#1E1E1E',
  tinta: '#ECE9E2',
  tinta2: '#9A968C',
  linha: '#333333',
  acento: '#E4485C',
  acentoTinta: '#E4485C',
  perolaFundo: '#141414',
  perolaTexto: '#ECE9E2',
  perolaBorda: '#E4485C',
  ok: '#79c289',
  okFundo: '#15291a',
  erro: '#e88f87',
  erroFundo: '#3a1d1b',
};

export const espaco = { xs: 4, s: 8, m: 12, l: 16, xl: 20, xxl: 28 } as const;

// Linguagem editorial: raios pequenos (0 a 10px), busca 10px, botões 9px.
export const raio = { s: 4, m: 9, l: 10, pill: 999 } as const;

// Editorial R2 não usa sombra: cartões se separam por REGRAS (hairline e
// regras de tinta), não por elevação. O token permanece (consumidores fazem
// spread dele) mas zerado: um único ponto desliga todas as sombras.
export const sombra = {
  shadowColor: '#000',
  shadowOpacity: 0,
  shadowRadius: 0,
  shadowOffset: { width: 0, height: 0 },
  elevation: 0,
} as const;

// Véu que escurece o conteúdo atrás do menu hambúrguer da navegação web
// (overlay). Ponto fixo fora da paleta: o véu precisa escurecer o conteúdo
// em ambos os temas, e `paleta.tinta` não serve porque no tema escuro ela é
// clara (deixaria o fundo mais claro, não mais escuro).
export const veu = 'rgba(0,0,0,0.45)';

// Três vozes tipográficas (DECISAO.md):
// - Libre Bodoni 700: títulos, marca, nomes de sistema, títulos de bloco
//   (itálico para pull-quotes);
// - Source Serif 4 400/600: corpo de leitura dos tópicos (TextoRico);
// - Public Sans 400 a 800: TODA a UI (labels, meta, nav, botões, chips, busca).
// `corpo`/`corpoBold` continuam sendo a voz de UI padrão (Public Sans) para
// não quebrar consumidores; `leitura`/`leituraSemi` são a voz de leitura.
export const fonte = {
  display: 'LibreBodoni_700Bold',
  displaySemi: 'LibreBodoni_700Bold',
  displayItalico: 'LibreBodoni_700Bold_Italic',
  corpo: 'PublicSans_400Regular',
  corpoMedio: 'PublicSans_600SemiBold',
  corpoBold: 'PublicSans_700Bold',
  corpoForte: 'PublicSans_800ExtraBold',
  leitura: 'SourceSerif4_400Regular',
  leituraSemi: 'SourceSerif4_600SemiBold',
  leituraItalico: 'SourceSerif4_400Regular_Italic', // voz narrativa (bloco cena)
} as const;

// Escala tipográfica editorial: masthead 27, título de tópico 23, títulos de
// bloco/linha 17, corpo de leitura 15 (line-height 1.6 a 1.65 no TextoRico),
// meta 13, rótulos 11. `hero` é o placar do quiz; `secao` os títulos de
// seção dentro do tópico.
export const tipo = { h1: 27, h2: 23, h3: 17, corpo: 15, small: 13, tag: 11, hero: 48, secao: 19 } as const;
