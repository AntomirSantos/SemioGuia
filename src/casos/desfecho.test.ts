import { CLASSE_LABEL, corDaClasse, melhorClasse, RANK_CLASSE } from './desfecho';
import { paletaClara } from '../design/tokens';

test('melhorClasse ordena otimo > aceitavel > dano, independente da ordem de entrada', () => {
  expect(melhorClasse(['dano', 'aceitavel', 'otimo'])).toBe('otimo');
  expect(melhorClasse(['otimo', 'aceitavel', 'dano'])).toBe('otimo');
  expect(melhorClasse(['dano', 'aceitavel'])).toBe('aceitavel');
  expect(melhorClasse(['dano', 'dano'])).toBe('dano');
  expect(melhorClasse(['aceitavel'])).toBe('aceitavel');
});

test('melhorClasse de uma lista vazia (caso nunca concluído) é null', () => {
  expect(melhorClasse([])).toBeNull();
});

test('RANK_CLASSE reflete a ordenação otimo > aceitavel > dano', () => {
  expect(RANK_CLASSE.otimo).toBeGreaterThan(RANK_CLASSE.aceitavel);
  expect(RANK_CLASSE.aceitavel).toBeGreaterThan(RANK_CLASSE.dano);
});

test('CLASSE_LABEL traz os rótulos pt-BR de cada classe', () => {
  expect(CLASSE_LABEL.otimo).toBe('Ótimo');
  expect(CLASSE_LABEL.aceitavel).toBe('Aceitável');
  expect(CLASSE_LABEL.dano).toBe('Dano');
});

test('corDaClasse mapeia cada classe para o token de cor esperado da paleta', () => {
  expect(corDaClasse(paletaClara, 'otimo')).toBe(paletaClara.ok);
  expect(corDaClasse(paletaClara, 'aceitavel')).toBe(paletaClara.perolaTexto);
  expect(corDaClasse(paletaClara, 'dano')).toBe(paletaClara.erro);
});
