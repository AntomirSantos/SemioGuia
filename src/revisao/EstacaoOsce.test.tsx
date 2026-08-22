import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { EstacaoOsce, type ResultadoEstacao } from './EstacaoOsce';

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
    expect(aoConcluir).toHaveBeenCalledWith({ lembrados: 2, total: 3, percentual: 67 });
    expect(getByText('67%')).toBeTruthy();
    expect(getByText('Explicar o procedimento')).toBeTruthy();
    expect(queryByText('Revelar passo')).toBeNull();
  });
});
