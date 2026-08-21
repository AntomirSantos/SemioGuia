import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useConteudo, useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { criarIndice, buscar, type ResultadoBusca } from '../../search';

function RotuloSecao({ texto }: { texto: string }) {
  const { paleta } = useTema();
  return (
    <Text
      style={{
        fontFamily: fonte.corpoBold,
        fontSize: tipo.tag,
        letterSpacing: 1.1,
        textTransform: 'uppercase',
        color: paleta.acentoTinta,
        marginBottom: espaco.s,
      }}
    >
      {texto}
    </Text>
  );
}

function LinhaResultado({ titulo, sistemaTitulo, onPress }: { titulo: string; sistemaTitulo?: string; onPress: () => void }) {
  const { paleta } = useTema();
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
      {sistemaTitulo ? (
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: tipo.tag,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: paleta.acentoTinta,
            marginBottom: 2,
          }}
        >
          {sistemaTitulo}
        </Text>
      ) : null}
      <Text style={{ fontFamily: fonte.corpo, fontSize: tipo.corpo, color: paleta.tinta }}>{titulo}</Text>
    </Pressable>
  );
}

export function TelaBusca() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const progresso = useProgresso();
  const indice = useMemo(() => criarIndice(conteudo), [conteudo]);

  const [termo, setTermo] = useState('');
  const [recentes, setRecentes] = useState<string[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const mostraResultados = termo.trim().length >= 2;

  useEffect(() => {
    if (mostraResultados) return;
    let cancelado = false;
    Promise.all([progresso.listarBuscasRecentes(), progresso.listarFavoritos()]).then(([r, f]) => {
      if (cancelado) return;
      setRecentes(r);
      setFavoritos(f);
    });
    return () => {
      cancelado = true;
    };
  }, [progresso, mostraResultados]);

  const resultados: ResultadoBusca[] = mostraResultados ? buscar(indice, termo) : [];

  function abrirTopico(topicoId: string) {
    router.push('/topico/' + topicoId);
  }

  function selecionarResultado(r: ResultadoBusca) {
    progresso.registrarBusca(termo);
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
          <Text style={{ fontFamily: fonte.corpo, fontSize: tipo.corpo, color: paleta.tinta2, marginTop: espaco.m }}>
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
