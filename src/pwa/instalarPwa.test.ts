import {
  DISPENSA_MS,
  detectarPlataformaWeb,
  deveMostrarAviso,
  estaInstalada,
  instrucaoDeInstalacao,
} from './instalarPwa';

const UA_IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
const UA_ANDROID =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36';
const UA_DESKTOP = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

test('detectarPlataformaWeb distingue iOS, Android e o resto', () => {
  expect(detectarPlataformaWeb(UA_IPHONE)).toBe('ios');
  expect(detectarPlataformaWeb(UA_ANDROID)).toBe('android');
  expect(detectarPlataformaWeb(UA_DESKTOP)).toBe('outra');
});

test('estaInstalada aceita qualquer um dos dois sinais', () => {
  expect(estaInstalada({ displayModeStandalone: true, navigatorStandalone: false })).toBe(true);
  expect(estaInstalada({ displayModeStandalone: false, navigatorStandalone: true })).toBe(true);
  expect(estaInstalada({ displayModeStandalone: false, navigatorStandalone: false })).toBe(false);
});

describe('deveMostrarAviso', () => {
  const base = { ehWeb: true, instalada: false, dispensadoEm: null, agora: 1_000_000_000 };

  test('mostra na web, não instalada, sem dispensa', () => {
    expect(deveMostrarAviso(base)).toBe(true);
  });

  test('nunca fora da web nem quando já instalada', () => {
    expect(deveMostrarAviso({ ...base, ehWeb: false })).toBe(false);
    expect(deveMostrarAviso({ ...base, instalada: true })).toBe(false);
  });

  test('dispensa vale exatamente 7 dias', () => {
    expect(deveMostrarAviso({ ...base, dispensadoEm: base.agora - DISPENSA_MS + 1 })).toBe(false);
    expect(deveMostrarAviso({ ...base, dispensadoEm: base.agora - DISPENSA_MS })).toBe(true);
  });
});

test('instruções nomeiam o gesto de cada plataforma', () => {
  expect(instrucaoDeInstalacao('ios')).toContain('Adicionar à Tela de Início');
  expect(instrucaoDeInstalacao('android')).toContain('Instalar app');
  expect(instrucaoDeInstalacao('outra')).toContain('menu do navegador');
});
