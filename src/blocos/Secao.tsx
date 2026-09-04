import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';

type SecaoBloco = Extract<Bloco, { tipo: 'secao' }>;

// Cabeçalho de seção: divide compartimentos dentro de um tópico. Identidade
// editorial R2: uma REGRA de 2.5px em tinta acima do título em Bodoni: a
// mesma linguagem de regras tipográficas dos rótulos de seção da home.
export function Secao({ bloco }: { bloco: SecaoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginTop: espaco.xxl + espaco.m, marginBottom: espaco.s }}>
      <View style={{ height: 2.5, backgroundColor: paleta.tinta, marginBottom: espaco.s }} />
      <Text
        accessibilityRole="header"
        style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.secao * escala), color: paleta.tinta }}
      >
        {bloco.titulo}
      </Text>
    </View>
  );
}
