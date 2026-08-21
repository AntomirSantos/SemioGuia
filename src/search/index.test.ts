import { criarIndice, buscar } from './index';
import { carregarConteudo } from '../content/store';

const dados = {
  versao: '0.1.0',
  sistemas: [{
    id: 'abdome', titulo: 'Abdome', cor: '#F59E0B', icone: 'abdomen', ordem: 1,
    capitulos: [{
      id: 'vesicula', titulo: 'Vesícula biliar', ordem: 1,
      topicos: [{
        id: 'abdome/vesicula/colecistite', titulo: 'Colecistite aguda',
        sistemaId: 'abdome', capituloId: 'vesicula', ordem: 1,
        tags: ['Sinal de Murphy'], referencias: ['Porto — Semiologia Médica, 8ª ed.'],
        revisao: 'pendente',
        blocos: [{ tipo: 'conceito', texto: 'Inflamação aguda da vesícula biliar.' }],
      }],
    }],
  }],
};

test('acha tópico por epônimo na tag', () => {
  const c = carregarConteudo(dados);
  const r = buscar(criarIndice(c), 'murphy');
  expect(r[0]?.topicoId).toBe('abdome/vesicula/colecistite');
});

test('busca com erro de digitação leve (fuzzy)', () => {
  const c = carregarConteudo(dados);
  expect(buscar(criarIndice(c), 'colecistit').length).toBeGreaterThan(0);
});

test('termo sem correspondência retorna vazio', () => {
  const c = carregarConteudo(dados);
  expect(buscar(criarIndice(c), 'zzzz')).toEqual([]);
});
