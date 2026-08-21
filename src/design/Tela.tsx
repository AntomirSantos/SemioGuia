import { type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTema } from './ThemeContext';
import { espaco } from './tokens';

export function Tela({ children, rolavel = true }: { children: ReactNode; rolavel?: boolean }) {
  const { paleta } = useTema();
  const insets = useSafeAreaInsets();
  const estilo = {
    flex: 1,
    backgroundColor: paleta.fundo,
    paddingTop: insets.top + espaco.m,
    paddingHorizontal: espaco.xl,
  } as const;
  return rolavel ? (
    <ScrollView style={estilo} contentContainerStyle={{ paddingBottom: 96 }}>
      {children}
    </ScrollView>
  ) : (
    <View style={estilo}>{children}</View>
  );
}
