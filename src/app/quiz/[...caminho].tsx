import { useEffect, useRef, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Rotulo } from '../../design/Rotulo';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useSync } from '../../sync/orquestrador';
import { useSessao } from '../../quiz/useSessao';
import { PerguntaCard, BotaoPrincipal } from '../../quiz/PerguntaCard';
import { avaliar, criarItem, notaDePergunta } from '../../revisao/sm2';
import { agoraIso, hojeLocal } from '../../revisao/hoje';
import { track } from '../../analytics/analytics';
import type { Bloco, QuizPergunta } from '../../content/schema';

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
  const { notificarEscrita } = useSync();
  const { responderAtual, resultado, reiniciar } = useSessao(perguntas);
  const [indice, setIndice] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Instrumentação do beta (§4): um evento por sessão de quiz concluída —
  // a ref evita duplicar em re-renders; "Repetir" zera e permite novo evento.
  const quizRegistradoRef = useRef(false);
  useEffect(() => {
    if (mostrarResultado && resultado && !quizRegistradoRef.current) {
      quizRegistradoRef.current = true;
      track('quiz_concluido', {
        topicoId,
        acertos: resultado.acertos,
        total: resultado.total,
        percentual: resultado.percentual,
      });
    }
    if (!mostrarResultado) quizRegistradoRef.current = false;
  }, [mostrarResultado, resultado, topicoId]);

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
            setMostrarResultado(false);
          }}
        />
        <BotaoSecundario rotulo="Voltar" onPress={() => router.back()} />
      </Tela>
    );
  }

  const pergunta = perguntas[indice];
  const ultima = indice === perguntas.length - 1;

  function responder(idx: number, correta: boolean) {
    responderAtual(idx);
    progresso.registrarResposta({ perguntaId: pergunta.id, topicoId, correta, respondidaEm: Date.now() }).catch(() => {});
    // Quiz avulso também alimenta o agendador SM-2 da pergunta (Task 5), do
    // mesmo jeito que a estação avulsa já faz para checklists: cria o item se
    // for a primeira vez, senão reavalia o existente.
    (async () => {
      try {
        const hoje = hojeLocal();
        const agora = agoraIso();
        const itens = await progresso.listarItensRevisao();
        const existente = itens.find((i) => i.id === pergunta.id);
        const item = existente ?? criarItem(pergunta.id, 'pergunta', topicoId, hoje, agora);
        const atualizado = avaliar(item, notaDePergunta(correta), hoje, agora);
        await progresso.salvarItemRevisao(atualizado);
      } catch {
        // Fire-and-forget: não bloqueia a UI do quiz.
      } finally {
        // Spec §3.2, 4º gatilho: notifica após a escrita de progresso, com
        // debounce (nunca aguardado aqui — notificarEscrita é fire-and-forget).
        notificarEscrita();
      }
    })();
  }

  function avancar() {
    if (ultima) {
      setMostrarResultado(true);
    } else {
      setIndice((i) => i + 1);
    }
  }

  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <PerguntaCard
        key={pergunta.id}
        pergunta={pergunta}
        rotuloProgresso={`${indice + 1} de ${perguntas.length}`}
        rotuloAvancar={ultima ? 'Ver resultado' : 'Próxima'}
        onResponder={responder}
        onAvancar={avancar}
      />
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
