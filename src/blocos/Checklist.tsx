import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';

type ChecklistBlocoTipo = Extract<Bloco, { tipo: 'checklist' }>;

export function ChecklistBloco({ bloco }: { bloco: ChecklistBlocoTipo }) {
  const { paleta, escala } = useTema();
  const [marcados, setMarcados] = useState<boolean[]>(() => bloco.itens.map(() => false));

  const alternar = (i: number) => {
    setMarcados((atual) => atual.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.m }}>
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.acentoTinta, marginBottom: espaco.xs + 2 }}>
        Checklist
      </Text>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
        {bloco.titulo}
      </Text>
      {bloco.itens.map((item, i) => {
        const checked = marcados[i];
        return (
          <Pressable
            key={i}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            onPress={() => alternar(i)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              minHeight: 44,
              paddingVertical: espaco.s,
              borderTopWidth: i ? 1 : 0,
              borderTopColor: paleta.linha,
            }}
          >
            <View
              style={{
                width: 19,
                height: 19,
                borderRadius: 4,
                borderWidth: 1.5,
                borderColor: checked ? paleta.acento : paleta.linha,
                backgroundColor: checked ? paleta.acento : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: espaco.m,
              }}
            >
              {checked ? <Check size={14} color={paleta.superficie} strokeWidth={3} /> : null}
            </View>
            <Text
              style={{
                flex: 1,
                fontFamily: fonte.corpo,
                fontSize: Math.round(tipo.corpo * escala),
                color: checked ? paleta.tinta2 : paleta.tinta,
                textDecorationLine: checked ? 'line-through' : 'none',
              }}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
