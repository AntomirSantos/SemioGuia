import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

// Spec Fase 8 §3.4: transições curtas respeitam a preferência de movimento
// reduzido do usuário. Na web não existe AccessibilityInfo.isReduceMotionEnabled
// (a API nativa não é implementada nesse ambiente), então lemos
// `prefers-reduced-motion` via matchMedia; no nativo (iOS/Android) usamos a
// API de acessibilidade do RN, com assinatura para mudanças em tempo real.
//
// Resolução SÍNCRONA sempre que possível (re-revisão de fase: inicializar em
// `null` e resolver um tick depois matava a animação de entrada em todo
// lugar — os Animated.Values nasciam no estado "sem animação" e a resolução
// posterior animava 1→1, um no-op):
// - web: matchMedia é síncrono — o valor inicial já sai resolvido no
//   useState, nunca `null`.
// - nativo: a primeira montagem do app não tem como saber síncrono (a API é
//   uma promise) e fica `null` → consumidores tratam como "reduzir" (nunca
//   animar antes de saber). O resultado resolvido fica num cache de módulo,
//   então TODAS as montagens seguintes já iniciam com o valor certo e
//   animam normalmente.
let cacheNativo: boolean | null = null;

// Só para testes: o cache de módulo persiste entre testes do mesmo arquivo.
export function _resetReducedMotionCacheParaTeste() {
  cacheNativo = null;
}

function valorInicial(): boolean | null {
  if (Platform.OS === 'web') {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return cacheNativo;
}

export function useReducedMotion(): boolean | null {
  const [reduzido, setReduzido] = useState<boolean | null>(valorInicial);

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
        cacheNativo = valor;
        if (montado) setReduzido(valor);
      })
      .catch(() => {});
    const assinatura = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (valor: boolean) => {
      cacheNativo = valor;
      if (montado) setReduzido(valor);
    });
    return () => {
      montado = false;
      assinatura?.remove?.();
    };
  }, []);

  return reduzido;
}
