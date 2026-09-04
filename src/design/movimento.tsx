import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useReducedMotion } from './useReducedMotion';

// Sistema de movimento Editorial R2 (DECISAO.md, valores literais):
// - ease-out forte: cubic-bezier(0.23, 1, 0.32, 1)
// - press: scale 0.98 em 120ms
// - entrada de tela/lista: translateY(8→0) + opacity em 250ms, stagger 40ms
// - regra de seção: desenha em scaleX 300ms (origem à esquerda)
// Apenas transform/opacity; com movimento reduzido mantém fades e zera
// translações/stagger (regra: nada de saber "onde" via movimento, mas o
// "quando" continua legível). Implementado com o Animated do RN: mesmo
// exemplar de EntradaAnimada.tsx, com useNativeDriver.
export const EASE_OUT_FORTE = Easing.bezier(0.23, 1, 0.32, 1);
export const DURACAO_PRESS_MS = 120;
export const DURACAO_ENTRADA_MS = 250;
export const DURACAO_REGRA_MS = 300;
export const STAGGER_MS = 40;
const ESCALA_PRESS = 0.98;
const DESLOCAMENTO_ENTRADA_PX = 8;
const DURACAO_FADE_REDUZIDO_MS = 200;

// Pressable com o feedback tátil padrão da identidade: o conteúdo encolhe a
// 0.98 em 120ms no press-in e volta no press-out. O estilo visual vai no
// Animated.View interno (para o transform não brigar com estilos do
// chamador); o Pressable externo é só a área de toque.
export function Pressionavel({
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}: Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const reduzido = useReducedMotion();
  const escala = useRef(new Animated.Value(1)).current;

  function animarPara(valor: number) {
    // `null` (preferência ainda não resolvida) conta como reduzido: nunca
    // animar antes de saber, mesma regra de EntradaAnimada.
    if (reduzido !== false) {
      escala.setValue(1);
      return;
    }
    Animated.timing(escala, {
      toValue: valor,
      duration: DURACAO_PRESS_MS,
      easing: EASE_OUT_FORTE,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable
      {...props}
      onPressIn={(e) => {
        animarPara(ESCALA_PRESS);
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        animarPara(1);
        onPressOut?.(e);
      }}
    >
      <Animated.View style={[style, { transform: [{ scale: escala }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

// Entrada de item em lista (home): translateY(8→0) + opacity 250ms com
// stagger de 40ms por índice. SÓ na montagem: o componente nunca reanima
// em re-render nem em troca de aba (as telas de Tabs permanecem montadas).
// Com movimento reduzido: fade curto sem deslocamento nem stagger.
export function EntradaEmLista({ indice, children }: { indice: number; children: ReactNode }) {
  const reduzido = useReducedMotion();
  const semDeslocamento = useRef(semMovimentoNaMontagem(reduzido)).current;
  const opacidade = useRef(new Animated.Value(0)).current;
  const deslocamento = useRef(new Animated.Value(semDeslocamento ? 0 : DESLOCAMENTO_ENTRADA_PX)).current;

  useEffect(() => {
    if (semDeslocamento) {
      deslocamento.setValue(0);
      Animated.timing(opacidade, {
        toValue: 1,
        duration: DURACAO_FADE_REDUZIDO_MS,
        useNativeDriver: true,
      }).start();
      return;
    }
    Animated.parallel([
      Animated.timing(opacidade, {
        toValue: 1,
        duration: DURACAO_ENTRADA_MS,
        delay: STAGGER_MS * (indice + 1),
        easing: EASE_OUT_FORTE,
        useNativeDriver: true,
      }),
      Animated.timing(deslocamento, {
        toValue: 0,
        duration: DURACAO_ENTRADA_MS,
        delay: STAGGER_MS * (indice + 1),
        easing: EASE_OUT_FORTE,
        useNativeDriver: true,
      }),
    ]).start();
    // Uma vez por montagem, deliberadamente (ver comentário do componente).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={{ opacity: opacidade, transform: [{ translateY: deslocamento }] }}>
      {children}
    </Animated.View>
  );
}

// Regra editorial de 2.5px que "se desenha" da esquerda para a direita em
// 300ms na montagem (scaleX 0→1, origem à esquerda). Com movimento reduzido
// a regra simplesmente já está lá, sem animação (ela é decorativa; o rótulo
// comunica sozinho).
export function RegraAnimada({ cor, altura = 2.5 }: { cor: string; altura?: number }) {
  const reduzido = useReducedMotion();
  const semAnimacao = useRef(semMovimentoNaMontagem(reduzido)).current;
  const escalaX = useRef(new Animated.Value(semAnimacao ? 1 : 0)).current;

  useEffect(() => {
    if (semAnimacao) {
      escalaX.setValue(1);
      return;
    }
    Animated.timing(escalaX, {
      toValue: 1,
      duration: DURACAO_REGRA_MS,
      easing: EASE_OUT_FORTE,
      useNativeDriver: true,
    }).start();
    // Uma vez por montagem, deliberadamente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        height: altura,
        backgroundColor: cor,
        transform: [{ scaleX: escalaX }],
        transformOrigin: 'left',
      }}
    />
  );
}

// `true` quando o movimento deve ser suprimido no PRIMEIRO frame desta
// montagem (`null` = ainda não sabemos → suprime; ver useReducedMotion).
// Congelado via useRef nos consumidores: a decisão de animar a entrada é da
// montagem, não muda no meio da animação.
function semMovimentoNaMontagem(reduzido: boolean | null): boolean {
  return reduzido !== false;
}
