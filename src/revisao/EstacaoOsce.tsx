import { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { compartilharResultadoOsce } from './compartilharResultado';
import { track } from '../analytics/analytics';

export interface ResultadoEstacao {
  lembrados: number;
  total: number;
  percentual: number;
  /** Segundos entre o início da estação e a conclusão (beta §4). */
  duracaoSegundos?: number;
}

type VarianteBotao = 'principal' | 'ok' | 'erro';

function BotaoEstacao({
  rotulo,
  variante,
  onPress,
}: {
  rotulo: string;
  variante: VarianteBotao;
  onPress: () => void;
}) {
  const { paleta } = useTema();
  const cores: Record<VarianteBotao, { fundo: string; texto: string }> = {
    principal: { fundo: paleta.acento, texto: paleta.superficie },
    ok: { fundo: paleta.okFundo, texto: paleta.ok },
    erro: { fundo: paleta.erroFundo, texto: paleta.erro },
  };
  const cor = cores[variante];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cor.fundo,
        borderRadius: raio.m,
        paddingHorizontal: espaco.l,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: cor.texto }}>{rotulo}</Text>
    </Pressable>
  );
}

// Estação OSCE: recordação ativa de um checklist. Componente controlado: não
// toca no store de progresso/revisão; quem o embute (rota /estacao ou, na
// Task 5, a sessão de revisão) decide o que fazer com o `ResultadoEstacao`.
export function EstacaoOsce({
  titulo,
  passos,
  aoConcluir,
}: {
  titulo: string;
  passos: string[];
  aoConcluir: (r: ResultadoEstacao) => void;
}) {
  const { paleta, escala } = useTema();
  const [indice, setIndice] = useState(0);
  const [revelado, setRevelado] = useState(false);
  const [respostas, setRespostas] = useState<boolean[]>([]);
  const [resultado, setResultado] = useState<ResultadoEstacao | null>(null);
  const inicioRef = useRef(Date.now());

  // "Refazer estação" (beta §9.3): zera a sessão; concluir de novo chama
  // `aoConcluir` outra vez, para o SM-2 isso é uma nova avaliação, o
  // comportamento desejado.
  function refazer() {
    setIndice(0);
    setRevelado(false);
    setRespostas([]);
    setResultado(null);
    inicioRef.current = Date.now();
  }

  function responder(lembrou: boolean) {
    // Guarda de conclusão: um segundo toque rápido em Lembrei/Esqueci (antes
    // do re-render trocar a UI para o resumo) não deve chamar `aoConcluir`
    // de novo.
    if (resultado) return;
    const atualizadas = [...respostas, lembrou];
    if (indice === passos.length - 1) {
      const total = passos.length;
      const lembrados = atualizadas.filter(Boolean).length;
      const percentual = Math.round((lembrados / total) * 100);
      const duracaoSegundos = Math.round((Date.now() - inicioRef.current) / 1000);
      const r = { lembrados, total, percentual, duracaoSegundos };
      setRespostas(atualizadas);
      setResultado(r);
      aoConcluir(r);
    } else {
      setRespostas(atualizadas);
      setIndice((i) => i + 1);
      setRevelado(false);
    }
  }

  // Compartilhar o resultado (beta §9.3): imagem editorial na web, texto no
  // nativo. Só conta o evento quando a folha não foi cancelada.
  async function compartilhar(r: ResultadoEstacao) {
    try {
      const meio = await compartilharResultadoOsce({ titulo, ...r });
      if (meio !== 'nenhum') {
        track('resultado_compartilhado', {
          contexto: 'osce',
          checklist: titulo,
          percentual: r.percentual,
          meio,
        });
      }
    } catch {
      // folha cancelada ou share indisponível: silencioso
    }
  }

  if (resultado) {
    const esquecidos = passos.filter((_, i) => respostas[i] === false);
    return (
      <View
        style={{
          backgroundColor: paleta.superficie,
          borderWidth: 1,
          borderColor: paleta.linha,
          borderRadius: raio.l,
          padding: espaco.xl,
          ...sombra,
        }}
      >
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: tipo.tag,
            letterSpacing: 1.1,
            textTransform: 'uppercase',
            color: paleta.acentoTinta,
            marginBottom: espaco.xs + 2,
          }}
        >
          Resultado da estação
        </Text>
        <Text
          style={{
            fontFamily: fonte.display,
            fontSize: Math.round(tipo.hero * escala),
            color: paleta.acento,
            marginBottom: espaco.s,
          }}
        >
          {resultado.percentual}%
        </Text>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginBottom: espaco.l,
          }}
        >
          {resultado.lembrados} de {resultado.total} passos lembrados
        </Text>
        {esquecidos.length > 0 ? (
          <View>
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: tipo.small,
                color: paleta.tinta2,
                marginBottom: espaco.xs,
              }}
            >
              Passos esquecidos
            </Text>
            {esquecidos.map((passo, i) => (
              <Text
                key={i}
                style={{
                  fontFamily: fonte.corpo,
                  fontSize: Math.round(tipo.corpo * escala),
                  color: paleta.erro,
                  marginBottom: espaco.xs,
                }}
              >
                {passo}
              </Text>
            ))}
          </View>
        ) : null}
        <Pressable
          accessibilityRole="button"
          onPress={() => compartilhar(resultado)}
          style={{
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: paleta.superficie2,
            borderRadius: raio.m,
            paddingHorizontal: espaco.l,
            marginTop: espaco.l,
          }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.acentoTinta }}>
            Compartilhar resultado
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={refazer}
          style={{
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: paleta.superficie2,
            borderRadius: raio.m,
            paddingHorizontal: espaco.l,
            marginTop: espaco.s,
          }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.acentoTinta }}>
            Refazer estação
          </Text>
        </Pressable>
      </View>
    );
  }

  const passoAtual = passos[indice];

  return (
    <View
      style={{
        backgroundColor: paleta.superficie,
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.l,
        padding: espaco.xl,
        ...sombra,
      }}
    >
      <Text
        style={{
          fontFamily: fonte.corpoBold,
          fontSize: tipo.tag,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
          color: paleta.acentoTinta,
          marginBottom: espaco.xs + 2,
        }}
      >
        Estação OSCE
      </Text>
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h3 * escala),
          color: paleta.tinta,
          marginBottom: espaco.xs,
        }}
      >
        {titulo}
      </Text>
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: tipo.small,
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Passo {indice + 1} de {passos.length}
      </Text>

      {revelado ? (
        <>
          <View
            style={{
              backgroundColor: paleta.superficie2,
              borderRadius: raio.m,
              padding: espaco.l,
              marginBottom: espaco.l,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
              {passoAtual}
            </Text>
          </View>
          <BotaoEstacao rotulo="Lembrei" variante="ok" onPress={() => responder(true)} />
          <BotaoEstacao rotulo="Esqueci" variante="erro" onPress={() => responder(false)} />
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: paleta.superficie2,
              borderRadius: raio.m,
              padding: espaco.l,
              marginBottom: espaco.l,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>
              Tente recordar o próximo passo
            </Text>
          </View>
          <BotaoEstacao rotulo="Revelar passo" variante="principal" onPress={() => setRevelado(true)} />
        </>
      )}
    </View>
  );
}
