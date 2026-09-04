import { Text, View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { TextoRico } from './texto';

type ResumoBloco = Extract<Bloco, { tipo: 'resumo' }>;

// Fecho do tópico (didática 2026-09): exatamente três frases de saída — as
// que o leitor deve conseguir repetir amanhã. Identidade tipográfica de
// colofão: regra forte em tinta no topo (a separação por regras da casa),
// título em Bodoni e numerais vinho em display.
export function Resumo({ bloco }: { bloco: ResumoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginTop: espaco.xl, marginBottom: espaco.l }}>
      <View style={{ height: 2.5, backgroundColor: paleta.tinta, marginBottom: espaco.m }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h3 * escala),
          color: paleta.tinta,
          marginBottom: espaco.m,
        }}
      >
        Em três linhas
      </Text>
      {bloco.linhas.map((linha, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: i < bloco.linhas.length - 1 ? espaco.s : 0 }}>
          <Text
            style={{
              fontFamily: fonte.display,
              fontSize: Math.round(tipo.corpo * escala),
              lineHeight: Math.round(tipo.corpo * escala * 1.5),
              color: paleta.acentoTinta,
              width: 22,
            }}
          >
            {i + 1}.
          </Text>
          <View style={{ flex: 1 }}>
            <TextoRico
              style={{
                fontSize: Math.round(tipo.corpo * escala),
                lineHeight: Math.round(tipo.corpo * escala * 1.5),
                color: paleta.tinta,
              }}
            >
              {linha}
            </TextoRico>
          </View>
        </View>
      ))}
    </View>
  );
}
