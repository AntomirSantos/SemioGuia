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
        tags: ['Sinal de Murphy'], referencias: ['Porto, Semiologia Médica, 8ª ed.'],
        revisao: 'pendente',
        blocos: [
          { tipo: 'conceito', texto: 'Inflamação aguda da vesícula biliar.' },
          {
            tipo: 'sinal', nome: 'Sinal de Blumberg',
            descricao: 'Dor à descompressão brusca do abdome',
            significado: 'Irritação peritoneal', causas: ['Apendicite aguda'],
          },
          { tipo: 'checklist', titulo: 'Exame do abdome em 10 passos', itens: ['Inspeção', 'Ausculta'] },
        ],
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

test('acha o próprio sinal pelo epônimo, com âncora para o bloco', () => {
  const c = carregarConteudo(dados);
  const r = buscar(criarIndice(c), 'Blumberg');
  expect(r.length).toBeGreaterThan(0);
  expect(r[0]?.tipo).toBe('sinal');
  expect(r[0]?.titulo).toBe('Sinal de Blumberg');
  expect(r[0]?.ancora).toBe('sinal:Sinal de Blumberg');
  expect(r[0]?.topicoId).toBe('abdome/vesicula/colecistite');
});

test('acha o sinal pelo fenômeno descrito no corpo', () => {
  const c = carregarConteudo(dados);
  const r = buscar(criarIndice(c), 'descompressão');
  expect(r.some((x) => x.tipo === 'sinal' && x.titulo === 'Sinal de Blumberg')).toBe(true);
});

test('acha checklist pelo título, com âncora própria', () => {
  const c = carregarConteudo(dados);
  const r = buscar(criarIndice(c), 'exame do abdome em 10 passos');
  const check = r.find((x) => x.tipo === 'checklist');
  expect(check?.ancora).toBe('checklist:Exame do abdome em 10 passos');
});

test('busca sem acento acha termo acentuado, e vice-versa', () => {
  const c = carregarConteudo(dados);
  const i = criarIndice(c);
  expect(buscar(i, 'descompressao').some((x) => x.titulo === 'Sinal de Blumberg')).toBe(true);
  expect(buscar(i, 'colecistite aguda').length).toBeGreaterThan(0);
});

test('apelido de enfermaria acha o verbete (rebote, DB)', () => {
  const c = carregarConteudo(dados);
  const i = criarIndice(c);
  expect(buscar(i, 'rebote')[0]?.titulo).toBe('Sinal de Blumberg');
});
