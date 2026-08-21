import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Rotulo } from '../../design/Rotulo';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useSessao } from '../../quiz/useSessao';
import type { Bloco, QuizPergunta } from '../../content/schema';

type EstadoAlternativa = 'neutra' | 'correta' | 'errada' | 'dim';

function TelaVazia({ mensagem }: { mensagem: string }) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        {mensagem}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={{
          alignSelf: 'flex-start',
          minHeight: 44,
          justifyContent: 'center',
          paddingHorizontal: espaco.l,
          borderRadius: raio.m,
          backgroundColor: paleta.superficie2,
        }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.acentoTinta }}>Voltar</Text>
      </Pressable>
    </Tela>
  );
}

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

function BotaoPrincipal({ rotulo, onPress }: { rotulo: string; onPress: () => void }) {
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

function BotaoSecundario({ rotulo, onPress }: { rotulo: string; onPress: () => void }) {
  const { paleta } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paleta.superficie2,
        borderRadius: raio.m,
        paddingHorizontal: espaco.l,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.acentoTinta }}>{rotulo}</Text>
    </Pressable>
  );
}

function Eyebrow({ texto }: { texto: string }) {
  return <Rotulo texto={texto} style={{ marginBottom: espaco.xs + 2 }} />;
}

function SessaoAtiva({ topicoId, perguntas }: { topicoId: string; perguntas: QuizPergunta[] }) {
  const { paleta, escala } = useTema();
  const progresso = useProgresso();
  const { responderAtual, resultado, reiniciar } = useSessao(perguntas);
  const [indice, setIndice] = useState(0);
  const [escolhida, setEscolhida] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  if (mostrarResultado && resultado) {
    return (
      <Tela>
        <Eyebrow texto="Resultado" />
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.hero * escala), color: paleta.acento, marginBottom: espaco.s }}>
          {resultado.percentual}%
        </Text>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginBottom: espaco.xl,
          }}
        >
          {resultado.acertos} de {resultado.total} corretas
        </Text>
        <BotaoPrincipal
          rotulo="Repetir"
          onPress={() => {
            reiniciar();
            setIndice(0);
            setEscolhida(null);
            setMostrarResultado(false);
          }}
        />
        <BotaoSecundario rotulo="Voltar" onPress={() => router.back()} />
      </Tela>
    );
  }

  const pergunta = perguntas[indice];
  const ultima = indice === perguntas.length - 1;

  function escolher(idx: number) {
    if (escolhida !== null) return;
    setEscolhida(idx);
    // Espelha a fórmula interna de engine.responder (escolhidaIndex === pergunta.corretaIndex).
    // Precisa ser calculada aqui, de forma síncrona, para compor o payload persistido
    // abaixo — mantenha as duas em sincronia se a lógica de correção mudar.
    const correta = idx === pergunta.corretaIndex;
    responderAtual(idx);
    progresso.registrarResposta({ perguntaId: pergunta.id, topicoId, correta, respondidaEm: Date.now() }).catch(() => {});
  }

  function avancar() {
    if (ultima) {
      setMostrarResultado(true);
    } else {
      setIndice((i) => i + 1);
      setEscolhida(null);
    }
  }

  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <Eyebrow texto={`${indice + 1} de ${perguntas.length}`} />
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
          <BotaoPrincipal rotulo={ultima ? 'Ver resultado' : 'Próxima'} onPress={avancar} />
        </>
      ) : null}
    </Tela>
  );
}

export function TelaQuiz({ topicoId }: { topicoId: string }) {
  const topico = useTopico(topicoId);
  if (!topico) return <TelaVazia mensagem="Tópico não encontrado" />;

  const quiz = topico.blocos.find((b): b is Extract<Bloco, { tipo: 'quiz' }> => b.tipo === 'quiz');
  if (!quiz) return <TelaVazia mensagem="Este tópico não tem quiz" />;

  return <SessaoAtiva topicoId={topicoId} perguntas={quiz.perguntas} />;
}

export default function QuizRoute() {
  const { caminho } = useLocalSearchParams<{ caminho: string | string[] }>();
  const topicoId = Array.isArray(caminho) ? caminho.join('/') : (caminho ?? '');
  return <TelaQuiz topicoId={topicoId} />;
}
