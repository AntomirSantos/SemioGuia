import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Rotulo } from '../../design/Rotulo';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo, type Paleta } from '../../design/tokens';
import { useCaso } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useSync } from '../../sync/orquestrador';
import { BotaoPrincipal } from '../../quiz/PerguntaCard';
import { avancar, decidir, desfechoAtual, iniciar, nota, noAtual, type EstadoCaso } from '../../casos/motor';
import { CLASSE_LABEL, corDaClasse } from '../../casos/desfecho';
import type { Avaliacao, Caso, No } from '../../content/casoSchema';

// Fonte dos dados objetivos da cena: usa um token monoespaçado se um dia
// existir em `fonte` (ainda não existe), senão cai para o corpo — como pedido
// pelo spec ("fonte mono se houver token, senão corpo").
const FONTE_DADOS: string = (fonte as unknown as { mono?: string }).mono ?? fonte.corpo;

function corDaAvaliacao(paleta: Paleta, avaliacao: Avaliacao): { borda: string; fundo: string; texto: string } {
  if (avaliacao === 'otima') return { borda: paleta.ok, fundo: paleta.okFundo, texto: paleta.ok };
  if (avaliacao === 'aceitavel') return { borda: paleta.perolaBorda, fundo: paleta.perolaFundo, texto: paleta.perolaTexto };
  return { borda: paleta.erro, fundo: paleta.erroFundo, texto: paleta.erro };
}

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

function CardDados({ linhas }: { linhas: string[] }) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        backgroundColor: paleta.superficie2,
        borderRadius: raio.m,
        padding: espaco.l,
        marginBottom: espaco.l,
      }}
    >
      {linhas.map((linha, idx) => (
        <Text
          key={idx}
          style={{
            fontFamily: FONTE_DADOS,
            fontSize: Math.round(tipo.small * escala),
            color: paleta.tinta,
            marginBottom: idx === linhas.length - 1 ? 0 : espaco.xs,
          }}
        >
          {linha}
        </Text>
      ))}
    </View>
  );
}

type EstadoOpcao = 'neutra' | Avaliacao | 'dim';

function OpcaoCard({ texto, estado, onPress }: { texto: string; estado: EstadoOpcao; onPress: () => void }) {
  const { paleta, escala } = useTema();
  const cor =
    estado === 'neutra'
      ? { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta }
      : estado === 'dim'
        ? { borda: paleta.linha, fundo: paleta.superficie, texto: paleta.tinta2 }
        : corDaAvaliacao(paleta, estado);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        borderRadius: raio.m,
        borderWidth: 1,
        borderColor: cor.borda,
        backgroundColor: cor.fundo,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: cor.texto }}>{texto}</Text>
    </Pressable>
  );
}

// Nó de decisão: escolher uma opção só mostra o feedback dela — o motor só é
// avançado (via `decidir`) quando "Seguir" é tocado (spec §3: o feedback
// aparece ANTES do grafo avançar).
function NoDecisao({
  no,
  onSeguir,
}: {
  no: Extract<No, { tipo: 'decisao' }>;
  onSeguir: (opcaoIndex: number) => void;
}) {
  const { paleta, escala } = useTema();
  const [selecionada, setSelecionada] = useState<number | null>(null);

  function escolher(idx: number) {
    if (selecionada !== null) return;
    setSelecionada(idx);
  }

  const opcaoEscolhida = selecionada !== null ? no.opcoes[selecionada] : null;
  const corFeedback = opcaoEscolhida ? corDaAvaliacao(paleta, opcaoEscolhida.avaliacao) : null;

  return (
    <>
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h3 * escala),
          color: paleta.tinta,
          marginBottom: espaco.l,
        }}
      >
        {no.pergunta}
      </Text>

      {no.opcoes.map((opcao, idx) => {
        let estado: EstadoOpcao = 'neutra';
        if (selecionada !== null) {
          estado = idx === selecionada ? opcao.avaliacao : 'dim';
        }
        return <OpcaoCard key={idx} texto={opcao.texto} estado={estado} onPress={() => escolher(idx)} />;
      })}

      {opcaoEscolhida && corFeedback ? (
        <>
          <View
            style={{
              backgroundColor: corFeedback.fundo,
              borderRadius: raio.m,
              padding: espaco.l,
              marginTop: espaco.s,
              marginBottom: espaco.l,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: corFeedback.texto }}>
              {opcaoEscolhida.feedback}
            </Text>
          </View>
          <BotaoPrincipal rotulo="Seguir" onPress={() => onSeguir(selecionada as number)} />
        </>
      ) : null}
    </>
  );
}

function TrilhaItem({ caso, passo }: { caso: Caso; passo: EstadoCaso['trilha'][number] }) {
  const { paleta, escala } = useTema();
  const decisaoNo = caso.nos.find((n): n is Extract<No, { tipo: 'decisao' }> => n.tipo === 'decisao' && n.id === passo.decisaoId);
  if (!decisaoNo) return null;
  const escolhida = decisaoNo.opcoes[passo.opcaoIndex];
  const otima = decisaoNo.opcoes.find((o) => o.avaliacao === 'otima');

  return (
    <View style={{ marginBottom: espaco.l }}>
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: espaco.xs }}>
        {decisaoNo.pergunta}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: corDaAvaliacao(paleta, escolhida.avaliacao).texto }}>
        {escolhida.texto}
      </Text>
      {passo.avaliacao !== 'otima' && otima ? (
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginTop: espaco.xs }}>
          Melhor conduta: {otima.texto}
        </Text>
      ) : null}
    </View>
  );
}

export function TelaCasoPlayer({ caso }: { caso: Caso }) {
  const progresso = useProgresso();
  const { notificarEscrita } = useSync();
  const [estado, setEstado] = useState<EstadoCaso>(() => iniciar(caso));
  const registradoRef = useRef<EstadoCaso | null>(null);

  const no = noAtual(caso, estado);
  const desfecho = desfechoAtual(caso, estado);

  // Registra a conclusão exatamente uma vez por chegada a um desfecho — a
  // ref guarda o `estado` (objeto) já registrado; refazer o caso troca o
  // objeto de estado, então uma nova chegada ao mesmo (ou outro) desfecho
  // registra uma nova entrada de histórico, como pedido pelo spec §3.
  useEffect(() => {
    if (desfecho && registradoRef.current !== estado) {
      registradoRef.current = estado;
      const n = nota(estado);
      progresso
        .registrarConclusaoCaso({
          casoId: caso.id,
          classe: desfecho.classe,
          otimas: n.otimas,
          aceitaveis: n.aceitaveis,
          erros: n.erros,
          concluidaEm: Date.now(),
        })
        .catch(() => {})
        // Spec §3.2, 4º gatilho: notifica após a conclusão do caso, com debounce.
        .finally(() => notificarEscrita());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  if (no.tipo === 'cena') {
    return (
      <Tela>
        <Cabecalho titulo="" aoVoltar={() => router.back()} />
        <CenaTexto texto={no.texto} />
        {no.dados ? <CardDados linhas={no.dados} /> : null}
        <BotaoPrincipal rotulo="Continuar" onPress={() => setEstado(avancar(caso, estado))} />
      </Tela>
    );
  }

  if (no.tipo === 'decisao') {
    return (
      <Tela>
        <Cabecalho titulo="" aoVoltar={() => router.back()} />
        <NoDecisao key={no.id} no={no} onSeguir={(idx) => setEstado(decidir(caso, estado, idx))} />
      </Tela>
    );
  }

  // desfecho
  return (
    <Tela>
      <DesfechoConteudo caso={caso} estado={estado} no={no} onRefazer={() => setEstado(iniciar(caso))} />
    </Tela>
  );
}

function CenaTexto({ texto }: { texto: string }) {
  const { paleta, escala } = useTema();
  return (
    <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: espaco.l }}>
      {texto}
    </Text>
  );
}

function DesfechoConteudo({
  caso,
  estado,
  no,
  onRefazer,
}: {
  caso: Caso;
  estado: EstadoCaso;
  no: Extract<No, { tipo: 'desfecho' }>;
  onRefazer: () => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <>
      <Rotulo texto="Desfecho" style={{ marginBottom: espaco.xs + 2 }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h2 * escala),
          color: corDaClasse(paleta, no.classe),
          marginBottom: espaco.s,
        }}
      >
        {CLASSE_LABEL[no.classe]}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, marginBottom: espaco.l }}>
        {no.texto}
      </Text>

      <View
        style={{
          backgroundColor: paleta.superficie2,
          borderRadius: raio.m,
          padding: espaco.l,
          marginBottom: espaco.xl,
        }}
      >
        <Rotulo texto="O que este caso ensina" style={{ marginBottom: espaco.xs + 2 }} />
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{no.ensino}</Text>
      </View>

      {estado.trilha.map((passo, idx) => (
        <TrilhaItem key={idx} caso={caso} passo={passo} />
      ))}

      <BotaoPrincipal rotulo="Refazer o caso" onPress={onRefazer} />
      <BotaoSecundario rotulo="Voltar" onPress={() => router.back()} />
    </>
  );
}

export function TelaCaso({ casoId }: { casoId: string }) {
  const caso = useCaso(casoId);
  if (!caso) {
    return <TelaVazia mensagem="Caso não encontrado" />;
  }
  return <TelaCasoPlayer key={caso.id} caso={caso} />;
}

export default function CasoRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <TelaCaso casoId={id ?? ''} />;
}
