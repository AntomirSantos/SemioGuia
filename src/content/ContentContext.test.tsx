import { Text } from 'react-native';
import { render, screen, waitFor } from '@testing-library/react-native';
import { ContentProvider, useConteudo } from './ContentContext';

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
