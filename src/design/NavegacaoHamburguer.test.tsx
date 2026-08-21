import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from './ThemeContext';
import { NavegacaoHamburguer } from './NavegacaoHamburguer';

// A navegação web usa router.push (mesma convenção de app/(tabs)/index.tsx)
// e usePathname para acentuar a rota atual.
jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  usePathname: () => '/',
}));

function renderMenu() {
  return render(
    <ThemeProvider>
      <NavegacaoHamburguer />
    </ThemeProvider>,
  );
}

test('o menu vem fechado por padrão', async () => {
  const { queryByText, getByLabelText } = await renderMenu();
  expect(queryByText('Busca')).toBeNull();
  expect(getByLabelText('Abrir menu').props.accessibilityState.expanded).toBe(false);
});

test('tocar no hambúrguer exibe os 4 destinos do menu', async () => {
  const { getByLabelText, getByText } = await renderMenu();
  fireEvent.press(getByLabelText('Abrir menu'));

  await waitFor(() => {
    expect(getByText('Guia')).toBeTruthy();
    expect(getByText('Busca')).toBeTruthy();
    expect(getByText('Estudar')).toBeTruthy();
    expect(getByText('Perfil')).toBeTruthy();
  });
});

test('accessibilityState.expanded alterna ao abrir e fechar', async () => {
  const { getByLabelText } = await renderMenu();

  fireEvent.press(getByLabelText('Abrir menu'));
  await waitFor(() => {
    expect(getByLabelText('Abrir menu').props.accessibilityState.expanded).toBe(true);
  });

  fireEvent.press(getByLabelText('Abrir menu'));
  await waitFor(() => {
    expect(getByLabelText('Abrir menu').props.accessibilityState.expanded).toBe(false);
  });
});

test('tocar em um item navega e fecha o menu', async () => {
  const { router } = jest.requireMock('expo-router') as { router: { push: jest.Mock } };
  const { getByLabelText, getByText, queryByText } = await renderMenu();

  fireEvent.press(getByLabelText('Abrir menu'));
  await waitFor(() => expect(getByText('Busca')).toBeTruthy());

  fireEvent.press(getByText('Busca'));

  expect(router.push).toHaveBeenCalledWith('/busca');
  await waitFor(() => expect(queryByText('Busca')).toBeNull());
});

test('tocar no véu (backdrop) fecha o menu', async () => {
  const { getByLabelText, queryByText } = await renderMenu();

  fireEvent.press(getByLabelText('Abrir menu'));
  await waitFor(() => expect(queryByText('Guia')).toBeTruthy());

  fireEvent.press(getByLabelText('Fechar menu'));
  await waitFor(() => expect(queryByText('Guia')).toBeNull());
});

test('destaca a rota atual (Guia) com accessibilityState.selected', async () => {
  const { getByLabelText, getByText } = await renderMenu();
  fireEvent.press(getByLabelText('Abrir menu'));

  await waitFor(() => expect(getByText('Guia')).toBeTruthy());
  expect(getByLabelText('Guia').props.accessibilityState.selected).toBe(true);
  expect(getByLabelText('Busca').props.accessibilityState.selected).toBe(false);
});
