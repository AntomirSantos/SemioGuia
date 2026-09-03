import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';
import { PAYWALL_ATIVO } from '../config/paywall';
import {
  acessoLiberado,
  entitlementDoSistema,
  estadoPadrao,
  topicoBloqueado,
} from './entitlements';
import { BloqueioPremium } from './BloqueioPremium';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

test('a flag do paywall está DESLIGADA no beta (§3 do plano: congelado)', () => {
  expect(PAYWALL_ATIVO).toBe(false);
});

test('cardiovascular e respiratório são gratuitos; os demais, premium', () => {
  expect(entitlementDoSistema('aparelho-cardiovascular')).toBe('gratuito');
  expect(entitlementDoSistema('aparelho-respiratorio')).toBe('gratuito');
  expect(entitlementDoSistema('sistema-nervoso')).toBe('premium');
  expect(entitlementDoSistema('anamnese')).toBe('premium');
});

test('com a flag desligada, tudo é liberado (nada muda para o usuário)', () => {
  const estado = { paywallAtivo: false, liberados: new Set<string>() };
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(true);
  expect(acessoLiberado('aparelho-cardiovascular', estado)).toBe(true);
  expect(topicoBloqueado('sistema-nervoso')).toBe(false); // estadoPadrao usa a flag real
});

test('com a flag ligada, premium bloqueia e gratuito não', () => {
  const estado = { paywallAtivo: true, liberados: new Set<string>() };
  expect(acessoLiberado('aparelho-cardiovascular', estado)).toBe(true);
  expect(acessoLiberado('aparelho-respiratorio', estado)).toBe(true);
  expect(acessoLiberado('sistema-nervoso', estado)).toBe(false);
});

test('entitlements locais destravam um sistema específico ou o guia inteiro', () => {
  expect(acessoLiberado('sistema-nervoso', { paywallAtivo: true, liberados: new Set(['sistema-nervoso']) })).toBe(true);
  expect(acessoLiberado('abdome', { paywallAtivo: true, liberados: new Set(['tudo']) })).toBe(true);
  expect(acessoLiberado('abdome', { paywallAtivo: true, liberados: new Set(['sistema-nervoso']) })).toBe(false);
});

test('estadoPadrao parte da flag committada e de nenhuma liberação local', () => {
  const estado = estadoPadrao();
  expect(estado.paywallAtivo).toBe(PAYWALL_ATIVO);
  expect(estado.liberados.size).toBe(0);
});

test('a tela de bloqueio placeholder nomeia o sistema e oferece voltar', async () => {
  const { getByText } = await render(
    <ThemeProvider>
      <BloqueioPremium sistemaTitulo="Sistema nervoso" />
    </ThemeProvider>,
  );
  expect(getByText('Sistema nervoso faz parte do guia completo')).toBeTruthy();
  expect(getByText('Voltar')).toBeTruthy();
});
