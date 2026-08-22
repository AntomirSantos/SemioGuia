import { carregarConteudo } from '../content/store';
import { idDeChecklist } from './fila';
import { idsValidosDoConteudo } from './idsValidos';

const CONTEUDO = carregarConteudo(require('../../assets/generated/content.json'));

describe('idsValidosDoConteudo', () => {
  test('inclui todo id de pergunta de quiz do conteúdo', () => {
    const ids = idsValidosDoConteudo(CONTEUDO);
    expect(ids.has('pa-1')).toBe(true);
    expect(ids.has('pa-5')).toBe(true);
  });

  test('inclui idDeChecklist para checklist com título', () => {
    const ids = idsValidosDoConteudo(CONTEUDO);
    const id = idDeChecklist(
      'exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso',
      'Avaliação do pulso em 60 segundos',
    );
    expect(ids.has(id)).toBe(true);
  });

  test('não inclui ids inventados', () => {
    const ids = idsValidosDoConteudo(CONTEUDO);
    expect(ids.has('pergunta-que-nao-existe')).toBe(false);
  });
});
