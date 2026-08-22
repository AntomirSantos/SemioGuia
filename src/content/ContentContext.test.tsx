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

test('useCasos lê os três casos piloto do bundle real', async () => {
  render(<ContentProvider><SondaCasos /></ContentProvider>);
  await waitFor(() => {
    expect(
      screen.getByText('casos: crise-hipertensiva, febre-na-crianca, sincope-pulso-irregular')
    ).toBeTruthy();
  });
});
