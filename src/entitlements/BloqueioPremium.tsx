import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { Tela } from '../design/Tela';
import { Cabecalho } from '../design/Cabecalho';
import { Rotulo } from '../design/Rotulo';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';

// Tela de bloqueio placeholder (beta §9.10): aparece só com PAYWALL_ATIVO
// ligado, em tópicos de sistemas premium. Sem pagamento integrado: o
// texto é temporário de propósito.
export function BloqueioPremium({ sistemaTitulo }: { sistemaTitulo: string }) {
  const { paleta, escala } = useTema();
  return (
    <Tela>
      <Cabecalho titulo="" aoVoltar={() => router.back()} />
      <Rotulo texto="Conteúdo premium" style={{ marginBottom: espaco.xs + 2 }} />
      <Text
        style={{
          fontFamily: fonte.display,
          fontSize: Math.round(tipo.h2 * escala),
          lineHeight: Math.round(tipo.h2 * escala * 1.2),
          color: paleta.tinta,
          marginBottom: espaco.m,
        }}
      >
        {sistemaTitulo} faz parte do guia completo
      </Text>
      <Text
        style={{
          fontFamily: fonte.leitura,
          fontSize: Math.round(tipo.corpo * escala),
          lineHeight: Math.round(tipo.corpo * escala * 1.62),
          color: paleta.tinta2,
          marginBottom: espaco.xl,
        }}
      >
        Durante o beta, todo o conteúdo está aberto. Em breve, este sistema fará parte do acesso
        completo: os aparelhos cardiovascular e respiratório continuam gratuitos.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        style={{
          minHeight: 48,
          alignSelf: 'flex-start',
          justifyContent: 'center',
          paddingHorizontal: espaco.l,
          borderRadius: raio.m,
          backgroundColor: paleta.superficie2,
        }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.acentoTinta }}>
          Voltar
        </Text>
      </Pressable>
    </Tela>
  );
}
