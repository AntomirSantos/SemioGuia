import { View } from 'react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { TextoRico } from './texto';

type PerolaBloco = Extract<Bloco, { tipo: 'perola' }>;

// Pull-quote editorial (identidade R2): a pérola clínica é a citação em
// destaque da página — barra vinho de 3px à esquerda + Libre Bodoni itálico,
// direto no papel (sem cartão, sem sombra, sem fundo). `perolaBorda` é a
// barra (vinho), `perolaTexto` a tinta.
export function Perola({ bloco }: { bloco: PerolaBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: paleta.perolaBorda,
        paddingVertical: 3,
        paddingLeft: espaco.m,
        marginVertical: espaco.l,
      }}
    >
      <TextoRico
        style={{
          fontFamily: fonte.displayItalico,
          fontSize: Math.round(tipo.corpo * escala),
          lineHeight: Math.round(tipo.corpo * escala * 1.45),
          color: paleta.perolaTexto,
        }}
      >
        {bloco.texto}
      </TextoRico>
    </View>
  );
}
