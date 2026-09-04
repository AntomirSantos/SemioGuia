import {
  calcularRelatorio,
  calcularRetencao,
  calcularSessoesPorSemana,
  diaUtc,
  dividirEmSessoes,
  lerExportacao,
  semanaIso,
  type ExportacaoBeta,
} from './relatorio-beta';
import type { EventoAnalytics, RegistroEvento } from '../src/analytics/types';

const DIA = 24 * 60 * 60 * 1000;
const MIN = 60 * 1000;
// 2026-09-01T10:00:00Z (terça-feira) como âncora legível dos cenários.
const T0 = Date.parse('2026-09-01T10:00:00.000Z');

function ev(userId: string, em: number, evento: EventoAnalytics = 'app_aberto'): RegistroEvento {
  return { evento, propriedades: {}, em, userId };
}

function exp(userId: string, ems: number[]): ExportacaoBeta {
  return { userId, eventos: ems.map((em) => ev(userId, em)) };
}

describe('lerExportacao', () => {
  test('aceita o envelope do app', () => {
    const json = JSON.stringify({ app: 'semioguia', formato: 1, userId: 'u1', eventos: [ev('u1', T0)] });
    const e = lerExportacao(json);
    expect(e.userId).toBe('u1');
    expect(e.eventos).toHaveLength(1);
  });

  test('aceita um array puro de eventos, inferindo o userId', () => {
    const e = lerExportacao(JSON.stringify([ev('u2', T0)]));
    expect(e.userId).toBe('u2');
    expect(e.eventos).toHaveLength(1);
  });

  test('rejeita JSON sem a lista `eventos`', () => {
    expect(() => lerExportacao(JSON.stringify({ userId: 'u1' }))).toThrow('eventos');
  });
});

describe('diaUtc e semanaIso', () => {
  test('diaUtc devolve o dia calendário UTC', () => {
    expect(diaUtc(T0)).toBe('2026-09-01');
    expect(diaUtc(Date.parse('2026-09-01T23:59:59.999Z'))).toBe('2026-09-01');
  });

  test('semanaIso: 2026-09-01 (terça) está na semana ISO 36 e domingo fecha a mesma semana', () => {
    expect(semanaIso(T0)).toBe('2026-S36');
    expect(semanaIso(Date.parse('2026-09-06T12:00:00.000Z'))).toBe('2026-S36'); // domingo
    expect(semanaIso(Date.parse('2026-09-07T12:00:00.000Z'))).toBe('2026-S37'); // segunda
  });
});

describe('dividirEmSessoes', () => {
  test('gap ≤ 30 min mantém a sessão; gap maior abre outra', () => {
    const sessoes = dividirEmSessoes([T0, T0 + 10 * MIN, T0 + 40 * MIN, T0 + 2 * 60 * MIN]);
    expect(sessoes).toEqual([[T0, T0 + 10 * MIN, T0 + 40 * MIN], [T0 + 2 * 60 * MIN]]);
  });

  test('lista vazia devolve zero sessões', () => {
    expect(dividirEmSessoes([])).toEqual([]);
  });
});

describe('calcularRetencao', () => {
  // u1: dia 0 e dia 1 (retido em D1); u2: só o dia 0 (não retido);
  // u3: entrou no último dia; inelegível para D1.
  const exportacoes = [
    exp('u1', [T0, T0 + 1 * DIA]),
    exp('u2', [T0]),
    exp('u3', [T0 + 1 * DIA]),
  ];

  test('D1: retido quem voltou no dia seguinte; quem entrou ontem é inelegível', () => {
    const r = calcularRetencao(exportacoes, 1);
    expect(r).toEqual({ n: 1, elegiveis: 2, retidos: 1, proporcao: 0.5 });
  });

  test('D7: sem janela fechada para ninguém, não há elegíveis', () => {
    const r = calcularRetencao(exportacoes, 7);
    expect(r).toEqual({ n: 7, elegiveis: 0, retidos: 0, proporcao: null });
  });

  test('D7 conta retorno exatamente no dia 7', () => {
    const r = calcularRetencao([exp('u1', [T0, T0 + 7 * DIA]), exp('u2', [T0, T0 + 6 * DIA, T0 + 8 * DIA])], 7);
    // u2 tem eventos no dia 6 e no dia 8, mas não no dia 7, não retido.
    expect(r).toEqual({ n: 7, elegiveis: 2, retidos: 1, proporcao: 0.5 });
  });

  test('mesclagem por userId: duas exportações do mesmo aluno viram uma linha do tempo', () => {
    const r = calcularRetencao([exp('u1', [T0]), exp('u1', [T0 + 1 * DIA])], 1);
    expect(r).toEqual({ n: 1, elegiveis: 1, retidos: 1, proporcao: 1 });
  });
});

describe('calcularSessoesPorSemana', () => {
  test('agrega sessões e alunos ativos por semana ISO', () => {
    const exportacoes = [
      // u1: 2 sessões na S36 (manhã e noite do mesmo dia), 1 na S37
      exp('u1', [T0, T0 + 5 * MIN, T0 + 8 * 60 * MIN, T0 + 7 * DIA]),
      // u2: 1 sessão na S36
      exp('u2', [T0 + 1 * DIA]),
    ];
    const semanas = calcularSessoesPorSemana(exportacoes);
    expect(semanas).toEqual([
      { semana: '2026-S36', sessoes: 3, usuarios: 2, sessoesPorUsuario: 1.5 },
      { semana: '2026-S37', sessoes: 1, usuarios: 1, sessoesPorUsuario: 1 },
    ]);
  });
});

describe('calcularRelatorio', () => {
  test('conta usuários, eventos por tipo e embute retenção e sessões', () => {
    const exportacoes: ExportacaoBeta[] = [
      { userId: 'u1', eventos: [ev('u1', T0), ev('u1', T0 + 1 * MIN, 'topico_aberto')] },
      { userId: 'u2', eventos: [ev('u2', T0 + 1 * DIA)] },
    ];
    const r = calcularRelatorio(exportacoes);
    expect(r.usuarios).toBe(2);
    expect(r.eventosTotais).toBe(3);
    expect(r.eventosPorTipo).toEqual({ app_aberto: 2, topico_aberto: 1 });
    expect(r.retencaoD1.elegiveis).toBe(1);
    expect(r.sessoesPorSemana).toHaveLength(1);
  });
});
