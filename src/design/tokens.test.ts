import { paletaClara, paletaEscura, espaco, fonte } from './tokens';

test('paletas têm as mesmas chaves', () => {
  expect(Object.keys(paletaEscura).sort()).toEqual(Object.keys(paletaClara).sort());
});

test('todas as cores são hex válidos', () => {
  for (const p of [paletaClara, paletaEscura]) {
    for (const v of Object.values(p)) expect(v).toMatch(/^#[0-9A-Fa-f]{6}$/);
  }
});

test('tokens de layout existem', () => {
  expect(espaco.l).toBe(16);
  expect(fonte.display).toContain('LibreBodoni');
});
