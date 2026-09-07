import { PAYWALL_ATIVO, SISTEMAS_GRATUITOS } from '../config/paywall';
import { SEM_ASSINATURA, type Assinatura } from './assinatura';
import { acessoLiberado, entitlementDoSistema, estadoPadrao, sistemaBloqueado } from './entitlements';

const HOJE = '2026-09-06';
const ASSINANTE: Assinatura = {
  origem: 'loja',
  validaAte: '2027-09-06',
  confirmadaEm: HOJE,
  cancelada: false,
};

test('o paywall está ligado e a faixa gratuita é a fundação do curso', () => {
  expect(PAYWALL_ATIVO).toBe(true);
  expect([...SISTEMAS_GRATUITOS]).toEqual([
    'anamnese',
    'exame-fisico-geral',
    'aparelho-cardiovascular',
    'aparelho-respiratorio',
  ]);
});

test('os quatro sistemas da fundação são gratuitos; os outros oito, premium', () => {
  for (const id of SISTEMAS_GRATUITOS) {
    expect(entitlementDoSistema(id)).toBe('gratuito');
  }
  for (const id of ['sistema-nervoso', 'abdome', 'exame-psiquico', 'semiologia-da-crianca']) {
    expect(entitlementDoSistema(id)).toBe('premium');
  }
});

test('sem assinatura, o gratuito abre e o premium fecha', () => {
  const estado = estadoPadrao(HOJE);
  expect(estado.assinatura).toEqual(SEM_ASSINATURA);
  expect(acessoLiberado('anamnese', estado)).toBe(true);
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(false);
  expect(sistemaBloqueado('sistema-nervoso', estado)).toBe(true);
});

test('com assinatura em dia, tudo abre', () => {
  const estado = { paywallAtivo: true, assinatura: ASSINANTE, hoje: HOJE };
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(true);
  expect(acessoLiberado('abdome', estado)).toBe(true);
});

test('assinatura vencida volta a bloquear o premium, sem tocar no gratuito', () => {
  const estado = { paywallAtivo: true, assinatura: { ...ASSINANTE, validaAte: '2026-09-05' }, hoje: HOJE };
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(false);
  expect(acessoLiberado('aparelho-cardiovascular', estado)).toBe(true);
});

test('com o paywall desligado nada bloqueia, mesmo sem assinatura', () => {
  const estado = { paywallAtivo: false, assinatura: SEM_ASSINATURA, hoje: HOJE };
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(true);
});
