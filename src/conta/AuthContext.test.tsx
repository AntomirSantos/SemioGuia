import { act, renderHook } from '@testing-library/react-native';

const mockAuthObj: { currentUser: { uid: string; email: string | null } | null } = {
  currentUser: null,
};
let authStateCallback: ((user: unknown) => void) | null = null;

const mockGetAuth = jest.fn((..._args: unknown[]) => mockAuthObj);
const mockOnAuthStateChanged = jest.fn((_auth: unknown, callback: (user: unknown) => void) => {
  authStateCallback = callback;
  return () => {
    authStateCallback = null;
  };
});
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockSignInWithPopup = jest.fn();
const mockSignOut = jest.fn();
const mockDeleteUser = jest.fn();
const mockSendEmailVerification = jest.fn();

// A SDK real do Firebase nunca roda em teste (ver nota em firebaseApp.test.ts):
// mockamos firebase/app, firebase/auth E firebase/firestore, já que
// firebaseApp.ts (importado por AuthContext.tsx) importa os três.
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({ name: '[DEFAULT]' })),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));
jest.mock('firebase/auth', () => ({
  getAuth: (...args: unknown[]) => mockGetAuth(...args),
  onAuthStateChanged: (...args: [unknown, (user: unknown) => void]) => mockOnAuthStateChanged(...args),
  createUserWithEmailAndPassword: (...args: unknown[]) => mockCreateUserWithEmailAndPassword(...args),
  signInWithEmailAndPassword: (...args: unknown[]) => mockSignInWithEmailAndPassword(...args),
  signInWithPopup: (...args: unknown[]) => mockSignInWithPopup(...args),
  signOut: (...args: unknown[]) => mockSignOut(...args),
  deleteUser: (...args: unknown[]) => mockDeleteUser(...args),
  sendEmailVerification: (...args: unknown[]) => mockSendEmailVerification(...args),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
}));

import { Platform } from 'react-native';
import { AuthProvider, useConta } from './AuthContext';
import { _setConfigParaTeste } from './firebaseApp';

const CONFIG_FALSA = {
  apiKey: 'chave-falsa',
  authDomain: 'falso.firebaseapp.com',
  projectId: 'falso',
  appId: '1:falso:web:falso',
};

function renderConta() {
  return renderHook(() => useConta(), { wrapper: AuthProvider });
}

beforeEach(() => {
  mockAuthObj.currentUser = null;
  authStateCallback = null;
});

afterEach(() => {
  jest.clearAllMocks();
  _setConfigParaTeste(null);
});

describe('sem config do Firebase', () => {
  test('usuario é null e carregando é false imediatamente', async () => {
    const { result } = await renderConta();
    expect(result.current.usuario).toBeNull();
    expect(result.current.carregando).toBe(false);
  });

  test('entrar rejeita com "Sincronização não configurada"', async () => {
    const { result } = await renderConta();
    await expect(result.current.entrar('a@a.com', '123456')).rejects.toThrow(
      'Sincronização não configurada',
    );
  });

  test('criarConta rejeita com "Sincronização não configurada"', async () => {
    const { result } = await renderConta();
    await expect(result.current.criarConta('a@a.com', '123456')).rejects.toThrow(
      'Sincronização não configurada',
    );
  });

  test('sair rejeita com "Sincronização não configurada"', async () => {
    const { result } = await renderConta();
    await expect(result.current.sair()).rejects.toThrow('Sincronização não configurada');
  });

  test('excluirConta rejeita com "Sincronização não configurada"', async () => {
    const { result } = await renderConta();
    await expect(result.current.excluirConta()).rejects.toThrow('Sincronização não configurada');
  });

  test('entrarComGoogle rejeita com "Sincronização não configurada"', async () => {
    const { result } = await renderConta();
    await expect(result.current.entrarComGoogle()).rejects.toThrow('Sincronização não configurada');
  });
});

describe('com config do Firebase (mockado)', () => {
  beforeEach(() => {
    _setConfigParaTeste(CONFIG_FALSA);
  });

  test('carregando começa true e onAuthStateChanged popula usuario', async () => {
    const { result } = await renderConta();
    expect(result.current.carregando).toBe(true);
    expect(result.current.usuario).toBeNull();

    await act(async () => {
      authStateCallback?.({ uid: 'uid-1', email: 'a@a.com' });
    });

    expect(result.current.carregando).toBe(false);
    expect(result.current.usuario).toEqual({ uid: 'uid-1', email: 'a@a.com' });
  });

  test('onAuthStateChanged com usuário null mantém usuario null e encerra o carregamento', async () => {
    const { result } = await renderConta();

    await act(async () => {
      authStateCallback?.(null);
    });

    expect(result.current.carregando).toBe(false);
    expect(result.current.usuario).toBeNull();
  });

  test('criarConta chama createUserWithEmailAndPassword e sendEmailVerification', async () => {
    const usuarioFalso = { uid: 'uid-2', email: 'novo@a.com' };
    mockCreateUserWithEmailAndPassword.mockResolvedValue({ user: usuarioFalso });
    mockSendEmailVerification.mockResolvedValue(undefined);

    const { result } = await renderConta();
    await act(async () => {
      await result.current.criarConta('novo@a.com', 'senha123');
    });

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuthObj,
      'novo@a.com',
      'senha123',
    );
    expect(mockSendEmailVerification).toHaveBeenCalledWith(usuarioFalso);
  });

  test('criarConta não rejeita quando sendEmailVerification falha (não bloqueia uso)', async () => {
    mockCreateUserWithEmailAndPassword.mockResolvedValue({ user: { uid: 'uid-3', email: 'x@a.com' } });
    mockSendEmailVerification.mockRejectedValue(new Error('falhou'));

    const { result } = await renderConta();
    await expect(result.current.criarConta('x@a.com', 'senha123')).resolves.toBeUndefined();
  });

  test('sair chama signOut', async () => {
    mockSignOut.mockResolvedValue(undefined);
    const { result } = await renderConta();

    await act(async () => {
      await result.current.sair();
    });

    expect(mockSignOut).toHaveBeenCalledWith(mockAuthObj);
  });

  test.each([
    ['auth/email-already-in-use', 'Este e-mail já está cadastrado.'],
    ['auth/invalid-credential', 'E-mail ou senha incorretos.'],
    ['auth/network-request-failed', 'Falha de conexão. Verifique sua internet e tente de novo.'],
    ['auth/algo-desconhecido', 'Não foi possível completar a ação. Tente de novo.'],
  ])('erro %s do SDK em entrar() vira a mensagem pt-BR "%s"', async (codigo, mensagem) => {
    const erroSdk = Object.assign(new Error('erro interno do SDK'), { code: codigo });
    mockSignInWithEmailAndPassword.mockRejectedValue(erroSdk);

    const { result } = await renderConta();
    await expect(result.current.entrar('a@a.com', 'senha123')).rejects.toThrow(mensagem);
  });

  test('entrarComGoogle usa signInWithPopup na web', async () => {
    Platform.OS = 'web';
    mockSignInWithPopup.mockResolvedValue({ user: { uid: 'uid-4', email: 'g@a.com' } });
    try {
      const { result } = await renderConta();
      await act(async () => {
        await result.current.entrarComGoogle();
      });
      expect(mockSignInWithPopup).toHaveBeenCalled();
    } finally {
      Platform.OS = 'ios';
    }
  });

  test('entrarComGoogle fora da web rejeita com mensagem pt-BR clara', async () => {
    Platform.OS = 'ios';
    const { result } = await renderConta();
    await expect(result.current.entrarComGoogle()).rejects.toThrow(/nativo/i);
    expect(mockSignInWithPopup).not.toHaveBeenCalled();
  });

  test('excluirConta chama o apagador injetado, depois deleteUser, nessa ordem', async () => {
    mockAuthObj.currentUser = { uid: 'uid-5', email: 'e@a.com' };
    mockDeleteUser.mockResolvedValue(undefined);
    const ordem: string[] = [];
    const apagarDados = jest.fn(async (uid: string) => {
      ordem.push(`apagar:${uid}`);
    });
    mockDeleteUser.mockImplementation(async () => {
      ordem.push('deleteUser');
    });

    const { result } = await renderHook(() => useConta(), {
      wrapper: ({ children }) => <AuthProvider apagarDados={apagarDados}>{children}</AuthProvider>,
    });

    await act(async () => {
      await result.current.excluirConta();
    });

    expect(apagarDados).toHaveBeenCalledWith('uid-5');
    expect(mockDeleteUser).toHaveBeenCalledWith(mockAuthObj.currentUser);
    expect(ordem).toEqual(['apagar:uid-5', 'deleteUser']);
  });

  test('excluirConta com auth/requires-recent-login pede para entrar novamente', async () => {
    mockAuthObj.currentUser = { uid: 'uid-6', email: 'e@a.com' };
    mockDeleteUser.mockRejectedValue(
      Object.assign(new Error('precisa reautenticar'), { code: 'auth/requires-recent-login' }),
    );

    const { result } = await renderConta();
    await expect(result.current.excluirConta()).rejects.toThrow(
      'Por segurança, entre novamente para concluir esta ação.',
    );
  });

  test('excluirConta: apagarDados sucede mas deleteUser falha com auth/requires-recent-login — trava o comportamento de falha parcial (dados já apagados, usuario continua "logado")', async () => {
    mockAuthObj.currentUser = { uid: 'uid-7', email: 'f@a.com' };
    const apagarDados = jest.fn(async (_uid: string) => {});
    mockDeleteUser.mockRejectedValue(
      Object.assign(new Error('precisa reautenticar'), { code: 'auth/requires-recent-login' }),
    );

    const { result } = await renderHook(() => useConta(), {
      wrapper: ({ children }) => <AuthProvider apagarDados={apagarDados}>{children}</AuthProvider>,
    });

    await act(async () => {
      authStateCallback?.({ uid: 'uid-7', email: 'f@a.com' });
    });
    expect(result.current.usuario).toEqual({ uid: 'uid-7', email: 'f@a.com' });

    await expect(result.current.excluirConta()).rejects.toThrow(
      'Por segurança, entre novamente para concluir esta ação.',
    );

    expect(apagarDados).toHaveBeenCalledWith('uid-7');
    // Trava o comportamento ATUAL (documentado na docstring do AuthProvider):
    // deleteUser falhar não limpa o `usuario` local — só onAuthStateChanged
    // faz isso — então a UI segue mostrando a pessoa logada mesmo com os
    // dados de servidor já apagados por `apagarDados`. É por isso que o
    // apagador injetado (Task 6) precisa ser idempotente: o retry após
    // reautenticar vai chamá-lo de novo sobre dados que já não existem.
    expect(result.current.usuario).toEqual({ uid: 'uid-7', email: 'f@a.com' });
  });
});
