import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { FolhaFeedback } from './FolhaFeedback';
import { VERSAO_APP } from '../config/versao';
import { aguardarAnalytics, configurarAnalytics, reiniciarAnalytics } from '../analytics/analytics';
import { MemoryEventosStore } from '../analytics/memoryEventos';

afterEach(() => {
  reiniciarAnalytics();
});

function renderFolha(topicoId?: string, aoFechar = jest.fn()) {
  return render(
    <ThemeProvider>
      <FolhaFeedback visivel aoFechar={aoFechar} topicoId={topicoId} />
    </ThemeProvider>,
  );
}

test('enviar registra feedback_enviado com categoria, texto, tópico, versão e plataforma', async () => {
  const eventos = new MemoryEventosStore();
  configurarAnalytics({ store: eventos });
  const { getByText, getByLabelText } = await renderFolha('a/b/c');

  await fireEvent.press(getByText('Erro no conteúdo'));
  await fireEvent.changeText(getByLabelText('Texto do feedback'), 'A tabela do sinal X parece trocada.');
  await fireEvent.press(getByText('Enviar'));

  await waitFor(() => {
    expect(getByText('Obrigado!')).toBeTruthy();
  });
  await aguardarAnalytics();
  const registrados = await eventos.listar();
  expect(registrados.map((e) => e.evento)).toEqual(['feedback_enviado']);
  expect(registrados[0].propriedades).toEqual({
    categoria: 'Erro no conteúdo',
    texto: 'A tabela do sinal X parece trocada.',
    topicoId: 'a/b/c',
    versao: VERSAO_APP,
    plataforma: Platform.OS,
  });
});

test('cancelar fecha sem registrar evento', async () => {
  const eventos = new MemoryEventosStore();
  configurarAnalytics({ store: eventos });
  const aoFechar = jest.fn();
  const { getByText } = await renderFolha(undefined, aoFechar);

  await fireEvent.press(getByText('Cancelar'));

  expect(aoFechar).toHaveBeenCalledTimes(1);
  await aguardarAnalytics();
  expect(await eventos.listar()).toEqual([]);
});
