import { agruparPorSistema, filtrarChecklists, listarChecklists, normalizar } from './listas';
import type { Conteudo } from '../content/schema';

// A tela de checklists só reapresenta conteúdo revisado: estes testes
// garantem que a extração cobre todos os blocos `checklist` do conteúdo
// real, na ordem do guia, e que o filtro acha o roteiro como o aluno
// digitaria (sem acento, em minúsculas).

const conteudoReal = require('../../assets/generated/content.json') as Conteudo;

test('normalizar iguala acentos e caixa', () => {
  expect(normalizar('Exame da TIREOIDE')).toBe('exame da tireoide');
});

test('lista todos os blocos checklist do conteúdo real, na ordem do guia', () => {
  const listas = listarChecklists(conteudoReal);
  let esperados = 0;
  const ordemDosSistemas: string[] = [];
  const ordemDosTopicos: string[] = [];
  for (const sistema of conteudoReal.sistemas) {
    let temChecklist = false;
    for (const capitulo of sistema.capitulos) {
      for (const topico of capitulo.topicos) {
        for (const bloco of topico.blocos) {
          if (bloco.tipo !== 'checklist') continue;
          esperados += 1;
          temChecklist = true;
          ordemDosTopicos.push(topico.id);
        }
      }
    }
    if (temChecklist) ordemDosSistemas.push(sistema.titulo);
  }
  expect(esperados).toBeGreaterThanOrEqual(50);
  expect(listas).toHaveLength(esperados);
  // A ordem dos checklists é a ordem do guia: sistema a sistema, tópico a
  // tópico, sem reordenação alfabética (a sequência do exame importa).
  expect(listas.map((l) => l.topicoId)).toEqual(ordemDosTopicos);
  const grupos = agruparPorSistema(listas);
  expect(grupos.map((g) => g.sistemaTitulo)).toEqual(ordemDosSistemas);
  expect(grupos.reduce((soma, g) => soma + g.checklists.length, 0)).toBe(esperados);
  for (const lista of listas) {
    expect(lista.titulo.length).toBeGreaterThan(0);
    expect(lista.itens.length).toBeGreaterThan(0);
    expect(lista.topicoId).toMatch(/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/);
  }
});

test('filtro acha por título sem acento e por texto dos itens', () => {
  const listas = listarChecklists(conteudoReal);
  const porTitulo = filtrarChecklists(listas, 'tireoide');
  expect(porTitulo.length).toBeGreaterThanOrEqual(1);
  expect(porTitulo.some((l) => normalizar(l.titulo).includes('tireoide') || normalizar(l.topicoTitulo).includes('tireoide'))).toBe(true);
});

test('filtro com termo vazio devolve a lista inteira', () => {
  const listas = listarChecklists(conteudoReal);
  expect(filtrarChecklists(listas, '   ')).toHaveLength(listas.length);
});

test('filtro sem resultado devolve lista vazia', () => {
  const listas = listarChecklists(conteudoReal);
  expect(filtrarChecklists(listas, 'zzzznadadisso')).toHaveLength(0);
});
