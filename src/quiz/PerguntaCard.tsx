import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { Rotulo } from '../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import type { QuizPergunta } from '../content/schema';

type EstadoAlternativa = 'neutra' | 'correta' | 'errada' | 'dim';

function AlternativaCard({
  texto,
  estado,
  onPress,
}: {
  texto: string;
  estado: EstadoAlternativa;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  const cores: Record<EstadoAlternativa, { borda: string; fundo: string; texto: string }> = {
    neutra: { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta },
    correta: { borda: paleta.ok, fundo: paleta.okFundo, texto: paleta.ok },
    errada: { borda: paleta.erro, fundo: paleta.erroFundo, texto: paleta.erro },
    dim: { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta2 },
  };
  const cor = cores[estado];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        borderRadius: raio.m,
        borderWidth: 1,
        borderColor: cor.borda,
        backgroundColor: cor.fundo,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: cor.texto }}>{texto}</Text>
    </Pressable>
  );
}

export function BotaoPrincipal({ rotulo, onPress }: { rotulo: string; onPress: () => void }) {
  const { paleta } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paleta.acento,
        borderRadius: raio.m,
        paddingHorizontal: espaco.l,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.superficie }}>{rotulo}</Text>
    </Pressable>
  );
}

// Pergunta de quiz avulsa: enunciado + alternativas + explicação ao escolher.
// Extraído de `/quiz/[...caminho]` (única UI original) para ser reaproveitado
// pela sessão de revisão (Task 5) sem redesenho — mesma aparência e
// comportamento em ambos os fluxos. Controlado: não sabe se está numa sessão
// de quiz por tópico ou numa fila de revisão; quem o embute decide o rótulo
// de progresso/avançar e o que fazer com a resposta.
export function PerguntaCard({
  pergunta,
  rotuloProgresso,
  rotuloAvancar,
  onResponder,
  onAvancar,
}: {
  pergunta: QuizPergunta;
  rotuloProgresso: string;
  rotuloAvancar: string;
  onResponder: (escolhidaIndex: number, correta: boolean) => void;
  onAvancar: () => void;
}) {
  const { paleta, escala } = useTema();
  const [escolhida, setEscolhida] = useState<number | null>(null);

  function escolher(idx: number) {
    if (escolhida !== null) return;
    setEscolhida(idx);
    // Espelha o cálculo de engine.responder — manter em sincronia.
    onResponder(idx, idx === pergunta.corretaIndex);
  }

  return (
    <>
      <Rotulo texto={rotuloProgresso} style={{ marginBottom: espaco.xs + 2 }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h3 * escala),
          color: paleta.tinta,
          marginBottom: espaco.l,
        }}
      >
        {pergunta.enunciado}
      </Text>

      {pergunta.alternativas.map((alt, idx) => {
        let estado: EstadoAlternativa = 'neutra';
        if (escolhida !== null) {
          if (idx === pergunta.corretaIndex) estado = 'correta';
          else if (idx === escolhida) estado = 'errada';
          else estado = 'dim';
        }
        return <AlternativaCard key={idx} texto={alt} estado={estado} onPress={() => escolher(idx)} />;
      })}

      {escolhida !== null ? (
        <>
          <View
            style={{
              backgroundColor: paleta.superficie2,
              borderRadius: raio.m,
              padding: espaco.l,
              marginTop: espaco.s,
              marginBottom: espaco.l,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
              {pergunta.explicacao}
            </Text>
          </View>
          <BotaoPrincipal rotulo={rotuloAvancar} onPress={onAvancar} />
        </>
      ) : null}
    </>
  );
}
