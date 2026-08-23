import { Text, View } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import type { Bloco } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import { IdentidadeBloco } from './identidade';
import { TextoRico } from './texto';

type ConceitoBloco = Extract<Bloco, { tipo: 'conceito' }>;

// Bloco de conceito segue sem card/borda — é prosa corrida — mas ganha a
// mesma identidade leve (ícone + rótulo) dos demais tipos (spec Fase 8
// §3.2): sem isso, o conceito era o único bloco "anônimo" na leitura
// seccionada, quebrando a compartimentação que o resto da tela ganhou.
export function Conceito({ bloco }: { bloco: ConceitoBloco }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ marginVertical: espaco.xl }}>
      <IdentidadeBloco Icone={BookOpen} rotulo="Conceito" />
      {bloco.titulo ? (
        <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.s }}>
          {bloco.titulo}
        </Text>
      ) : null}
      <TextoRico style={{ fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta, lineHeight: Math.round(tipo.corpo * escala * 1.5) }}>
        {bloco.texto}
      </TextoRico>
    </View>
  );
}
