import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Share } from 'react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { EstacaoOsce, type ResultadoEstacao } from './EstacaoOsce';
import { aguardarAnalytics, configurarAnalytics, reiniciarAnalytics } from '../analytics/analytics';
import { MemoryEventosStore } from '../analytics/memoryEventos';

function renderEstacao(passos: string[], aoConcluir: (r: ResultadoEstacao) => void) {
  return render(
    <ThemeProvider>
      <EstacaoOsce titulo="Exame abdominal" passos={passos} aoConcluir={aoConcluir} />
    </ThemeProvider>,
  );
}

describe('EstacaoOsce', () => {
  test('passo atual começa oculto e mostra o contador', async () => {
    const { queryByText, getByText } = await renderEstacao(
      ['Higienizar as mãos', 'Posicionar o paciente'],
      jest.fn(),
    );
    expect(getByText('Passo 1 de 2')).toBeTruthy();
    expect(queryByText('Higienizar as mãos')).toBeNull();
    expect(getByText('Tente recordar o próximo passo')).toBeTruthy();
    expect(getByText('Revelar passo')).toBeTruthy();
  });

  test('Revelar passo mostra o texto do passo e os botões Lembrei/Esqueci', async () => {
    const { getByText, queryByText, getAllByRole } = await renderEstacao(
      ['Higienizar as mãos', 'Posicionar o paciente'],
      jest.fn(),
    );

    await fireEvent.press(getByText('Revelar passo'));

    expect(getByText('Higienizar as mãos')).toBeTruthy();
    expect(queryByText('Revelar passo')).toBeNull();
    expect(getByText('Lembrei')).toBeTruthy();
    expect(getByText('Esqueci')).toBeTruthy();
    expect(getAllByRole('button').length).toBeGreaterThanOrEqual(2);
  });

  test('fluxo completo com 3 passos (2 lembrei + 1 esqueci) chama aoConcluir e mostra o resumo', async () => {
    const aoConcluir = jest.fn();
    const passos = ['Higienizar as mãos', 'Explicar o procedimento', 'Posicionar o paciente'];
    const { getByText, queryByText } = await renderEstacao(passos, aoConcluir);

    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));

    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Esqueci'));

    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));

    expect(aoConcluir).toHaveBeenCalledTimes(1);
    expect(aoConcluir).toHaveBeenCalledWith({ lembrados: 2, total: 3, percentual: 67, duracaoSegundos: expect.any(Number) });
    expect(getByText('67%')).toBeTruthy();
    expect(getByText('Explicar o procedimento')).toBeTruthy();
    expect(queryByText('Revelar passo')).toBeNull();
  });

  test('um segundo toque rápido em Lembrei/Esqueci no último passo não chama aoConcluir de novo', async () => {
    const aoConcluir = jest.fn();
    const passos = ['Higienizar as mãos'];
    const { getByText } = await renderEstacao(passos, aoConcluir);

    await fireEvent.press(getByText('Revelar passo'));
    // Guarda a mesma referência do botão final e dispara dois toques nela: 
    // simula um duplo toque acidental no último Lembrei/Esqueci da estação.
    const botaoLembrei = getByText('Lembrei');
    await fireEvent.press(botaoLembrei);
    await fireEvent.press(botaoLembrei);

    expect(aoConcluir).toHaveBeenCalledTimes(1);
  });

  test('"Compartilhar resultado" abre a folha do sistema e registra resultado_compartilhado', async () => {
    const spy = jest.spyOn(Share, 'share').mockResolvedValue({ action: 'sharedAction' } as never);
    const eventos = new MemoryEventosStore();
    configurarAnalytics({ store: eventos });

    const { getByText } = await renderEstacao(['Higienizar as mãos'], jest.fn());
    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));
    await fireEvent.press(getByText('Compartilhar resultado'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    await aguardarAnalytics();
    const registrados = await eventos.listar();
    expect(registrados.map((e) => e.evento)).toEqual(['resultado_compartilhado']);
    expect(registrados[0].propriedades).toEqual({
      contexto: 'osce',
      checklist: 'Exame abdominal',
      percentual: 100,
      meio: 'texto',
    });

    spy.mockRestore();
    reiniciarAnalytics();
  });

  test('cancelar a folha de compartilhamento não registra evento', async () => {
    const spy = jest.spyOn(Share, 'share').mockRejectedValue(new Error('cancelado'));
    const eventos = new MemoryEventosStore();
    configurarAnalytics({ store: eventos });

    const { getByText } = await renderEstacao(['Higienizar as mãos'], jest.fn());
    await fireEvent.press(getByText('Revelar passo'));
    await fireEvent.press(getByText('Lembrei'));
    await fireEvent.press(getByText('Compartilhar resultado'));

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
    await aguardarAnalytics();
    expect(await eventos.listar()).toEqual([]);

    spy.mockRestore();
    reiniciarAnalytics();
  });
});
