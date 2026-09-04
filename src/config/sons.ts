// Registro dos sons de ausculta (didática 2026-09). Todos os arquivos são
// SINTETIZADOS por scripts/gerar-sons.py — nenhuma gravação de terceiros,
// nenhum direito autoral envolvido. As chaves aqui devem espelhar o enum
// `arquivo` do bloco `som` no schema (src/content/schema.ts); o teste
// sons.test.ts vigia esse espelhamento.

export const FONTES_DE_SOM = {
  'bulhas-normais': require('../../assets/sons/bulhas-normais.wav'),
  'galope-b3': require('../../assets/sons/galope-b3.wav'),
  'sopro-sistolico': require('../../assets/sons/sopro-sistolico.wav'),
  'sopro-diastolico': require('../../assets/sons/sopro-diastolico.wav'),
  'murmurio-vesicular': require('../../assets/sons/murmurio-vesicular.wav'),
  sibilos: require('../../assets/sons/sibilos.wav'),
  'estertores-finos': require('../../assets/sons/estertores-finos.wav'),
  'estertores-grossos': require('../../assets/sons/estertores-grossos.wav'),
} as const;

export type ChaveDeSom = keyof typeof FONTES_DE_SOM;

export const AVISO_SOM_SINTETIZADO =
  'Som sintetizado para estudo — uma representação didática, não uma gravação clínica.';
