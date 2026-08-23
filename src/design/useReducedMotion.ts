import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

// Spec Fase 8 §3.4: transições curtas respeitam a preferência de movimento
// reduzido do usuário. Na web não existe AccessibilityInfo.isReduceMotionEnabled
// (a API nativa não é implementada nesse ambiente), então lemos
// `prefers-reduced-motion` via matchMedia (síncrono); no nativo (iOS/Android)
// usamos a API de acessibilidade do RN, com assinatura para mudanças em
// tempo real (o usuário pode alternar a preferência com o app aberto).
//
// `null` = preferência ainda não resolvida (só ocorre no nativo, entre o
// mount e a promise de `isReduceMotionEnabled` resolver). Consumidores
// devem tratar `null` como "reduzir" — o padrão mais seguro: nunca anima
// antes de saber se pode (fase de revisão: EntradaAnimada animava com
// `false` "otimista" nesse intervalo).
export function useReducedMotion(): boolean | null {
  const [reduzido, setReduzido] = useState<boolean | null>(null);

  useEffect(() => {
    let montado = true;

    if (Platform.OS === 'web') {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
      const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
      const atualizar = () => {
        if (montado) setReduzido(consulta.matches);
      };
      atualizar();
      consulta.addEventListener?.('change', atualizar);
      return () => {
        montado = false;
        consulta.removeEventListener?.('change', atualizar);
      };
    }

    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((valor) => {
        if (montado) setReduzido(valor);
      })
      .catch(() => {});
    const assinatura = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (valor: boolean) => {
      if (montado) setReduzido(valor);
    });
    return () => {
      montado = false;
      assinatura?.remove?.();
    };
  }, []);

  return reduzido;
}
