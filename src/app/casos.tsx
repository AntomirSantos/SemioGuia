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
import { agruparPorSistema, filtrarCasos, listarCasosDeEstudo, type CasoDeEstudo } from '../estudo/listas';
import { AcaoDoVerbete, CampoDeBusca, GruposPorSistema, LinhaExpansivel } from '../estudo/ListaPorSistema';
import { melhorClasse, CLASSE_LABEL, corDaClasse } from '../casos/desfecho';
import { track } from '../analytics/analytics';
import type { ClasseDesfecho } from '../content/casoSchema';

// Casos clínicos (reorganização da aba Estudar, 2026-09): os casos
// ramificados na mesma gramática do modo plantão. Busca por título, tag ou
// tópico de apoio; grupos por sistema na ordem craniocaudal; e cada caso
// abre no lugar mostrando o contexto inteiro, o que ele treina e o melhor
// desfecho já alcançado, antes de entrar.
const LIMIAR_ABRIR_NA_BUSCA = 3;

function contarDecisoes(n: number): string {
  return `${n} decis${n === 1 ? 'ão' : 'ões'}`;
}

function CasoAberto({
  item,
  melhor,
  onAbrir,
}: {
  item: CasoDeEstudo;
  melhor: ClasseDesfecho | null;
  onAbrir: () => void;
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
        {item.caso.revisao === 'pendente' ? (
          <View
            style={{
              alignSelf: 'flex-start',
              borderWidth: 1,
              borderColor: paleta.perolaBorda,
              backgroundColor: paleta.perolaFundo,
              borderRadius: raio.s,
              paddingHorizontal: espaco.s + 2,
              paddingVertical: 3,
              marginBottom: espaco.s,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, color: paleta.perolaTexto }}>
              Em revisão pelo autor
            </Text>
          </View>
        ) : null}

        <Rotulo texto="A cena" cor={paleta.tinta2} />
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            lineHeight: Math.round(tipo.corpo * escala * 1.5),
            color: paleta.tinta,
            marginTop: espaco.xs,
            marginBottom: espaco.m,
            textAlign: 'justify',
          }}
        >
          {item.caso.contexto}
        </Text>

        <Rotulo texto="O que treina" cor={paleta.tinta2} />
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
          {contarDecisoes(item.nDecisoes)} com feedback e desfecho. Apoio em{' '}
          {item.topicosDeApoio.join(', ')}.
        </Text>

        <Rotulo texto="Seu histórico" cor={paleta.tinta2} />
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: Math.round(tipo.corpo * escala),
            color: melhor ? corDaClasse(paleta, melhor) : paleta.tinta2,
            marginTop: espaco.xs,
          }}
        >
          {melhor ? `Melhor desfecho: ${CLASSE_LABEL[melhor]}` : 'Não iniciado'}
        </Text>

        <AcaoDoVerbete texto={melhor ? 'Refazer o caso' : 'Começar o caso'} onPress={onAbrir} principal />
      </View>
    </EntradaAnimada>
  );
}

export function TelaCasos() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const lista = useMemo(() => listarCasosDeEstudo(conteudo), [conteudo]);
  const [termo, setTermo] = useState('');
  const [abertos, setAbertos] = useState<Set<string>>(new Set());

  const resultados = useMemo(() => filtrarCasos(lista, termo), [lista, termo]);
  const grupos = useMemo(() => {
    const visiveis = new Set(resultados);
    return agruparPorSistema(lista.filter((i) => visiveis.has(i)));
  }, [lista, resultados]);

  const buscando = termo.trim().length > 0;
  const abertosNaBusca = useMemo(
    () => (buscando && resultados.length <= LIMIAR_ABRIR_NA_BUSCA ? new Set(resultados.map((i) => i.caso.id)) : null),
    [buscando, resultados],
  );

  // `useDadosAoFocar` exige um callback memoizado: sem isto o efeito de foco
  // reexecuta a cada render e vira laço.
  const carregarMelhores = useCallback(async () => {
    const pares = await Promise.all(
      lista.map(async (item) => {
        const conclusoes = await progresso.listarConclusoesCasos(item.caso.id);
        return [item.caso.id, melhorClasse(conclusoes.map((c) => c.classe))] as const;
      }),
    );
    return Object.fromEntries(pares) as Record<string, ClasseDesfecho | null>;
  }, [lista, progresso]);
  const melhores = useDadosAoFocar(carregarMelhores) ?? {};
  const concluidos = useMemo(() => lista.filter((i) => melhores[i.caso.id]).length, [lista, melhores]);

  useEffect(() => {
    track('casos_aberto', { casos: lista.length });
    // Uma abertura por montagem da tela, como no plantão.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alternar(item: CasoDeEstudo) {
    setAbertos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(item.caso.id)) proximo.delete(item.caso.id);
      else proximo.add(item.caso.id);
      return proximo;
    });
  }

  return (
    <Tela>
      <Cabecalho titulo="Casos clínicos" aoVoltar={() => router.back()} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Decisões ramificadas com feedback e desfecho, na ordem do exame. Toque para ver a cena antes de entrar.
      </Text>

      <CampoDeBusca
        termo={termo}
        onChange={setTermo}
        placeholder="Caso, queixa ou tópico: dispneia, torção, delirium…"
        rotulo="Buscar caso clínico"
      />
      <Rotulo
        texto={
          buscando
            ? `${resultados.length} ${resultados.length === 1 ? 'caso' : 'casos'}`
            : `${lista.length} casos · ${concluidos} concluídos`
        }
        cor={paleta.tinta2}
        style={{ marginBottom: espaco.m }}
      />

      <GruposPorSistema
        grupos={grupos}
        chave={(item) => item.caso.id}
        renderItem={(item) => {
          const aberto = abertosNaBusca ? abertosNaBusca.has(item.caso.id) : abertos.has(item.caso.id);
          const melhor = melhores[item.caso.id] ?? null;
          return (
            <LinhaExpansivel
              titulo={item.caso.titulo}
              subtitulo={
                melhor
                  ? `${contarDecisoes(item.nDecisoes)} · melhor desfecho: ${CLASSE_LABEL[melhor]}`
                  : `${contarDecisoes(item.nDecisoes)} · não iniciado`
              }
              aberto={aberto}
              onToggle={() => alternar(item)}
            >
              <CasoAberto item={item} melhor={melhor} onAbrir={() => router.push(`/caso/${item.caso.id}`)} />
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
          Nenhum caso com esse termo. Tente o sistema, a queixa principal ou o nome de um tópico.
        </Text>
      ) : null}
    </Tela>
  );
}

export default function Casos() {
  return <TelaCasos />;
}
