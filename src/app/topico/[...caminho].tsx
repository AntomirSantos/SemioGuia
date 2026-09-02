import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Heart, CheckCircle2 } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Rotulo } from '../../design/Rotulo';
import { SumarioSecoes } from '../../design/SumarioSecoes';
import { IndicadorSecao, NavegacaoSecao } from '../../design/NavegacaoSecao';
import { EntradaAnimada } from '../../design/EntradaAnimada';
import { useReducedMotion } from '../../design/useReducedMotion';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useSistema, useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useSync } from '../../sync/orquestrador';
import { BlocoView } from '../../blocos/Bloco';
import { semearTopico } from '../../revisao/fila';
import { agoraIso, hojeLocal } from '../../revisao/hoje';
import type { Bloco, QuizPergunta, Topico } from '../../content/schema';

function TelaNaoEncontrada() {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        Tópico não encontrado
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

function BotaoAcao({
  ativo,
  rotulo,
  rotuloAtivo,
  Icone,
  onPress,
}: {
  ativo: boolean;
  rotulo: string;
  rotuloAtivo: string;
  Icone: typeof Heart;
  onPress: () => void;
}) {
  const { paleta } = useTema();
  const cor = ativo ? paleta.acento : paleta.tinta2;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ selected: ativo }}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        paddingHorizontal: espaco.m,
        borderRadius: raio.m,
        borderWidth: 1,
        borderColor: ativo ? paleta.acento : paleta.linha,
        marginRight: espaco.s,
      }}
    >
      <Icone size={18} color={cor} fill={ativo ? cor : 'none'} />
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.small, color: cor, marginLeft: espaco.xs + 2 }}>
        {ativo ? rotuloAtivo : rotulo}
      </Text>
    </Pressable>
  );
}

interface SecaoTopico {
  titulo: string;
  blocos: Bloco[];
}

// Leitura por seções (spec Fase 8 §3.1): particiona os blocos do tópico nos
// pontos marcados por `tipo: 'secao'`, cada um virando o título da seção
// seguinte. Verificado contra assets/generated/content.json: os 23 tópicos
// reais sempre começam com uma `secao` — mas se algum vier sem isso, blocos
// soltos antes da 1ª seção ganham uma seção implícita "Início" em vez de
// desaparecer.
function particionarSecoes(blocos: Bloco[]): SecaoTopico[] {
  const secoes: SecaoTopico[] = [];
  let atual: SecaoTopico | null = null;
  for (const bloco of blocos) {
    if (bloco.tipo === 'secao') {
      atual = { titulo: bloco.titulo, blocos: [] };
      secoes.push(atual);
      continue;
    }
    if (!atual) {
      atual = { titulo: 'Início', blocos: [] };
      secoes.push(atual);
    }
    atual.blocos.push(bloco);
  }
  return secoes;
}

export function TelaTopico({ topicoId }: { topicoId: string }) {
  const { paleta, escala } = useTema();
  const topico = useTopico(topicoId);
  const sistema = useSistema(topico?.sistemaId ?? '');
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();
  const [estudado, setEstudado] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const reduzidoMovimento = useReducedMotion();

  const secoes = useMemo(() => particionarSecoes(topico?.blocos ?? []), [topico]);
  const totalSecoes = secoes.length;
  const acentoSistema = sistema?.cor;

  // Deep-link ou troca de tópico sempre abre na 1ª seção (spec §3.1) — o
  // estado da seção ativa é local, não persiste entre visitas.
  useEffect(() => {
    setSecaoAtiva(0);
  }, [topicoId]);

  // Revisão de fase P1 (central): volta o scroll ao topo a cada troca de
  // seção — sem isso, quem lia até o fim de uma seção longa e tocava
  // "Próxima seção" caía no FIM da seção seguinte (quiz/checklist antes do
  // título), medido empiricamente pelo revisor (scrollTop 2453 → 2458 num
  // tap). Instantâneo com movimento reduzido — `null` (ainda não resolvido)
  // conta como reduzido, mesma regra de EntradaAnimada/SumarioSecoes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: reduzidoMovimento === false });
    // Só reage à troca de seção; ler `reduzidoMovimento` no momento do
    // disparo (sem listá-lo) evita um scroll extra caso a preferência
    // resolva sozinha, sem o usuário ter trocado de seção.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secaoAtiva]);

  // Anúncio de troca de seção para leitor de tela (spec §3.1), sem disparar
  // na primeira montagem (aí quem anuncia é o próprio título da tela).
  const primeiraRenderizacao = useRef(true);
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    const secao = secoes[secaoAtiva];
    if (secao) {
      AccessibilityInfo.announceForAccessibility?.(`Seção ${secaoAtiva + 1} de ${totalSecoes}: ${secao.titulo}`);
    }
    // Só reage à troca de seção em si; `secoes`/`totalSecoes` variam junto
    // com `topicoId`, já tratado pelo efeito de reset acima.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secaoAtiva]);

  useEffect(() => {
    let cancelado = false;
    Promise.all([progresso.listarEstudados(), progresso.listarFavoritos()]).then(([estudados, favoritos]) => {
      if (cancelado) return;
      setEstudado(estudados.includes(topicoId));
      setFavorito(favoritos.includes(topicoId));
    });
    return () => {
      cancelado = true;
    };
  }, [progresso, topicoId]);

  // "Continuar de onde parou" (spec §3.3): grava o último tópico aberto numa
  // preferência genérica — mesmo mecanismo de `tema`/`fonte` no Perfil, sem
  // migração de store nem de firestore.rules (chave e valor já cabem no
  // formato existente de `prefs`). Só grava quando o tópico existe de fato.
  useEffect(() => {
    if (!topico) return;
    // Blindagem (revisão de fase A6): `prefs.valor` tem teto de 100
    // caracteres no firestore.rules; o `topicoId` mais longo hoje tem 71,
    // mas gravar algo acima do teto faria o Firestore rejeitar o
    // documento (e potencialmente o lote inteiro de sync) — pula a
    // gravação em vez de arriscar isso por um id futuro grande demais.
    if (topicoId.length > 100) return;
    progresso
      .definirPreferencia('ultimoTopico', topicoId)
      .catch(() => {})
      .finally(() => notificarEscrita());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicoId, topico]);

  if (!topico) {
    return <TelaNaoEncontrada />;
  }
  const topicoAtual: Topico = topico;

  const capitulo = sistema?.capitulos.find((c) => c.id === topicoAtual.capituloId);

  // Byline editorial: nome curto da obra de cada referência ("Porto — Exame
  // Clínico, …" → "Porto"), deduplicado e limitado a 3 fontes — é uma
  // assinatura, não a bibliografia (as referências completas continuam na
  // seção "Referências" ao fim).
  const byline = Array.from(
    new Set(topicoAtual.referencias.map((r) => r.split(' — ')[0].split(',')[0].trim()).filter(Boolean)),
  )
    .slice(0, 3)
    .join(' · ');

  function alternarEstudado() {
    const novo = !estudado;
    setEstudado(novo);
    // Spec §3.2, 4º gatilho: notifica após a escrita de progresso, com debounce.
    progresso.marcarEstudado(topicoId, novo).catch(() => {}).finally(() => notificarEscrita());
    if (novo) {
      semearRevisao(topicoAtual);
    }
  }

  // Semeadura da revisão espaçada ao marcar o tópico como estudado:
  // fire-and-forget (não bloqueia a UI) com falha silenciosa — se o store
  // falhar, o pior caso é o tópico não ter itens na fila de revisão ainda,
  // não uma tela quebrada.
  async function semearRevisao(topicoAtual: Topico) {
    try {
      const existentes = await progresso.listarItensRevisao();
      const novos = semearTopico(topicoAtual, existentes, hojeLocal(), agoraIso());
      await Promise.all(novos.map((item) => progresso.salvarItemRevisao(item)));
    } catch {
      // silencioso, ver comentário acima.
    }
  }

  function alternarFavorito() {
    const novo = !favorito;
    setFavorito(novo);
    // Spec §3.2, 4º gatilho: notifica após a escrita de progresso, com debounce.
    progresso.favoritar(topicoId, novo).catch(() => {}).finally(() => notificarEscrita());
  }

  function iniciarQuiz(_perguntas: QuizPergunta[]) {
    router.push(`/quiz/${topicoId}`);
  }

  const secaoCorrente = secoes[secaoAtiva];
  const naUltimaSecao = secaoAtiva === totalSecoes - 1;

  return (
    <Tela ref={scrollRef}>
      <Cabecalho titulo="" cor={sistema?.cor} aoVoltar={() => router.back()} />
      <Rotulo
        texto={`${sistema?.titulo ?? ''}${capitulo ? ` · ${capitulo.titulo}` : ''}`}
        cor={paleta.tinta2}
        style={{ marginBottom: espaco.xs + 2 }}
      />
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), lineHeight: Math.round(tipo.h2 * escala * 1.2), color: paleta.tinta, marginBottom: espaco.xs + 2 }}>
        {topico.titulo}
      </Text>
      {/* Byline editorial: as fontes bibliográficas do tópico em maiúsculas
          suaves, fechada por uma regra de 2.5px em tinta (identidade R2). */}
      {byline ? (
        <View style={{ marginBottom: espaco.m }}>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: 11.5,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: paleta.tinta2,
              marginBottom: espaco.s + 2,
            }}
            numberOfLines={2}
          >
            {byline}
          </Text>
          <View style={{ height: 2.5, backgroundColor: paleta.tinta }} />
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: espaco.l }}>
        {topico.revisao === 'pendente' ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: paleta.perolaBorda,
              backgroundColor: paleta.perolaFundo,
              borderRadius: raio.s,
              paddingHorizontal: espaco.s + 2,
              paddingVertical: 3,
              marginRight: espaco.xs,
              marginBottom: espaco.xs,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, color: paleta.perolaTexto }}>
              revisão pendente
            </Text>
          </View>
        ) : null}
        {topico.tags.slice(0, 5).map((tag) => (
          <View
            key={tag}
            style={{
              borderWidth: 1,
              borderColor: paleta.linha,
              borderRadius: raio.s,
              paddingHorizontal: espaco.s + 2,
              paddingVertical: 3,
              marginRight: espaco.xs,
              marginBottom: espaco.xs,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: tipo.tag, color: paleta.tinta2 }}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginBottom: espaco.l }}>
        <BotaoAcao ativo={favorito} rotulo="Favoritar" rotuloAtivo="Favoritado" Icone={Heart} onPress={alternarFavorito} />
        <BotaoAcao ativo={estudado} rotulo="Marcar estudado" rotuloAtivo="Estudado" Icone={CheckCircle2} onPress={alternarEstudado} />
      </View>

      {totalSecoes > 0 ? (
        <>
          <SumarioSecoes secoes={secoes} ativa={secaoAtiva} cor={acentoSistema} onSelecionar={setSecaoAtiva} />
          <IndicadorSecao indice={secaoAtiva} total={totalSecoes} cor={acentoSistema} />

          {secaoCorrente ? (
            <EntradaAnimada key={secaoAtiva}>
              <Text
                accessibilityRole="header"
                style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.secao * escala), color: paleta.tinta, marginBottom: espaco.s }}
              >
                {secaoCorrente.titulo}
              </Text>
              {secaoCorrente.blocos.map((bloco, i) => (
                <BlocoView key={i} bloco={bloco} onIniciarQuiz={iniciarQuiz} topicoId={topicoId} />
              ))}
            </EntradaAnimada>
          ) : null}

          <NavegacaoSecao
            temAnterior={secaoAtiva > 0}
            temProxima={!naUltimaSecao}
            cor={acentoSistema}
            aoIrAnterior={() => setSecaoAtiva((s) => Math.max(0, s - 1))}
            aoIrProxima={() => setSecaoAtiva((s) => Math.min(totalSecoes - 1, s + 1))}
          />
        </>
      ) : null}

      {/* Referências ficam fora do bloco de seções (revisão de fase P5):
          um tópico hipotético sem nenhuma `secao` continua mostrando-as em
          vez de sumirem por estarem presas à condição `totalSecoes > 0`.
          Com seções normais, o gate `naUltimaSecao || totalSecoes === 0`
          preserva o comportamento original — só na última seção. */}
      {naUltimaSecao || totalSecoes === 0 ? (
        <View style={{ marginTop: espaco.xl, paddingTop: espaco.l, borderTopWidth: 1, borderTopColor: paleta.linha }}>
          <Rotulo texto="Referências" style={{ marginBottom: espaco.xs }} />
          {topico.referencias.map((referencia, i) => (
            <Text
              key={i}
              style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: espaco.xs }}
            >
              {referencia}
            </Text>
          ))}
        </View>
      ) : null}
    </Tela>
  );
}

export default function TopicoRoute() {
  const { caminho } = useLocalSearchParams<{ caminho: string | string[] }>();
  const topicoId = Array.isArray(caminho) ? caminho.join('/') : (caminho ?? '');
  return <TelaTopico topicoId={topicoId} />;
}
