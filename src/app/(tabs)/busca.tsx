import { useCallback, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { useTema } from '../../design/ThemeContext';
import { Rotulo } from '../../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo, useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import { criarIndice, buscar, type ResultadoBusca } from '../../search';

function RotuloSecao({ texto }: { texto: string }) {
  return <Rotulo texto={texto} style={{ marginBottom: espaco.s }} />;
}

function LinhaResultado({ titulo, sistemaTitulo, onPress }: { titulo: string; sistemaTitulo?: string; onPress: () => void }) {
  const { paleta, escala } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        minHeight: 44,
        justifyContent: 'center',
        paddingVertical: espaco.s,
        paddingHorizontal: espaco.m,
        borderRadius: raio.m,
        backgroundColor: paleta.superficie,
        borderWidth: 1,
        borderColor: paleta.linha,
        marginBottom: espaco.s,
      }}
    >
      {sistemaTitulo ? <Rotulo texto={sistemaTitulo} style={{ marginBottom: 2 }} /> : null}
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{titulo}</Text>
    </Pressable>
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
          borderRadius: raio.m,
          borderWidth: 1,
          borderColor: paleta.linha,
          backgroundColor: paleta.superficie,
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
              key={r.topicoId}
              titulo={r.titulo}
              sistemaTitulo={r.sistemaTitulo}
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
