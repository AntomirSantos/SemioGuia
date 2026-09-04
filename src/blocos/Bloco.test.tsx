import { fireEvent, render } from '@testing-library/react-native';
import { router } from 'expo-router';
import { ThemeProvider } from '../design/ThemeContext';
import type { Bloco, QuizPergunta } from '../content/schema';
import { BlocoView } from './Bloco';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

function renderBloco(bloco: Bloco, onIniciarQuiz?: (p: QuizPergunta[]) => void, topicoId?: string) {
  return render(
    <ThemeProvider>
      <BlocoView bloco={bloco} onIniciarQuiz={onIniciarQuiz} topicoId={topicoId} />
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

test('checklist sem topicoId não mostra o botão de praticar como estação', async () => {
  const bloco: Bloco = { tipo: 'checklist', titulo: 'Antes de examinar', itens: ['Higienizar as mãos'] };
  const { queryByText } = await renderBloco(bloco);
  expect(queryByText('Praticar como estação')).toBeNull();
});

test('checklist com topicoId mostra o botão e navega para a estação com o título codificado', async () => {
  const bloco: Bloco = { tipo: 'checklist', titulo: 'Antes de examinar', itens: ['Higienizar as mãos'] };
  const { getByText } = await renderBloco(bloco, undefined, 'exame-fisico-geral/sinais-vitais/pulso');

  await fireEvent.press(getByText('Praticar como estação'));

  expect(router.push).toHaveBeenCalledWith(
    '/estacao/exame-fisico-geral/sinais-vitais/pulso?titulo=Antes%20de%20examinar',
  );
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

test('cena renderiza a vinheta com o rótulo "À beira do leito"', async () => {
  const bloco: Bloco = { tipo: 'cena', texto: 'Plantão, 3h: o residente te chama pelo leito 12.' };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('À beira do leito')).toBeTruthy();
  expect(getByText(/leito 12/)).toBeTruthy();
});

test('pense esconde a resposta até o toque em "Mostrar resposta"', async () => {
  const bloco: Bloco = {
    tipo: 'pense',
    pergunta: 'O sopro que coincide com a onda carotídea é sistólico ou diastólico?',
    resposta: 'Sistólico, a onda carotídea marca a sístole.',
  };
  const { getByText, queryByText } = await renderBloco(bloco);
  expect(getByText(/onda carotídea é sistólico/)).toBeTruthy();
  expect(queryByText(/marca a sístole/)).toBeNull();
  await fireEvent.press(getByText('Mostrar resposta'));
  expect(getByText(/marca a sístole/)).toBeTruthy();
  expect(queryByText('Mostrar resposta')).toBeNull();
});

test('resumo renderiza o título e as três linhas numeradas', async () => {
  const bloco: Bloco = { tipo: 'resumo', linhas: ['Primeira frase.', 'Segunda frase.', 'Terceira frase.'] };
  const { getByText } = await renderBloco(bloco);
  expect(getByText('Em três linhas')).toBeTruthy();
  expect(getByText('1.')).toBeTruthy();
  expect(getByText('3.')).toBeTruthy();
  expect(getByText('Terceira frase.')).toBeTruthy();
});

test('caso-relâmpago revela o desfecho após a escolha e trava as opções', async () => {
  const bloco: Bloco = {
    tipo: 'relampago',
    caso: 'Enfermaria, 2h: o paciente do leito 3 refere dor torácica nova.',
    pergunta: 'Qual é a primeira providência?',
    opcoes: ['Aguardar a manhã', 'Examinar agora, com sinais vitais', 'Prescrever analgesia sem exame'],
    corretaIndex: 1,
    desfecho: 'O exame imediato encontrou hipotensão, a espera teria custado caro.',
  };
  const { getByText, queryByText, getAllByRole } = await renderBloco(bloco);
  expect(getByText(/leito 3/)).toBeTruthy();
  expect(queryByText(/teria custado caro/)).toBeNull();
  await fireEvent.press(getByText('Examinar agora, com sinais vitais'));
  expect(getByText(/teria custado caro/)).toBeTruthy();
  expect(getByText('Boa decisão')).toBeTruthy();
  const botoes = getAllByRole('button').filter((b) => b.props.accessibilityState?.disabled === true);
  expect(botoes.length).toBeGreaterThanOrEqual(3);
});

test('caso-relâmpago com escolha errada mostra o desfecho e marca a correta', async () => {
  const bloco: Bloco = {
    tipo: 'relampago',
    caso: 'Caso curto.',
    pergunta: 'Decisão?',
    opcoes: ['Errada', 'Certa'],
    corretaIndex: 1,
    desfecho: 'Explicação do desfecho.',
  };
  const { getByText } = await renderBloco(bloco);
  await fireEvent.press(getByText('Errada'));
  expect(getByText('O desfecho ensina')).toBeTruthy();
  expect(getByText(/✓ Certa/)).toBeTruthy();
  expect(getByText(/✗ Errada/)).toBeTruthy();
});

test('som renderiza título, descrição, aviso e chama play ao tocar', async () => {
  const { __mockPlayer, __resetMockPlayer } = require('../testes/expo-audio-mock');
  __resetMockPlayer();
  const bloco: Bloco = {
    tipo: 'som',
    titulo: 'Bulhas normais: TUM-TA',
    arquivo: 'bulhas-normais',
    descricao: 'B1 mais grave; B2 mais aguda e seca.',
  };
  const { getByText, getByRole } = await renderBloco(bloco);
  expect(getByText('Ausculta')).toBeTruthy();
  expect(getByText('Bulhas normais: TUM-TA')).toBeTruthy();
  expect(getByText(/B2 mais aguda/)).toBeTruthy();
  expect(getByText(/Som sintetizado para estudo/)).toBeTruthy();

  await fireEvent.press(getByRole('button'));
  expect(__mockPlayer.play).toHaveBeenCalledTimes(1);
  expect(__mockPlayer.loop).toBe(true);
});
