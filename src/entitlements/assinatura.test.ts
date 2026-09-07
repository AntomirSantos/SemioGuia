import { DIAS_DE_CARENCIA_OFFLINE } from '../config/paywall';
import {
  SEM_ASSINATURA,
  acessoCompleto,
  desserializar,
  diasRestantes,
  estadoDaAssinatura,
  serializar,
  umAnoDepois,
  type Assinatura,
} from './assinatura';

const HOJE = '2026-09-06';

function daLoja(p: Partial<Assinatura> = {}): Assinatura {
  return { origem: 'loja', validaAte: '2027-09-06', confirmadaEm: HOJE, cancelada: false, ...p };
}

test('sem assinatura é acesso gratuito', () => {
  expect(estadoDaAssinatura(SEM_ASSINATURA, HOJE)).toBe('gratuito');
  expect(acessoCompleto(SEM_ASSINATURA, HOJE)).toBe(false);
  expect(diasRestantes(SEM_ASSINATURA, HOJE)).toBeNull();
});

test('assinatura em dia libera e informa quantos dias faltam', () => {
  const a = daLoja();
  expect(estadoDaAssinatura(a, HOJE)).toBe('ativa');
  expect(acessoCompleto(a, HOJE)).toBe(true);
  expect(diasRestantes(a, HOJE)).toBe(365);
});

test('cancelada continua liberando até o fim do período já pago', () => {
  const a = daLoja({ cancelada: true });
  expect(estadoDaAssinatura(a, HOJE)).toBe('cancelada');
  expect(acessoCompleto(a, HOJE)).toBe(true);
  expect(acessoCompleto(a, '2027-09-07')).toBe(false);
});

test('vencida bloqueia', () => {
  const a = daLoja({ validaAte: '2026-09-05' });
  expect(estadoDaAssinatura(a, HOJE)).toBe('vencida');
  expect(acessoCompleto(a, HOJE)).toBe(false);
  expect(diasRestantes(a, HOJE)).toBe(0);
});

test('a carência offline libera dentro do prazo e bloqueia depois dele', () => {
  const dentro = daLoja({ confirmadaEm: '2026-08-20' }); // 17 dias
  expect(estadoDaAssinatura(dentro, HOJE)).toBe('ativa');

  const limite = daLoja({ confirmadaEm: '2026-08-07' }); // exatamente 30 dias
  expect(DIAS_DE_CARENCIA_OFFLINE).toBe(30);
  expect(estadoDaAssinatura(limite, HOJE)).toBe('ativa');

  const fora = daLoja({ confirmadaEm: '2026-08-06' }); // 31 dias
  expect(estadoDaAssinatura(fora, HOJE)).toBe('sem_confirmacao');
  expect(acessoCompleto(fora, HOJE)).toBe(false);
});

test('cortesia não depende de confirmação da loja, mas respeita o prazo', () => {
  const cortesia: Assinatura = {
    origem: 'cortesia',
    validaAte: '2027-01-01',
    confirmadaEm: null,
    cancelada: false,
  };
  expect(estadoDaAssinatura(cortesia, HOJE)).toBe('ativa');
  expect(acessoCompleto(cortesia, HOJE)).toBe(true);
  expect(estadoDaAssinatura(cortesia, '2027-01-02')).toBe('gratuito');
});

test('um ano depois respeita a virada de ano e o ano bissexto', () => {
  expect(umAnoDepois('2026-09-06')).toBe('2027-09-06');
  expect(umAnoDepois('2027-02-28')).toBe('2028-02-28');
});

test('serializar e desserializar preservam o estado, e lixo vira sem assinatura', () => {
  const a = daLoja({ cancelada: true });
  expect(desserializar(serializar(a))).toEqual(a);
  expect(desserializar(null)).toEqual(SEM_ASSINATURA);
  expect(desserializar('{ não é json')).toEqual(SEM_ASSINATURA);
  expect(desserializar('{"origem":"pirata","validaAte":123}')).toEqual(SEM_ASSINATURA);
});
