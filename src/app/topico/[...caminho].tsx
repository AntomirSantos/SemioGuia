import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Heart, CheckCircle2 } from 'lucide-react-native';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Rotulo } from '../../design/Rotulo';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useSistema, useTopico } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { BlocoView } from '../../blocos/Bloco';
import type { QuizPergunta } from '../../content/schema';

function TelaNaoEncontrada() {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        Tópico não encontrado
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

function BotaoAcao({
  ativo,
  rotulo,
  rotuloAtivo,
  Icone,
  onPress,
}: {
  ativo: boolean;
  rotulo: string;
  rotuloAtivo: string;
  Icone: typeof Heart;
  onPress: () => void;
}) {
  const { paleta } = useTema();
  const cor = ativo ? paleta.acento : paleta.tinta2;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      accessibilityState={{ selected: ativo }}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        paddingHorizontal: espaco.m,
        borderRadius: raio.pill,
        borderWidth: 1,
        borderColor: ativo ? paleta.acento : paleta.linha,
        marginRight: espaco.s,
      }}
    >
      <Icone size={18} color={cor} fill={ativo ? cor : 'none'} />
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.small, color: cor, marginLeft: espaco.xs + 2 }}>
        {ativo ? rotuloAtivo : rotulo}
      </Text>
    </Pressable>
  );
}

export function TelaTopico({ topicoId }: { topicoId: string }) {
  const { paleta, escala } = useTema();
  const topico = useTopico(topicoId);
  const sistema = useSistema(topico?.sistemaId ?? '');
  const progresso = useProgresso();
  const [estudado, setEstudado] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    let cancelado = false;
    Promise.all([progresso.listarEstudados(), progresso.listarFavoritos()]).then(([estudados, favoritos]) => {
      if (cancelado) return;
      setEstudado(estudados.includes(topicoId));
      setFavorito(favoritos.includes(topicoId));
    });
    return () => {
      cancelado = true;
    };
  }, [progresso, topicoId]);

  if (!topico) {
    return <TelaNaoEncontrada />;
  }

  const capitulo = sistema?.capitulos.find((c) => c.id === topico.capituloId);

  function alternarEstudado() {
    const novo = !estudado;
    setEstudado(novo);
    progresso.marcarEstudado(topicoId, novo).catch(() => {});
  }

  function alternarFavorito() {
    const novo = !favorito;
    setFavorito(novo);
    progresso.favoritar(topicoId, novo).catch(() => {});
  }

  function iniciarQuiz(_perguntas: QuizPergunta[]) {
    router.push(`/quiz/${topicoId}`);
  }

  return (
    <Tela>
      <Cabecalho titulo="" cor={sistema?.cor} aoVoltar={() => router.back()} />
      <Rotulo
        texto={`${sistema?.titulo ?? ''}${capitulo ? ` · ${capitulo.titulo}` : ''}`}
        style={{ marginBottom: espaco.xs + 2 }}
      />
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h1 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        {topico.titulo}
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: espaco.l }}>
        {topico.revisao === 'pendente' ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: paleta.perolaBorda,
              backgroundColor: paleta.perolaFundo,
              borderRadius: raio.pill,
              paddingHorizontal: espaco.s + 2,
              paddingVertical: 3,
              marginRight: espaco.xs,
              marginBottom: espaco.xs,
            }}
          >
            <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, color: paleta.perolaTexto }}>
              revisão pendente
            </Text>
          </View>
        ) : null}
        {topico.tags.slice(0, 5).map((tag) => (
          <View
            key={tag}
            style={{
              borderWidth: 1,
              borderColor: paleta.linha,
              borderRadius: raio.pill,
              paddingHorizontal: espaco.s + 2,
              paddingVertical: 3,
              marginRight: espaco.xs,
              marginBottom: espaco.xs,
            }}
          >
            <Text style={{ fontFamily: fonte.corpo, fontSize: tipo.tag, color: paleta.tinta2 }}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginBottom: espaco.l }}>
        <BotaoAcao ativo={favorito} rotulo="Favoritar" rotuloAtivo="Favoritado" Icone={Heart} onPress={alternarFavorito} />
        <BotaoAcao ativo={estudado} rotulo="Marcar estudado" rotuloAtivo="Estudado" Icone={CheckCircle2} onPress={alternarEstudado} />
      </View>

      {topico.blocos.map((bloco, i) => (
        <BlocoView key={i} bloco={bloco} onIniciarQuiz={iniciarQuiz} topicoId={topicoId} />
      ))}

      <View style={{ marginTop: espaco.xl, paddingTop: espaco.l, borderTopWidth: 1, borderTopColor: paleta.linha }}>
        <Rotulo texto="Referências" style={{ marginBottom: espaco.xs }} />
        {topico.referencias.map((referencia, i) => (
          <Text
            key={i}
            style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2, marginBottom: espaco.xs }}
          >
            {referencia}
          </Text>
        ))}
      </View>
    </Tela>
  );
}

export default function TopicoRoute() {
  const { caminho } = useLocalSearchParams<{ caminho: string | string[] }>();
  const topicoId = Array.isArray(caminho) ? caminho.join('/') : (caminho ?? '');
  return <TelaTopico topicoId={topicoId} />;
}
