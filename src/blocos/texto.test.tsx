import { render } from '@testing-library/react-native';
import { fonte } from '../design/tokens';
import { TextoRico } from './texto';

function renderTexto(texto: string) {
  return render(<TextoRico>{texto}</TextoRico>);
}

test('texto plano sem marcadores renderiza sem alteração', async () => {
  const { getByText } = await renderTexto('Texto normal sem formatação.');
  expect(getByText('Texto normal sem formatação.')).toBeTruthy();
});

test('**negrito** continua em negrito (comportamento existente preservado)', async () => {
  const { getByText } = await renderTexto('Isto é **negrito** puro.');
  const trecho = getByText('negrito');
  expect(trecho.props.style.fontFamily).toBe(fonte.leituraSemi);
});

test('*itálico* aplica fontStyle italic ao trecho marcado (bônus Fase 8)', async () => {
  const { getByText } = await renderTexto('Isto é *itálico* no meio da frase.');
  const trecho = getByText('itálico');
  expect(trecho.props.style.fontStyle).toBe('italic');
});

test('negrito e itálico lado a lado no mesmo parágrafo (misto)', async () => {
  const { getByText } = await renderTexto('Isto é **importante** e isto é *sutil*.');
  const negrito = getByText('importante');
  const italico = getByText('sutil');
  expect(negrito.props.style.fontFamily).toBe(fonte.leituraSemi);
  expect(italico.props.style.fontStyle).toBe('italic');
});

test('itálico com pontuação colada ao fechamento (padrão real do conteúdo)', async () => {
  // Ex. real: "...*com que esforço*.": ponto fora do marcador, sem espaço.
  const { getByText } = await renderTexto('Não *quantas* vezes, mas *como*.');
  expect(getByText('quantas').props.style.fontStyle).toBe('italic');
  expect(getByText('como').props.style.fontStyle).toBe('italic');
});

test('asterisco solto sem par permanece texto literal', async () => {
  const { getByText } = await renderTexto('3*4 não é itálico.');
  expect(getByText('3*4 não é itálico.')).toBeTruthy();
});

// Marcadores genuinamente aninhados (um tipo inteiro dentro do outro) estão
// fora do escopo suportado (ver comentário em texto.tsx): o corpus real
// nunca faz isso. Este teste garante só que não derruba a tela.
test('marcadores aninhados não quebram o render', async () => {
  const { toJSON } = await renderTexto('**negrito com *itálico* dentro** ainda aparece.');
  expect(toJSON()).toBeTruthy();
});

test('parágrafos separados por linha em branco continuam funcionando com formatação', async () => {
  const { getByText } = await renderTexto('Primeiro parágrafo com *itálico*.\n\nSegundo parágrafo com **negrito**.');
  expect(getByText('itálico').props.style.fontStyle).toBe('italic');
  expect(getByText('negrito').props.style.fontFamily).toBe(fonte.leituraSemi);
});
