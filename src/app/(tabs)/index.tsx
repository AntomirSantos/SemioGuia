import { useCallback, useEffect } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Rotulo, RotuloDeSecao } from '../../design/Rotulo';
import { EntradaEmLista, Pressionavel } from '../../design/movimento';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, tipo } from '../../design/tokens';
import { useConteudo } from '../../content/ContentContext';
import { listarSistemas, listarTodosTopicos, obterSistema, obterTopico, sistemaRevisado } from '../../content/store';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { montarFila } from '../../revisao/fila';
import { idsValidosDoConteudo } from '../../revisao/idsValidos';
import { hojeLocal } from '../../revisao/hoje';
import { montarPlanoDoDia, textoDiasAteProva } from '../../plano/plano';
import { AvisoInstalarPwa } from '../../pwa/AvisoInstalarPwa';
import type { Conteudo, Sistema, Topico } from '../../content/schema';

function contarTopicos(sistema: Sistema): number {
  return sistema.capitulos.reduce((total, capitulo) => total + capitulo.topicos.length, 0);
}

// Barra de progresso da linha de sistema: elemento não textual, então a cor
// do sistema tinge livremente o preenchimento (cor de sistema nunca vira cor
// de texto, só acento decorativo/estado). Na linguagem editorial ela é um
// fio discreto sob a meta — quase uma sublinha.
function BarraProgressoSistema({ estudados, total, cor }: { estudados: number; total: number; cor: string }) {
  const { paleta } = useTema();
  const percentual = total > 0 ? estudados / total : 0;
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${estudados} de ${total} ${total === 1 ? 'tópico estudado' : 'tópicos estudados'}`}
      accessibilityValue={{ min: 0, max: total, now: estudados }}
      style={{
        height: 3,
        backgroundColor: paleta.superficie2,
        overflow: 'hidden',
        marginTop: espaco.s,
        alignSelf: 'stretch',
      }}
    >
      <View style={{ width: `${Math.round(percentual * 100)}%`, height: '100%', backgroundColor: cor }} />
    </View>
  );
}

// Linha editorial de sistema (identidade R2): barra de cor 8×34 como único
// canal da cor do sistema + nome em Bodoni + meta em Public Sans + chevron,
// separadas por hairline — sem ícone-badge, sem wash de fundo, sem sombra.
function LinhaSistema({ sistema, estudados, revisado }: { sistema: Sistema; estudados: number; revisado: boolean }) {
  const { paleta, escala } = useTema();
  const totalTopicos = contarTopicos(sistema);
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={() => router.push(`/sistema/${sistema.id}`)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: espaco.m + 1,
        borderBottomWidth: 1,
        borderBottomColor: paleta.linha,
        minHeight: 44,
      }}
    >
      <View style={{ width: 8, height: 34, backgroundColor: sistema.cor, marginRight: espaco.m }} />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: fonte.display,
            fontSize: Math.round(tipo.h3 * escala),
            lineHeight: Math.round(tipo.h3 * escala * 1.25),
            color: paleta.tinta,
          }}
        >
          {sistema.titulo}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(12 * escala),
              color: paleta.tinta2,
            }}
          >
            {estudados} de {totalTopicos} {totalTopicos === 1 ? 'tópico' : 'tópicos'}
          </Text>
          {/* Beta §9.4: marcador dos sistemas já revisados pelo autor. */}
          {revisado ? (
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(11 * escala),
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                color: paleta.acentoTinta,
                marginLeft: espaco.s,
              }}
            >
              Revisado
            </Text>
          ) : null}
        </View>
        <BarraProgressoSistema estudados={estudados} total={totalTopicos} cor={sistema.cor} />
      </View>
      <ChevronRight size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
    </Pressionavel>
  );
}

// "Continuar de onde parou" (spec §3.3): último tópico aberto, lido de uma
// preferência local (chave `ultimoTopico`, gravada por TelaTopico ao abrir
// qualquer tópico). Sem card nenhum se ainda não há preferência gravada, ou
// se o id salvo não existe mais no conteúdo atual (defensivo). Mesma
// anatomia de linha editorial das linhas de sistema.
function CartaoContinuar({ topico, sistema }: { topico: Topico; sistema: Sistema }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginBottom: espaco.xl }}>
      <RotuloDeSecao texto="Continuar de onde parou" />
      <Pressionavel
        accessibilityRole="button"
        onPress={() => router.push(`/topico/${topico.id}`)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: espaco.s,
          borderBottomWidth: 1,
          borderBottomColor: paleta.linha,
          minHeight: 44,
        }}
      >
        <View style={{ width: 8, height: 34, backgroundColor: sistema.cor, marginRight: espaco.m }} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonte.display,
              fontSize: Math.round(tipo.h3 * escala),
              lineHeight: Math.round(tipo.h3 * escala * 1.25),
              color: paleta.tinta,
            }}
            numberOfLines={1}
          >
            {topico.titulo}
          </Text>
          <Text
            style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 2 }}
          >
            {sistema.titulo}
          </Text>
        </View>
        <ChevronRight size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
    </View>
  );
}

// Cartão do plano até a prova (beta §9.2): aparece quando há `dataProva`
// gravada. Mesma anatomia editorial das outras linhas; toca → revisão do dia.
function CartaoPlano({ dataProva, paraRevisarHoje, topicosRestantes, sistemaProvaTitulo }: {
  dataProva: string;
  paraRevisarHoje: number;
  topicosRestantes: number;
  sistemaProvaTitulo: string | null;
}) {
  const { paleta, escala } = useTema();
  const plano = montarPlanoDoDia({ dataProvaIso: dataProva, hojeIso: hojeLocal(), paraRevisarHoje, topicosRestantes });
  const treinoDoSistema = sistemaProvaTitulo
    ? `estação OSCE e quiz de ${sistemaProvaTitulo}`
    : '1 tópico novo · quiz do tópico';
  const linhas = [
    `Hoje (~15 min): revisão do dia (${plano.paraRevisarHoje} ${plano.paraRevisarHoje === 1 ? 'item' : 'itens'}) · ${treinoDoSistema}`,
    plano.topicosPorDia !== null
      ? `Ritmo para ver tudo: ${plano.topicosPorDia} ${plano.topicosPorDia === 1 ? 'tópico novo' : 'tópicos novos'} por dia (faltam ${plano.topicosRestantes})`
      : null,
  ].filter((l): l is string => l !== null);
  return (
    <View style={{ marginBottom: espaco.xl }}>
      <RotuloDeSecao texto="Plano até a prova" />
      <Pressionavel
        accessibilityRole="button"
        onPress={() => router.push('/revisao')}
        style={{ paddingVertical: espaco.s, borderBottomWidth: 1, borderBottomColor: paleta.linha, minHeight: 44 }}
      >
        <Text
          style={{
            fontFamily: fonte.display,
            fontSize: Math.round(tipo.h3 * escala),
            lineHeight: Math.round(tipo.h3 * escala * 1.25),
            color: paleta.tinta,
          }}
        >
          {textoDiasAteProva(plano.diasRestantes, sistemaProvaTitulo ?? undefined)}
        </Text>
        {plano.diasRestantes >= 0
          ? linhas.map((linha) => (
              <Text
                key={linha}
                style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 2 }}
              >
                {linha}
              </Text>
            ))
          : null}
      </Pressionavel>
    </View>
  );
}

function useUltimoTopico(conteudo: Conteudo): { topico: Topico; sistema: Sistema } | null | undefined {
  const progresso = useProgresso();
  const carregar = useCallback(async () => {
    const id = await progresso.obterPreferencia('ultimoTopico');
    if (!id) return null;
    const topico = obterTopico(conteudo, id);
    if (!topico) return null;
    const sistema = obterSistema(conteudo, topico.sistemaId);
    if (!sistema) return null;
    return { topico, sistema };
  }, [progresso, conteudo]);
  return useDadosAoFocar(carregar);
}

export default function Guia() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  // Beta §9.4: sistemas já revisados pelo autor vêm primeiro (sort estável
  // preserva a ordem craniocaudal dentro de cada grupo).
  const sistemas = [...listarSistemas(conteudo)].sort(
    (a, b) => Number(sistemaRevisado(b)) - Number(sistemaRevisado(a)),
  );
  const progresso = useProgresso();

  const carregarEstudados = useCallback(async () => new Set(await progresso.listarEstudados()), [progresso]);
  const estudados = useDadosAoFocar(carregarEstudados) ?? new Set<string>();
  const ultimo = useUltimoTopico(conteudo);

  // Gate de onboarding (beta §9.2): enquanto a preferência não existe (null),
  // o primeiro uso vai para /onboarding. `undefined` = ainda carregando.
  const carregarOnboarding = useCallback(() => progresso.obterPreferencia('onboarding'), [progresso]);
  const onboarding = useDadosAoFocar(carregarOnboarding);
  useEffect(() => {
    if (onboarding === null) router.replace('/onboarding');
  }, [onboarding]);

  // Plano até a prova: dataProva + fila de revisão vencida hoje.
  const carregarPlano = useCallback(async () => {
    const dataProva = await progresso.obterPreferencia('dataProva');
    if (!dataProva) return null;
    const sistemaProvaId = await progresso.obterPreferencia('sistemaProva');
    const sistemaProva = sistemaProvaId ? obterSistema(conteudo, sistemaProvaId) : undefined;
    const itens = await progresso.listarItensRevisao();
    const paraRevisarHoje = montarFila(itens, idsValidosDoConteudo(conteudo), hojeLocal()).itens.length;
    return { dataProva, paraRevisarHoje, sistemaProvaTitulo: sistemaProva?.titulo ?? null };
  }, [progresso, conteudo]);
  const plano = useDadosAoFocar(carregarPlano);

  // Kicker do masthead derivado do conteúdo real — nunca hardcode.
  const totalTopicos = listarTodosTopicos(conteudo).length;
  const kicker = `${sistemas.length} sistemas · ${totalTopicos} tópicos`;

  return (
    <Tela>
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h1 * escala),
          color: paleta.tinta,
          letterSpacing: -0.2,
        }}
      >
        SemioGuia
      </Text>
      <Rotulo texto={kicker} cor={paleta.tinta2} style={{ letterSpacing: 1.6, fontSize: 10.5, marginTop: 3, marginBottom: espaco.xl }} />
      <AvisoInstalarPwa />
      {plano ? (
        <CartaoPlano
          dataProva={plano.dataProva}
          paraRevisarHoje={plano.paraRevisarHoje}
          topicosRestantes={totalTopicos - estudados.size}
          sistemaProvaTitulo={plano.sistemaProvaTitulo}
        />
      ) : null}
      {ultimo ? <CartaoContinuar topico={ultimo.topico} sistema={ultimo.sistema} /> : null}
      <RotuloDeSecao texto="Sistemas" />
      <View>
        {sistemas.map((sistema, indice) => {
          const topicosDoSistema = sistema.capitulos.flatMap((c) => c.topicos);
          const estudadosCount = topicosDoSistema.filter((t) => estudados.has(t.id)).length;
          return (
            <EntradaEmLista key={sistema.id} indice={indice}>
              <LinhaSistema sistema={sistema} estudados={estudadosCount} revisado={sistemaRevisado(sistema)} />
            </EntradaEmLista>
          );
        })}
      </View>
    </Tela>
  );
}
