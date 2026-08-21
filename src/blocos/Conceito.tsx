import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { TextoRico } from './texto';

type ConceitoBloco = Extract<Bloco, { tipo: 'conceito' }>;

// Bloco de conceito não leva card nem tag: é prosa corrida, como no mockup aprovado.
export function Conceito({ bloco }: { bloco: ConceitoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginVertical: espaco.m }}>
      {bloco.titulo ? (
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
          {bloco.titulo}
        </Text>
      ) : null}
      <TextoRico style={{ fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, lineHeight: Math.round(tipo.corpo * escala * 1.5) }}>
        {bloco.texto}
      </TextoRico>
    </View>
  );
}
