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
  fundo: '#F7FAF9',
  superficie: '#FFFFFF',
  superficie2: '#E9F2F0',
  tinta: '#152220',
  tinta2: '#48605C',
  linha: '#D5E3E0',
  acento: '#0E7C76',
  acentoTinta: '#0A5B57',
  perolaFundo: '#F6EBDA',
  perolaTexto: '#7A4A15',
  perolaBorda: '#E4CFA9',
  ok: '#177245',
  okFundo: '#E2F1E7',
  erro: '#A33B2E',
  erroFundo: '#F7E6E2',
};

export const paletaEscura: Paleta = {
  fundo: '#0F1917',
  superficie: '#16211F',
  superficie2: '#1C2A27',
  tinta: '#E6EFEC',
  tinta2: '#9DB4AF',
  linha: '#2A3B38',
  acento: '#53C6BC',
  acentoTinta: '#7BD6CD',
  perolaFundo: '#2A2318',
  perolaTexto: '#E4B877',
  perolaBorda: '#4A3B22',
  ok: '#6BC98F',
  okFundo: '#1B2E22',
  erro: '#E29385',
  erroFundo: '#33211D',
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

export const fonte = {
  display: 'BricolageGrotesque_700Bold',
  displaySemi: 'BricolageGrotesque_600SemiBold',
  corpo: 'AtkinsonHyperlegible_400Regular',
  corpoBold: 'AtkinsonHyperlegible_700Bold',
} as const;

export const tipo = { h1: 30, h2: 24, h3: 19, corpo: 16, small: 14, tag: 11.5, hero: 64 } as const;
