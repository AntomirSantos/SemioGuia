const mockInitializeApp = jest.fn((...args: unknown[]) => ({ name: '[DEFAULT]' }));
const mockGetAuth = jest.fn((...args: unknown[]) => ({}));
const mockGetFirestore = jest.fn((...args: unknown[]) => ({}));

// A SDK real do Firebase nunca roda em teste: mockamos os três subpacotes
// usados por firebaseApp.ts (firebase/auth e firebase/firestore publicam
// apenas builds ESM, que o transform do jest-expo não processa).
jest.mock('firebase/app', () => ({
  initializeApp: (...args: unknown[]) => mockInitializeApp(...args),
}));
jest.mock('firebase/auth', () => ({
  getAuth: (...args: unknown[]) => mockGetAuth(...args),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: (...args: unknown[]) => mockGetFirestore(...args),
}));

import { obterApp, obterAuth, obterDb, syncDisponivel, _setConfigParaTeste } from './firebaseApp';

const CONFIG_FALSA = {
  apiKey: 'chave-falsa',
  authDomain: 'falso.firebaseapp.com',
  projectId: 'falso',
  appId: '1:falso:web:falso',
};

afterEach(() => {
  mockInitializeApp.mockClear();
  mockGetAuth.mockClear();
  mockGetFirestore.mockClear();
  _setConfigParaTeste(null);
});

test('syncDisponivel() é false quando não há config (padrão committado é null)', () => {
  expect(syncDisponivel()).toBe(false);
});

test('obterApp() lança "Sincronização não configurada" quando a config é null', () => {
  expect(() => obterApp()).toThrow('Sincronização não configurada');
});

test('obterAuth() lança "Sincronização não configurada" quando a config é null', () => {
  expect(() => obterAuth()).toThrow('Sincronização não configurada');
});

test('obterDb() lança "Sincronização não configurada" quando a config é null', () => {
  expect(() => obterDb()).toThrow('Sincronização não configurada');
});

test('com config injetada, syncDisponivel() passa a ser true', () => {
  _setConfigParaTeste(CONFIG_FALSA);
  expect(syncDisponivel()).toBe(true);
});

test('obterApp() chama initializeApp uma única vez; segunda chamada reusa a instância', () => {
  _setConfigParaTeste(CONFIG_FALSA);

  const primeira = obterApp();
  const segunda = obterApp();

  expect(mockInitializeApp).toHaveBeenCalledTimes(1);
  expect(mockInitializeApp).toHaveBeenCalledWith(CONFIG_FALSA);
  expect(segunda).toBe(primeira);
});

test('obterAuth() chama getAuth uma única vez; segunda chamada reusa a instância', () => {
  _setConfigParaTeste(CONFIG_FALSA);

  const primeira = obterAuth();
  const segunda = obterAuth();

  expect(mockGetAuth).toHaveBeenCalledTimes(1);
  expect(segunda).toBe(primeira);
});

test('obterDb() chama getFirestore uma única vez; segunda chamada reusa a instância', () => {
  _setConfigParaTeste(CONFIG_FALSA);

  const primeira = obterDb();
  const segunda = obterDb();

  expect(mockGetFirestore).toHaveBeenCalledTimes(1);
  expect(segunda).toBe(primeira);
});
