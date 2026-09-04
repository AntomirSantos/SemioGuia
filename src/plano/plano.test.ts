import {
  analisarDataProva,
  diasAteProva,
  formatarDataProva,
  montarPlanoDoDia,
  textoDiasAteProva,
} from './plano';

describe('analisarDataProva', () => {
  test('aceita DD/MM/AAAA e devolve ISO', () => {
    expect(analisarDataProva('07/10/2026')).toBe('2026-10-07');
  });

  test('aceita ISO YYYY-MM-DD', () => {
    expect(analisarDataProva('2026-10-07')).toBe('2026-10-07');
  });

  test('rejeita formatos e datas impossíveis', () => {
    expect(analisarDataProva('31/02/2026')).toBeNull();
    expect(analisarDataProva('7/10/2026')).toBeNull();
    expect(analisarDataProva('amanhã')).toBeNull();
    expect(analisarDataProva('')).toBeNull();
  });
});

test('formatarDataProva devolve DD/MM/AAAA', () => {
  expect(formatarDataProva('2026-10-07')).toBe('07/10/2026');
});

describe('diasAteProva e textoDiasAteProva', () => {
  test('conta dias de calendário, com negativo para prova passada', () => {
    expect(diasAteProva('2026-10-07', '2026-09-03')).toBe(34);
    expect(diasAteProva('2026-09-03', '2026-09-03')).toBe(0);
    expect(diasAteProva('2026-09-01', '2026-09-03')).toBe(-2);
  });

  test('textos por faixa', () => {
    expect(textoDiasAteProva(34)).toBe('Faltam 34 dias para a prova');
    expect(textoDiasAteProva(1)).toBe('Falta 1 dia para a prova');
    expect(textoDiasAteProva(0)).toBe('A prova é hoje');
    expect(textoDiasAteProva(-2)).toBe('A prova já passou: atualize a data no Perfil');
  });

  test('com o sistema da prova, o texto o nomeia', () => {
    expect(textoDiasAteProva(10, 'Aparelho cardiovascular')).toBe(
      'Faltam 10 dias para a prova de Aparelho cardiovascular',
    );
    expect(textoDiasAteProva(0, 'Abdome')).toBe('A prova de Abdome é hoje');
  });
});

describe('montarPlanoDoDia', () => {
  test('calcula o ritmo de tópicos novos por dia (teto)', () => {
    const plano = montarPlanoDoDia({
      dataProvaIso: '2026-09-13',
      hojeIso: '2026-09-03',
      paraRevisarHoje: 4,
      topicosRestantes: 25,
    });
    expect(plano).toEqual({ diasRestantes: 10, paraRevisarHoje: 4, topicosRestantes: 25, topicosPorDia: 3 });
  });

  test('sem dias restantes ou sem tópicos restantes, não sugere ritmo', () => {
    expect(
      montarPlanoDoDia({ dataProvaIso: '2026-09-03', hojeIso: '2026-09-03', paraRevisarHoje: 0, topicosRestantes: 10 })
        .topicosPorDia,
    ).toBeNull();
    expect(
      montarPlanoDoDia({ dataProvaIso: '2026-09-13', hojeIso: '2026-09-03', paraRevisarHoje: 0, topicosRestantes: 0 })
        .topicosPorDia,
    ).toBeNull();
  });
});
