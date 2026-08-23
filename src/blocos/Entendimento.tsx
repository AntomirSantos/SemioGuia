import { Text, View } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type EntendimentoBloco = Extract<Bloco, { tipo: 'entendimento' }>;

// Card de "entendimento clínico": não é um sinal nem uma pérola, é o porquê
// por trás do achado — fundo superficie2 (um degrau acima do fundo comum) e
// borda esquerda de acento, para diferenciar visualmente dos demais cartões
// (que usam superficie + borda ao redor).
export function Entendimento({ bloco }: { bloco: EntendimentoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View
      style={{
        backgroundColor: paleta.superficie2,
        borderLeftWidth: 3,
        borderLeftColor: paleta.acento,
        borderRadius: raio.l,
        paddingVertical: espaco.xl,
        paddingHorizontal: espaco.xl + 2,
        marginVertical: espaco.xl,
      }}
    >
      <IdentidadeBloco Icone={Lightbulb} rotulo="Entendimento clínico" />
      {bloco.titulo ? (
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
          {bloco.titulo}
        </Text>
      ) : null}
      <TextoRico style={{ fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta }}>{bloco.texto}</TextoRico>
    </View>
  );
}
