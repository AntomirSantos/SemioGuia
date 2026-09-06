import conteudoBruto from '../../assets/generated/content.json';
import { carregarConteudo } from '../content/store';
import {
  agruparPorSistema,
  filtrarCasos,
  filtrarQuestoes,
  listarCasosDeEstudo,
  listarQuestoes,
  normalizar,
} from './listas';

const conteudo = carregarConteudo(conteudoBruto);

test('listarQuestoes traz um item por tópico com quiz, na ordem do guia', () => {
  const lista = listarQuestoes(conteudo);
  expect(lista.length).toBeGreaterThan(40);
  // Todo item tem perguntas e identidade de sistema.
  for (const item of lista) {
    expect(item.nPerguntas).toBeGreaterThan(0);
    expect(item.enunciados).toHaveLength(item.nPerguntas);
    expect(item.sistemaTitulo.length).toBeGreaterThan(0);
  }
  // Ordem craniocaudal: o primeiro sistema do guia abre a lista.
  expect(lista[0].sistemaTitulo).toBe(conteudo.sistemas[0].titulo);
  // Sem tópicos repetidos.
  expect(new Set(lista.map((i) => i.topicoId)).size).toBe(lista.length);
});

test('filtrarQuestoes acha pelo título do tópico e também pelo enunciado', () => {
  const lista = listarQuestoes(conteudo);
  const porTitulo = filtrarQuestoes(lista, 'pressao arterial');
  expect(porTitulo[0].topicoTitulo).toBe('Pressão arterial');

  // Um termo que não está em título nenhum precisa vir do corpo das perguntas.
  const alvo = lista.find((i) => i.enunciados.join(' ').includes('hiato'));
  if (alvo) {
    const achados = filtrarQuestoes(lista, 'hiato');
    expect(achados.map((i) => i.topicoId)).toContain(alvo.topicoId);
  }

  expect(filtrarQuestoes(lista, '   ')).toHaveLength(lista.length);
  expect(filtrarQuestoes(lista, 'xyzq')).toHaveLength(0);
});

test('listarCasosDeEstudo dá sistema e tópicos de apoio a cada caso, na ordem do guia', () => {
  const lista = listarCasosDeEstudo(conteudo);
  expect(lista).toHaveLength(conteudo.casos.length);
  for (const item of lista) {
    expect(item.topicosDeApoio.length).toBeGreaterThan(0);
    expect(item.nDecisoes).toBeGreaterThan(0);
    // Todo caso do guia aponta para um tópico real, então tem sistema.
    expect(item.sistemaTitulo).not.toBe('Outros casos');
  }
  const ordem = conteudo.sistemas.map((s) => s.titulo);
  const indices = lista.map((i) => ordem.indexOf(i.sistemaTitulo));
  expect(indices).toEqual([...indices].sort((a, b) => a - b));
});

test('filtrarCasos acha por título, por tag e por tópico de apoio', () => {
  const lista = listarCasosDeEstudo(conteudo);
  const primeiro = lista[0];
  expect(filtrarCasos(lista, primeiro.caso.titulo).at(0)?.caso.id).toBe(primeiro.caso.id);

  const comTag = lista.find((i) => i.caso.tags.length > 0)!;
  const porTag = filtrarCasos(lista, comTag.caso.tags[0]);
  expect(porTag.map((i) => i.caso.id)).toContain(comTag.caso.id);

  expect(filtrarCasos(lista, '')).toHaveLength(lista.length);
});

test('agruparPorSistema preserva a ordem e não cria grupos vazios', () => {
  const grupos = agruparPorSistema(listarQuestoes(conteudo));
  expect(grupos.length).toBeGreaterThan(1);
  expect(grupos.every((g) => g.itens.length > 0)).toBe(true);
  expect(grupos[0].sistemaTitulo).toBe(conteudo.sistemas[0].titulo);
});

test('normalizar tira acento e caixa', () => {
  expect(normalizar('Percussão Dolorosa')).toBe('percussao dolorosa');
});
