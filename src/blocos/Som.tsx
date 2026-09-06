import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Pause, Play, Volume2 } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { Pressionavel } from '../design/movimento';
import { AVISO_SOM_GRAVACAO, AVISO_SOM_GRAVACAO_CARDIACA, AVISO_SOM_SINTETIZADO, FONTES_DE_SOM, ORIGEM_DE_SOM, SONS_DO_CIRCOR } from '../config/sons';
import { ENVELOPES_DE_SOM } from '../config/envelopes';
import { DURACAO_MAX_DE_SOM_MS, assumirReproducao, encerrarReproducao } from '../audio/reprodutor-unico';
import { IdentidadeBloco } from './identidade';

type SomBloco = Extract<Bloco, { tipo: 'som' }>;

// Fonocardiograma (pedido do autor, 2026-09): o envelope do som desenhado em
// barras, com o trecho já tocado tingido de acento. Liga o que se ouve ao
// que se vê: B1/B2 são os picos, o sopro é o platô entre eles. O cursor vem
// de currentTime/duration do próprio player, então acompanha o loop.
function Fonocardiograma({ arquivo, fracao, tocando }: { arquivo: string; fracao: number; tocando: boolean }) {
  const { paleta } = useTema();
  const envelope = ENVELOPES_DE_SOM[arquivo];
  if (!envelope) return null;
  const limite = Math.floor(fracao * envelope.length);
  return (
    <View
      accessible={false}
      style={{ flexDirection: 'row', alignItems: 'flex-end', height: 34, gap: 1, marginTop: espaco.m }}
    >
      {envelope.map((valor, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: Math.max(2, Math.round(valor * 34)),
            borderRadius: 1,
            backgroundColor: tocando && i <= limite ? paleta.acento : paleta.linha,
          }}
        />
      ))}
    </View>
  );
}

// Bloco de ausculta (didática 2026-09): o som tocável dentro do tópico,
// B1/B2, sopros, murmúrio, sibilos, estertores. Os arquivos são sintetizados
// por scripts/gerar-sons.py (livres de direitos) e o aviso deixa claro ao
// estudante que é representação didática, não gravação clínica. O player
// toca em loop enquanto ativo: ausculta se escuta em ciclos, não em takes.
// Só um som toca por vez em todo o app (reprodutor-unico), e cada clique
// concede no máximo DURACAO_MAX_DE_SOM_MS de escuta antes de pausar sozinho.
export function Som({ bloco }: { bloco: SomBloco }) {
  const { paleta, escala } = useTema();
  const player = useAudioPlayer(FONTES_DE_SOM[bloco.arquivo]);
  const status = useAudioPlayerStatus(player);
  const tocando = status.playing;
  const corpo = Math.round(tipo.corpo * escala);
  const small = Math.round(tipo.small * escala);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref estável por instância: identifica este bloco junto ao coordenador
  // mesmo quando o player é recriado entre renders.
  const paradorRef = useRef<() => void>(() => {});
  paradorRef.current = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    try {
      player.pause();
    } catch {
      // O player pode já ter sido liberado no desmonte; pausar vira no-op.
    }
  };

  useEffect(() => {
    return () => {
      paradorRef.current();
      encerrarReproducao(paradorRef);
    };
  }, []);

  function alternar() {
    if (tocando) {
      paradorRef.current();
      encerrarReproducao(paradorRef);
      return;
    }
    assumirReproducao(paradorRef);
    player.loop = true;
    player.play();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      paradorRef.current();
      encerrarReproducao(paradorRef);
    }, DURACAO_MAX_DE_SOM_MS);
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.m,
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        marginVertical: espaco.l,
        backgroundColor: paleta.superficie,
      }}
    >
      <IdentidadeBloco Icone={Volume2} rotulo="Ausculta" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: espaco.m }}>
        <Pressionavel
          accessibilityRole="button"
          accessibilityLabel={tocando ? `Pausar ${bloco.titulo}` : `Ouvir ${bloco.titulo}`}
          onPress={alternar}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: paleta.acento,
          }}
        >
          {tocando ? (
            <Pause size={20} color={paleta.superficie} fill={paleta.superficie} />
          ) : (
            <Play size={20} color={paleta.superficie} fill={paleta.superficie} style={{ marginLeft: 2 }} />
          )}
        </Pressionavel>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonte.leituraSemi, fontSize: corpo, color: paleta.tinta }}>{bloco.titulo}</Text>
          <Text
            android_hyphenationFrequency="full"
            style={{
              fontFamily: fonte.corpo,
              fontSize: small,
              lineHeight: Math.round(small * 1.45),
              color: paleta.tinta2,
              marginTop: 2,
              textAlign: 'justify',
            }}
          >
            {bloco.descricao}
          </Text>
        </View>
      </View>
      <Fonocardiograma
        arquivo={bloco.arquivo}
        fracao={status.duration > 0 ? (status.currentTime ?? 0) / status.duration : 0}
        tocando={tocando}
      />
      <View style={{ borderTopWidth: 1, borderTopColor: paleta.linha, marginTop: espaco.m, paddingTop: espaco.s }}>
        <Text style={{ fontFamily: fonte.corpo, fontSize: tipo.tag + 1, color: paleta.tinta2 }}>
          {ORIGEM_DE_SOM[bloco.arquivo] !== 'gravacao'
            ? AVISO_SOM_SINTETIZADO
            : SONS_DO_CIRCOR.has(bloco.arquivo)
              ? AVISO_SOM_GRAVACAO_CARDIACA
              : AVISO_SOM_GRAVACAO}
        </Text>
      </View>
    </View>
  );
}
