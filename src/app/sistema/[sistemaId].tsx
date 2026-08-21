import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useSistema } from '../../content/ContentContext';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import type { Capitulo, Topico } from '../../content/schema';

function LinhaTopico({ topico, estudado }: { topico: Topico; estudado: boolean }) {
  const { paleta, escala } = useTema();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/topico/${topico.id}`)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: espaco.m,
        borderTopWidth: 1,
        borderTopColor: paleta.linha,
        minHeight: 44,
      }}
    >
      <Text style={{ flex: 1, fontFamily: fonte.corpo, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>
        {topico.titulo}
      </Text>
      {estudado ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: paleta.linha,
            borderRadius: raio.pill,
            paddingHorizontal: espaco.s + 2,
            paddingVertical: 3,
            marginLeft: espaco.s,
          }}
        >
          <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, color: paleta.acentoTinta, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            Estudado
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function SecaoCapitulo({ capitulo, estudados }: { capitulo: Capitulo; estudados: Set<string> }) {
  const { paleta, escala } = useTema();
  const topicos = [...capitulo.topicos].sort((a, b) => a.ordem - b.ordem);
  return (
    <View style={{ marginBottom: espaco.xl }}>
      <Text style={{ fontFamily: fonte.displaySemi, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.xs }}>
        {capitulo.titulo}
      </Text>
      {topicos.map((topico) => (
        <LinhaTopico key={topico.id} topico={topico} estudado={estudados.has(topico.id)} />
      ))}
    </View>
  );
}

export default function TelaSistema() {
  const { sistemaId } = useLocalSearchParams<{ sistemaId: string }>();
  const sistema = useSistema(sistemaId);
  const progresso = useProgresso();
  const carregarEstudados = useCallback(async () => new Set(await progresso.listarEstudados()), [progresso]);
  const estudados = useDadosAoFocar(carregarEstudados) ?? new Set<string>();

  if (!sistema) {
    return (
      <Tela>
        <Cabecalho titulo="Sistema não encontrado" aoVoltar={() => router.back()} />
      </Tela>
    );
  }

  const capitulos = [...sistema.capitulos].sort((a, b) => a.ordem - b.ordem);

  return (
    <Tela>
      <Cabecalho titulo={sistema.titulo} cor={sistema.cor} aoVoltar={() => router.back()} />
      {capitulos.map((capitulo) => (
        <SecaoCapitulo key={capitulo.id} capitulo={capitulo} estudados={estudados} />
      ))}
    </Tela>
  );
}
