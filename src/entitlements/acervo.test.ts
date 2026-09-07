import { carregarConteudo } from '../content/store';
import { acervoDaAssinatura, acervoGratuito } from './acervo';
import { SISTEMAS_GRATUITOS } from '../config/paywall';

const CONTEUDO = carregarConteudo(require('../../assets/generated/content.json'));

test('os dois lados somam o acervo inteiro, sem sobra nem falta', () => {
  const livre = acervoGratuito(CONTEUDO);
  const pago = acervoDaAssinatura(CONTEUDO);
  expect(livre.sistemas + pago.sistemas).toBe(CONTEUDO.sistemas.length);
  expect(livre.casos + pago.casos).toBe(CONTEUDO.casos.length);
  expect(livre.sistemas).toBe(SISTEMAS_GRATUITOS.length);
});

test('o gratuito tem conteúdo de verdade em cada formato', () => {
  const livre = acervoGratuito(CONTEUDO);
  expect(livre.topicos).toBeGreaterThan(0);
  expect(livre.casos).toBeGreaterThan(0);
  expect(livre.checklists).toBeGreaterThan(0);
  expect(livre.verbetes).toBeGreaterThan(0);
});

test('a assinatura acrescenta conteúdo de verdade em cada formato', () => {
  const pago = acervoDaAssinatura(CONTEUDO);
  expect(pago.topicos).toBeGreaterThan(0);
  expect(pago.casos).toBeGreaterThan(0);
  expect(pago.checklists).toBeGreaterThan(0);
  expect(pago.verbetes).toBeGreaterThan(0);
});
