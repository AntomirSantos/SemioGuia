import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useTema } from '../design/ThemeContext';
import { espaco, fonte, tipo } from '../design/tokens';
import {
  CHAVE_DISPENSA,
  detectarPlataformaWeb,
  deveMostrarAviso,
  estaInstalada,
  instrucaoDeInstalacao,
  type PlataformaWeb,
} from './instalarPwa';

// Aviso de instalação da PWA (beta §9.7): só na web, só quando o app não
// roda como app instalado; fechável, e o fechamento vale 7 dias. Tudo
// guardado por try/catch — storage bloqueado nunca quebra a home.
export function AvisoInstalarPwa() {
  const { paleta, escala } = useTema();
  const [plataforma, setPlataforma] = useState<PlataformaWeb | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    try {
      const g = globalThis as {
        matchMedia?: (q: string) => { matches: boolean };
        navigator?: { userAgent?: string; standalone?: boolean };
        localStorage?: Storage;
      };
      const instalada = estaInstalada({
        displayModeStandalone: g.matchMedia?.('(display-mode: standalone)').matches ?? false,
        navigatorStandalone: g.navigator?.standalone === true,
      });
      const bruto = g.localStorage?.getItem(CHAVE_DISPENSA);
      const dispensadoEm = bruto ? Number(bruto) || null : null;
      if (deveMostrarAviso({ ehWeb: true, instalada, dispensadoEm, agora: Date.now() })) {
        setPlataforma(detectarPlataformaWeb(g.navigator?.userAgent ?? ''));
      }
    } catch {
      // sem storage/matchMedia: simplesmente não mostra
    }
  }, []);

  if (plataforma === null) return null;

  function fechar() {
    try {
      (globalThis as { localStorage?: Storage }).localStorage?.setItem(CHAVE_DISPENSA, String(Date.now()));
    } catch {
      // sem storage: o aviso volta na próxima visita, sem quebrar nada
    }
    setPlataforma(null);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: paleta.superficie2,
        borderLeftWidth: 3,
        borderLeftColor: paleta.acento,
        padding: espaco.m,
        marginBottom: espaco.l,
        gap: espaco.s,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.small * escala), color: paleta.tinta, marginBottom: 2 }}>
          Use como app, até sem internet
        </Text>
        <Text style={{ fontFamily: fonte.corpo, fontSize: Math.round(tipo.small * escala), color: paleta.tinta2 }}>
          {instrucaoDeInstalacao(plataforma)}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fechar aviso de instalação"
        onPress={fechar}
        style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ fontFamily: fonte.corpoBold, fontSize: Math.round(tipo.corpo * escala), color: paleta.tinta2 }}>✕</Text>
      </Pressable>
    </View>
  );
}
