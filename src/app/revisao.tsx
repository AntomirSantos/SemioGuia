import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { obterTopico } from '../content/store';
import { useProgresso } from '../progress/ProgressContext';
import { montarFila, idDeChecklist, type FilaDeHoje } from '../revisao/fila';
import { idsValidosDoConteudo } from '../revisao/idsValidos';
import { amanha, avaliar, notaDeEstacao, notaDePergunta, type ItemRevisao, type NotaSm2 } from '../revisao/sm2';
import { hojeLocal, agoraIso } from '../revisao/hoje';
import { EstacaoOsce, type ResultadoEstacao } from '../revisao/EstacaoOsce';
import { PerguntaCard, BotaoPrincipal } from '../quiz/PerguntaCard';
import type { Bloco, Conteudo, QuizPergunta } from '../content/schema';

function TelaVazia({
  mensagem,
  subtitulo,
  mostrarAbrirGuia,
}: {
  mensagem: string;
  subtitulo?: string;
  mostrarAbrirGuia?: boolean;
}) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        {mensagem}
      </Text>
      {subtitulo ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginBottom: espaco.l,
          }}
        >
          {subtitulo}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', gap: espaco.s }}>
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
        {mostrarAbrirGuia ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/')}
            style={{
              alignSelf: 'flex-start',
              minHeight: 44,
              justifyContent: 'center',
              paddingHorizontal: espaco.l,
              borderRadius: raio.m,
              backgroundColor: paleta.acento,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.superficie }}>Abrir o Guia</Text>
          </Pressable>
        ) : null}
      </View>
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

// Texto da "próxima leva" no resumo final: quantos itens (de todo o conjunto
// válido, não só os desta sessão) já vencem amanhã — dá ao usuário uma ideia
// do que vem a seguir sem precisar abrir a fila de novo.
function textoProximaLeva(n: number): string {
  if (n === 0) return 'Nada agendado para amanhã';
  if (n === 1) return 'Próxima leva: 1 item amanhã';
  return `Próxima leva: ${n} itens amanhã`;
}

function encontrarPergunta(conteudo: Conteudo, topicoId: string, perguntaId: string): QuizPergunta | undefined {
  const topico = obterTopico(conteudo, topicoId);
  if (!topico) return undefined;
  for (const bloco of topico.blocos) {
    if (bloco.tipo === 'quiz') {
      const pergunta = bloco.perguntas.find((p) => p.id === perguntaId);
      if (pergunta) return pergunta;
    }
  }
  return undefined;
}

function encontrarChecklist(conteudo: Conteudo, topicoId: string, checklistId: string) {
  const topico = obterTopico(conteudo, topicoId);
  if (!topico) return undefined;
  for (const bloco of topico.blocos) {
    if (bloco.tipo === 'checklist' && idDeChecklist(topicoId, bloco.titulo) === checklistId) {
      return bloco as Extract<Bloco, { tipo: 'checklist' }>;
    }
  }
  return undefined;
}

// Sessão de revisão espaçada: percorre `FilaDeHoje.itens` em ordem, reaproveitando
// a UI de pergunta do quiz (`PerguntaCard`) e a estação OSCE (`EstacaoOsce`) para
// cada tipo de item. Cada item é avaliado (SM-2) e salvo imediatamente após a
// resposta — o progresso da sessão sobrevive a um fechamento no meio.
export function TelaRevisao() {
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const { paleta, escala } = useTema();
  const [fila, setFila] = useState<FilaDeHoje | null>(null);
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [concluida, setConcluida] = useState(false);
  const [resultadoChecklist, setResultadoChecklist] = useState<ResultadoEstacao | null>(null);
  const [proximaLeva, setProximaLeva] = useState<number | null>(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      const idsValidos = idsValidosDoConteudo(conteudo);
      const itens = await progresso.listarItensRevisao();
      const montada = montarFila(itens, idsValidos, hojeLocal());
      if (!cancelado) setFila(montada);
    })();
    return () => {
      cancelado = true;
    };
  }, [conteudo, progresso]);

  // Ao concluir a sessão, recarrega os itens (já refletindo as gravações
  // desta sessão) para contar quantos vencem amanhã — a "próxima leva".
  useEffect(() => {
    if (!concluida) return;
    let cancelado = false;
    (async () => {
      const idsValidos = idsValidosDoConteudo(conteudo);
      const itens = await progresso.listarItensRevisao();
      const limite = amanha(hojeLocal());
      const n = itens.filter((i) => idsValidos.has(i.id) && i.proximaRevisao <= limite).length;
      if (!cancelado) setProximaLeva(n);
    })();
    return () => {
      cancelado = true;
    };
  }, [concluida, conteudo, progresso]);

  if (fila === null) {
    return null;
  }

  if (fila.itens.length === 0) {
    return (
      <TelaVazia
        mensagem="Nada para revisar hoje"
        subtitulo="Estude um tópico no Guia para semear a revisão"
        mostrarAbrirGuia
      />
    );
  }

  if (concluida) {
    const total = fila.itens.length;
    return (
      <Tela>
        <Cabecalho titulo="" aoVoltar={() => router.back()} />
        <Rotulo texto="Revisão concluída" style={{ marginBottom: espaco.xs + 2 }} />
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.hero * escala), color: paleta.acento, marginBottom: espaco.s }}>
          {acertos}/{total}
        </Text>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginBottom: espaco.s,
          }}
        >
          {acertos} acerto{acertos === 1 ? '' : 's'} · {erros} erro{erros === 1 ? '' : 's'}
        </Text>
        {proximaLeva !== null ? (
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta2,
              marginBottom: espaco.xl,
            }}
          >
            {textoProximaLeva(proximaLeva)}
          </Text>
        ) : null}
        <BotaoSecundario rotulo="Voltar" onPress={() => router.back()} />
      </Tela>
    );
  }

  const item: ItemRevisao = fila.itens[indice];
  const ultimo = indice === fila.itens.length - 1;

  async function registrar(item: ItemRevisao, nota: NotaSm2, correta: boolean) {
    const hoje = hojeLocal();
    const agora = agoraIso();
    const atualizado = avaliar(item, nota, hoje, agora);
    try {
      await progresso.salvarItemRevisao(atualizado);
    } catch {
      // Fire-and-forget: a sessão continua mesmo se a gravação falhar.
    }
    if (correta) setAcertos((a) => a + 1);
    else setErros((e) => e + 1);
  }

  function avancarItem() {
    setResultadoChecklist(null);
    if (ultimo) setConcluida(true);
    else setIndice((i) => i + 1);
  }

  if (item.tipo === 'pergunta') {
    const pergunta = encontrarPergunta(conteudo, item.topicoId, item.id);
    if (!pergunta) {
      return <TelaVazia mensagem="Pergunta não encontrada" />;
    }
    return (
      <Tela>
        <Cabecalho titulo="" aoVoltar={() => router.back()} />
        <PerguntaCard
          key={item.id}
          pergunta={pergunta}
          rotuloProgresso={`${indice + 1} de ${fila.itens.length}`}
          rotuloAvancar={ultimo ? 'Ver resultado' : 'Próxima'}
          onResponder={(_idx, correta) => {
            registrar(item, notaDePergunta(correta), correta);
          }}
          onAvancar={avancarItem}
        />
      </Tela>
    );
  }

  const checklist = encontrarChecklist(conteudo, item.topicoId, item.id);
  if (!checklist) {
    return <TelaVazia mensagem="Checklist não encontrado" />;
  }

  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <Rotulo texto={`${indice + 1} de ${fila.itens.length}`} style={{ marginBottom: espaco.xs + 2 }} />
      <EstacaoOsce
        key={item.id}
        titulo={checklist.titulo}
        passos={checklist.itens}
        aoConcluir={(resultado) => {
          const nota = notaDeEstacao(resultado.percentual);
          registrar(item, nota, nota >= 4);
          setResultadoChecklist(resultado);
        }}
      />
      {resultadoChecklist ? (
        <View style={{ marginTop: espaco.l }}>
          <BotaoPrincipal rotulo={ultimo ? 'Ver resultado' : 'Próxima'} onPress={avancarItem} />
        </View>
      ) : null}
    </Tela>
  );
}

export default function RevisaoRoute() {
  return <TelaRevisao />;
}
