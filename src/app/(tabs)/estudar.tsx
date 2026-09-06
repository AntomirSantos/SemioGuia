import { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { Pressionavel } from '../../design/movimento';
import { useTema } from '../../design/ThemeContext';
import { Rotulo, RotuloDeSecao } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo, useCasos } from '../../content/ContentContext';
import { listarSistemas, listarTodosTopicos } from '../../content/store';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { montarFila, type FilaDeHoje } from '../../revisao/fila';
import { idsValidosDoConteudo } from '../../revisao/idsValidos';
import { hojeLocal } from '../../revisao/hoje';
import { melhorClasse, CLASSE_LABEL, corDaClasse } from '../../casos/desfecho';
import { agruparPorSistema, listarChecklists, type ChecklistDeExame } from '../../checklists/listas';
import type { Bloco, Sistema, Topico } from '../../content/schema';
import type { Caso, ClasseDesfecho } from '../../content/casoSchema';

// Aba Estudar (reorganização pedida pelo autor, 2026-09): em vez de uma
// lista corrida com os 55 quizzes, a aba tem quatro blocos claros, na ordem
// em que o aluno os usa: o que venceu hoje, quiz por sistema, casos clínicos
// e estações OSCE. Quiz e estações vêm agrupados por sistema em sanfonas
// (12 linhas em vez de 55 ou 53), e um sumário no topo salta direto para a
// seção. Nada muda no motor: as rotas e o SM-2 são os mesmos.

function encontrarQuiz(topico: Topico) {
  return topico.blocos.find((b): b is Extract<Bloco, { tipo: 'quiz' }> => b.tipo === 'quiz');
}

type Secao = 'quiz' | 'casos' | 'estacoes';

// ---------------------------------------------------------------- Hoje

// Card "Revisão de hoje" no topo da aba: soma perguntas/estações/sinais
// vencidos da fila de revisão espaçada. Fila vazia vira um estado
// informativo sem navegação: nada para tocar quando não há nada para revisar.
function CardRevisao({ fila }: { fila: FilaDeHoje | undefined }) {
  const { paleta, escala } = useTema();
  if (!fila) return null;
  const vazia = fila.itens.length === 0;

  const estiloCartao = {
    justifyContent: 'center' as const,
    paddingVertical: espaco.m,
    paddingHorizontal: espaco.m,
    borderRadius: raio.m,
    backgroundColor: paleta.superficie,
    borderWidth: 1,
    borderColor: paleta.linha,
    marginBottom: espaco.l,
  };

  const conteudoCartao = (
    <>
      <Rotulo texto="Revisão de hoje" style={{ marginBottom: espaco.xs + 2 }} />
      {vazia ? (
        <>
          <Text
            style={{
              fontFamily: fonte.corpoBold,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
              marginBottom: 2,
            }}
          >
            Nada para revisar hoje
          </Text>
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
            Estude um tópico no Guia para semear a revisão
          </Text>
          <Pressionavel
            accessibilityRole="button"
            onPress={() => router.push('/')}
            style={{
              alignSelf: 'flex-start',
              minHeight: 44,
              justifyContent: 'center',
              marginTop: espaco.xs,
            }}
          >
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.small * escala),
                color: paleta.acento,
              }}
            >
              Abrir o Guia
            </Text>
          </Pressionavel>
        </>
      ) : (
        <>
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
            {fila.totalPerguntas} pergunta{fila.totalPerguntas === 1 ? '' : 's'} · {fila.totalChecklists} esta
            {fila.totalChecklists === 1 ? 'ção' : 'ções'} · {fila.totalSinais} {fila.totalSinais === 1 ? 'sinal' : 'sinais'}
          </Text>
          <Text
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(tipo.small * escala),
              color: paleta.tinta2,
              marginTop: 2,
            }}
          >
            Toque para revisar o que venceu, na ordem que a memória pede
          </Text>
        </>
      )}
    </>
  );

  if (vazia) {
    return <View style={estiloCartao}>{conteudoCartao}</View>;
  }

  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={() => router.push('/revisao')}
      style={{ ...estiloCartao, minHeight: 44 }}
    >
      {conteudoCartao}
    </Pressionavel>
  );
}

// ---------------------------------------------------------------- Sumário

// Três atalhos com contagem, que rolam até a seção. É o "índice" da aba:
// quem sabe o que quer chega em um toque; quem não sabe, lê os três nomes.
function Sumario({
  itens,
  onIr,
}: {
  itens: { chave: Secao; titulo: string; meta: string }[];
  onIr: (chave: Secao) => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ flexDirection: 'row', marginBottom: espaco.xl }}>
      {itens.map((item, i) => (
        // O Pressionavel aplica o estilo a uma View interna e o Pressable
        // externo se dimensiona pelo conteúdo; a View de fora é quem divide
        // a linha em três colunas iguais.
        <View key={item.chave} style={{ flex: 1, minWidth: 0, marginLeft: i === 0 ? 0 : espaco.s }}>
          <Pressionavel
            accessibilityRole="button"
            accessibilityLabel={`Ir para ${item.titulo}`}
            onPress={() => onIr(item.chave)}
            style={{
              minHeight: 44,
              paddingVertical: espaco.s,
              paddingHorizontal: espaco.s,
              borderRadius: raio.m,
              backgroundColor: paleta.superficie2,
            }}
          >
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.small * escala),
                color: paleta.tinta,
              }}
            >
              {item.titulo}
            </Text>
            <Text
              style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 2 }}
            >
              {item.meta}
            </Text>
          </Pressionavel>
        </View>
      ))}
    </View>
  );
}

// Cabeçalho de seção com uma linha de explicação: diz em uma frase o que
// aquele modo de estudo faz, para o aluno escolher com intenção.
function CabecalhoDeSecao({ titulo, explicacao }: { titulo: string; explicacao: string }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginBottom: espaco.s }}>
      <RotuloDeSecao texto={titulo} style={{ marginBottom: 0 }} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          color: paleta.tinta2,
          marginTop: espaco.xs,
        }}
      >
        {explicacao}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------- Sanfona por sistema

// Linha de sistema (a mesma gramática da Home: barra de cor 8×34 + nome +
// meta + chevron), que abre para mostrar os itens daquele sistema.
function GrupoDeSistema({
  secao,
  titulo,
  cor,
  meta,
  aberto,
  onToggle,
  children,
}: {
  secao: string;
  titulo: string;
  cor: string;
  meta: string;
  aberto: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const { paleta, escala } = useTema();
  const Chevron = aberto ? ChevronUp : ChevronDown;
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: paleta.linha }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        accessibilityLabel={`${secao}: ${titulo}, ${aberto ? 'recolher' : 'abrir'}`}
        onPress={onToggle}
        style={{ flexDirection: 'row', alignItems: 'center', minHeight: 52, paddingVertical: espaco.s }}
      >
        <View style={{ width: 8, height: 34, backgroundColor: cor, marginRight: espaco.m }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonte.leituraSemi, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
            {titulo}
          </Text>
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 1 }}>
            {meta}
          </Text>
        </View>
        <Chevron size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
      {aberto ? <View style={{ paddingLeft: 8 + espaco.m, paddingBottom: espaco.s }}>{children}</View> : null}
    </View>
  );
}

// Item dentro de uma sanfona: título, meta e navegação. Sem borda própria:
// a hierarquia vem do recuo e da regra do grupo.
function ItemDoGrupo({ titulo, meta, onPress, corMeta }: { titulo: string; meta: string; onPress: () => void; corMeta?: string }) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={onPress}
      style={{ minHeight: 44, justifyContent: 'center', paddingVertical: espaco.s }}
    >
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
        {titulo}
      </Text>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          color: corMeta ?? paleta.tinta2,
          marginTop: 1,
        }}
      >
        {meta}
      </Text>
    </Pressionavel>
  );
}

// ---------------------------------------------------------------- Casos

// Card de um caso clínico: sistema de origem, título, contexto em 1 linha e
// o melhor desfecho já alcançado ou "Não iniciado".
function CardCaso({
  caso,
  sistemaTitulo,
  sistemaCor,
  melhor,
  onPress,
}: {
  caso: Caso;
  sistemaTitulo: string;
  sistemaCor: string;
  melhor: ClasseDesfecho | null;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.m,
        borderRadius: raio.m,
        backgroundColor: paleta.superficie,
        borderWidth: 1,
        borderColor: paleta.linha,
        marginBottom: espaco.s,
      }}
    >
      <View style={{ width: 4, backgroundColor: sistemaCor, borderRadius: 2, marginRight: espaco.m }} />
      <View style={{ flex: 1 }}>
        <Rotulo texto={sistemaTitulo} style={{ marginBottom: 2 }} />
        <Text
          style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: 2 }}
        >
          {caso.titulo}
        </Text>
        <Text
          numberOfLines={1}
          style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: 2 }}
        >
          {caso.contexto}
        </Text>
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: Math.round(tipo.small * escala),
            color: melhor ? corDaClasse(paleta, melhor) : paleta.tinta2,
          }}
        >
          {melhor ? `Melhor resultado: ${CLASSE_LABEL[melhor]}` : 'Não iniciado'}
        </Text>
      </View>
    </Pressionavel>
  );
}

// O sistema de um caso é o do primeiro tópico de apoio (o id do tópico
// começa pelo id do sistema).
function sistemaDoCaso(caso: Caso, sistemas: Sistema[]): Sistema | undefined {
  const sistemaId = caso.topicosDeApoio[0]?.split('/')[0];
  return sistemas.find((s) => s.id === sistemaId);
}

// ---------------------------------------------------------------- Tela

export function TelaEstudar() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const sistemas = useMemo(() => listarSistemas(conteudo), [conteudo]);
  const topicos = useMemo(
    () => listarTodosTopicos(conteudo).filter((t) => encontrarQuiz(t) !== undefined),
    [conteudo],
  );
  const totalPerguntas = useMemo(
    () => topicos.reduce((soma, t) => soma + (encontrarQuiz(t)?.perguntas.length ?? 0), 0),
    [topicos],
  );
  const gruposDeEstacoes = useMemo(() => agruparPorSistema(listarChecklists(conteudo)), [conteudo]);
  const totalEstacoes = useMemo(() => gruposDeEstacoes.reduce((n, g) => n + g.checklists.length, 0), [gruposDeEstacoes]);

  const carregarPercentuais = useCallback(async () => {
    const pares = await Promise.all(
      topicos.map(async (t) => {
        const n = encontrarQuiz(t)?.perguntas.length ?? 0;
        const respostas = await progresso.listarRespostas(t.id);
        const ultimasN = respostas.slice(-n);
        const percentual =
          ultimasN.length > 0 ? Math.round((ultimasN.filter((r) => r.correta).length / ultimasN.length) * 100) : null;
        return [t.id, percentual] as const;
      }),
    );
    return Object.fromEntries(pares) as Record<string, number | null>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progresso, conteudo]);
  const percentuais = useDadosAoFocar(carregarPercentuais) ?? {};

  const carregarFila = useCallback(async () => {
    const itens = await progresso.listarItensRevisao();
    const idsValidos = idsValidosDoConteudo(conteudo);
    return montarFila(itens, idsValidos, hojeLocal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progresso, conteudo]);
  const fila = useDadosAoFocar(carregarFila);

  const casos = useCasos();
  const carregarMelhoresDesfechos = useCallback(async () => {
    const pares = await Promise.all(
      casos.map(async (c) => {
        const conclusoes = await progresso.listarConclusoesCasos(c.id);
        return [c.id, melhorClasse(conclusoes.map((cc) => cc.classe))] as const;
      }),
    );
    return Object.fromEntries(pares) as Record<string, ClasseDesfecho | null>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progresso, conteudo]);
  const melhoresDesfechos = useDadosAoFocar(carregarMelhoresDesfechos) ?? {};

  // Casos na ordem craniocaudal dos sistemas (os sem sistema reconhecido
  // ficam no fim, na ordem do conteúdo).
  const casosOrdenados = useMemo(() => {
    const ordem = new Map(sistemas.map((s, i) => [s.id, i] as const));
    return [...casos].sort((a, b) => {
      const ia = ordem.get(sistemaDoCaso(a, sistemas)?.id ?? '') ?? 999;
      const ib = ordem.get(sistemaDoCaso(b, sistemas)?.id ?? '') ?? 999;
      return ia - ib;
    });
  }, [casos, sistemas]);
  const casosConcluidos = casos.filter((c) => melhoresDesfechos[c.id]).length;

  // Sanfonas: quais sistemas estão abertos em cada seção.
  const [quizAbertos, setQuizAbertos] = useState<Set<string>>(new Set());
  const [estacoesAbertas, setEstacoesAbertas] = useState<Set<string>>(new Set());
  function alternar(conjunto: Set<string>, definir: (s: Set<string>) => void, chave: string) {
    const novo = new Set(conjunto);
    if (novo.has(chave)) novo.delete(chave);
    else novo.add(chave);
    definir(novo);
  }

  // Sumário: rola até a seção pela posição medida no layout.
  const scrollRef = useRef<ScrollView>(null);
  const posicoes = useRef<Partial<Record<Secao, number>>>({});
  function irPara(secao: Secao) {
    const y = posicoes.current[secao];
    if (y === undefined) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - espaco.m), animated: true });
  }
  function registrar(secao: Secao) {
    return (e: { nativeEvent: { layout: { y: number } } }) => {
      posicoes.current[secao] = e.nativeEvent.layout.y;
    };
  }

  return (
    <Tela ref={scrollRef}>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h1 * escala), color: paleta.tinta }}>
        Estudar
      </Text>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          color: paleta.tinta2,
          marginTop: espaco.xs,
          marginBottom: espaco.l,
        }}
      >
        Primeiro o que venceu hoje; depois, o modo de treino que você escolher.
      </Text>

      <CardRevisao fila={fila} />

      <Sumario
        itens={[
          { chave: 'quiz', titulo: 'Quiz', meta: `${totalPerguntas} perguntas` },
          { chave: 'casos', titulo: 'Casos', meta: `${casosConcluidos} de ${casos.length} feitos` },
          { chave: 'estacoes', titulo: 'Estações', meta: `${totalEstacoes} roteiros` },
        ]}
        onIr={irPara}
      />

      <View onLayout={registrar('quiz')} style={{ marginBottom: espaco.xl }}>
        <CabecalhoDeSecao
          titulo="Quiz por sistema"
          explicacao="Perguntas de múltipla escolha por tópico. Cada rodada semeia a revisão espaçada."
        />
        {topicos.length === 0 ? (
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>
            Nenhum quiz disponível ainda.
          </Text>
        ) : (
          sistemas.map((sistema) => {
            const doSistema = topicos.filter((t) => t.sistemaId === sistema.id);
            if (doSistema.length === 0) return null;
            const comRodada = doSistema.filter((t) => (percentuais[t.id] ?? null) !== null);
            const media =
              comRodada.length > 0
                ? Math.round(comRodada.reduce((s, t) => s + (percentuais[t.id] ?? 0), 0) / comRodada.length)
                : null;
            const meta =
              media === null
                ? `${doSistema.length} tópico${doSistema.length === 1 ? '' : 's'} · nenhuma rodada ainda`
                : `${comRodada.length} de ${doSistema.length} tópicos feitos · média ${media}%`;
            return (
              <GrupoDeSistema
                key={sistema.id}
                secao="Quiz"
                titulo={sistema.titulo}
                cor={sistema.cor}
                meta={meta}
                aberto={quizAbertos.has(sistema.id)}
                onToggle={() => alternar(quizAbertos, setQuizAbertos, sistema.id)}
              >
                {doSistema.map((t) => {
                  const n = encontrarQuiz(t)?.perguntas.length ?? 0;
                  const p = percentuais[t.id] ?? null;
                  return (
                    <ItemDoGrupo
                      key={t.id}
                      titulo={t.titulo}
                      meta={`${n} pergunta${n === 1 ? '' : 's'}${p !== null ? ` · última rodada ${p}%` : ''}`}
                      onPress={() => router.push(`/quiz/${t.id}`)}
                    />
                  );
                })}
              </GrupoDeSistema>
            );
          })
        )}
      </View>

      {casos.length > 0 ? (
        <View onLayout={registrar('casos')} style={{ marginBottom: espaco.xl }}>
          <CabecalhoDeSecao
            titulo="Casos clínicos"
            explicacao="Decisões ramificadas com desfecho e ensino. Um caso por sistema, na ordem do exame."
          />
          {casosOrdenados.map((c) => {
            const sistema = sistemaDoCaso(c, sistemas);
            return (
              <CardCaso
                key={c.id}
                caso={c}
                sistemaTitulo={sistema?.titulo ?? 'Caso clínico'}
                sistemaCor={sistema?.cor ?? paleta.linha}
                melhor={melhoresDesfechos[c.id] ?? null}
                onPress={() => router.push(`/caso/${c.id}`)}
              />
            );
          })}
        </View>
      ) : null}

      {gruposDeEstacoes.length > 0 ? (
        <View onLayout={registrar('estacoes')} style={{ marginBottom: espaco.xl }}>
          <CabecalhoDeSecao
            titulo="Estações OSCE"
            explicacao="Pratique um roteiro de exame como numa estação de prova: itens, tempo e nota."
          />
          {gruposDeEstacoes.map((grupo) => (
            <GrupoDeSistema
              key={grupo.sistemaTitulo}
              secao="Estações OSCE"
              titulo={grupo.sistemaTitulo}
              cor={grupo.sistemaCor}
              meta={`${grupo.checklists.length} roteiro${grupo.checklists.length === 1 ? '' : 's'}`}
              aberto={estacoesAbertas.has(grupo.sistemaTitulo)}
              onToggle={() => alternar(estacoesAbertas, setEstacoesAbertas, grupo.sistemaTitulo)}
            >
              {grupo.checklists.map((lista: ChecklistDeExame) => (
                <ItemDoGrupo
                  key={`${lista.topicoId}:${lista.titulo}`}
                  titulo={lista.titulo}
                  meta={`${lista.topicoTitulo} · ${lista.itens.length} itens`}
                  onPress={() => router.push(`/estacao/${lista.topicoId}?titulo=${encodeURIComponent(lista.titulo)}`)}
                />
              ))}
            </GrupoDeSistema>
          ))}
        </View>
      ) : null}
    </Tela>
  );
}

export default function Estudar() {
  return <TelaEstudar />;
}
