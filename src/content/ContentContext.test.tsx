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
    expect(screen.getByText('Exame físico geral')).toBeTruthy();
  });
});

function SondaCasos() {
  const casos = useCasos();
  return <Text>casos: {casos.length}</Text>;
}

test('useCasos lê os casos do bundle real (vazio até a Task 6)', async () => {
  render(<ContentProvider><SondaCasos /></ContentProvider>);
  await waitFor(() => {
    expect(screen.getByText('casos: 0')).toBeTruthy();
  });
});
