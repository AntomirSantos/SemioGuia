import { amanha, avaliar, criarItem, notaDeEstacao, notaDePergunta, vencidos } from './sm2';

const HOJE = '2026-08-21';
const AGORA = '2026-08-21T12:00:00.000Z';

describe('sm2', () => {
  test('notas automáticas', () => {
    expect(notaDePergunta(true)).toBe(4);
    expect(notaDePergunta(false)).toBe(2);
    expect(notaDeEstacao(100)).toBe(5);
    expect(notaDeEstacao(80)).toBe(4);
    expect(notaDeEstacao(79)).toBe(2);
  });

  test('amanha atravessa fim de mês e ano', () => {
    expect(amanha('2026-08-31')).toBe('2026-09-01');
    expect(amanha('2026-12-31')).toBe('2027-01-01');
  });

  test('item novo revisa amanhã com EF 2.5', () => {
    const i = criarItem('pa-1', 'pergunta', 'a/b/c', HOJE, AGORA);
    expect(i).toMatchObject({
      facilidade: 2.5,
      repeticoes: 0,
      intervaloDias: 0,
      proximaRevisao: '2026-08-22',
    });
  });

  test('sequência de acertos: 1, 6, round(6×EF)', () => {
    let i = criarItem('pa-1', 'pergunta', 'a/b/c', HOJE, AGORA);
    i = avaliar(i, 4, '2026-08-22', AGORA); // q=4 mantém EF
    expect(i).toMatchObject({
      repeticoes: 1,
      intervaloDias: 1,
      proximaRevisao: '2026-08-23',
      facilidade: 2.5,
    });
    i = avaliar(i, 4, '2026-08-23', AGORA);
    expect(i).toMatchObject({
      repeticoes: 2,
      intervaloDias: 6,
      proximaRevisao: '2026-08-29',
    });
    i = avaliar(i, 4, '2026-08-29', AGORA);
    expect(i.intervaloDias).toBe(15); // round(6 × 2.5)
  });

  test('q=5 soma 0.1 ao EF; q=2 subtrai 0.32 com piso 1.3 e reinicia', () => {
    let i = criarItem('x', 'pergunta', 't', HOJE, AGORA);
    i = avaliar(i, 5, HOJE, AGORA);
    expect(i.facilidade).toBeCloseTo(2.6);
    i = { ...i, facilidade: 1.4, repeticoes: 5, intervaloDias: 40 };
    i = avaliar(i, 2, HOJE, AGORA);
    expect(i).toMatchObject({
      repeticoes: 0,
      intervaloDias: 1,
      proximaRevisao: amanha(HOJE),
    });
    expect(i.facilidade).toBe(1.3); // 1.4 − 0.32 < piso
  });

  test('vencidos: <= hoje, mais atrasado primeiro, empate por id', () => {
    const a = {
      ...criarItem('a', 'pergunta', 't', HOJE, AGORA),
      proximaRevisao: '2026-08-19',
    };
    const b = {
      ...criarItem('b', 'checklist', 't', HOJE, AGORA),
      proximaRevisao: '2026-08-21',
    };
    const c = {
      ...criarItem('c', 'pergunta', 't', HOJE, AGORA),
      proximaRevisao: '2026-08-22',
    };
    const d = {
      ...criarItem('d', 'pergunta', 't', HOJE, AGORA),
      proximaRevisao: '2026-08-19',
    };
    expect(vencidos([c, b, d, a], '2026-08-21').map((i) => i.id)).toEqual(['a', 'd', 'b']);
  });
});
