import { Pressable, Text, View } from 'react-native';
import type { Bloco, QuizPergunta } from '../content/schema';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';

type QuizBlocoTipo = Extract<Bloco, { tipo: 'quiz' }>;

// Dentro de um tópico o quiz é só um card-resumo; a sessão de perguntas
// (com alternativas, correção e explicação) é responsabilidade da Task 9.
export function QuizBloco({ bloco, onIniciar }: { bloco: QuizBlocoTipo; onIniciar?: (perguntas: QuizPergunta[]) => void }) {
  const { paleta, escala } = useTema();
  return (
    <View style={{ backgroundColor: paleta.superficie, borderWidth: 1, borderColor: paleta.linha, borderRadius: raio.l, paddingVertical: espaco.xl, paddingHorizontal: espaco.xl + 2, marginVertical: espaco.m }}>
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.tag, letterSpacing: 1.1, textTransform: 'uppercase', color: paleta.acentoTinta, marginBottom: espaco.xs + 2 }}>
        Quiz
      </Text>
      <Text style={{ fontFamily: fonte.display, fontSize: Math.round(tipo.h3 * escala), color: paleta.tinta, marginBottom: espaco.m }}>
        {bloco.perguntas.length} perguntas
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => onIniciar?.(bloco.perguntas)}
        style={{
          minHeight: 44,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: paleta.acento,
          borderRadius: raio.m,
          paddingHorizontal: espaco.l,
        }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: paleta.superficie }}>Praticar</Text>
      </Pressable>
    </View>
  );
}
