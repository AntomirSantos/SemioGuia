import { View } from 'react-native';
import { Stethoscope } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type CenaBloco = Extract<Bloco, { tipo: 'cena' }>;

// Vinheta clínica de abertura (didática 2026-09): duas ou três linhas de
// enfermaria antes da teoria, para ancorar o tópico numa cena concreta.
// Voz narrativa — serifa itálica direto no papel, sem cartão — distinta da
// pérola (Bodoni itálico com barra vinho): a cena é história, não citação.
export function Cena({ bloco }: { bloco: CenaBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginTop: espaco.m, marginBottom: espaco.xl }}>
      <IdentidadeBloco Icone={Stethoscope} rotulo="À beira do leito" />
      <TextoRico
        style={{
          fontFamily: fonte.leituraItalico,
          fontSize: Math.round(tipo.corpo * escala),
          lineHeight: Math.round(tipo.corpo * escala * 1.6),
          color: paleta.tinta,
        }}
      >
        {bloco.texto}
      </TextoRico>
    </View>
  );
}
