import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { paletaClara, paletaEscura, type Paleta } from './tokens';

export type PreferenciaTema = 'sistema' | 'claro' | 'escuro';
export type EscalaFonte = 'normal' | 'grande'; // grande multiplica tipo por 1.15

const FATOR_ESCALA_GRANDE = 1.15;

interface TemaContexto {
  paleta: Paleta;
  escuro: boolean;
  escala: number; // 1 ou 1.15
  preferencia: PreferenciaTema;
  definirPreferencia: (p: PreferenciaTema) => void;
  escalaFonte: EscalaFonte;
  definirEscalaFonte: (e: EscalaFonte) => void;
}

const Ctx = createContext<TemaContexto | null>(null);

export function ThemeProvider({
  children,
  temaInicial = 'sistema',
  escalaInicial = 'normal',
}: {
  children: ReactNode;
  temaInicial?: PreferenciaTema;
  escalaInicial?: EscalaFonte;
}) {
  const sistema = useColorScheme();
  const [preferencia, definirPreferencia] = useState<PreferenciaTema>(temaInicial);
  const [escalaFonte, definirEscalaFonte] = useState<EscalaFonte>(escalaInicial);

  // Mantém o estado sincronizado quando o valor inicial chega depois da
  // primeira renderização (ex.: preferência persistida carregada de forma
  // assíncrona), sem forçar um remount do provider.
  useEffect(() => {
    definirPreferencia(temaInicial);
  }, [temaInicial]);
  useEffect(() => {
    definirEscalaFonte(escalaInicial);
  }, [escalaInicial]);

  const escuro = preferencia === 'sistema' ? sistema === 'dark' : preferencia === 'escuro';
  const escala = escalaFonte === 'grande' ? FATOR_ESCALA_GRANDE : 1;

  const valor = useMemo(
    () => ({
      paleta: escuro ? paletaEscura : paletaClara,
      escuro,
      escala,
      preferencia,
      definirPreferencia,
      escalaFonte,
      definirEscalaFonte,
    }),
    [escuro, escala, preferencia, escalaFonte],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useTema(): TemaContexto {
  const v = useContext(Ctx);
  if (!v) throw new Error('useTema requer ThemeProvider');
  return v;
}
