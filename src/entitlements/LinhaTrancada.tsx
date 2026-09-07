import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { Pressionavel } from '../design/movimento';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { track } from '../analytics/analytics';

// A linha de um item que a assinatura abre. Regra de produto (2026-09-06): o
// conteúdo pago não some da lista, ele aparece trancado, com o nome à vista.
// Esconder faria o aluno achar que o acervo é menor do que é; mostrar o nome
// e o cadeado diz exatamente o que existe do outro lado.

export function LinhaTrancada({
  titulo,
  subtitulo,
  oQue,
  sistemaTitulo,
}: {
  titulo: string;
  subtitulo: string;
  /** O que está trancado, para o registro e para o leitor de tela. */
  oQue: string;
  sistemaTitulo: string;
}) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: paleta.linha }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel={`${titulo}, ${oQue} da assinatura anual, ver o acesso completo`}
        onPress={() => {
          track('bloqueio_visto', { sistema: sistemaTitulo, oQue });
          router.push('/assinatura');
        }}
        style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: espaco.s }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fonte.leituraSemi, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>
            {titulo}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontFamily: fonte.corpo, fontSize: Math.round(12 * escala), color: paleta.tinta2, marginTop: 1 }}
          >
            {subtitulo} · assinatura anual
          </Text>
        </View>
        <Lock size={16} color={paleta.tinta2} style={{ marginLeft: espaco.s }} />
      </Pressionavel>
    </View>
  );
}

/**
 * Faixa de aviso no topo de uma tela cujo conteúdo a assinatura abre. Não
 * esconde a tela: diz o que está trancado e leva a uma única ação.
 */
export function FaixaTrancada({ sistemaTitulo }: { sistemaTitulo: string }) {
  const { paleta, escala } = useTema();
  return (
    <Pressionavel
      accessibilityRole="button"
      accessibilityLabel={`${sistemaTitulo} faz parte da assinatura anual, ver o acesso completo`}
      onPress={() => {
        track('bloqueio_visto', { sistema: sistemaTitulo, oQue: 'sistema' });
        router.push('/assinatura');
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.m,
        paddingHorizontal: espaco.m,
        paddingVertical: espaco.s,
        marginBottom: espaco.l,
      }}
    >
      <Lock size={16} color={paleta.tinta2} />
      <Text
        style={{
          flex: 1,
          marginLeft: espaco.s,
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.4),
          color: paleta.tinta2,
        }}
      >
        {sistemaTitulo} faz parte da assinatura anual. Toque para ver o que ela abre.
      </Text>
    </Pressionavel>
  );
}
