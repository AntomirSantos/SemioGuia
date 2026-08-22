import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../../design/Tela';
import { useTema } from '../../design/ThemeContext';
import { Rotulo } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo } from '../../content/ContentContext';
import { listarTodosTopicos, obterSistema } from '../../content/store';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { montarFila, type FilaDeHoje } from '../../revisao/fila';
import { idsValidosDoConteudo } from '../../revisao/idsValidos';
import { hojeLocal } from '../../revisao/hoje';
import type { Bloco, Topico } from '../../content/schema';

function encontrarQuiz(topico: Topico) {
  return topico.blocos.find((b): b is Extract<Bloco, { tipo: 'quiz' }> => b.tipo === 'quiz');
}

// Card "Revisão de hoje" no topo da aba: soma perguntas/estações vencidas da
// fila de revisão espaçada (Tasks 1-4). Fila vazia vira um estado informativo
// sem navegação — nada para tocar quando não há nada para revisar.
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
        </>
      ) : (
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
          {fila.totalPerguntas} pergunta{fila.totalPerguntas === 1 ? '' : 's'} · {fila.totalChecklists} esta
          {fila.totalChecklists === 1 ? 'ção' : 'ções'}
        </Text>
      )}
    </>
  );

  if (vazia) {
    return <View style={estiloCartao}>{conteudoCartao}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push('/revisao')}
      style={{ ...estiloCartao, minHeight: 44 }}
    >
      {conteudoCartao}
    </Pressable>
  );
}

function LinhaTopicoQuiz({
  topico,
  sistemaTitulo,
  percentual,
  onPress,
}: {
  topico: Topico;
  sistemaTitulo: string;
  percentual: number | null;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  const nPerguntas = encontrarQuiz(topico)?.perguntas.length ?? 0;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.m,
        borderRadius: raio.m,
        backgroundColor: paleta.superficie,
        borderWidth: 1,
        borderColor: paleta.linha,
        marginBottom: espaco.s,
      }}
    >
      <Rotulo texto={sistemaTitulo} style={{ marginBottom: 2 }} />
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: 2 }}>
        {topico.titulo}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
        {nPerguntas} pergunta{nPerguntas === 1 ? '' : 's'}
        {percentual !== null ? ` · última rodada ${percentual}%` : ''}
      </Text>
    </Pressable>
  );
}

export function TelaEstudar() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const topicos = listarTodosTopicos(conteudo).filter((t) => encontrarQuiz(t) !== undefined);

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

  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h1 * escala), color: paleta.tinta, marginBottom: espaco.l }}>
        Estudar
      </Text>
      <CardRevisao fila={fila} />
      {topicos.length === 0 ? (
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>
          Nenhum quiz disponível ainda.
        </Text>
      ) : (
        topicos.map((t) => (
          <LinhaTopicoQuiz
            key={t.id}
            topico={t}
            sistemaTitulo={obterSistema(conteudo, t.sistemaId)?.titulo ?? ''}
            percentual={percentuais[t.id] ?? null}
            onPress={() => router.push(`/quiz/${t.id}`)}
          />
        ))
      )}
    </Tela>
  );
}

export default function Estudar() {
  return <TelaEstudar />;
}
