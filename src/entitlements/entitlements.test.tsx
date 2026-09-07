import { PAYWALL_ATIVO, SISTEMAS_GRATUITOS } from '../config/paywall';
import { SEM_COMPRA, type Compra } from './compra';
import { acessoLiberado, entitlementDoSistema, estadoPadrao, sistemaDoTopicoId } from './entitlements';

const HOJE = '2026-09-07';
const COMPRADO: Compra = { origem: 'loja', validaAte: null, confirmadaEm: HOJE };

// O corte por sistema está DORMENTE (decisão do autor, 2026-09-07: conteúdo
// inteiro aberto, monetização por anúncios). Estes testes vigiam as duas
// coisas: que hoje nada está trancado, e que a máquina continua correta para
// o caso de o corte voltar a valer.

test('o corte por sistema está desligado e nada fica trancado', () => {
  expect(PAYWALL_ATIVO).toBe(false);
  const estado = estadoPadrao(HOJE);
  for (const sistemaId of ['anamnese', 'abdome', 'sistema-nervoso', 'exame-psiquico']) {
    expect(acessoLiberado(sistemaId, estado)).toBe(true);
  }
});

test('a lista de sistemas abertos segue registrada, para o dia em que voltar', () => {
  expect([...SISTEMAS_GRATUITOS]).toEqual([
    'anamnese',
    'exame-fisico-geral',
    'aparelho-cardiovascular',
    'aparelho-respiratorio',
  ]);
  expect(entitlementDoSistema('anamnese')).toBe('gratuito');
  expect(entitlementDoSistema('abdome')).toBe('premium');
});

test('com o corte ligado, sistema pago exige a compra', () => {
  const semCompra = { paywallAtivo: true, compra: SEM_COMPRA, hoje: HOJE };
  expect(acessoLiberado('anamnese', semCompra)).toBe(true);
  expect(acessoLiberado('abdome', semCompra)).toBe(false);

  const comCompra = { paywallAtivo: true, compra: COMPRADO, hoje: HOJE };
  expect(acessoLiberado('abdome', comCompra)).toBe(true);
});

test('sistema desconhecido nunca tranca, nem com o corte ligado', () => {
  const estado = { paywallAtivo: true, compra: SEM_COMPRA, hoje: HOJE };
  expect(acessoLiberado('', estado)).toBe(true);
});

test('sistemaDoTopicoId lê o primeiro segmento do id', () => {
  expect(sistemaDoTopicoId('abdome/exame-do-abdome/palpacao-do-abdome')).toBe('abdome');
  expect(sistemaDoTopicoId('')).toBe('');
});
