import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';

type SecaoBloco = Extract<Bloco, { tipo: 'secao' }>;

// Cabeçalho de seção: divide compartimentos dentro de um tópico. Não é um
// cartão — só um filete de acento à esquerda e uma margem generosa acima,
// para marcar visualmente onde um bloco de conteúdo termina e o próximo
// começa.
export function Secao({ bloco }: { bloco: SecaoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', marginTop: espaco.xxl + espaco.m, marginBottom: espaco.s }}>
      <View style={{ width: 3, backgroundColor: paleta.acento, borderRadius: 2, marginRight: espaco.m }} />
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, flex: 1 }}>
        {bloco.titulo}
      </Text>
    </View>
  );
}
