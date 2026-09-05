import { Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';

// Item de checklist marcável, compartilhado pela aba Checklists e pelo
// exame completo: caixa que vira acento ao marcar, texto que esmaece.
export function ItemMarcavel({ texto, marcado, onToggle }: { texto: string; marcado: boolean; onToggle: () => void }) {
  const { paleta, escala } = useTema();
  const small = Math.round(tipo.small * escala);
  return (
    <Pressionavel
      accessibilityRole="checkbox"
      accessibilityState={{ checked: marcado }}
      accessibilityLabel={texto}
      onPress={onToggle}
      style={{ flexDirection: 'row', alignItems: 'flex-start', minHeight: 44, paddingVertical: espaco.xs }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: raio.s,
          borderWidth: 1.5,
          borderColor: marcado ? paleta.acento : paleta.linha,
          backgroundColor: marcado ? paleta.acento : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: espaco.m,
          marginTop: 2,
        }}
      >
        {marcado ? <Check size={15} color={paleta.superficie} strokeWidth={3} /> : null}
      </View>
      <Text
        android_hyphenationFrequency="full"
        style={{
          flex: 1,
          fontFamily: fonte.corpo,
          fontSize: small,
          lineHeight: Math.round(small * 1.5),
          color: marcado ? paleta.tinta2 : paleta.tinta,
          textAlign: 'justify',
        }}
      >
        {texto}
      </Text>
    </Pressionavel>
  );
}
