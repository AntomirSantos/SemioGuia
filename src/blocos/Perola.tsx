import { View } from 'react-native';
import { Gem } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type PerolaBloco = Extract<Bloco, { tipo: 'perola' }>;

// Card destacado (spec §3.2): além do fundo `perola` já existente, ganha
// sombra dos tokens — igual aos demais cartões — para se destacar como
// conteúdo de maior densidade de valor, não só de cor diferente.
export function Perola({ bloco }: { bloco: PerolaBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        backgroundColor: paleta.perolaFundo,
        borderWidth: 1,
        borderColor: paleta.perolaBorda,
        borderRadius: raio.l,
        paddingVertical: espaco.l + 2,
        paddingHorizontal: espaco.xl + 2,
        marginVertical: espaco.xl,
        ...sombra,
      }}
    >
      <IdentidadeBloco Icone={Gem} rotulo="Pérola clínica" cor={paleta.perolaTexto} />
      <TextoRico style={{ fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{bloco.texto}</TextoRico>
    </View>
  );
}
