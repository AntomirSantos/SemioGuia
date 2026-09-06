import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import Checklists from '../app/(tabs)/checklists';
import { router } from 'expo-router';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: () => ({}),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

async function renderChecklists() {
  return render(
    <ThemeProvider>
      <ContentProvider>
        <Checklists />
      </ContentProvider>
    </ThemeProvider>,
  );
}

beforeEach(() => {
  (router.push as jest.Mock).mockClear();
});

// A estação OSCE saiu da aba Estudar quando esta virou hub: quem quer treinar
// um roteiro sem consultar a lista entra por aqui.
test('o checklist aberto oferece praticar como estação e leva à estação daquele roteiro', async () => {
  const { getByText, getByLabelText, queryByText } = await renderChecklists();

  await waitFor(() => {
    expect(getByText('Entrevista clínica em 10 passos')).toBeTruthy();
  });
  expect(queryByText('Praticar como estação')).toBeNull();

  fireEvent.press(getByLabelText('Entrevista clínica em 10 passos, abrir'));
  await waitFor(() => {
    expect(getByText('Praticar como estação')).toBeTruthy();
  });

  fireEvent.press(getByText('Praticar como estação'));
  expect(router.push).toHaveBeenCalledWith(
    `/estacao/anamnese/entrevista-clinica/a-entrevista-clinica?titulo=${encodeURIComponent(
      'Entrevista clínica em 10 passos',
    )}`,
  );
});
