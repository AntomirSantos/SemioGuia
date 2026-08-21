import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { TextoRico } from './texto';

type ManobraBloco = Extract<Bloco, { tipo: 'manobra' }>;

export function Manobra({ bloco }: { bloco: ManobraBloco }) {
  const { paleta, escala } = useTema();
  const corpo = Math.round(tipo.corpo * escala);
  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.m, ...sombra }}>
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.acentoTinta, marginBottom: espaco.xs + 2 }}>
        Manobra
      </Text>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
        {bloco.titulo}
      </Text>
      {bloco.passos.map((passo, i) => (
        <View
          key={i}
          style={{ flexDirection: 'row', alignItems: 'flex-start', paddingVertical: espaco.s, borderTopWidth: i ? 1 : 0, borderTopColor: paleta.linha }}
        >
          <View style={{ width: 28, height: 28, borderRadius: 9, backgroundColor: paleta.superficie2, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.small, color: paleta.acentoTinta }}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: espaco.m }}>
            <TextoRico style={{ fontSize: corpo, color: paleta.tinta }}>{passo}</TextoRico>
          </View>
        </View>
      ))}
      {bloco.observar ? (
        <View style={{ backgroundColor: paleta.superficie2, borderRadius: raio.m, padding: espaco.m, marginTop: espaco.m }}>
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.acentoTinta, marginBottom: 2 }}>
            O que observar
          </Text>
          <TextoRico style={{ fontSize: corpo, color: paleta.tinta }}>{bloco.observar}</TextoRico>
        </View>
      ) : null}
    </View>
  );
}
