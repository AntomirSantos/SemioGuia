import { useState, type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { EntradaAnimada } from '../design/EntradaAnimada';

// Revelação progressiva: o bloco fica fechado por padrão (só o cabeçalho
// "Aprofundar · <rótulo>" aparece) e o conteúdo só é montado quando aberto —
// sem custo de render nem de a11y (leitor de tela) para quem não pediu para
// aprofundar. Ao abrir, o conteúdo entra com a mesma transição curta
// (fade + deslize, spec Fase 8 §3.4) usada na troca de seção — respeita
// movimento reduzido automaticamente via EntradaAnimada.
export function Avancado({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  const { paleta } = useTema();
  const [aberto, setAberto] = useState(false);

  return (
    <View
      style={{
        backgroundColor: paleta.superficie,
        borderWidth: 1,
        borderColor: paleta.linha,
        borderRadius: raio.m,
        marginVertical: espaco.xl,
        overflow: 'hidden',
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto }}
        onPress={() => setAberto((v) => !v)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 44,
          paddingVertical: espaco.s,
          paddingHorizontal: espaco.l,
        }}
      >
        <Text
          style={{
            fontFamily: fonte.corpoBold,
            fontSize: tipo.tag,
            letterSpacing: 1.1,
            textTransform: 'uppercase',
            color: paleta.acentoTinta,
          }}
        >
          {`Aprofundar · ${rotulo}`}
        </Text>
        {aberto ? <ChevronUp size={18} color={paleta.acentoTinta} /> : <ChevronDown size={18} color={paleta.acentoTinta} />}
      </Pressable>
      {aberto ? (
        <EntradaAnimada>
          <View style={{ paddingHorizontal: espaco.l, paddingBottom: espaco.l }}>{children}</View>
        </EntradaAnimada>
      ) : null}
    </View>
  );
}
