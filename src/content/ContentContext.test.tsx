import { Text } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';
import { ContentProvider, useCasos, useConteudo } from './ContentContext';

function Sonda() {
  const c = useConteudo();
  return <Text>{c.sistemas[0].titulo}</Text>;
}

test('provider carrega o conteúdo real do bundle', async () => {
  render(<ContentProvider><Sonda /></ContentProvider>);
  await waitFor(() => {
    expect(screen.getByText('Anamnese')).toBeTruthy();
  });
});

function SondaCasos() {
  const casos = useCasos();
  return <Text>casos: {casos.map((c) => c.id).join(', ')}</Text>;
}

test('useCasos lê os doze casos do bundle real', async () => {
  render(<ContentProvider><SondaCasos /></ContentProvider>);
  await waitFor(() => {
    expect(
      screen.getByText('casos: caroco-no-pescoco, consulta-dos-dezoito-segundos, crise-hipertensiva, dispneia-e-base-muda, dor-que-acordou-o-menino, dor-que-caminhou, febre-e-nuca-dura, febre-na-crianca, joelho-do-sabado, perna-que-esfriou, quieta-demais-no-leito-8, sincope-pulso-irregular')
    ).toBeTruthy();
  });
});
