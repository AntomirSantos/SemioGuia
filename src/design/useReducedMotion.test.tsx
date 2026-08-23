import { act, renderHook } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import { _resetReducedMotionCacheParaTeste, useReducedMotion } from './useReducedMotion';

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
    _resetReducedMotionCacheParaTeste();
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

  // Fase 8, revisão de fase (A7): antes da promise de isReduceMotionEnabled
  // resolver, o hook devolvia `false` "otimista" — EntradaAnimada podia
  // animar antes de saber se o usuário pediu movimento reduzido de verdade.
  // Na PRIMEIRA montagem nativa do app começa `null` (preferência
  // desconhecida) e os consumidores tratam como "reduzir" (padrão seguro).
  test('valor inicial é null até isReduceMotionEnabled resolver (primeira montagem)', async () => {
    let resolver: (valor: boolean) => void = () => {};
    isReduceMotionEnabled.mockReturnValue(
      new Promise<boolean>((resolve) => {
        resolver = resolve;
      }),
    );

    const { result } = await renderHook(() => useReducedMotion());
    expect(result.current).toBeNull();

    await act(async () => {
      resolver(true);
    });
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

  // Fase 8, re-revisão de fase: inicializar sempre em `null` matava a
  // animação de entrada — os Animated.Values nasciam no estado "sem
  // animação" e a resolução posterior animava 1→1 (no-op). O valor
  // resolvido fica num cache de módulo: montagens seguintes já iniciam
  // resolvidas e a animação toca de verdade.
  test('montagens seguintes iniciam com o valor do cache, sem passar por null', async () => {
    isReduceMotionEnabled.mockResolvedValue(false);
    const primeira = await renderHook(() => useReducedMotion());
    expect(primeira.result.current).toBe(false);
    await act(async () => {
      primeira.unmount();
    });

    let resolver: (valor: boolean) => void = () => {};
    isReduceMotionEnabled.mockReturnValue(
      new Promise<boolean>((resolve) => {
        resolver = resolve;
      }),
    );
    const segunda = await renderHook(() => useReducedMotion());
    expect(segunda.result.current).toBe(false);
    await act(async () => {
      resolver(false);
    });
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
