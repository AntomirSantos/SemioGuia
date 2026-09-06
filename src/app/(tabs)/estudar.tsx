import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { Pressionavel } from '../../design/movimento';
import { useTema } from '../../design/ThemeContext';
import { Rotulo } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { montarFila, type FilaDeHoje } from '../../revisao/fila';
import { idsValidosDoConteudo } from '../../revisao/idsValidos';
import { hojeLocal } from '../../revisao/hoje';
import { listarCasosDeEstudo, listarQuestoes } from '../../estudo/listas';

// Aba Estudar (reorganização pedida pelo autor, 2026-09): a aba deixa de ser
// uma lista e vira a porta de entrada do estudo. Primeiro o que venceu hoje,
// que tem prazo; depois dois caminhos com nome próprio, questões e casos,
// cada um na sua tela, organizado como o modo plantão. Os checklists têm aba
// exclusiva e não aparecem aqui.

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
    marginBottom: espaco.xl,
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
            style={{ alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center', marginTop: espaco.xs }}
          >
            <Text
              style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.acento }}
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

  if (vazia) return <View style={estiloCartao}>{conteudoCartao}</View>;
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

// Caminho de estudo: nome grande, uma frase do que é, e a conta do acervo.
// A regra editorial de 2.5px em tinta separa um do outro, como na Home.
function CaminhoDeEstudo({
  titulo,
  descricao,
  meta,
  onPress,
}: {
  titulo: string;
  descricao: string;
  meta: string;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      accessibilityLabel={`${titulo}: ${descricao}`}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        paddingVertical: espaco.m,
        borderTopWidth: 2.5,
        borderTopColor: paleta.tinta,
        marginBottom: espaco.l,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: fonte.display,
            fontSize: Math.round(tipo.h3 * escala),
            color: paleta.tinta,
            marginTop: espaco.xs,
          }}
        >
          {titulo}
        </Text>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.small * escala),
            lineHeight: Math.round(tipo.small * escala * 1.5),
            color: paleta.tinta2,
            marginTop: 2,
          }}
        >
          {descricao}
        </Text>
        <Rotulo texto={meta} cor={paleta.tinta2} style={{ marginTop: espaco.s }} />
      </View>
      <ChevronRight size={20} color={paleta.tinta2} style={{ marginLeft: espaco.m }} />
    </Pressionavel>
  );
}

export function TelaEstudar() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();

  const questoes = useMemo(() => listarQuestoes(conteudo), [conteudo]);
  const casos = useMemo(() => listarCasosDeEstudo(conteudo), [conteudo]);
  const totalPerguntas = useMemo(() => questoes.reduce((s, i) => s + i.nPerguntas, 0), [questoes]);

  const carregarFila = useCallback(async () => {
    const itens = await progresso.listarItensRevisao();
    return montarFila(itens, idsValidosDoConteudo(conteudo), hojeLocal());
  }, [progresso, conteudo]);
  const fila = useDadosAoFocar(carregarFila);

  return (
    <Tela>
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
        Primeiro o que venceu hoje; depois, o caminho que você escolher.
      </Text>

      <CardRevisao fila={fila} />

      <CaminhoDeEstudo
        titulo="Questões"
        descricao="Quiz por tópico, com busca e histórico de acerto. Cada rodada semeia a revisão espaçada."
        meta={`${questoes.length} tópicos · ${totalPerguntas} perguntas`}
        onPress={() => router.push('/questoes')}
      />
      <CaminhoDeEstudo
        titulo="Casos clínicos"
        descricao="Decisões ramificadas com feedback e desfecho, dos quadros que não podem passar batido."
        meta={`${casos.length} casos`}
        onPress={() => router.push('/casos')}
      />

      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          marginTop: espaco.m,
        }}
      >
        Os roteiros de exame e as estações de prática têm aba própria: Checklists.
      </Text>
    </Tela>
  );
}

export default function Estudar() {
  return <TelaEstudar />;
}
