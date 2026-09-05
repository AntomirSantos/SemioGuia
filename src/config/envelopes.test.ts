import { ENVELOPES_DE_SOM } from './envelopes';
import { FONTES_DE_SOM } from './sons';

// O fonocardiograma precisa de um envelope para cada som do app: se um som
// novo entrar sem rodar scripts/gerar-envelopes.py, este teste acusa.

test('todo som do app tem envelope de fonocardiograma', () => {
  for (const chave of Object.keys(FONTES_DE_SOM)) {
    const env = ENVELOPES_DE_SOM[chave];
    expect(env).toBeDefined();
    expect(env.length).toBe(96);
    for (const v of env) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  }
});

test('o envelope é normalizado: o pico de cada som vale 1', () => {
  for (const env of Object.values(ENVELOPES_DE_SOM)) {
    expect(Math.max(...env)).toBe(1);
  }
});
