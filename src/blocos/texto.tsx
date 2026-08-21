import { Text, type TextStyle } from 'react-native';
import { fonte } from '../design/tokens';

// converte "a **b** c" em segmentos com bold; parágrafos separados por \n\n
export function TextoRico({ children, style }: { children: string; style?: TextStyle }) {
  const paragrafos = children.trim().split(/\n{2,}/);
  return (
    <>
      {paragrafos.map((p, i) => (
        <Text key={i} style={[{ fontFamily: fonte.corpo, marginTop: i ? 8 : 0 }, style]}>
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
