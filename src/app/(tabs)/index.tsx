import { useCallback } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Rotulo } from '../../design/Rotulo';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { obterIcone } from '../../design/icones';
import { useConteudo } from '../../content/ContentContext';
import { listarSistemas, obterSistema, obterTopico } from '../../content/store';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import type { Conteudo, Sistema, Topico } from '../../content/schema';

function contarTopicos(sistema: Sistema): number {
  return sistema.capitulos.reduce((total, capitulo) => total + capitulo.topicos.length, 0);
}

// Barra de progresso do cartão de sistema (spec Fase 8 §3.3): elemento não
// textual, então a cor do sistema tinge livremente o preenchimento — mesma
// lógica de contraste da Task 1 (cor de sistema nunca vira cor de texto,
// só acento decorativo/estado).
function BarraProgressoSistema({ estudados, total, cor }: { estudados: number; total: number; cor: string }) {
  const { paleta } = useTema();
  const percentual = total > 0 ? estudados / total : 0;
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`${estudados} de ${total} ${total === 1 ? 'tópico estudado' : 'tópicos estudados'}`}
      accessibilityValue={{ min: 0, max: total, now: estudados }}
      style={{
        height: 4,
        borderRadius: 2,
        backgroundColor: paleta.superficie,
        overflow: 'hidden',
        marginTop: espaco.s,
      }}
    >
      <View style={{ width: `${Math.round(percentual * 100)}%`, height: '100%', backgroundColor: cor, borderRadius: 2 }} />
    </View>
  );
}

function CartaoSistema({ sistema, estudados }: { sistema: Sistema; estudados: number }) {
  const { paleta, escala } = useTema();
  const Icone = obterIcone(sistema.icone);
  const totalTopicos = contarTopicos(sistema);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/sistema/${sistema.id}`)}
      style={{
        width: '48%',
        alignItems: 'stretch',
        backgroundColor: `${sistema.cor}24`,
        borderRadius: raio.l,
        padding: espaco.l,
        marginBottom: espaco.m,
        minHeight: 132,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: raio.m,
          backgroundColor: paleta.superficie,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: espaco.m,
        }}
      >
        <Icone size={22} color={sistema.cor} />
      </View>
      {/* Revisão de fase P2: `alignSelf`/`flexShrink` (rodada anterior) não
          bastavam — a palavra "cardiovascular" sozinha, em `tipo.h3` (19px),
          já é mais larga que a coluna útil do cartão (48% de 350px menos
          padding, ~136px), então ela nunca chegava a "quebrar": truncava na
          1ª linha antes de tentar a 2ª. `adjustsFontSizeToFit` não existe no
          react-native-web (fica sem efeito no build web, inverificável por
          Chromium), então o fix real é reduzir o tamanho de base do título
          nos cartões (`tipo.corpo`, 16px, ainda claramente um título via
          peso/família) + `numberOfLines={3}` como margem para nomes futuros
          maiores. Verificado a 390px, claro e escuro. */}
      <Text
        style={{
          fontFamily: fonte.displaySemi,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta,
          marginBottom: espaco.xs,
          alignSelf: 'stretch',
          flexShrink: 1,
        }}
        numberOfLines={3}
      >
        {sistema.titulo}
      </Text>
      <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
        {estudados} de {totalTopicos} {totalTopicos === 1 ? 'tópico' : 'tópicos'}
      </Text>
      <BarraProgressoSistema estudados={estudados} total={totalTopicos} cor={sistema.cor} />
    </Pressable>
  );
}

// "Continuar de onde parou" (spec §3.3): último tópico aberto, lido de uma
// preferência local (chave `ultimoTopico`, gravada por TelaTopico ao abrir
// qualquer tópico). Sem card nenhum se ainda não há preferência gravada, ou
// se o id salvo não existe mais no conteúdo atual (defensivo).
function CartaoContinuar({ topico, sistema }: { topico: Topico; sistema: Sistema }) {
  const { paleta, escala } = useTema();
  const Icone = obterIcone(sistema.icone);
  return (
    <View style={{ marginBottom: espaco.xl }}>
      <Rotulo texto="Continuar de onde parou" style={{ marginBottom: espaco.s }} />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push(`/topico/${topico.id}`)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${sistema.cor}24`,
          borderRadius: raio.l,
          padding: espaco.l,
          minHeight: 44,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: raio.m,
            backgroundColor: paleta.superficie,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: espaco.m,
          }}
        >
          <Icone size={22} color={sistema.cor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{ fontFamily: fonte.displaySemi, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}
            numberOfLines={1}
          >
            {topico.titulo}
          </Text>
          <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
            {sistema.titulo}
          </Text>
        </View>
        <ChevronRight size={20} color={paleta.tinta2} />
      </Pressable>
    </View>
  );
}

function useUltimoTopico(conteudo: Conteudo): { topico: Topico; sistema: Sistema } | null | undefined {
  const progresso = useProgresso();
  const carregar = useCallback(async () => {
    const id = await progresso.obterPreferencia('ultimoTopico');
    if (!id) return null;
    const topico = obterTopico(conteudo, id);
    if (!topico) return null;
    const sistema = obterSistema(conteudo, topico.sistemaId);
    if (!sistema) return null;
    return { topico, sistema };
  }, [progresso, conteudo]);
  return useDadosAoFocar(carregar);
}

export default function Guia() {
  const { paleta, escala } = useTema();
  const conteudo = useConteudo();
  const sistemas = listarSistemas(conteudo);
  const progresso = useProgresso();

  const carregarEstudados = useCallback(async () => new Set(await progresso.listarEstudados()), [progresso]);
  const estudados = useDadosAoFocar(carregarEstudados) ?? new Set<string>();
  const ultimo = useUltimoTopico(conteudo);

  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h1 * escala), color: paleta.tinta, marginBottom: espaco.xl }}>
        SemioGuia
      </Text>
      {ultimo ? <CartaoContinuar topico={ultimo.topico} sistema={ultimo.sistema} /> : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {sistemas.map((sistema) => {
          const topicosDoSistema = sistema.capitulos.flatMap((c) => c.topicos);
          const estudadosCount = topicosDoSistema.filter((t) => estudados.has(t.id)).length;
          return <CartaoSistema key={sistema.id} sistema={sistema} estudados={estudadosCount} />;
        })}
      </View>
    </Tela>
  );
}
