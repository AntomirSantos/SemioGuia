import { useCallback } from 'react';
import { Check, Lock } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Tela } from '../../design/Tela';
import { Cabecalho } from '../../design/Cabecalho';
import { Pressionavel } from '../../design/movimento';
import { useTema } from '../../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../../design/tokens';
import { useSistema } from '../../content/ContentContext';
import { useDesbloqueio } from '../../anuncios/DesbloqueioContext';
import { ParedeOffline, PortaoDeAnuncio } from '../../anuncios/PecasDeAnuncio';
import { useProgresso } from '../../progress/ProgressContext';
import { useDadosAoFocar } from '../../progress/useDadosAoFocar';
import type { Capitulo, Topico } from '../../content/schema';

// Indicador de estudado por tópico (spec Fase 8 §3.3): checkmark visual, não
// só texto: reaproveita o par `ok`/`okFundo` já usado em quiz/estação/caso
// para "correto"/"lembrei", mesmo significado semântico aqui ("estudado").
// Puramente decorativo (o estado real está no `accessibilityLabel` do
// próprio botão da linha), então não precisa de role próprio.
function IndicadorEstudado({ estudado }: { estudado: boolean }) {
  const { paleta } = useTema();
  return (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        borderColor: estudado ? paleta.ok : paleta.linha,
        backgroundColor: estudado ? paleta.okFundo : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: espaco.s,
      }}
    >
      {estudado ? <Check size={13} color={paleta.ok} strokeWidth={3} /> : null}
    </View>
  );
}

function LinhaTopico({ topico, estudado, trancado }: { topico: Topico; estudado: boolean; trancado: boolean }) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      accessibilityLabel={
        trancado ? `${topico.titulo}, da assinatura anual` : `${topico.titulo}${estudado ? ', estudado' : ''}`
      }
      onPress={() => router.push(trancado ? '/sem-anuncios' : `/topico/${topico.id}`)}
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
      <Text
        style={{
          flex: 1,
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.corpo * escala),
          color: trancado ? paleta.tinta2 : paleta.tinta,
        }}
      >
        {topico.titulo}
      </Text>
      {trancado ? (
        <Lock size={16} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      ) : (
        <IndicadorEstudado estudado={estudado} />
      )}
    </Pressionavel>
  );
}

function SecaoCapitulo({
  capitulo,
  estudados,
  trancado,
}: {
  capitulo: Capitulo;
  estudados: Set<string>;
  trancado: boolean;
}) {
  const { paleta, escala } = useTema();
  const topicos = [...capitulo.topicos].sort((a, b) => a.ordem - b.ordem);
  const total = topicos.length;
  const estudadosCount = topicos.filter((t) => estudados.has(t.id)).length;
  return (
    <View style={{ marginBottom: espaco.xl }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: espaco.xs }}>
        <Text style={{ fontFamily: fonte.displaySemi, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta }}>
          {capitulo.titulo}
        </Text>
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
          {trancado ? `${total} tópicos` : `${estudadosCount} de ${total} estudados`}
        </Text>
      </View>
      {topicos.map((topico) => (
        <LinhaTopico key={topico.id} topico={topico} estudado={estudados.has(topico.id)} trancado={trancado} />
      ))}
    </View>
  );
}

export default function TelaSistema() {
  const { sistemaId } = useLocalSearchParams<{ sistemaId: string }>();
  const sistema = useSistema(sistemaId);
  const desbloqueio = useDesbloqueio();
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

  // Regime de anúncios: sem conexão, pede conexão; sistema ainda não aberto
  // nesta sessão, pede o anúncio. O índice do sistema aparece inteiro depois.
  if (desbloqueio.exigindoConexao) return <ParedeOffline comCabecalho />;
  if (!desbloqueio.liberado('guia', sistema.id)) {
    return (
      <PortaoDeAnuncio
        aba="guia"
        sistemaId={sistema.id}
        sistemaTitulo={sistema.titulo}
        oQue="os tópicos, as manobras e as ilustrações"
      />
    );
  }

  const capitulos = [...sistema.capitulos].sort((a, b) => a.ordem - b.ordem);
  const trancado = false;

  return (
    <Tela>
      <Cabecalho titulo={sistema.titulo} cor={sistema.cor} aoVoltar={() => router.back()} />
      {capitulos.map((capitulo) => (
        <SecaoCapitulo key={capitulo.id} capitulo={capitulo} estudados={estudados} trancado={trancado} />
      ))}
    </Tela>
  );
}
