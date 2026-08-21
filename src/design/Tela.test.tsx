import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Tela } from './Tela';
import { ThemeProvider } from './ThemeContext';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

test('Tela renderiza o conteúdo dentro do ThemeProvider', async () => {
  const { getByText } = await render(
    <ThemeProvider>
      <Tela>
        <Text>x</Text>
      </Tela>
    </ThemeProvider>,
  );
  expect(getByText('x')).toBeTruthy();
});
