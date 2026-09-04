import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useReducedMotion } from './useReducedMotion';
import { EASE_OUT_FORTE } from './movimento';

// Checkmark que se DESENHA (stroke-dashoffset, 300ms): a micro-recompensa
// visual do acerto e do fecho da revisão. Decorativo por definição: o texto
// ao lado é quem comunica; com movimento reduzido o check já aparece pronto.
const D = 'M 4 12.5 L 9.5 18 L 20 6';
const COMPRIMENTO = 26; // comprimento aproximado do traço, com folga
const DURACAO_MS = 300;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function CheckDesenhado({ cor, tamanho = 20 }: { cor: string; tamanho?: number }) {
  const reduzido = useReducedMotion();
  const semAnimacao = useRef(reduzido !== false).current;
  const progresso = useRef(new Animated.Value(semAnimacao ? 1 : 0)).current;

  useEffect(() => {
    if (semAnimacao) {
      progresso.setValue(1);
      return;
    }
    Animated.timing(progresso, {
      toValue: 1,
      duration: DURACAO_MS,
      easing: EASE_OUT_FORTE,
      // Props de SVG não passam pelo driver nativo.
      useNativeDriver: false,
    }).start();
    // Uma vez por montagem, deliberadamente (padrão de movimento.tsx).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" testID="check-desenhado">
      <AnimatedPath
        d={D}
        stroke={cor}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${COMPRIMENTO} ${COMPRIMENTO}`}
        strokeDashoffset={progresso.interpolate({ inputRange: [0, 1], outputRange: [COMPRIMENTO, 0] })}
      />
    </Svg>
  );
}
