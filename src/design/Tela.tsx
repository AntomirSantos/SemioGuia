import { forwardRef, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTema } from './ThemeContext';
import { espaco } from './tokens';

// `ref` opcional (spec Fase 8, revisão de fase P1): encaminha para o
// ScrollView interno só quando `rolavel` (o padrão) — o único chamador que
// precisa dele hoje é a tela de tópico, para resetar o scroll ao trocar de
// seção. Todo o resto do app continua chamando `<Tela>` sem ref, sem
// nenhuma mudança de comportamento.
export const Tela = forwardRef<ScrollView, { children: ReactNode; rolavel?: boolean }>(function Tela(
  { children, rolavel = true },
  ref,
) {
  const { paleta } = useTema();
  const insets = useSafeAreaInsets();
  const estilo = {
    flex: 1,
    backgroundColor: paleta.fundo,
    paddingTop: insets.top + espaco.m,
    paddingHorizontal: espaco.xl,
  } as const;
  return rolavel ? (
    <ScrollView ref={ref} style={estilo} contentContainerStyle={{ paddingBottom: 96 }}>
      {children}
    </ScrollView>
  ) : (
    <View style={estilo}>{children}</View>
  );
});
