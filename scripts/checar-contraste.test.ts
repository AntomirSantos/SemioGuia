import { checarContraste, razaoContraste } from './checar-contraste';

test('razaoContraste retorna 21 para preto/branco', () => {
  expect(razaoContraste('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
});

test('razaoContraste retorna 1 para cores idênticas', () => {
  expect(razaoContraste('#152220', '#152220')).toBeCloseTo(1, 5);
});

test('todos os pares de contraste (claro e escuro) atendem o mínimo WCAG', () => {
  const resultados = checarContraste();
  const falhas = resultados.filter((r) => !r.ok);
  expect(falhas).toEqual([]);
  // garante que os dois temas foram de fato verificados
  expect(resultados.some((r) => r.paleta === 'clara')).toBe(true);
  expect(resultados.some((r) => r.paleta === 'escura')).toBe(true);
});
