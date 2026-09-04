import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { Rotulo } from '../design/Rotulo';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { Pressionavel } from '../design/movimento';
import { CheckDesenhado } from '../design/CheckDesenhado';
import { hapticaAcerto, hapticaErro } from '../design/feedbackTatil';
import { useReducedMotion } from '../design/useReducedMotion';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import type { QuizPergunta } from '../content/schema';

type EstadoAlternativa = 'neutra' | 'correta' | 'errada' | 'dim';

// Shake curto da alternativa errada (micro-recompensa sóbria): ±5px em
// ~260ms, uma vez, quando o estado vira 'errada'. Com movimento reduzido a
// cor e a explicação comunicam sozinhas.
const SHAKE_PASSO_MS = 52;
const SHAKE_SEQUENCIA_PX = [-5, 5, -3, 3, 0];

function AlternativaCard({
  texto,
  estado,
  mostrarCheck,
  onPress,
}: {
  texto: string;
  estado: EstadoAlternativa;
  mostrarCheck: boolean;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  const reduzido = useReducedMotion();
  const deslocamento = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (estado !== 'errada' || reduzido !== false) return;
    Animated.sequence(
      SHAKE_SEQUENCIA_PX.map((px) =>
        Animated.timing(deslocamento, { toValue: px, duration: SHAKE_PASSO_MS, useNativeDriver: true }),
      ),
    ).start();
    // Dispara na transição para 'errada'; a preferência de movimento é lida
    // no momento da transição.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  const cores: Record<EstadoAlternativa, { borda: string; fundo: string; texto: string }> = {
    neutra: { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta },
    correta: { borda: paleta.ok, fundo: paleta.okFundo, texto: paleta.ok },
    errada: { borda: paleta.erro, fundo: paleta.erroFundo, texto: paleta.erro },
    dim: { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta2 },
  };
  const cor = cores[estado];
  return (
    <Animated.View style={{ transform: [{ translateX: deslocamento }] }}>
      <Pressionavel
        accessibilityRole="button"
        onPress={onPress}
        style={{
          minHeight: 44,
          justifyContent: 'center',
          paddingVertical: espaco.m,
          paddingHorizontal: espaco.l,
          borderRadius: raio.m,
          borderWidth: 1.5,
          borderColor: cor.borda,
          backgroundColor: cor.fundo,
          marginBottom: espaco.s,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: espaco.s }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonte.corpoMedio,
              fontSize: Math.round(tipo.corpo * escala),
              color: cor.texto,
            }}
          >
            {texto}
          </Text>
          {mostrarCheck ? <CheckDesenhado cor={paleta.ok} /> : null}
        </View>
      </Pressionavel>
    </Animated.View>
  );
}

export function BotaoPrincipal({ rotulo, onPress }: { rotulo: string; onPress: () => void }) {
  const { paleta } = useTema();
  return (
    <Pressionavel
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
    </Pressionavel>
  );
}

// Pergunta de quiz avulsa: enunciado + alternativas + explicação ao escolher.
// Extraído de `/quiz/[...caminho]` (única UI original) para ser reaproveitado
// pela sessão de revisão (Task 5) sem redesenho: mesma aparência e
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
    const correta = idx === pergunta.corretaIndex;
    // Micro-recompensa tátil: um toque físico, só no aparelho.
    if (correta) hapticaAcerto();
    else hapticaErro();
    // Espelha o cálculo de engine.responder: manter em sincronia.
    onResponder(idx, correta);
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
        return (
          <AlternativaCard
            key={idx}
            texto={alt}
            estado={estado}
            mostrarCheck={estado === 'correta'}
            onPress={() => escolher(idx)}
          />
        );
      })}

      {escolhida !== null ? (
        // Feedback do quiz (DECISAO.md): delight contido, ≤300ms, a
        // explicação entra com o fade+deslize curto de EntradaAnimada
        // (200ms), sem confete nem animação de estado nas alternativas.
        <EntradaAnimada>
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
        </EntradaAnimada>
      ) : null}
    </>
  );
}
