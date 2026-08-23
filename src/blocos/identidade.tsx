import { Text, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';

// Identidade visual leve por tipo de bloco (spec Fase 8 §3.2): ícone pequeno
// + rótulo uppercase no canto do card. `cor` permite tingir com o acento
// específico do bloco (ex.: perolaTexto na Pérola); por padrão usa o acento
// do tema, igual aos rótulos que já existiam antes desta fase.
export function IdentidadeBloco({ Icone, rotulo, cor }: { Icone: LucideIcon; rotulo: string; cor?: string }) {
  const { paleta } = useTema();
  const tinta = cor ?? paleta.acentoTinta;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.xs + 2 }}>
      <View style={{ marginRight: 5 }}>
        <Icone size={14} color={tinta} />
      </View>
      <Text
        style={{
          fontFamily: fonte.corpoBold,
          fontSize: tipo.tag,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
          color: tinta,
        }}
      >
        {rotulo}
      </Text>
    </View>
  );
}
