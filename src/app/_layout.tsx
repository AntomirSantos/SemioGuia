import { useEffect, useState, type ReactNode } from 'react';
import { Stack } from 'expo-router';
import {
  useFonts,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible';
import { ThemeProvider, type EscalaFonte, type PreferenciaTema } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider, useProgresso } from '../progress/ProgressContext';

const TEMAS_VALIDOS: PreferenciaTema[] = ['sistema', 'claro', 'escuro'];
const ESCALAS_VALIDAS: EscalaFonte[] = ['normal', 'grande'];

function ehPreferenciaTemaValida(valor: string | null): valor is PreferenciaTema {
  return valor !== null && (TEMAS_VALIDOS as string[]).includes(valor);
}
function ehEscalaFonteValida(valor: string | null): valor is EscalaFonte {
  return valor !== null && (ESCALAS_VALIDAS as string[]).includes(valor);
}

/**
 * Ponte entre o ProgressStore e o ThemeProvider: lê as preferências de
 * tema/fonte persistidas uma única vez ao montar e as passa como props para
 * o ThemeProvider. Renderiza com os padrões enquanto carrega, sem bloquear
 * o app; ao carregar, apenas atualiza as props — o ThemeProvider sincroniza
 * seu próprio estado internamente (sem remount). Falhas ao ler o
 * ProgressStore são contidas aqui e mantêm os padrões.
 */
function TemaPersistido({ children }: { children: ReactNode }) {
  const progresso = useProgresso();
  const [tema, setTema] = useState<PreferenciaTema>('sistema');
  const [escala, setEscala] = useState<EscalaFonte>('normal');

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const [temaGravado, escalaGravada] = await Promise.all([
          progresso.obterPreferencia('tema'),
          progresso.obterPreferencia('fonte'),
        ]);
        if (cancelado) return;
        if (ehPreferenciaTemaValida(temaGravado)) setTema(temaGravado);
        if (ehEscalaFonteValida(escalaGravada)) setEscala(escalaGravada);
      } catch {
        // Mantém os padrões ('sistema'/'normal') se a leitura falhar.
      }
    })();
    return () => {
      cancelado = true;
    };
  }, [progresso]);

  return (
    <ThemeProvider temaInicial={tema} escalaInicial={escala}>
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [ok] = useFonts({
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
    AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegible_700Bold,
  });
  if (!ok) return null;
  return (
    <ProgressProvider>
      <TemaPersistido>
        <ContentProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ContentProvider>
      </TemaPersistido>
    </ProgressProvider>
  );
}
