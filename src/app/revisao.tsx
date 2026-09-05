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
import { useSync } from '../sync/orquestrador';
import { montarFila, idDeChecklist, idDeSinal, semearTopico, type FilaDeHoje } from '../revisao/fila';
import { TextoRico } from '../blocos/texto';
import { idsValidosDoConteudo } from '../revisao/idsValidos';
import { amanha, avaliar, notaDeEstacao, notaDePergunta, type ItemRevisao, type NotaSm2 } from '../revisao/sm2';
import { hojeLocal, agoraIso } from '../revisao/hoje';
import { EstacaoOsce, type ResultadoEstacao } from '../revisao/EstacaoOsce';
import { PerguntaCard, BotaoPrincipal } from '../quiz/PerguntaCard';
import { RegraAnimada } from '../design/movimento';
import { CheckDesenhado } from '../design/CheckDesenhado';
import { hapticaConclusao } from '../design/feedbackTatil';
import { track } from '../analytics/analytics';
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
// válido, não só os desta sessão) já vencem amanhã: dá ao usuário uma ideia
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

function encontrarSinal(conteudo: Conteudo, topicoId: string, sinalId: string) {
  const topico = obterTopico(conteudo, topicoId);
  if (!topico) return undefined;
  for (const bloco of topico.blocos) {
    if (bloco.tipo === 'sinal' && idDeSinal(topicoId, bloco.nome) === sinalId) {
      return bloco as Extract<Bloco, { tipo: 'sinal' }>;
    }
  }
  return undefined;
}

// Flashcard de sinal (2026-09): recuperação ativa pura. Frente: o nome do
// verbete; o aluno tenta lembrar o achado e o significado de cabeça, revela
// e se autoavalia em três notas do SM-2 (2, 4 ou 5).
function FlashcardSinal({
  sinal,
  rotuloProgresso,
  onAvaliar,
}: {
  sinal: Extract<Bloco, { tipo: 'sinal' }>;
  rotuloProgresso: string;
  onAvaliar: (nota: NotaSm2, correta: boolean) => void;
}) {
  const { paleta, escala } = useTema();
  const [revelado, setRevelado] = useState(false);
  const small = Math.round(tipo.small * escala);
  const corpoTexto = {
    fontFamily: fonte.corpo,
    fontSize: small,
    lineHeight: Math.round(small * 1.5),
    color: paleta.tinta,
    textAlign: 'justify' as const,
  };
  return (
    <View>
      <Rotulo texto={rotuloProgresso} style={{ marginBottom: espaco.xs + 2 }} />
      <Rotulo texto="Flashcard de sinal" cor={paleta.tinta2} style={{ marginBottom: espaco.s }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h2 * escala),
          lineHeight: Math.round(tipo.h2 * escala * 1.2),
          color: paleta.tinta,
          marginBottom: espaco.s,
        }}
      >
        {sinal.nome}
      </Text>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Qual é o achado, o que ele significa e que causas considerar? Responda de cabeça antes de revelar.
      </Text>
      {revelado ? (
        <View
          style={{
            backgroundColor: paleta.superficie2,
            borderRadius: raio.m,
            padding: espaco.l,
            marginBottom: espaco.l,
          }}
        >
          <Rotulo texto="O achado" cor={paleta.tinta2} />
          <View style={{ marginTop: 2, marginBottom: espaco.m }}>
            <TextoRico style={corpoTexto}>{sinal.descricao}</TextoRico>
          </View>
          <Rotulo texto="O que significa" cor={paleta.tinta2} />
          <View style={{ marginTop: 2, marginBottom: espaco.m }}>
            <TextoRico style={corpoTexto}>{sinal.significado}</TextoRico>
          </View>
          <Rotulo texto="Causas a considerar" cor={paleta.tinta2} />
          <View style={{ marginTop: 2 }}>
            {sinal.causas.map((causa) => (
              <View key={causa} style={{ flexDirection: 'row', marginBottom: 2 }}>
                <Text style={{ ...corpoTexto, textAlign: 'left', color: paleta.tinta2 }}>{'•'} </Text>
                <View style={{ flex: 1 }}>
                  <TextoRico style={{ ...corpoTexto, textAlign: 'left' }}>{causa}</TextoRico>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : null}
      {revelado ? (
        <View style={{ flexDirection: 'row', gap: espaco.m }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => onAvaliar(2, false)}
            style={{
              flex: 1,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: raio.m,
              borderWidth: 1,
              borderColor: paleta.linha,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>
              Não lembrei
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => onAvaliar(4, true)}
            style={{
              flex: 1,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: raio.m,
              backgroundColor: paleta.superficie2,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
              Lembrei
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => onAvaliar(5, true)}
            style={{
              flex: 1,
              minHeight: 44,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: raio.m,
              backgroundColor: paleta.acento,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.superficie }}>
              Fácil
            </Text>
          </Pressable>
        </View>
      ) : (
        <BotaoPrincipal rotulo="Mostrar resposta" onPress={() => setRevelado(true)} />
      )}
    </View>
  );
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
// resposta: o progresso da sessão sobrevive a um fechamento no meio.
export function TelaRevisao() {
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();
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
      const [itens, estudados] = await Promise.all([
        progresso.listarItensRevisao(),
        progresso.listarEstudados(),
      ]);
      // Semeadura retroativa (flashcards de sinais, 2026-09): tópicos
      // estudados antes de os cartões existirem ganham os seus aqui, uma
      // única vez, ids já semeados são ignorados. O limite diário de itens
      // novos da fila segura o volume.
      const hoje = hojeLocal();
      const agora = agoraIso();
      const novos: ItemRevisao[] = [];
      for (const topicoId of estudados) {
        const topico = obterTopico(conteudo, topicoId);
        if (!topico) continue;
        novos.push(...semearTopico(topico, [...itens, ...novos], hoje, agora));
      }
      if (novos.length > 0) {
        await Promise.all(novos.map((n) => progresso.salvarItemRevisao(n))).catch(() => {});
      }
      const montada = montarFila([...itens, ...novos], idsValidos, hoje);
      if (!cancelado) setFila(montada);
    })();
    return () => {
      cancelado = true;
    };
  }, [conteudo, progresso]);

  // Ao concluir a sessão, recarrega os itens (já refletindo as gravações
  // desta sessão) para contar quantos vencem amanhã: a "próxima leva".
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

  // Instrumentação do beta (§4): um evento por sessão de revisão concluída.
  // `acertos`/`erros` são gravados no mesmo lote de estado que `concluida`,
  // então aqui já carregam o resultado do último item.
  useEffect(() => {
    if (!concluida || !fila) return;
    track('revisao_concluida', { itens: fila.itens.length, acertos, erros });
    // Fecho tátil da sessão: um toque de encerramento, só no aparelho.
    hapticaConclusao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [concluida]);

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
        {/* Fecho tipográfico (micro-recompensa sóbria): a regra editorial se
            desenha, o check se desenha, e a frase encerra o dia: nada de
            confete, é o Design Editorial comemorando do jeito dele. */}
        <RegraAnimada cor={paleta.acento} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: espaco.s, marginTop: espaco.l, marginBottom: espaco.l }}>
          <CheckDesenhado cor={paleta.acentoTinta} tamanho={24} />
          <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta }}>
            Revisão do dia encerrada
          </Text>
        </View>
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
    } finally {
      // Spec §3.2, 4º gatilho: notifica após cada item salvo, com debounce.
      notificarEscrita();
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

  if (item.tipo === 'sinal') {
    const sinal = encontrarSinal(conteudo, item.topicoId, item.id);
    if (!sinal) {
      return <TelaVazia mensagem="Sinal não encontrado" />;
    }
    return (
      <Tela>
        <Cabecalho titulo="" aoVoltar={() => router.back()} />
        <FlashcardSinal
          key={item.id}
          sinal={sinal}
          rotuloProgresso={`${indice + 1} de ${fila.itens.length}`}
          onAvaliar={(nota, correta) => {
            registrar(item, nota, correta);
            avancarItem();
          }}
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
