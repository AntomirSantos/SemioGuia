import { useEffect, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { filtrarSinais, listarSinais, type SinalDePlantao } from '../plantao/sinais';
import { track } from '../analytics/analytics';

// Modo plantão (produto 2026-09): "achei X no exame, e agora?". A resposta
// vem inteira do conteúdo revisado: cada verbete é um bloco `sinal` de um
// tópico, com o achado, o significado, as causas e o salto para o tópico em
// que ele nasce. Sem quiz, sem progresso: é consulta, não estudo.

function CartaoSinal({ sinal, onAbrirTopico }: { sinal: SinalDePlantao; onAbrirTopico: () => void }) {
  const { paleta, escala } = useTema();
  const corpo = Math.round(tipo.corpo * escala);
  const small = Math.round(tipo.small * escala);
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.m,
        paddingVertical: espaco.m,
        paddingHorizontal: espaco.l,
        marginBottom: espaco.l,
        backgroundColor: paleta.superficie,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.s }}>
        <View style={{ width: 8, height: 26, backgroundColor: sinal.sistemaCor, marginRight: espaco.m }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta }}>
            {sinal.nome}
          </Text>
          <Rotulo texto={sinal.sistemaTitulo} cor={paleta.tinta2} style={{ marginTop: 2 }} />
        </View>
      </View>
      <Text
        android_hyphenationFrequency="full"
        style={{
          fontFamily: fonte.corpo,
          fontSize: small,
          lineHeight: Math.round(small * 1.5),
          color: paleta.tinta,
          textAlign: 'justify',
          marginBottom: espaco.s,
        }}
      >
        {sinal.descricao}
      </Text>
      <Rotulo texto="O que significa" cor={paleta.tinta2} />
      <Text
        android_hyphenationFrequency="full"
        style={{
          fontFamily: fonte.corpo,
          fontSize: small,
          lineHeight: Math.round(small * 1.5),
          color: paleta.tinta,
          textAlign: 'justify',
          marginTop: 2,
          marginBottom: espaco.s,
        }}
      >
        {sinal.significado}
      </Text>
      <Rotulo texto="Causas a considerar" cor={paleta.tinta2} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: small,
          lineHeight: Math.round(small * 1.5),
          color: paleta.tinta,
          marginTop: 2,
        }}
      >
        {sinal.causas.join(' · ')}
      </Text>
      <Pressionavel
        accessibilityRole="button"
        onPress={onAbrirTopico}
        style={{
          minHeight: 44,
          justifyContent: 'center',
          alignSelf: 'flex-start',
          marginTop: espaco.s,
        }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: corpo, color: paleta.acentoTinta }}>
          Ver em {sinal.topicoTitulo}
        </Text>
      </Pressionavel>
    </View>
  );
}

export default function Plantao() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const sinais = useMemo(() => listarSinais(conteudo), [conteudo]);
  const [termo, setTermo] = useState('');
  const resultados = useMemo(() => filtrarSinais(sinais, termo), [sinais, termo]);

  useEffect(() => {
    track('plantao_aberto', { sinais: sinais.length });
    // Uma abertura por montagem da tela, como `app_aberto` no layout raiz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function abrirTopico(sinal: SinalDePlantao) {
    track('plantao_sinal_aberto', { sinal: sinal.nome, topicoId: sinal.topicoId, termo: termo.trim() });
    router.push(`/topico/${sinal.topicoId}`);
  }

  return (
    <Tela>
      <Cabecalho titulo="Modo plantão" aoVoltar={() => router.back()} />
      <Text
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          marginBottom: espaco.l,
        }}
      >
        Achou um sinal no exame? Do achado ao significado e às causas, com o caminho de volta ao tópico.
      </Text>
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
          placeholder="Sinal ou achado: sopro, Blumberg, estridor…"
          placeholderTextColor={paleta.tinta2}
          autoFocus={false}
          accessibilityLabel="Buscar sinal ou achado do exame"
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
      {resultados.length > 0 ? (
        resultados.map((sinal) => (
          <CartaoSinal key={`${sinal.topicoId}:${sinal.nome}`} sinal={sinal} onAbrirTopico={() => abrirTopico(sinal)} />
        ))
      ) : (
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.corpo * escala),
            color: paleta.tinta2,
            marginTop: espaco.m,
          }}
        >
          Nenhum sinal com esse nome. A busca geral do app cobre também manobras e tópicos.
        </Text>
      )}
    </Tela>
  );
}
