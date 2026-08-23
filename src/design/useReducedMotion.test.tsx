import { act, renderHook } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import { useReducedMotion } from './useReducedMotion';

// `jest.spyOn` sobre os métodos, não `jest.mock('react-native', ...)`: re-
// implementar o módulo inteiro reexecuta a inicialização nativa fora da
// ordem que o setup do jest-expo espera (quebra com TurboModuleRegistry —
// 'DevMenu' could not be found). Espiar preserva o módulo real e troca só o
// comportamento dos dois métodos usados pelo hook. Em jest-expo, Platform.OS
// não é 'web', então o hook usa o ramo nativo (isReduceMotionEnabled +
// addEventListener), o mesmo que o revisor sinalizou como só lido, não
// testado (T1 P2).
//
// `act(async () => {...})` sempre com `await`: neste setup, mesmo uma
// atualização de estado síncrona só assenta em `result.current` dentro de um
// act assíncrono aguardado — confirmado isolando um hook de brinquedo antes
// de escrever os testes reais.
describe('useReducedMotion', () => {
  const remove = jest.fn();
  let isReduceMotionEnabled: jest.SpyInstance;
  let addEventListener: jest.SpyInstance;

  beforeEach(() => {
    remove.mockClear();
    isReduceMotionEnabled = jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled');
    addEventListener = jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove } as never);
  });

  afterEach(() => {
    isReduceMotionEnabled.mockRestore();
    addEventListener.mockRestore();
  });

  test('valor inicial reflete isReduceMotionEnabled assim que a promise resolve', async () => {
    isReduceMotionEnabled.mockResolvedValue(true);
    const { result } = await renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  test('reflete false quando isReduceMotionEnabled resolve false', async () => {
    isReduceMotionEnabled.mockResolvedValue(false);
    const { result } = await renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  test('atualiza quando o evento reduceMotionChanged dispara', async () => {
    isReduceMotionEnabled.mockResolvedValue(false);
    let callback: ((valor: boolean) => void) | undefined;
    addEventListener.mockImplementation((_evento: string, cb: (valor: boolean) => void) => {
      callback = cb;
      return { remove };
    });

    const { result } = await renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    await act(async () => {
      callback?.(true);
    });
    expect(result.current).toBe(true);

    await act(async () => {
      callback?.(false);
    });
    expect(result.current).toBe(false);
  });

  test('remove o listener de acessibilidade ao desmontar', async () => {
    isReduceMotionEnabled.mockResolvedValue(false);
    const { unmount } = await renderHook(() => useReducedMotion());

    expect(remove).not.toHaveBeenCalled();
    await act(async () => {
      unmount();
    });
    expect(remove).toHaveBeenCalledTimes(1);
  });
});
