import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { CircleHelp } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type PenseBloco = Extract<Bloco, { tipo: 'pense' }>;

// Recuperação ativa no meio da leitura (didática 2026-09): uma pergunta de
// uma linha com a resposta recolhida. O leitor responde de cabeça e só então
// confere — o ganho pedagógico está na tentativa, por isso a resposta nunca
// vem aberta. Wash de papel (superficie2) para interromper a prosa sem
// virar cartão sombreado; a resposta entra com a transição curta da casa.
export function Pense({ bloco }: { bloco: PenseBloco }) {
  const { paleta, escala } = useTema();
  const [revelada, setRevelada] = useState(false);

  return (
    <View
      style={{
        backgroundColor: paleta.superficie2,
        borderRadius: raio.m,
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        marginVertical: espaco.xl,
      }}
    >
      <IdentidadeBloco Icone={CircleHelp} rotulo="Pense antes de seguir" />
      <TextoRico
        style={{
          fontFamily: fonte.leituraSemi,
          fontSize: Math.round(tipo.corpo * escala),
          lineHeight: Math.round(tipo.corpo * escala * 1.5),
          color: paleta.tinta,
        }}
      >
        {bloco.pergunta}
      </TextoRico>
      {revelada ? (
        <EntradaAnimada>
          <View style={{ marginTop: espaco.s, borderTopWidth: 1, borderTopColor: paleta.linha, paddingTop: espaco.s }}>
            <TextoRico
              style={{
                fontSize: Math.round(tipo.corpo * escala),
                lineHeight: Math.round(tipo.corpo * escala * 1.5),
                color: paleta.tinta,
              }}
            >
              {bloco.resposta}
            </TextoRico>
          </View>
        </EntradaAnimada>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: false }}
          onPress={() => setRevelada(true)}
          style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
        >
          <Text
            style={{
              fontFamily: fonte.corpoBold,
              fontSize: tipo.tag,
              letterSpacing: 1.1,
              textTransform: 'uppercase',
              color: paleta.acentoTinta,
            }}
          >
            Mostrar resposta
          </Text>
        </Pressable>
      )}
    </View>
  );
}
