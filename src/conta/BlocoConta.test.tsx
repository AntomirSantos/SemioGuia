import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../design/ThemeContext';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    // roda o efeito ao montar, como uma tela recém-focada (mesmo padrão de
    // src/telas/perfil.test.tsx).
    useFocusEffect: (efeito: () => void | (() => void)) => useEffect(efeito, [efeito]),
  };
});

const mockUseConta = jest.fn();
jest.mock('./AuthContext', () => ({
  useConta: () => mockUseConta(),
}));

const mockSyncDisponivel = jest.fn(() => true);
jest.mock('./firebaseApp', () => ({
  syncDisponivel: () => mockSyncDisponivel(),
}));

const mockUseSync = jest.fn();
const mockSincronizarAgora = jest.fn(async () => {});
jest.mock('../sync/orquestrador', () => ({
  useSync: () => mockUseSync(),
}));

import { BlocoConta } from './BlocoConta';

async function renderBloco() {
  return render(
    <ThemeProvider>
      <BlocoConta />
    </ThemeProvider>,
  );
}

const CONTA_PADRAO = {
  usuario: null,
  carregando: false,
  criarConta: jest.fn(),
  entrar: jest.fn(),
  entrarComGoogle: jest.fn(),
  sair: jest.fn(),
  excluirConta: jest.fn(),
};

const SYNC_PADRAO = {
  ultimaSync: null,
  sincronizando: false,
  erro: null,
  sincronizarAgora: mockSincronizarAgora,
};

beforeEach(() => {
  jest.clearAllMocks();
  mockSyncDisponivel.mockReturnValue(true);
  mockUseConta.mockReturnValue({ ...CONTA_PADRAO });
  mockUseSync.mockReturnValue({ ...SYNC_PADRAO });
  mockSincronizarAgora.mockClear();
});

test('sem config: mostra "Sincronização indisponível nesta versão" e nada mais', async () => {
  mockSyncDisponivel.mockReturnValue(false);
  const { getByText, queryByLabelText } = await renderBloco();

  expect(getByText('Sincronização indisponível nesta versão.')).toBeTruthy();
  expect(queryByLabelText('E-mail')).toBeNull();
});

test('sem sessão: mostra convite, formulário e-mail/senha, Google e aviso LGPD', async () => {
  const { getByText, getByLabelText } = await renderBloco();

  expect(getByLabelText('E-mail')).toBeTruthy();
  expect(getByLabelText('Senha')).toBeTruthy();
  expect(getByText('Entrar')).toBeTruthy();
  expect(getByText('Criar conta')).toBeTruthy();
  expect(getByText('Entrar com Google')).toBeTruthy();
  expect(getByText(/só o seu e-mail é coletado/i)).toBeTruthy();
  expect(getByText(/excluir a conta/i)).toBeTruthy();
});

test('sem sessão: tocar "Entrar" chama entrar(email, senha)', async () => {
  const conta = { ...CONTA_PADRAO, entrar: jest.fn().mockResolvedValue(undefined) };
  mockUseConta.mockReturnValue(conta);
  const { getByLabelText, getByText } = await renderBloco();

  await fireEvent.changeText(getByLabelText('E-mail'), 'a@a.com');
  await fireEvent.changeText(getByLabelText('Senha'), 'senha123');
  await fireEvent.press(getByText('Entrar'));

  await waitFor(() => expect(conta.entrar).toHaveBeenCalledWith('a@a.com', 'senha123'));
});

test('sem sessão: tocar "Criar conta" chama criarConta(email, senha)', async () => {
  const conta = { ...CONTA_PADRAO, criarConta: jest.fn().mockResolvedValue(undefined) };
  mockUseConta.mockReturnValue(conta);
  const { getByLabelText, getByText } = await renderBloco();

  await fireEvent.changeText(getByLabelText('E-mail'), 'nova@a.com');
  await fireEvent.changeText(getByLabelText('Senha'), 'senha123');
  await fireEvent.press(getByText('Criar conta'));

  await waitFor(() => expect(conta.criarConta).toHaveBeenCalledWith('nova@a.com', 'senha123'));
});

test('sem sessão: tocar "Entrar com Google" chama entrarComGoogle', async () => {
  const conta = { ...CONTA_PADRAO, entrarComGoogle: jest.fn().mockResolvedValue(undefined) };
  mockUseConta.mockReturnValue(conta);
  const { getByText } = await renderBloco();

  await fireEvent.press(getByText('Entrar com Google'));

  await waitFor(() => expect(conta.entrarComGoogle).toHaveBeenCalled());
});

test('sem sessão: erro de entrar() é exibido com a mensagem de mapearErroAuth', async () => {
  const conta = { ...CONTA_PADRAO, entrar: jest.fn().mockRejectedValue(new Error('E-mail ou senha incorretos.')) };
  mockUseConta.mockReturnValue(conta);
  const { getByText } = await renderBloco();

  await fireEvent.press(getByText('Entrar'));

  await waitFor(() => expect(getByText('E-mail ou senha incorretos.')).toBeTruthy());
});

describe('com sessão', () => {
  const CONTA_LOGADA = { ...CONTA_PADRAO, usuario: { uid: 'uid-1', email: 'pessoa@exemplo.com' } };

  test('mostra o e-mail, Sair e Excluir conta', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    const { getByText } = await renderBloco();

    expect(getByText('pessoa@exemplo.com')).toBeTruthy();
    expect(getByText('Sair')).toBeTruthy();
    expect(getByText('Excluir conta')).toBeTruthy();
  });

  test('estado de sincronização: "Sincronizando…" quando sincronizando', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    mockUseSync.mockReturnValue({ ...SYNC_PADRAO, sincronizando: true });
    const { getByText } = await renderBloco();

    expect(getByText('Sincronizando…')).toBeTruthy();
  });

  test('estado de sincronização: "Sincronizado há X min" quando há ultimaSync', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    mockUseSync.mockReturnValue({ ...SYNC_PADRAO, ultimaSync: Date.now() - 5 * 60_000 });
    const { getByText } = await renderBloco();

    expect(getByText('Sincronizado há 5 min')).toBeTruthy();
  });

  test('estado de sincronização: erro discreto + "Tentar de novo" que chama sincronizarAgora', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    mockUseSync.mockReturnValue({ ...SYNC_PADRAO, erro: 'Não foi possível sincronizar agora.' });
    const { getByText } = await renderBloco();

    expect(getByText('Não foi possível sincronizar agora.')).toBeTruthy();
    await fireEvent.press(getByText('Tentar de novo'));

    await waitFor(() => expect(mockSincronizarAgora).toHaveBeenCalledWith({ forcar: true }));
  });

  test('tocar "Sair" chama sair()', async () => {
    const conta = { ...CONTA_LOGADA, sair: jest.fn().mockResolvedValue(undefined) };
    mockUseConta.mockReturnValue(conta);
    const { getByText } = await renderBloco();

    await fireEvent.press(getByText('Sair'));

    await waitFor(() => expect(conta.sair).toHaveBeenCalled());
  });

  test('excluir conta exige duas etapas: primeiro toque mostra confirmação com aviso de irreversibilidade', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    const { getByText, queryByText } = await renderBloco();

    expect(queryByText(/não pode ser desfeita/i)).toBeNull();
    await fireEvent.press(getByText('Excluir conta'));

    expect(getByText(/não pode ser desfeita/i)).toBeTruthy();
    expect(getByText('Confirmar exclusão')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  test('excluir conta: "Cancelar" volta ao estado sem confirmação', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    const { getByText, queryByText } = await renderBloco();

    await fireEvent.press(getByText('Excluir conta'));
    await fireEvent.press(getByText('Cancelar'));

    expect(queryByText(/não pode ser desfeita/i)).toBeNull();
    expect(getByText('Excluir conta')).toBeTruthy();
  });

  test('excluir conta: "Confirmar exclusão" chama excluirConta() (que já chama apagarDadosDoUsuario antes de deleteUser, via AuthProvider)', async () => {
    const conta = { ...CONTA_LOGADA, excluirConta: jest.fn().mockResolvedValue(undefined) };
    mockUseConta.mockReturnValue(conta);
    const { getByText } = await renderBloco();

    await fireEvent.press(getByText('Excluir conta'));
    await fireEvent.press(getByText('Confirmar exclusão'));

    await waitFor(() => expect(conta.excluirConta).toHaveBeenCalled());
  });

  test('excluir conta: erro é exibido com a mensagem de mapearErroAuth e mantém a confirmação aberta', async () => {
    const conta = {
      ...CONTA_LOGADA,
      excluirConta: jest.fn().mockRejectedValue(new Error('Por segurança, entre novamente para concluir esta ação.')),
    };
    mockUseConta.mockReturnValue(conta);
    const { getByText } = await renderBloco();

    await fireEvent.press(getByText('Excluir conta'));
    await fireEvent.press(getByText('Confirmar exclusão'));

    await waitFor(() =>
      expect(getByText('Por segurança, entre novamente para concluir esta ação.')).toBeTruthy(),
    );
    expect(getByText('Confirmar exclusão')).toBeTruthy();
  });

  test('foco na tela chama sincronizarAgora()', async () => {
    mockUseConta.mockReturnValue(CONTA_LOGADA);
    await renderBloco();

    await waitFor(() => expect(mockSincronizarAgora).toHaveBeenCalledWith());
  });
});

test('carregando: mostra um estado neutro sem formulário nem dados de conta', async () => {
  mockUseConta.mockReturnValue({ ...CONTA_PADRAO, carregando: true });
  const { queryByLabelText, queryByText } = await renderBloco();

  expect(queryByLabelText('E-mail')).toBeNull();
  expect(queryByText('Sair')).toBeNull();
});
