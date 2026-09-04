import { Platform, Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider, useTema, type PreferenciaTema } from './ThemeContext';

// Simula o SO em modo escuro, para exercitar o ramo `preferencia === 'sistema'`.
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => 'dark',
}));

function Sonda() {
  const { escuro } = useTema();
  return <Text testID="escuro">{escuro ? 'escuro' : 'claro'}</Text>;
}

function renderSonda(temaInicial?: PreferenciaTema) {
  return render(
    <ThemeProvider temaInicial={temaInicial}>
      <Sonda />
    </ThemeProvider>,
  );
}

// Nota sobre o que estes testes cobrem: a correção em ThemeProvider evita uma
// divergência entre o HTML pré-renderizado do export estático da web
// (build-time, sem `window`/`matchMedia`, sempre assume claro) e a primeira
// renderização do cliente quando `useColorScheme()` já aponta escuro: essa
// janela de hidratação só existe num navegador de verdade (foi reproduzida e
// verificada com Playwright contra o build exportado, não em jest: ver a
// resposta do agente). O `render()` do RNTL já libera os efeitos pendentes
// (incluindo o efeito de montagem da correção) antes de resolver, então em
// jest só dá para observar o estado final convergido, não a janela
// transitória entre o commit inicial e o efeito. Os testes abaixo garantem a
// regressão que importa: nativo (sem gate) e web (com gate) chegam ao MESMO
// resultado final correto, e o gate não vaza para as preferências explícitas.
test('nativo: preferência "sistema" resolve escuro (comportamento inalterado por esta correção)', async () => {
  const { getByTestId } = await renderSonda();
  expect(getByTestId('escuro').props.children).toBe('escuro');
});

test('web: preferência "sistema" converge para escuro (mesmo resultado final do nativo)', async () => {
  Platform.OS = 'web';
  try {
    const { getByTestId } = await renderSonda();
    expect(getByTestId('escuro').props.children).toBe('escuro');
  } finally {
    Platform.OS = 'ios';
  }
});

test('web: preferência explícita "escuro" não passa pelo gate do sistema (correta de imediato)', async () => {
  Platform.OS = 'web';
  try {
    const { getByTestId } = await renderSonda('escuro');
    expect(getByTestId('escuro').props.children).toBe('escuro');
  } finally {
    Platform.OS = 'ios';
  }
});

test('web: preferência explícita "claro" não passa pelo gate do sistema (correta de imediato)', async () => {
  Platform.OS = 'web';
  try {
    const { getByTestId } = await renderSonda('claro');
    expect(getByTestId('escuro').props.children).toBe('claro');
  } finally {
    Platform.OS = 'ios';
  }
});
