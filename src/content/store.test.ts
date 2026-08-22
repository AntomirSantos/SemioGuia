import { carregarConteudo, listarCasos, listarSistemas, obterCaso, obterTopico } from './store';
import type { Caso } from './casoSchema';

const casoBase: Caso = {
  id: 'caso-1',
  titulo: 'Caso 1',
  contexto: 'Você é o interno.',
  tags: [],
  topicosDeApoio: ['a/c1/t1'],
  referencias: ['Ref'],
  revisao: 'pendente',
  inicio: 'c1',
  nos: [
    { tipo: 'cena', id: 'c1', texto: 'Chega o paciente.', proximo: 'd1' },
    {
      tipo: 'decisao',
      id: 'd1',
      pergunta: 'O que fazer?',
      opcoes: [
        { texto: 'A conduta certa', avaliacao: 'otima', feedback: 'Isso.', proximo: 'fim' },
        { texto: 'A conduta errada', avaliacao: 'erro', feedback: 'Não.', proximo: 'fim' },
      ],
    },
    { tipo: 'desfecho', id: 'fim', classe: 'otimo', texto: 'Melhora.', ensino: 'Lição.' },
  ],
};

const dados = {
  versao: '0.1.0',
  sistemas: [
    { id: 'b', titulo: 'B', cor: '#111111', icone: 'x', ordem: 2, capitulos: [] },
    {
      id: 'a', titulo: 'A', cor: '#222222', icone: 'y', ordem: 1,
      capitulos: [{
        id: 'c1', titulo: 'C1', ordem: 1,
        topicos: [{
          id: 'a/c1/t1', titulo: 'T1', sistemaId: 'a', capituloId: 'c1', ordem: 1,
          tags: [], referencias: ['R'], revisao: 'pendente',
          blocos: [{ tipo: 'conceito', texto: 'x' }],
        }],
      }],
    },
  ],
  casos: [casoBase],
};

test('valida e ordena sistemas', () => {
  const c = carregarConteudo(dados);
  expect(listarSistemas(c).map((s) => s.id)).toEqual(['a', 'b']);
});

test('acha tópico por id; inexistente é undefined', () => {
  const c = carregarConteudo(dados);
  expect(obterTopico(c, 'a/c1/t1')?.titulo).toBe('T1');
  expect(obterTopico(c, 'nao/existe/x')).toBeUndefined();
});

test('dados inválidos lançam', () => {
  expect(() => carregarConteudo({})).toThrow();
});

test('lista casos e acha por id; inexistente é undefined', () => {
  const c = carregarConteudo(dados);
  expect(listarCasos(c)).toHaveLength(1);
  expect(obterCaso(c, 'caso-1')?.titulo).toBe('Caso 1');
  expect(obterCaso(c, 'nao-existe')).toBeUndefined();
});

test('conteúdo sem casos usa default []', () => {
  const { casos, ...semCasos } = dados;
  const c = carregarConteudo(semCasos);
  expect(listarCasos(c)).toEqual([]);
});
