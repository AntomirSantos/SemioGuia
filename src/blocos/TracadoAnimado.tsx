import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { useReducedMotion } from '../design/useReducedMotion';

// Traçado temporal (didática 2026-09): semiologia é temporal, sopros no
// ciclo cardíaco, ondas de pulso, padrões respiratórios, mas ilustração é
// estática. Aqui o traçado marcado se DESENHA no tempo (stroke-dashoffset),
// devolvendo ao fenômeno a dimensão que o papel tirou.
//
// Convenção de conteúdo: dentro do SVG do bloco `ilustracao`, os paths
// temporais recebem `id="anima-1"`, `id="anima-2"`, … A ordem numérica é a
// ordem do desenho; todo o resto do SVG (eixos, rótulos, guias) permanece
// estático. Com movimento reduzido, a ilustração original é renderizada
// inteira, sem animação: o traçado completo comunica sozinho.

const AnimatedPath = Animated.createAnimatedComponent(Path);

// Velocidade constante de desenho, em unidades de viewBox por segundo: o
// traçado corre como pena sobre papel, sem acelerar nos trechos longos.
const VELOCIDADE_UN_POR_S = 220;
const DURACAO_MIN_MS = 1200;
const DURACAO_MAX_MS = 6000;
const PAUSA_ENTRE_CICLOS_MS = 1400;

export interface TracadoTemporal {
  d: string;
  strokeWidth: number;
  comprimento: number;
  // Fração do ciclo [0..1] em que este path começa/termina a se desenhar.
  inicio: number;
  fim: number;
}

export interface SvgAnimado {
  viewBox: string;
  aspectRatio: number;
  svgBase: string;
  tracados: TracadoTemporal[];
  duracaoMs: number;
}

// Comprimento aproximado de um path com comandos absolutos M/L/Q/C: o
// repertório inteiro das ilustrações deste guia. Curvas são amostradas em
// segmentos retos (erro irrelevante para calibrar um dasharray).
export function comprimentoDoPath(d: string): number {
  const tokens = d.match(/[MLQC]|-?\d*\.?\d+/g);
  if (!tokens) return 0;
  let i = 0;
  let x = 0;
  let y = 0;
  let total = 0;
  const AMOSTRAS = 16;
  const num = () => parseFloat(tokens[i++]);
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M') {
      x = num();
      y = num();
    } else if (cmd === 'L') {
      const nx = num();
      const ny = num();
      total += Math.hypot(nx - x, ny - y);
      x = nx;
      y = ny;
    } else if (cmd === 'Q') {
      const cx = num();
      const cy = num();
      const nx = num();
      const ny = num();
      let px = x;
      let py = y;
      for (let k = 1; k <= AMOSTRAS; k++) {
        const t = k / AMOSTRAS;
        const u = 1 - t;
        const qx = u * u * x + 2 * u * t * cx + t * t * nx;
        const qy = u * u * y + 2 * u * t * cy + t * t * ny;
        total += Math.hypot(qx - px, qy - py);
        px = qx;
        py = qy;
      }
      x = nx;
      y = ny;
    } else if (cmd === 'C') {
      const c1x = num();
      const c1y = num();
      const c2x = num();
      const c2y = num();
      const nx = num();
      const ny = num();
      let px = x;
      let py = y;
      for (let k = 1; k <= AMOSTRAS; k++) {
        const t = k / AMOSTRAS;
        const u = 1 - t;
        const qx = u * u * u * x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * nx;
        const qy = u * u * u * y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * ny;
        total += Math.hypot(qx - px, qy - py);
        px = qx;
        py = qy;
      }
      x = nx;
      y = ny;
    }
  }
  return total;
}

const RAZAO_PADRAO = 16 / 9;

export function analisarSvgAnimado(svg: string): SvgAnimado | null {
  const vbMatch = svg.match(/viewBox=["']\s*([\d.-]+\s+[\d.-]+\s+[\d.]+\s+[\d.]+)\s*["']/);
  if (!vbMatch) return null;
  const viewBox = vbMatch[1].trim();
  const partes = viewBox.split(/\s+/).map(parseFloat);
  const aspectRatio = partes[2] && partes[3] ? partes[2] / partes[3] : RAZAO_PADRAO;

  const brutos: { ordem: number; d: string; strokeWidth: number }[] = [];
  const regex = /<path\b[^>]*\bid="anima-(\d+)"[^>]*\/>/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(svg)) !== null) {
    const tag = m[0];
    const dMatch = tag.match(/\bd="([^"]+)"/);
    if (!dMatch) continue;
    const swMatch = tag.match(/stroke-width="([\d.]+)"/);
    brutos.push({ ordem: parseInt(m[1], 10), d: dMatch[1], strokeWidth: swMatch ? parseFloat(swMatch[1]) : 2 });
  }
  if (brutos.length === 0) return null;
  brutos.sort((a, b) => a.ordem - b.ordem);

  const comprimentos = brutos.map((b) => comprimentoDoPath(b.d));
  const total = comprimentos.reduce((s, c) => s + c, 0);
  if (total <= 0) return null;

  let acumulado = 0;
  const tracados: TracadoTemporal[] = brutos.map((b, idx) => {
    const inicio = acumulado / total;
    acumulado += comprimentos[idx];
    return { d: b.d, strokeWidth: b.strokeWidth, comprimento: comprimentos[idx], inicio, fim: acumulado / total };
  });

  // A base esconde os paths temporais (opacity 0) mas os mantém no lugar: 
  // layout e acessibilidade idênticos; o overlay é quem os desenha.
  const svgBase = svg.replace(/<path\b([^>]*\bid="anima-\d+"[^>]*)\/>/g, '<path opacity="0" $1/>');

  const duracaoMs = Math.min(DURACAO_MAX_MS, Math.max(DURACAO_MIN_MS, (total / VELOCIDADE_UN_POR_S) * 1000));
  return { viewBox, aspectRatio, svgBase, tracados, duracaoMs };
}

export function TracadoAnimado({ svg, cor }: { svg: string; cor: string }) {
  const reduzido = useReducedMotion();
  const dados = useMemo(() => analisarSvgAnimado(svg), [svg]);
  const progresso = useRef(new Animated.Value(0)).current;
  const animar = reduzido === false && dados !== null;

  useEffect(() => {
    if (!animar || !dados) {
      progresso.setValue(1);
      return;
    }
    progresso.setValue(0);
    const ciclo = Animated.loop(
      Animated.sequence([
        Animated.timing(progresso, {
          toValue: 1,
          duration: dados.duracaoMs,
          easing: Easing.linear,
          // Props de SVG não passam pelo driver nativo: animação em JS.
          useNativeDriver: false,
        }),
        Animated.delay(PAUSA_ENTRE_CICLOS_MS),
      ]),
    );
    ciclo.start();
    return () => ciclo.stop();
    // Reanima apenas quando a preferência de movimento ou o SVG mudam.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animar, dados]);

  // Sem marcadores ou com movimento reduzido: a ilustração original, inteira.
  if (!animar || !dados) {
    const aspectRatio = dados?.aspectRatio ?? RAZAO_PADRAO;
    return <SvgXml xml={svg} width="100%" style={{ aspectRatio }} color={cor} />;
  }

  return (
    <View style={{ width: '100%', aspectRatio: dados.aspectRatio }}>
      <SvgXml xml={dados.svgBase} width="100%" height="100%" color={cor} />
      <Svg viewBox={dados.viewBox} style={StyleSheet.absoluteFill} color={cor} pointerEvents="none">
        {dados.tracados.map((t, i) => (
          <AnimatedPath
            key={i}
            d={t.d}
            stroke="currentColor"
            strokeWidth={t.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${t.comprimento} ${t.comprimento}`}
            strokeDashoffset={progresso.interpolate({
              inputRange: [t.inicio, Math.max(t.fim, t.inicio + 1e-6)],
              outputRange: [t.comprimento, 0],
              extrapolate: 'clamp',
            })}
          />
        ))}
      </Svg>
    </View>
  );
}
