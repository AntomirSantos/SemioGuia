import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import type { Bloco, QuizPergunta } from '../content/schema';
import { BlocoView } from './Bloco';

function renderBloco(bloco: Bloco, onIniciarQuiz?: (p: QuizPergunta[]) => void) {
  return render(
    <ThemeProvider>
      <BlocoView bloco={bloco} onIniciarQuiz={onIniciarQuiz} />
    </ThemeProvider>,
  );
}

test('conceito renderiza título e texto', async () => {
  const bloco: Bloco = { tipo: 'conceito', titulo: 'Definição', texto: 'Um **sinal** clínico observável.' };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Definição')).toBeTruthy();
  expect(getByText(/sinal/)).toBeTruthy();
});

test('manobra lista os passos numerados e a caixa observar', async () => {
  const bloco: Bloco = {
    tipo: 'manobra',
    titulo: 'Palpação abdominal',
    passos: ['Posicione as mãos', 'Aplique pressão leve'],
    observar: 'Reação de defesa',
  };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Posicione as mãos')).toBeTruthy();
  expect(getByText('Aplique pressão leve')).toBeTruthy();
  expect(getByText('Reação de defesa')).toBeTruthy();
});

test('sinal mostra descrição, significado e causas', async () => {
  const bloco: Bloco = {
    tipo: 'sinal',
    nome: 'Sinal de Kussmaul',
    descricao: 'Aumento paradoxal da PVJ na inspiração',
    significado: 'Restrição ao enchimento ventricular direito',
    causas: ['Pericardite constritiva'],
  };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Sinal de Kussmaul')).toBeTruthy();
  expect(getByText(/Pericardite constritiva/)).toBeTruthy();
});

test('checklist alterna item ao toque e risca o texto', async () => {
  const bloco: Bloco = { tipo: 'checklist', titulo: 'Antes de examinar', itens: ['Higienizar as mãos', 'Explicar o procedimento'] };
  const { getByText, getAllByRole } = await renderBloco(bloco);
  const item = getByText('Higienizar as mãos');
  expect(item.props.style).not.toEqual(
    expect.objectContaining({ textDecorationLine: 'line-through' }),
  );

  expect(getAllByRole('checkbox')[0].props.accessibilityState?.checked).toBe(false);

  await fireEvent.press(getAllByRole('checkbox')[0]);

  expect(getAllByRole('checkbox')[0].props.accessibilityState?.checked).toBe(true);
  const itemMarcado = getByText('Higienizar as mãos');
  const estilo = Array.isArray(itemMarcado.props.style) ? Object.assign({}, ...itemMarcado.props.style.flat(2)) : itemMarcado.props.style;
  expect(estilo.textDecorationLine).toBe('line-through');
});

test('tabela mostra cabeçalho e células', async () => {
  const bloco: Bloco = {
    tipo: 'tabela',
    titulo: 'Classificação da PA',
    colunas: ['Categoria', 'PAS'],
    linhas: [['Normal', '120']],
  };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Categoria')).toBeTruthy();
  expect(getByText('Normal')).toBeTruthy();
  expect(getByText('120')).toBeTruthy();
});

test('fluxograma mostra as etapas em ordem', async () => {
  const bloco: Bloco = {
    tipo: 'fluxograma',
    titulo: 'Febre',
    etapas: [
      { texto: 'Medir temperatura', formato: 'inicio' },
      { texto: 'Febre presente?', formato: 'decisao' },
      { texto: 'Investigar causa', formato: 'fim' },
    ],
  };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Medir temperatura')).toBeTruthy();
  expect(getByText('Febre presente?')).toBeTruthy();
  expect(getByText('Investigar causa')).toBeTruthy();
});

test('pérola mostra o texto em destaque', async () => {
  const bloco: Bloco = { tipo: 'perola', texto: 'Kussmaul ocorre em minoria das pericardites constritivas.' };
  const { getByText } = await renderBloco(bloco);
  expect(getByText(/Kussmaul ocorre/)).toBeTruthy();
});

test('secao renderiza o título', async () => {
  const bloco: Bloco = { tipo: 'secao', titulo: 'Ausculta cardíaca' };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Ausculta cardíaca')).toBeTruthy();
});

test('entendimento mostra a tag e o texto', async () => {
  const bloco: Bloco = { tipo: 'entendimento', titulo: 'Por que isso importa', texto: 'A fisiopatologia explica o achado.' };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Entendimento clínico')).toBeTruthy();
  expect(getByText(/fisiopatologia explica/)).toBeTruthy();
});

test('ilustracao renderiza a legenda', async () => {
  const bloco: Bloco = {
    tipo: 'ilustracao',
    svg: '<svg viewBox="0 0 100 50"><circle cx="50" cy="25" r="10" /></svg>',
    legenda: 'Corte transversal do átrio direito',
  };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Corte transversal do átrio direito')).toBeTruthy();
});

test('bloco com nivel avancado fica fechado por padrão e abre ao toque em Aprofundar', async () => {
  const bloco: Bloco = { tipo: 'conceito', titulo: 'Detalhe avançado', texto: 'Conteúdo aprofundado do conceito.', nivel: 'avancado' };
  const { queryByText, getByText, getByRole } = await renderBloco(bloco);

  expect(queryByText(/Conteúdo aprofundado/)).toBeNull();
  expect(getByText('Aprofundar · Conceito')).toBeTruthy();

  const cabecalho = getByRole('button');
  expect(cabecalho.props.accessibilityState.expanded).toBe(false);

  await fireEvent.press(getByText('Aprofundar · Conceito'));

  expect(getByText(/Conteúdo aprofundado/)).toBeTruthy();
  expect(getByRole('button').props.accessibilityState.expanded).toBe(true);
});

test('secao com nivel avancado é exceção: título fica visível sem Aprofundar', async () => {
  const bloco: Bloco = { tipo: 'secao', titulo: 'Detalhes técnicos', nivel: 'avancado' };
  const { getByText, queryByText } = await renderBloco(bloco);

  expect(getByText('Detalhes técnicos')).toBeTruthy();
  expect(queryByText(/Aprofundar/)).toBeNull();
});

test('quiz mostra card-resumo e chama onIniciarQuiz ao praticar', async () => {
  const perguntas: QuizPergunta[] = Array.from({ length: 5 }, (_, i) => ({
    id: `p${i}`,
    enunciado: `Pergunta ${i}`,
    alternativas: ['A', 'B'],
    corretaIndex: 0,
    explicacao: 'Porque sim',
  }));
  const bloco: Bloco = { tipo: 'quiz', perguntas };
  const onIniciar = jest.fn();
  const { getByText } = await renderBloco(bloco, onIniciar);
  expect(getByText('5 perguntas')).toBeTruthy();
  await fireEvent.press(getByText('Praticar'));
  expect(onIniciar).toHaveBeenCalledWith(perguntas);
});
