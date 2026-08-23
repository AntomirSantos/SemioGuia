import { Text, type TextStyle } from 'react-native';
import { fonte } from '../design/tokens';

// converte "a **b** c" em segmentos com bold; parágrafos separados por \n\n
//
// Line-height de leitura confortável (spec Fase 8 §3.2): quando `style` traz
// um `fontSize` numérico e não define seu próprio `lineHeight`, aplicamos
// 1.5× por padrão — sem exigir que cada bloco repita a conta. Um `lineHeight`
// explícito em `style` continua vencendo (é o último item do array).
export function TextoRico({ children, style }: { children: string; style?: TextStyle }) {
  const paragrafos = children.trim().split(/\n{2,}/);
  const tamanho = typeof style?.fontSize === 'number' ? style.fontSize : undefined;
  const lineHeightPadrao = tamanho && style?.lineHeight === undefined ? Math.round(tamanho * 1.5) : undefined;
  return (
    <>
      {paragrafos.map((p, i) => (
        <Text key={i} style={[{ fontFamily: fonte.corpo, marginTop: i ? 8 : 0, lineHeight: lineHeightPadrao }, style]}>
          {p.split(/(\*\*[^*]+\*\*)/).map((seg, j) =>
            seg.startsWith('**')
              ? <Text key={j} style={{ fontFamily: fonte.corpoBold }}>{seg.slice(2, -2)}</Text>
              : seg,
          )}
        </Text>
      ))}
    </>
  );
}
