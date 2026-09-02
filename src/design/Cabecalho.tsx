import { Text, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTema } from './ThemeContext';
import { Pressionavel } from './movimento';
import { espaco, fonte, raio, tipo } from './tokens';

// Cabeçalho compartilhado das telas de capítulos e tópico: botão voltar
// (44pt, acessível, wash de papel) + título display em Bodoni. Na identidade
// editorial o chevron é sempre TINTA — a identidade do sistema aparece num
// filete de cor ao lado do título (`cor`, ex.: sistema.cor), nunca tingindo
// o controle de navegação.
export function Cabecalho({ titulo, aoVoltar, cor }: { titulo: string; aoVoltar: () => void; cor?: string }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.l }}>
      <Pressionavel
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        onPress={aoVoltar}
        hitSlop={8}
        style={{
          width: 44,
          height: 44,
          borderRadius: raio.m,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: paleta.superficie2,
          marginRight: espaco.m,
        }}
      >
        <ChevronLeft size={22} color={paleta.tinta} />
      </Pressionavel>
      {cor && titulo ? <View style={{ width: 8, height: 34, backgroundColor: cor, marginRight: espaco.m }} /> : null}
      <Text
        style={{ flex: 1, fontFamily: fonte.display, fontSize: Math.round(tipo.h2 * escala), color: paleta.tinta }}
        numberOfLines={2}
      >
        {titulo}
      </Text>
    </View>
  );
}
