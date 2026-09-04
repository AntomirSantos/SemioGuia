import { useEffect, useMemo, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { Tela } from '../design/Tela';
import { TextoRico } from '../blocos/texto';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { EntradaAnimada } from '../design/EntradaAnimada';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConteudo } from '../content/ContentContext';
import { agruparPorSistema, filtrarSinais, listarSinais, type SinalDePlantao } from '../plantao/sinais';
import { track } from '../analytics/analytics';

// Modo plantão (produto 2026-09): "achei X no exame, e agora?". A resposta
// vem inteira do conteúdo revisado: cada verbete é um bloco `sinal` de um
// tópico. Redesenho (pedido do autor, 2026-09): em vez de um paredão de
// cartões abertos em ordem alfabética, os sinais aparecem agrupados por
// sistema na ordem craniocaudal do guia, como linhas compactas que expandem
// ao toque; a busca filtra os grupos e, com poucos resultados, já os abre.

const LIMIAR_ABRIR_NA_BUSCA = 3;

function chaveDoSinal(sinal: SinalDePlantao): string {
  return `${sinal.topicoId}:${sinal.nome}`;
}

// O verbete aberto: o achado, o que significa, as causas e o salto ao
// tópico. Só aparece quando a linha é expandida: ler é um gesto intencional.
function VerbeteAberto({ sinal, onAbrirTopico }: { sinal: SinalDePlantao; onAbrirTopico: () => void }) {
  const { paleta, escala } = useTema();
  const small = Math.round(tipo.small * escala);
  const corpoTexto = {
    fontFamily: fonte.corpo,
    fontSize: small,
    lineHeight: Math.round(small * 1.5),
    color: paleta.tinta,
    textAlign: 'justify' as const,
  };
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
        <Rotulo texto="O achado" cor={paleta.tinta2} />
        <View style={{ marginTop: 2, marginBottom: espaco.m }}>
          <TextoRico style={corpoTexto}>{sinal.descricao}</TextoRico>
        </View>
        <Rotulo texto="O que significa" cor={paleta.tinta2} />
        <View style={{ marginTop: 2, marginBottom: espaco.m }}>
          <TextoRico style={corpoTexto}>{sinal.significado}</TextoRico>
        </View>
        <Rotulo texto="Causas a considerar" cor={paleta.tinta2} />
        <View style={{ marginTop: 2 }}>
          {sinal.causas.map((causa) => (
            <View key={causa} style={{ flexDirection: 'row', marginBottom: 2 }}>
              <Text style={{ ...corpoTexto, textAlign: 'left', color: paleta.tinta2 }}>{'•'} </Text>
              <View style={{ flex: 1 }}>
                <TextoRico style={{ ...corpoTexto, textAlign: 'left' }}>{causa}</TextoRico>
              </View>
            </View>
          ))}
        </View>
        <Pressionavel
          accessibilityRole="button"
          onPress={onAbrirTopico}
          style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
            Ver em {sinal.topicoTitulo}
          </Text>
        </Pressionavel>
      </View>
    </EntradaAnimada>
  );
}

function LinhaSinal({
  sinal,
  aberto,
  onToggle,
  onAbrirTopico,
}: {
  sinal: SinalDePlantao;
  aberto: boolean;
  onToggle: () => void;
  onAbrirTopico: () => void;
}) {
  const { paleta, escala } = useTema();
  const Chevron = aberto ? ChevronUp : ChevronDown;
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: paleta.linha }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        accessibilityLabel={`${sinal.nome}, ${aberto ? 'recolher' : 'abrir'}`}
        onPress={onToggle}
        style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: espaco.s }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: fonte.leituraSemi,
              fontSize: Math.round(tipo.corpo * escala),
              color: paleta.tinta,
            }}
          >
            {sinal.nome}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: fonte.corpo,
              fontSize: Math.round(12 * escala),
              color: paleta.tinta2,
              marginTop: 1,
            }}
          >
            {sinal.topicoTitulo}
          </Text>
        </View>
        <Chevron size={18} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
      {aberto ? <VerbeteAberto sinal={sinal} onAbrirTopico={onAbrirTopico} /> : null}
    </View>
  );
}

export default function Plantao() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const sinais = useMemo(() => listarSinais(conteudo), [conteudo]);
  const [termo, setTermo] = useState('');
  const [abertos, setAbertos] = useState<Set<string>>(new Set());

  const resultados = useMemo(() => filtrarSinais(sinais, termo), [sinais, termo]);
  // Os grupos seguem sempre a ordem craniocaudal do guia; a busca só decide
  // quem aparece dentro deles.
  const grupos = useMemo(() => {
    const visiveis = new Set(resultados);
    return agruparPorSistema(sinais.filter((s) => visiveis.has(s)));
  }, [sinais, resultados]);

  const buscando = termo.trim().length > 0;
  // Com poucos resultados a leitura é o próximo gesto óbvio: abre direto.
  const abertosNaBusca = useMemo(
    () => (buscando && resultados.length <= LIMIAR_ABRIR_NA_BUSCA ? new Set(resultados.map(chaveDoSinal)) : null),
    [buscando, resultados],
  );

  useEffect(() => {
    track('plantao_aberto', { sinais: sinais.length });
    // Uma abertura por montagem da tela, como `app_aberto` no layout raiz.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alternar(sinal: SinalDePlantao) {
    const chave = chaveDoSinal(sinal);
    setAbertos((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(chave)) proximo.delete(chave);
      else proximo.add(chave);
      return proximo;
    });
  }

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
        Achou um sinal no exame? Toque para abrir o verbete: o achado, o significado, as causas e o caminho de volta ao tópico.
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 44,
          borderRadius: raio.l,
          backgroundColor: paleta.superficie2,
          paddingHorizontal: espaco.m,
          marginBottom: espaco.s,
        }}
      >
        <Search size={18} color={paleta.tinta2} />
        <TextInput
          value={termo}
          onChangeText={setTermo}
          placeholder="Sinal ou achado: Blumberg, Murphy, pulso paradoxal…"
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
      <Rotulo
        texto={
          buscando
            ? `${resultados.length} ${resultados.length === 1 ? 'sinal' : 'sinais'}`
            : `${sinais.length} sinais na ordem do guia`
        }
        cor={paleta.tinta2}
        style={{ marginBottom: espaco.m }}
      />

      {grupos.map((grupo) => (
        <View key={grupo.sistemaTitulo} style={{ marginBottom: espaco.l }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs }}>
            <View style={{ width: 8, height: 18, backgroundColor: grupo.sistemaCor, marginRight: espaco.m }} />
            <Rotulo texto={grupo.sistemaTitulo} cor={paleta.tinta2} />
          </View>
          {grupo.sinais.map((sinal) => {
            const chave = chaveDoSinal(sinal);
            return (
              <LinhaSinal
                key={chave}
                sinal={sinal}
                aberto={abertosNaBusca ? abertosNaBusca.has(chave) : abertos.has(chave)}
                onToggle={() => alternar(sinal)}
                onAbrirTopico={() => abrirTopico(sinal)}
              />
            );
          })}
        </View>
      ))}

      {grupos.length === 0 ? (
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
      ) : null}
    </Tela>
  );
}
