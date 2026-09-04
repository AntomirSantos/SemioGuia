// Registro dos sons de ausculta (didática 2026-09). Todos os arquivos são
// SINTETIZADOS por scripts/gerar-sons.py — nenhuma gravação de terceiros,
// nenhum direito autoral envolvido. As chaves aqui devem espelhar o enum
// `arquivo` do bloco `som` no schema (src/content/schema.ts); o teste
// sons.test.ts vigia esse espelhamento.

export const FONTES_DE_SOM = {
  'bulhas-normais': require('../../assets/sons/bulhas-normais.wav'),
  'galope-b3': require('../../assets/sons/galope-b3.wav'),
  'galope-b4': require('../../assets/sons/galope-b4.wav'),
  'desdobramento-b2': require('../../assets/sons/desdobramento-b2.wav'),
  'sopro-sistolico': require('../../assets/sons/sopro-sistolico.wav'),
  'sopro-regurgitacao': require('../../assets/sons/sopro-regurgitacao.wav'),
  'sopro-diastolico': require('../../assets/sons/sopro-diastolico.wav'),
  'ruflar-pre-sistolico': require('../../assets/sons/ruflar-pre-sistolico.wav'),
  'sopro-continuo': require('../../assets/sons/sopro-continuo.wav'),
  'atrito-pericardico': require('../../assets/sons/atrito-pericardico.wav'),
  'murmurio-vesicular': require('../../assets/sons/murmurio-vesicular.wav'),
  sibilos: require('../../assets/sons/sibilos.wav'),
  roncos: require('../../assets/sons/roncos.wav'),
  estridor: require('../../assets/sons/estridor.wav'),
  'estertores-finos': require('../../assets/sons/estertores-finos.wav'),
  'estertores-grossos': require('../../assets/sons/estertores-grossos.wav'),
  'atrito-pleural': require('../../assets/sons/atrito-pleural.wav'),
} as const;

export type ChaveDeSom = keyof typeof FONTES_DE_SOM;

export const AVISO_SOM_SINTETIZADO =
  'Som sintetizado para estudo — uma representação didática, não uma gravação clínica.';

export const AVISO_SOM_GRAVACAO =
  'Gravação clínica real (dataset HF_Lung_V1, CC BY 4.0) — Heroic-Faith Medical Science / TSECCM.';

// Origem de cada som: 'sintetizado' (scripts/gerar-sons.py) ou 'gravacao'
// (scripts/preparar-sons-reais.py; proveniência completa e licença em
// assets/sons/LICENCAS.md). O aviso do player muda conforme a origem.
export const ORIGEM_DE_SOM: Record<ChaveDeSom, 'sintetizado' | 'gravacao'> = {
  'bulhas-normais': 'sintetizado',
  'galope-b3': 'sintetizado',
  'galope-b4': 'sintetizado',
  'desdobramento-b2': 'sintetizado',
  'sopro-sistolico': 'sintetizado',
  'sopro-regurgitacao': 'sintetizado',
  'sopro-diastolico': 'sintetizado',
  'ruflar-pre-sistolico': 'sintetizado',
  'sopro-continuo': 'sintetizado',
  'atrito-pericardico': 'sintetizado',
  'murmurio-vesicular': 'gravacao',
  sibilos: 'gravacao',
  roncos: 'gravacao',
  estridor: 'sintetizado',
  'estertores-finos': 'sintetizado',
  'estertores-grossos': 'sintetizado',
  'atrito-pleural': 'sintetizado',
};
