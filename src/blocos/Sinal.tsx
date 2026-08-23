import { Text, View } from 'react-native';
import { Activity } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, sombra, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type SinalBloco = Extract<Bloco, { tipo: 'sinal' }>;

function Rotulo({ texto, tag = false }: { texto: string; tag?: boolean }) {
  const { paleta } = useTema();
  return (
    <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.acentoTinta, marginBottom: tag ? espaco.xs + 2 : 2 }}>
      {texto}
    </Text>
  );
}

export function Sinal({ bloco }: { bloco: SinalBloco }) {
  const { paleta, escala } = useTema();
  const corpo = Math.round(tipo.corpo * escala);
  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.xl, ...sombra }}>
      <IdentidadeBloco Icone={Activity} rotulo="Sinal" />
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
        {bloco.nome}
      </Text>
      <TextoRico style={{ fontSize: corpo, color: paleta.tinta }}>{bloco.descricao}</TextoRico>
      <View style={{ marginTop: espaco.s }}>
        <Rotulo texto="Significado" />
        <TextoRico style={{ fontSize: corpo, color: paleta.tinta }}>{bloco.significado}</TextoRico>
      </View>
      <View style={{ marginTop: espaco.s }}>
        <Rotulo texto="Causas" />
        {bloco.causas.map((causa, i) => (
          <Text key={i} style={{ fontFamily: fonte.corpo, fontSize: corpo, color: paleta.tinta, marginTop: 2 }}>
            {`• ${causa}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
