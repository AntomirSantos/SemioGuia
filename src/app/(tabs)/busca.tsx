import { useCallback, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { Pressionavel } from '../../design/movimento';
import { useTema } from '../../design/ThemeContext';
import { Rotulo, RotuloDeSecao } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo, useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { criarIndice, buscar, type ResultadoBusca } from '../../search';
import { track } from '../../analytics/analytics';

function RotuloSecao({ texto }: { texto: string }) {
  return <RotuloDeSecao texto={texto} />;
}

function LinhaResultado({
  titulo,
  sistemaTitulo,
  detalhe,
  onPress,
}: {
  titulo: string;
  sistemaTitulo?: string;
  detalhe?: string;
  onPress: () => void;
}) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        paddingVertical: espaco.m,
        borderBottomWidth: 1,
        borderBottomColor: paleta.linha,
      }}
    >
      {sistemaTitulo ? <Rotulo texto={sistemaTitulo} cor={paleta.tinta2} style={{ marginBottom: 2 }} /> : null}
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{titulo}</Text>
      {detalhe ? (
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 1 }}>
          {detalhe}
        </Text>
      ) : null}
    </Pressionavel>
  );
}

export function TelaBusca() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const indice = useMemo(() => criarIndice(conteudo), [conteudo]);

  const [termo, setTermo] = useState('');

  const mostraResultados = termo.trim().length >= 2;

  const carregarRecentesFavoritos = useCallback(async () => {
    const [recentes, favoritos] = await Promise.all([
      progresso.listarBuscasRecentes(),
      progresso.listarFavoritos(),
    ]);
    return { recentes, favoritos };
  }, [progresso]);
  const dados = useDadosAoFocar(carregarRecentesFavoritos);
  const recentes = dados?.recentes ?? [];
  const favoritos = dados?.favoritos ?? [];

  const resultados: ResultadoBusca[] = mostraResultados ? buscar(indice, termo) : [];

  function abrirTopico(topicoId: string) {
    router.push(`/topico/${topicoId}`);
  }

  function selecionarResultado(r: ResultadoBusca) {
    progresso.registrarBusca(termo.trim()).catch(() => {});
    // Instrumentação do beta (§4): registra a busca no momento em que ela
    // rende um clique (mesma semântica do histórico de buscas recentes),
    // não a cada tecla digitada.
    track('busca_realizada', { termo: termo.trim(), resultados: resultados.length, topicoId: r.topicoId });
    // Resultado de bloco (sinal ou checklist) abre o tópico já na parte
    // certa: a âncora diz à tela do tópico onde parar.
    if (r.ancora) {
      router.push(`/topico/${r.topicoId}?ancora=${encodeURIComponent(r.ancora)}`);
      return;
    }
    abrirTopico(r.topicoId);
  }

  function selecionarRecente(t: string) {
    setTermo(t);
  }

  return (
    <Tela>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 44,
          borderRadius: raio.l,
          backgroundColor: paleta.superficie2,
          paddingHorizontal: espaco.m,
          marginBottom: espaco.l,
        }}
      >
        <Search size={18} color={paleta.tinta2} />
        <TextInput
          value={termo}
          onChangeText={setTermo}
          placeholder="Sinal, manobra, tópico…"
          placeholderTextColor={paleta.tinta2}
          autoFocus={false}
          accessibilityLabel="Buscar sinal, manobra ou tópico"
          style={{
            flex: 1,
            marginLeft: espaco.s,
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta,
            paddingVertical: espaco.s,
          }}
        />
      </View>

      {mostraResultados ? (
        resultados.length > 0 ? (
          resultados.map((r) => (
            <LinhaResultado
              key={r.id}
              titulo={r.titulo}
              sistemaTitulo={r.sistemaTitulo}
              detalhe={r.tipo === 'topico' ? undefined : `${r.tipo === 'checklist' ? 'Checklist' : 'Sinal'} em ${r.topicoTitulo}`}
              onPress={() => selecionarResultado(r)}
            />
          ))
        ) : (
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2, marginTop: espaco.m }}>
            Nada com esse nome. Tente o epônimo ou uma sigla.
          </Text>
        )
      ) : (
        <>
          {recentes.length > 0 ? (
            <View style={{ marginBottom: espaco.l }}>
              <RotuloSecao texto="Recentes" />
              {recentes.map((t) => (
                <LinhaResultado key={t} titulo={t} onPress={() => selecionarRecente(t)} />
              ))}
            </View>
          ) : null}

          {favoritos.length > 0 ? (
            <View>
              <RotuloSecao texto="Favoritos" />
              {favoritos.map((topicoId) => (
                <LinhaFavorito key={topicoId} topicoId={topicoId} onPress={() => abrirTopico(topicoId)} />
              ))}
            </View>
          ) : null}
        </>
      )}
    </Tela>
  );
}

function LinhaFavorito({ topicoId, onPress }: { topicoId: string; onPress: () => void }) {
  const topico = useTopico(topicoId);
  if (!topico) return null;
  return <LinhaResultado titulo={topico.titulo} onPress={onPress} />;
}

export default function Busca() {
  return <TelaBusca />;
}
