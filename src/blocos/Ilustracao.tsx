import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { TracadoAnimado } from './TracadoAnimado';

type IlustracaoBloco = Extract<Bloco, { tipo: 'ilustracao' }>;

const RAZAO_PADRAO = 16 / 9;

// Deriva a proporção largura/altura do viewBox do SVG, para reservar o
// espaço certo antes da imagem carregar (width 100% + aspectRatio, sem
// depender de medir o SVG em runtime).
function razaoDoViewBox(svg: string): number {
  const match = svg.match(/viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)\s*["']/);
  if (!match) return RAZAO_PADRAO;
  const largura = parseFloat(match[1]);
  const altura = parseFloat(match[2]);
  if (!largura || !altura) return RAZAO_PADRAO;
  return largura / altura;
}

export function Ilustracao({ bloco }: { bloco: IlustracaoBloco }) {
  const { paleta, escala } = useTema();
  const aspectRatio = useMemo(() => razaoDoViewBox(bloco.svg), [bloco.svg]);

  // Paths marcados com id="anima-N" pedem o desenho temporal do traçado
  // (TracadoAnimado); sem marcadores, a ilustração estática de sempre.
  const temporal = bloco.svg.includes('id="anima-');

  return (
    <View style={{ marginVertical: espaco.xl }} accessible accessibilityLabel={bloco.legenda}>
      {temporal ? (
        <TracadoAnimado svg={bloco.svg} cor={paleta.tinta} />
      ) : (
        <SvgXml xml={bloco.svg} width="100%" style={{ aspectRatio }} color={paleta.tinta} />
      )}
      <Text
        android_hyphenationFrequency="full"
        style={{
          fontFamily: fonte.corpo,
          fontSize: Math.round(tipo.small * escala),
          lineHeight: Math.round(tipo.small * escala * 1.5),
          color: paleta.tinta2,
          textAlign: 'justify',
          marginTop: espaco.s,
        }}
      >
        {bloco.legenda}
      </Text>
    </View>
  );
}
