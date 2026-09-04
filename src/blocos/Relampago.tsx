import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Zap } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type RelampagoBloco = Extract<Bloco, { tipo: 'relampago' }>;

// Caso-relâmpago (didática 2026-09): um parágrafo-caso com decisão única ao
// fim do tópico — sem ramificação, só a escolha e o desfecho. Faz a ponte
// entre a leitura e os casos clínicos grandes. Como no pense, o ganho está
// na tentativa: o desfecho só aparece depois da escolha, e a escolha é
// definitiva dentro da sessão de leitura (errar também ensina).
export function Relampago({ bloco }: { bloco: RelampagoBloco }) {
  const { paleta, escala } = useTema();
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const decidido = escolhida !== null;
  const corpo = Math.round(tipo.corpo * escala);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.m,
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        marginVertical: espaco.xl,
        backgroundColor: paleta.superficie,
      }}
    >
      <IdentidadeBloco Icone={Zap} rotulo="Caso-relâmpago" />
      <TextoRico
        style={{
          fontFamily: fonte.leituraItalico,
          fontSize: corpo,
          lineHeight: Math.round(corpo * 1.55),
          color: paleta.tinta,
        }}
      >
        {bloco.caso}
      </TextoRico>
      <View style={{ marginTop: espaco.s }}>
        <TextoRico
          style={{
            fontFamily: fonte.leituraSemi,
            fontSize: corpo,
            lineHeight: Math.round(corpo * 1.5),
            color: paleta.tinta,
          }}
        >
          {bloco.pergunta}
        </TextoRico>
      </View>
      <View style={{ marginTop: espaco.s }}>
        {bloco.opcoes.map((opcao, i) => {
          const correta = i === bloco.corretaIndex;
          const marcada = escolhida === i;
          const destaque = decidido && (correta || marcada);
          return (
            <Pressable
              key={i}
              accessibilityRole="button"
              accessibilityState={{ disabled: decidido, selected: marcada }}
              disabled={decidido}
              onPress={() => setEscolhida(i)}
              style={{
                minHeight: 44,
                justifyContent: 'center',
                paddingVertical: espaco.xs,
                paddingHorizontal: espaco.s,
                marginBottom: espaco.xs,
                borderRadius: raio.s,
                borderWidth: 1,
                borderColor: destaque ? (correta ? paleta.acentoTinta : paleta.tinta2) : paleta.linha,
                backgroundColor: decidido && correta ? paleta.superficie2 : paleta.superficie,
                opacity: decidido && !destaque ? 0.55 : 1,
              }}
            >
              <Text
                style={{
                  fontFamily: decidido && correta ? fonte.leituraSemi : fonte.leitura,
                  fontSize: corpo,
                  lineHeight: Math.round(corpo * 1.4),
                  color: paleta.tinta,
                }}
              >
                {decidido ? (correta ? '✓ ' : marcada ? '✗ ' : '') : ''}
                {opcao}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {decidido ? (
        <EntradaAnimada>
          <View style={{ marginTop: espaco.xs, borderTopWidth: 1, borderTopColor: paleta.linha, paddingTop: espaco.s }}>
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: tipo.tag,
                letterSpacing: 1.1,
                textTransform: 'uppercase',
                color: paleta.acentoTinta,
                marginBottom: espaco.xs,
              }}
            >
              {escolhida === bloco.corretaIndex ? 'Boa decisão' : 'O desfecho ensina'}
            </Text>
            <TextoRico
              style={{ fontSize: corpo, lineHeight: Math.round(corpo * 1.5), color: paleta.tinta }}
            >
              {bloco.desfecho}
            </TextoRico>
          </View>
        </EntradaAnimada>
      ) : null}
    </View>
  );
}
