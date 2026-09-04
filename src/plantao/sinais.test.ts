import { agruparPorSistema, filtrarSinais, listarSinais, normalizar } from './sinais';
import type { Conteudo } from '../content/schema';

// O modo plantão só reapresenta conteúdo revisado: estes testes garantem que
// a extração cobre todos os blocos `sinal` do conteúdo real e que o filtro
// acha o verbete como um plantonista digitaria (sem acento, em minúsculas).

const conteudoReal = require('../../assets/generated/content.json') as Conteudo;

test('normalizar iguala acentos e caixa', () => {
  expect(normalizar('Déficit de PULSO')).toBe('deficit de pulso');
  expect(normalizar('Piparote')).toBe('piparote');
});

test('lista todos os blocos sinal do conteúdo real, na ordem do guia', () => {
  const sinais = listarSinais(conteudoReal);
  let esperados = 0;
  const ordemDosSistemas: string[] = [];
  for (const sistema of conteudoReal.sistemas) {
    let temSinal = false;
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        const n = topico.blocos.filter((b) => b.tipo === 'sinal').length;
        esperados += n;
        if (n > 0) temSinal = true;
      }
    }
    if (temSinal) ordemDosSistemas.push(sistema.titulo);
  }
  expect(esperados).toBeGreaterThanOrEqual(30);
  expect(sinais).toHaveLength(esperados);
  // Sistemas na ordem craniocaudal do guia; dentro de cada um, alfabética.
  const grupos = agruparPorSistema(sinais);
  expect(grupos.map((g) => g.sistemaTitulo)).toEqual(ordemDosSistemas);
  expect(grupos.reduce((soma, g) => soma + g.sinais.length, 0)).toBe(esperados);
  for (const grupo of grupos) {
    const nomes = grupo.sinais.map((s) => s.nome);
    expect([...nomes].sort((a, b) => a.localeCompare(b, 'pt-BR'))).toEqual(nomes);
  }
  for (const sinal of sinais) {
    expect(sinal.significado.length).toBeGreaterThan(0);
    expect(sinal.causas.length).toBeGreaterThan(0);
    expect(sinal.topicoId).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/);
  }
});

test('filtro acha por nome sem acento e devolve nome antes de corpo', () => {
  const sinais = listarSinais(conteudoReal);
  const porNome = filtrarSinais(sinais, 'deficit de pulso');
  expect(porNome.length).toBeGreaterThanOrEqual(1);
  expect(porNome[0].nome).toBe('Déficit de pulso');
});

test('filtro com termo vazio devolve a lista inteira', () => {
  const sinais = listarSinais(conteudoReal);
  expect(filtrarSinais(sinais, '   ')).toHaveLength(sinais.length);
});

test('filtro sem resultado devolve lista vazia', () => {
  const sinais = listarSinais(conteudoReal);
  expect(filtrarSinais(sinais, 'zzzznadadisso')).toHaveLength(0);
});
