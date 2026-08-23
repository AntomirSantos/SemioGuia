import { Pressable, Text, View } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTema } from './ThemeContext';
import { Rotulo } from './Rotulo';
import { espaco, fonte, raio, tipo } from './tokens';

// "Seção X de Y" + barra fina de progresso na cor do sistema (spec Fase 8
// §3.1). A barra é decorativa (progressbar não-textual, limiar de contraste
// não-textual de 3:1) — cores arbitrárias de sistema são seguras aqui, ao
// contrário de texto sobre a cor (ver BotaoSecao abaixo).
export function IndicadorSecao({ indice, total, cor }: { indice: number; total: number; cor?: string }) {
  const { paleta } = useTema();
  const acento = cor ?? paleta.acento;
  const posicao = total > 0 ? (indice + 1) / total : 0;

  return (
    <View style={{ marginBottom: espaco.l }}>
      <Rotulo texto={`Seção ${indice + 1} de ${total}`} style={{ marginBottom: espaco.xs + 2 }} />
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={`Seção ${indice + 1} de ${total}`}
        accessibilityValue={{ min: 1, max: total, now: indice + 1 }}
        style={{ height: 3, borderRadius: 2, backgroundColor: paleta.linha, overflow: 'hidden' }}
      >
        <View style={{ width: `${Math.round(posicao * 100)}%`, height: '100%', backgroundColor: acento, borderRadius: 2 }} />
      </View>
    </View>
  );
}

// Botão de navegação sequencial ao fim da seção. Nunca aplicamos a cor do
// sistema como fundo sólido atrás de texto: `cor` vem do conteúdo (uma por
// sistema) e não tem contraste garantido contra `paleta.superficie`/`tinta`
// em todos os tons (verificado manualmente — alguns tons falham AA nesse
// uso). Em vez disso, a cor tinge fundo/borda/ícone — texto sempre em
// `paleta.tinta`/`tinta2`, os únicos pares que o gate de contraste cobre.
function BotaoSecao({
  rotulo,
  direcao,
  destaque,
  cor,
  onPress,
}: {
  rotulo: string;
  direcao: 'anterior' | 'proxima';
  destaque: boolean;
  cor?: string;
  onPress: () => void;
}) {
  const { paleta } = useTema();
  const acento = cor ?? paleta.acento;
  const Icone = direcao === 'anterior' ? ChevronLeft : ChevronRight;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
        paddingHorizontal: espaco.l,
        borderRadius: raio.m,
        borderWidth: destaque ? 1.5 : 1,
        borderColor: destaque ? acento : paleta.linha,
        backgroundColor: destaque ? `${acento}14` : 'transparent',
      }}
    >
      {direcao === 'anterior' ? <Icone size={18} color={destaque ? acento : paleta.tinta2} /> : null}
      <Text
        style={{
          fontFamily: fonte.corpoBold,
          fontSize: tipo.corpo,
          color: paleta.tinta,
          marginHorizontal: espaco.xs + 2,
        }}
      >
        {rotulo}
      </Text>
      {direcao === 'proxima' ? <Icone size={18} color={destaque ? acento : paleta.tinta2} /> : null}
    </Pressable>
  );
}

// "Anterior/Próxima seção" ao fim de cada seção (spec Fase 8 §3.1): o
// aluno avança como em páginas, não em rolagem infinita. Some o lado sem
// destino (primeira/última seção) em vez de desabilitar — evita alvo morto.
export function NavegacaoSecao({
  temAnterior,
  temProxima,
  cor,
  aoIrAnterior,
  aoIrProxima,
}: {
  temAnterior: boolean;
  temProxima: boolean;
  cor?: string;
  aoIrAnterior: () => void;
  aoIrProxima: () => void;
}) {
  if (!temAnterior && !temProxima) return null;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: temAnterior && temProxima ? 'space-between' : temAnterior ? 'flex-start' : 'flex-end',
        marginTop: espaco.l,
        marginBottom: espaco.xxl,
      }}
    >
      {temAnterior ? (
        <BotaoSecao rotulo="Seção anterior" direcao="anterior" destaque={false} onPress={aoIrAnterior} />
      ) : null}
      {temProxima ? (
        <BotaoSecao rotulo="Próxima seção" direcao="proxima" destaque cor={cor} onPress={aoIrProxima} />
      ) : null}
    </View>
  );
}
