import { useEffect, useRef, type ReactNode } from 'react';
import { Animated } from 'react-native';
import { useReducedMotion } from './useReducedMotion';

const DURACAO_MS = 200; // dentro da janela 180–220ms da spec Fase 8 §3.4
const DESLOCAMENTO_PX = 8;

// Fade + leve deslize na entrada de conteúdo que troca: seção ativa (chave
// muda a cada navegação) e conteúdo revelado pelo "Aprofundar" (monta uma
// vez, ao abrir). Cada instância anima uma única vez, do próprio mount — o
// chamador força uma nova animação passando um `key` diferente. Com
// movimento reduzido (spec §3.4), o conteúdo aparece direto, sem animação.
//
// `useReducedMotion()` retorna `null` até resolver no nativo — tratamos
// `null` como "reduzir" (padrão mais seguro: revisão de fase pegou a
// animação disparando otimista com `false` nesse intervalo, antes de saber
// se o usuário pediu movimento reduzido de verdade). Só anima quando a
// preferência já foi confirmada como `false`.
export function EntradaAnimada({ children, eixo = 'y' }: { children: ReactNode; eixo?: 'x' | 'y' }) {
  const reduzido = useReducedMotion();
  const semAnimacao = reduzido !== false;
  const opacidade = useRef(new Animated.Value(semAnimacao ? 1 : 0)).current;
  const deslocamento = useRef(new Animated.Value(semAnimacao ? 0 : DESLOCAMENTO_PX)).current;

  useEffect(() => {
    if (semAnimacao) {
      opacidade.setValue(1);
      deslocamento.setValue(0);
      return;
    }
    Animated.parallel([
      Animated.timing(opacidade, { toValue: 1, duration: DURACAO_MS, useNativeDriver: true }),
      Animated.timing(deslocamento, { toValue: 0, duration: DURACAO_MS, useNativeDriver: true }),
    ]).start();
    // Roda uma vez por montagem desta instância; o chamador troca o `key`
    // para disparar uma nova animação em vez de reanimar em cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semAnimacao]);

  const transform = eixo === 'x' ? [{ translateX: deslocamento }] : [{ translateY: deslocamento }];
  return <Animated.View style={{ opacity: opacidade, transform }}>{children}</Animated.View>;
}
