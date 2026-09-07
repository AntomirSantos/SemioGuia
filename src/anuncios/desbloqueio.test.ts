import { SISTEMAS_SEMPRE_ABERTOS } from '../config/paywall';
import {
  chaveDoDesbloqueio,
  comDesbloqueio,
  liberado,
  precisaDeAnuncio,
  sempreAberto,
  type EstadoDesbloqueio,
} from './desbloqueio';

const NO_REGIME = (desbloqueados: string[] = []): EstadoDesbloqueio => ({
  regimeDeAnuncios: true,
  desbloqueados: new Set(desbloqueados),
});

test('os dois sistemas da fundação nunca pedem anúncio', () => {
  expect([...SISTEMAS_SEMPRE_ABERTOS]).toEqual(['anamnese', 'exame-fisico-geral']);
  expect(sempreAberto('anamnese')).toBe(true);
  expect(sempreAberto('exame-fisico-geral')).toBe(true);
  expect(sempreAberto('aparelho-cardiovascular')).toBe(false);

  const estado = NO_REGIME();
  expect(liberado('guia', 'anamnese', estado)).toBe(true);
  expect(liberado('plantao', 'exame-fisico-geral', estado)).toBe(true);
});

test('fora do regime de anúncios, tudo está aberto', () => {
  const estado: EstadoDesbloqueio = { regimeDeAnuncios: false, desbloqueados: new Set() };
  expect(liberado('guia', 'aparelho-cardiovascular', estado)).toBe(true);
  expect(precisaDeAnuncio('estudar', 'sistema-nervoso', estado)).toBe(false);
});

test('o anúncio abre um sistema numa aba só, não em todas', () => {
  const depois = comDesbloqueio(new Set(), 'guia', 'aparelho-cardiovascular');
  const estado = NO_REGIME([...depois]);
  expect(liberado('guia', 'aparelho-cardiovascular', estado)).toBe(true);
  expect(liberado('plantao', 'aparelho-cardiovascular', estado)).toBe(false);
  expect(liberado('checklists', 'aparelho-cardiovascular', estado)).toBe(false);
  expect(liberado('estudar', 'aparelho-cardiovascular', estado)).toBe(false);
});

test('abrir um sistema não abre os outros da mesma aba', () => {
  const estado = NO_REGIME([chaveDoDesbloqueio('estudar', 'abdome')]);
  expect(liberado('estudar', 'abdome', estado)).toBe(true);
  expect(liberado('estudar', 'sistema-nervoso', estado)).toBe(false);
});

test('sistema desconhecido não tranca', () => {
  expect(liberado('guia', '', NO_REGIME())).toBe(true);
});
