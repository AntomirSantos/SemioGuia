import { Text } from 'react-native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from './ThemeContext';
import { NavegacaoHamburguer } from './NavegacaoHamburguer';

// A navegação web usa router.push (mesma convenção de app/(tabs)/index.tsx)
// e usePathname para acentuar a rota atual.
jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  usePathname: () => '/',
}));

// Nota sobre os limites do jest-expo/RNTL aqui: `Pressable` absorve
// `aria-expanded`/`aria-selected` em `accessibilityState` e não os expõe como
// props próprias no renderer de teste, só dá para observar
// `accessibilityState.expanded`/`.selected` (o par ARIA real só existe no DOM
// via react-native-web, verificado manualmente com Playwright, não em jest).
// `View`, por outro lado, preserva `aria-hidden`/`importantForAccessibility`
// como props literais, e o RNTL já as reconhece: um elemento com
// `aria-hidden` some das consultas padrão (por isso os testes abaixo usam
// `includeHiddenElements: true` para inspecioná-lo enquanto oculto).
function renderMenu() {
  return render(
    <ThemeProvider>
      <NavegacaoHamburguer>
        <Text>Conteúdo da página</Text>
      </NavegacaoHamburguer>
    </ThemeProvider>,
  );
}

test('o menu vem fechado por padrão', async () => {
  const { queryByText, getByLabelText } = await renderMenu();
  expect(queryByText('Busca')).toBeNull();
  expect(getByLabelText('Abrir menu').props.accessibilityState.expanded).toBe(false);
});

test('tocar no hambúrguer exibe os 4 destinos do menu', async () => {
  const { getByTestId, getByText } = await renderMenu();
  fireEvent.press(getByTestId('botaoHamburguer'));

  await waitFor(() => {
    expect(getByText('Guia')).toBeTruthy();
    expect(getByText('Busca')).toBeTruthy();
    expect(getByText('Estudar')).toBeTruthy();
    expect(getByText('Perfil')).toBeTruthy();
  });
});

test('accessibilityState.expanded alterna ao abrir e fechar', async () => {
  const { getByTestId } = await renderMenu();
  const botao = () => getByTestId('botaoHamburguer');

  fireEvent.press(botao());
  await waitFor(() => {
    expect(botao().props.accessibilityState.expanded).toBe(true);
  });

  fireEvent.press(botao());
  await waitFor(() => {
    expect(botao().props.accessibilityState.expanded).toBe(false);
  });
});

test('o rótulo do botão hambúrguer alterna entre "Abrir menu" e "Fechar menu"', async () => {
  const { getByTestId, getByLabelText, queryByLabelText } = await renderMenu();

  expect(getByLabelText('Abrir menu')).toBeTruthy();

  fireEvent.press(getByTestId('botaoHamburguer'));
  await waitFor(() => {
    expect(queryByLabelText('Abrir menu')).toBeNull();
    expect(getByLabelText('Fechar menu')).toBeTruthy();
  });

  fireEvent.press(getByTestId('botaoHamburguer'));
  await waitFor(() => {
    expect(getByLabelText('Abrir menu')).toBeTruthy();
  });
});

test('tocar em um item navega e fecha o menu', async () => {
  const { router } = jest.requireMock('expo-router') as { router: { push: jest.Mock } };
  const { getByTestId, getByText, queryByText } = await renderMenu();

  fireEvent.press(getByTestId('botaoHamburguer'));
  await waitFor(() => expect(getByText('Busca')).toBeTruthy());

  fireEvent.press(getByText('Busca'));

  expect(router.push).toHaveBeenCalledWith('/busca');
  await waitFor(() => expect(queryByText('Busca')).toBeNull());
});

test('tocar na sobreposição (backdrop) fecha o menu', async () => {
  const { getByTestId, getByLabelText, queryByText } = await renderMenu();

  fireEvent.press(getByTestId('botaoHamburguer'));
  await waitFor(() => expect(queryByText('Guia')).toBeTruthy());

  fireEvent.press(getByLabelText('Fechar sobreposição'));
  await waitFor(() => expect(queryByText('Guia')).toBeNull());
});

test('destaca a rota atual (Guia) com accessibilityState.selected', async () => {
  const { getByTestId, getByLabelText, getByText } = await renderMenu();
  fireEvent.press(getByTestId('botaoHamburguer'));

  await waitFor(() => expect(getByText('Guia')).toBeTruthy());
  expect(getByLabelText('Guia').props.accessibilityState.selected).toBe(true);
  expect(getByLabelText('Busca').props.accessibilityState.selected).toBe(false);
});

test('o conteúdo por trás fica oculto para acessibilidade enquanto o menu está aberto', async () => {
  const { getByTestId, queryByTestId } = await renderMenu();

  expect(getByTestId('conteudoWeb').props.importantForAccessibility).toBe('auto');
  expect(getByTestId('conteudoWeb').props['aria-hidden']).toBe(false);

  fireEvent.press(getByTestId('botaoHamburguer'));

  // aria-hidden faz o RNTL tratar o elemento como oculto e sumir da consulta
  // padrão: confirmação, na prática, de que ele saiu da árvore acessível.
  await waitFor(() => {
    expect(queryByTestId('conteudoWeb')).toBeNull();
  });
  const conteudoOculto = getByTestId('conteudoWeb', { includeHiddenElements: true });
  expect(conteudoOculto.props.importantForAccessibility).toBe('no-hide-descendants');
  expect(conteudoOculto.props['aria-hidden']).toBe(true);

  fireEvent.press(getByTestId('botaoHamburguer'));
  await waitFor(() => {
    expect(getByTestId('conteudoWeb').props.importantForAccessibility).toBe('auto');
    expect(getByTestId('conteudoWeb').props['aria-hidden']).toBe(false);
  });
});
