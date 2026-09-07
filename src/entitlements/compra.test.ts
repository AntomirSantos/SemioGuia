import {
  SEM_COMPRA,
  desserializar,
  diasRestantes,
  estadoDaCompra,
  semAnuncios,
  serializar,
  umAnoDepois,
  type Compra,
} from './compra';

const HOJE = '2026-09-07';

test('sem compra, o aluno vê anúncios', () => {
  expect(estadoDaCompra(SEM_COMPRA, HOJE)).toBe('nenhuma');
  expect(semAnuncios(SEM_COMPRA, HOJE)).toBe(false);
});

test('compra na loja vale para sempre e não depende de reconfirmação', () => {
  const c: Compra = { origem: 'loja', validaAte: null, confirmadaEm: '2020-01-01' };
  expect(estadoDaCompra(c, HOJE)).toBe('permanente');
  expect(semAnuncios(c, HOJE)).toBe(true);
  expect(diasRestantes(c, HOJE)).toBeNull();
});

test('compra sem nenhuma confirmação registrada continua valendo', () => {
  const c: Compra = { origem: 'loja', validaAte: null, confirmadaEm: null };
  expect(semAnuncios(c, HOJE)).toBe(true);
});

test('cortesia com prazo vale até a data e depois vence', () => {
  const c: Compra = { origem: 'cortesia', validaAte: '2026-09-30', confirmadaEm: null };
  expect(estadoDaCompra(c, HOJE)).toBe('cortesia');
  expect(semAnuncios(c, HOJE)).toBe(true);
  expect(diasRestantes(c, HOJE)).toBe(23);

  const depois = '2026-10-01';
  expect(estadoDaCompra(c, depois)).toBe('vencida');
  expect(semAnuncios(c, depois)).toBe(false);
});

test('cortesia sem prazo é vitalícia', () => {
  const c: Compra = { origem: 'cortesia', validaAte: null, confirmadaEm: null };
  expect(estadoDaCompra(c, HOJE)).toBe('cortesia');
  expect(semAnuncios(c, HOJE)).toBe(true);
});

test('umAnoDepois atravessa o ano bissexto', () => {
  expect(umAnoDepois('2026-09-07')).toBe('2027-09-07');
  expect(umAnoDepois('2028-02-29')).toBe('2029-03-01');
});

test('serializar e desserializar preservam a compra, e lixo vira sem compra', () => {
  const c: Compra = { origem: 'loja', validaAte: null, confirmadaEm: HOJE };
  expect(desserializar(serializar(c))).toEqual(c);
  expect(desserializar(null)).toEqual(SEM_COMPRA);
  expect(desserializar('não é json')).toEqual(SEM_COMPRA);
  expect(desserializar('{"origem":"pirata"}')).toEqual(SEM_COMPRA);
});
