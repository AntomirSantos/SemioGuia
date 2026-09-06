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

// A sonda declara quantos casos vieram e se alguns conhecidos estão na lista:
// listar todos os ids aqui obrigaria a editar o teste a cada caso novo.
function SondaCasos() {
  const casos = useCasos();
  const ids = new Set(casos.map((c) => c.id));
  const conhecidos = ['dor-que-caminhou', 'perna-que-esfriou', 'peso-no-peito-que-ela-chamou-de-azia'];
  return (
    <Text>
      casos: {casos.length}, conhecidos: {conhecidos.every((id) => ids.has(id)) ? 'sim' : 'nao'}, unicos:{' '}
      {ids.size === casos.length ? 'sim' : 'nao'}
    </Text>
  );
}

test('useCasos lê os casos do bundle real, com ids únicos', async () => {
  render(<ContentProvider><SondaCasos /></ContentProvider>);
  await waitFor(() => {
    expect(screen.getByText(/^casos: \d+, conhecidos: sim, unicos: sim$/)).toBeTruthy();
  });
});
