import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { TextoRico } from './texto';

type PerolaBloco = Extract<Bloco, { tipo: 'perola' }>;

export function Perola({ bloco }: { bloco: PerolaBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        backgroundColor: paleta.perolaFundo,
        borderWidth: 1,
        borderColor: paleta.perolaBorda,
        borderRadius: raio.l,
        paddingVertical: espaco.l + 2,
        paddingHorizontal: espaco.xl + 2,
        marginVertical: espaco.m,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.perolaTexto, marginBottom: espaco.xs + 2 }}>
        Pérola clínica
      </Text>
      <TextoRico style={{ fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{bloco.texto}</TextoRico>
    </View>
  );
}
