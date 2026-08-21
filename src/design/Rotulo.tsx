import { Text, type TextStyle } from 'react-native';
import { useTema } from './ThemeContext';
import { fonte, tipo } from './tokens';

// Eyebrow/rótulo compartilhado: uppercase, tipo.tag, negrito, letterSpacing
// fixo (0.8) — usado em títulos de seção e badges de contexto (sistema ·
// capítulo, "Referências", progresso do quiz etc.). Não escala com a
// preferência de fonte: é rótulo, não texto de leitura.
export function Rotulo({ texto, cor, style }: { texto: string; cor?: string; style?: TextStyle }) {
  const { paleta } = useTema();
  return (
    <Text
      style={[
        {
          fontFamily: fonte.corpoBold,
          fontSize: tipo.tag,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: cor ?? paleta.acentoTinta,
        },
        style,
      ]}
    >
      {texto}
    </Text>
  );
}
