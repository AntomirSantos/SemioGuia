import { useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  LibreBodoni_700Bold,
  LibreBodoni_700Bold_Italic,
} from '@expo-google-fonts/libre-bodoni';
import {
  SourceSerif4_400Regular,
  SourceSerif4_600SemiBold,
} from '@expo-google-fonts/source-serif-4';
import {
  PublicSans_400Regular,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  PublicSans_800ExtraBold,
} from '@expo-google-fonts/public-sans';
import { ThemeProvider, type EscalaFonte, type PreferenciaTema } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider, useProgresso } from '../progress/ProgressContext';
import { AuthProvider } from '../conta/AuthContext';
import { obterDb } from '../conta/firebaseApp';
import { apagarDadosDoUsuario } from '../sync/firestoreSync';
import { SyncProvider } from '../sync/orquestrador';
import { track } from '../analytics/analytics';

SplashScreen.preventAutoHideAsync().catch(() => {});

// Apagador real (Task 6): injetado no AuthProvider, chamado ANTES de
// deleteUser (contrato documentado em AuthContext.tsx). Referência estável de
// módulo — não recriada a cada render — porque AuthProvider depende dela no
// useCallback de `excluirConta`.
function apagarDadosNoServidor(uid: string): Promise<void> {
  return apagarDadosDoUsuario(obterDb(), uid);
}

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
  // Identidade Editorial R2: Libre Bodoni (títulos), Source Serif 4 (corpo
  // de leitura) e Public Sans (UI) — ver src/design/tokens.ts (`fonte`).
  const [ok] = useFonts({
    LibreBodoni_700Bold,
    LibreBodoni_700Bold_Italic,
    SourceSerif4_400Regular,
    SourceSerif4_600SemiBold,
    PublicSans_400Regular,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
    PublicSans_800ExtraBold,
  });

  // Na web as fontes chegam por CSS e uma falha no fetch das .ttf não deve
  // segurar o app em tela branca; o gate de fontes vale só no nativo.
  const pronto = ok || Platform.OS === 'web';

  // Instrumentação do beta (§4): uma abertura por montagem do layout raiz —
  // no PWA, cada visita à página conta como uma abertura.
  useEffect(() => {
    track('app_aberto');
  }, []);

  useEffect(() => {
    if (pronto) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [pronto]);

  if (!pronto) return null;
  return (
    <ProgressProvider>
      <AuthProvider apagarDados={apagarDadosNoServidor}>
        <SyncProvider>
          <TemaPersistido>
            <ContentProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </ContentProvider>
          </TemaPersistido>
        </SyncProvider>
      </AuthProvider>
    </ProgressProvider>
  );
}
