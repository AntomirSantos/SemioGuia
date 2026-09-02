import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Pressionavel } from '../design/movimento';
import { Check, ClipboardCheck, ListChecks } from 'lucide-react-native';
import { router } from 'expo-router';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type ChecklistBlocoTipo = Extract<Bloco, { tipo: 'checklist' }>;

export function ChecklistBloco({ bloco, topicoId }: { bloco: ChecklistBlocoTipo; topicoId?: string }) {
  const { paleta, escala } = useTema();
  const [marcados, setMarcados] = useState<boolean[]>(() => bloco.itens.map(() => false));

  const alternar = (i: number) => {
    setMarcados((atual) => atual.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.xl, ...sombra }}>
      <IdentidadeBloco Icone={ListChecks} rotulo="Checklist" />
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
            <View style={{ flex: 1 }}>
              <TextoRico
                style={{
                  fontSize: Math.round(tipo.corpo * escala),
                  color: checked ? paleta.tinta2 : paleta.tinta,
                  textDecorationLine: checked ? 'line-through' : 'none',
                }}
              >
                {item}
              </TextoRico>
            </View>
          </Pressable>
        );
      })}
      {bloco.titulo && topicoId ? (
        <Pressionavel
          accessibilityRole="button"
          onPress={() => router.push(`/estacao/${topicoId}?titulo=${encodeURIComponent(bloco.titulo)}`)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 44,
            marginTop: espaco.m,
            borderTopWidth: 1,
            borderTopColor: paleta.linha,
            paddingTop: espaco.m,
          }}
        >
          <ClipboardCheck size={16} color={paleta.acentoTinta} />
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.small, color: paleta.acentoTinta, marginLeft: espaco.xs + 2 }}>
            Praticar como estação
          </Text>
        </Pressionavel>
      ) : null}
    </View>
  );
}
