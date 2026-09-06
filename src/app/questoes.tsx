import { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { useProgresso } from '../progress/ProgressContext';
import { useDadosAoFocar } from '../progress/useDadosAoFocar';
import { agruparPorSistema, filtrarQuestoes, listarQuestoes, type TopicoDeQuestoes } from '../estudo/listas';
import { AcaoDoVerbete, CampoDeBusca, GruposPorSistema, LinhaExpansivel } from '../estudo/ListaPorSistema';
import { track } from '../analytics/analytics';

// Questões (reorganização da aba Estudar, 2026-09): os quizzes do guia na
// mesma gramática do modo plantão. Busca no topo (título do tópico, mas
// também o enunciado das perguntas), grupos por sistema na ordem
// craniocaudal, e cada tópico abre no lugar mostrando o que esperar antes de
// começar. Com poucos resultados, a busca já abre o que sobrou.
const LIMIAR_ABRIR_NA_BUSCA = 3;

function TopicoAberto({
  item,
  percentual,
  onComecar,
  onAbrirTopico,
}: {
  item: TopicoDeQuestoes;
  percentual: number | null;
  onComecar: () => void;
  onAbrirTopico: () => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <EntradaAnimada>
      <View
        style={{
          backgroundColor: paleta.superficie2,
          borderRadius: raio.m,
          padding: espaco.l,
          marginTop: espaco.xs,
          marginBottom: espaco.m,
        }}
      >
        <Rotulo texto="O que cai" cor={paleta.tinta2} />
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            lineHeight: Math.round(tipo.corpo * escala * 1.5),
            color: paleta.tinta,
            marginTop: espaco.xs,
            marginBottom: espaco.m,
          }}
        >
          {item.nPerguntas} pergunta{item.nPerguntas === 1 ? '' : 's'} de múltipla escolha sobre {item.topicoTitulo}, do
          capítulo {item.capituloTitulo}. Cada rodada semeia a revisão espaçada com o que você errar.
        </Text>
        <Rotulo texto="Seu histórico" cor={paleta.tinta2} />
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: Math.round(tipo.corpo * escala),
            color: percentual === null ? paleta.tinta2 : paleta.tinta,
            marginTop: espaco.xs,
          }}
        >
          {percentual === null ? 'Nenhuma rodada ainda' : `Última rodada: ${percentual}% de acerto`}
        </Text>
        <AcaoDoVerbete texto="Começar as questões" onPress={onComecar} principal />
        <AcaoDoVerbete texto="Ler o tópico antes" onPress={onAbrirTopico} />
      </View>
    </EntradaAnimada>
  );
}

export function TelaQuestoes() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const lista = useMemo(() => listarQuestoes(conteudo), [conteudo]);
  const [termo, setTermo] = useState('');
  const [abertos, setAbertos] = useState<Set<string>>(new Set());

  const resultados = useMemo(() => filtrarQuestoes(lista, termo), [lista, termo]);
  const grupos = useMemo(() => {
    const visiveis = new Set(resultados);
    return agruparPorSistema(lista.filter((i) => visiveis.has(i)));
  }, [lista, resultados]);

  const buscando = termo.trim().length > 0;
  const abertosNaBusca = useMemo(
    () => (buscando && resultados.length <= LIMIAR_ABRIR_NA_BUSCA ? new Set(resultados.map((i) => i.topicoId)) : null),
    [buscando, resultados],
  );

  // `useDadosAoFocar` exige um callback memoizado: sem isto o efeito de foco
  // reexecuta a cada render e vira laço.
  const carregarPercentuais = useCallback(async () => {
    const pares = await Promise.all(
      lista.map(async (item) => {
        const respostas = await progresso.listarRespostas(item.topicoId);
        const ultimas = respostas.slice(-item.nPerguntas);
        const p =
          ultimas.length > 0 ? Math.round((ultimas.filter((r) => r.correta).length / ultimas.length) * 100) : null;
        return [item.topicoId, p] as const;
      }),
    );
    return Object.fromEntries(pares) as Record<string, number | null>;
  }, [lista, progresso]);
  const percentuais = useDadosAoFocar(carregarPercentuais) ?? {};

  const totalPerguntas = useMemo(() => lista.reduce((s, i) => s + i.nPerguntas, 0), [lista]);
  const feitos = useMemo(() => lista.filter((i) => (percentuais[i.topicoId] ?? null) !== null).length, [lista, percentuais]);

  useEffect(() => {
    track('questoes_aberto', { topicos: lista.length });
    // Uma abertura por montagem da tela, como no plantão.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alternar(item: TopicoDeQuestoes) {
    setAbertos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(item.topicoId)) proximo.delete(item.topicoId);
      else proximo.add(item.topicoId);
      return proximo;
    });
  }

  return (
    <Tela>
      <Cabecalho titulo="Questões" aoVoltar={() => router.back()} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Quiz por tópico, na ordem do guia. Toque para ver o que cai e o seu histórico antes de começar.
      </Text>

      <CampoDeBusca
        termo={termo}
        onChange={setTermo}
        placeholder="Tópico, tema ou palavra do enunciado…"
        rotulo="Buscar tópico com questões"
      />
      <Rotulo
        texto={
          buscando
            ? `${resultados.length} ${resultados.length === 1 ? 'tópico' : 'tópicos'}`
            : `${lista.length} tópicos · ${totalPerguntas} perguntas · ${feitos} já respondidos`
        }
        cor={paleta.tinta2}
        style={{ marginBottom: espaco.m }}
      />

      <GruposPorSistema
        grupos={grupos}
        chave={(item) => item.topicoId}
        renderItem={(item) => {
          const aberto = abertosNaBusca ? abertosNaBusca.has(item.topicoId) : abertos.has(item.topicoId);
          const p = percentuais[item.topicoId] ?? null;
          return (
            <LinhaExpansivel
              titulo={item.topicoTitulo}
              subtitulo={`${item.nPerguntas} pergunta${item.nPerguntas === 1 ? '' : 's'}${
                p !== null ? ` · última rodada ${p}%` : ''
              }`}
              aberto={aberto}
              onToggle={() => alternar(item)}
            >
              <TopicoAberto
                item={item}
                percentual={p}
                onComecar={() => router.push(`/quiz/${item.topicoId}`)}
                onAbrirTopico={() => router.push(`/topico/${item.topicoId}`)}
              />
            </LinhaExpansivel>
          );
        }}
      />

      {grupos.length === 0 ? (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginTop: espaco.m,
          }}
        >
          Nenhum tópico com esse termo. A busca geral do app cobre também sinais, manobras e checklists.
        </Text>
      ) : null}
    </Tela>
  );
}

export default function Questoes() {
  return <TelaQuestoes />;
}
