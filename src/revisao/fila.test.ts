import type { Topico } from '../content/schema';
import { criarItem, amanha, ItemRevisao } from './sm2';
import { idDeChecklist, semearTopico, montarFila } from './fila';

const HOJE = '2026-08-21';
const AGORA = '2026-08-21T12:00:00.000Z';

function topicoMinimo(): Topico {
  return {
    id: 'a/b/c',
    titulo: 'Tópico teste',
    sistemaId: 'a',
    capituloId: 'b',
    ordem: 1,
    tags: [],
    referencias: ['ref'],
    revisao: 'aprovada',
    blocos: [
      {
        tipo: 'quiz',
        perguntas: [
          {
            id: 'a/b/c#q1',
            enunciado: 'Pergunta 1?',
            alternativas: ['x', 'y'],
            corretaIndex: 0,
            explicacao: 'exp 1',
          },
          {
            id: 'a/b/c#q2',
            enunciado: 'Pergunta 2?',
            alternativas: ['x', 'y'],
            corretaIndex: 1,
            explicacao: 'exp 2',
          },
        ],
      },
      {
        tipo: 'checklist',
        titulo: 'Medida da PA',
        itens: ['passo 1', 'passo 2'],
      },
    ],
  };
}

describe('idDeChecklist', () => {
  test('gera id no formato topicoId#checklist:titulo', () => {
    expect(idDeChecklist('a/b/c', 'Medida da PA')).toBe('a/b/c#checklist:Medida da PA');
  });
});

describe('semearTopico', () => {
  test('cria 1 item por pergunta + 1 por checklist, todos com proximaRevisao = amanhã', () => {
    const topico = topicoMinimo();
    const novos = semearTopico(topico, [], HOJE, AGORA);
    expect(novos).toHaveLength(3);
    const ids = novos.map((i) => i.id).sort();
    expect(ids).toEqual(['a/b/c#checklist:Medida da PA', 'a/b/c#q1', 'a/b/c#q2'].sort());
    for (const item of novos) {
      expect(item.proximaRevisao).toBe(amanha(HOJE));
    }
  });

  test('idempotência: semear novamente com os itens existentes devolve []', () => {
    const topico = topicoMinimo();
    const primeira = semearTopico(topico, [], HOJE, AGORA);
    const segunda = semearTopico(topico, primeira, HOJE, AGORA);
    expect(segunda).toEqual([]);
  });
});

describe('montarFila', () => {
  test('exclui item órfão (id fora de idsValidos) sem lançar', () => {
    const valido = criarItem('a/b/c#q1', 'pergunta', 'a/b/c', HOJE, AGORA);
    const orfao = criarItem('a/b/c#q-removida', 'pergunta', 'a/b/c', HOJE, AGORA);
    const itens: ItemRevisao[] = [
      { ...valido, proximaRevisao: HOJE },
      { ...orfao, proximaRevisao: HOJE },
    ];
    const idsValidos = new Set(['a/b/c#q1']);
    expect(() => montarFila(itens, idsValidos, HOJE)).not.toThrow();
    const fila = montarFila(itens, idsValidos, HOJE);
    expect(fila.itens.map((i) => i.id)).toEqual(['a/b/c#q1']);
  });

  test('limite: 25 itens novos vencidos + 3 revisados vencidos -> 20 novos + 3 revisados, novos mais antigos escolhidos', () => {
    const novos: ItemRevisao[] = [];
    for (let n = 0; n < 25; n += 1) {
      const id = `a/b/c#novo-${String(n).padStart(2, '0')}`;
      const item = criarItem(id, 'pergunta', 'a/b/c', HOJE, AGORA);
      // datas crescentes: novo-00 é o mais atrasado, novo-24 o menos atrasado
      novos.push({ ...item, proximaRevisao: `2026-07-${String(n + 1).padStart(2, '0')}` });
    }
    const revisados: ItemRevisao[] = [];
    for (let n = 0; n < 3; n += 1) {
      const id = `a/b/c#rev-${n}`;
      const item = criarItem(id, 'pergunta', 'a/b/c', HOJE, AGORA);
      revisados.push({
        ...item,
        repeticoes: 2,
        intervaloDias: 6,
        proximaRevisao: '2026-08-01',
      });
    }
    const itens = [...novos, ...revisados];
    const idsValidos = new Set(itens.map((i) => i.id));

    const fila = montarFila(itens, idsValidos, HOJE);

    expect(fila.itens).toHaveLength(23);
    const idsNaFila = new Set(fila.itens.map((i) => i.id));
    expect(revisados.every((r) => idsNaFila.has(r.id))).toBe(true);
    const novosNaFila = fila.itens.filter((i) => i.repeticoes === 0 && i.intervaloDias === 0);
    expect(novosNaFila).toHaveLength(20);
    const esperados = novos.slice(0, 20).map((i) => i.id).sort();
    expect(novosNaFila.map((i) => i.id).sort()).toEqual(esperados);
  });

  test('contadores totalPerguntas/totalChecklists refletem a fila final', () => {
    const p1 = { ...criarItem('a/b/c#q1', 'pergunta', 'a/b/c', HOJE, AGORA), proximaRevisao: HOJE };
    const p2 = { ...criarItem('a/b/c#q2', 'pergunta', 'a/b/c', HOJE, AGORA), proximaRevisao: HOJE };
    const chk = {
      ...criarItem(idDeChecklist('a/b/c', 'Medida da PA'), 'checklist', 'a/b/c', HOJE, AGORA),
      proximaRevisao: HOJE,
    };
    const itens = [p1, p2, chk];
    const idsValidos = new Set(itens.map((i) => i.id));
    const fila = montarFila(itens, idsValidos, HOJE);
    expect(fila.totalPerguntas).toBe(2);
    expect(fila.totalChecklists).toBe(1);
  });
});
