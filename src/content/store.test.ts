import { carregarConteudo, listarSistemas, obterTopico } from './store';

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
