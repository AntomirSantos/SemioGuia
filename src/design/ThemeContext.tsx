import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';
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
  const sistemaDetectado = useColorScheme();
  const [preferencia, definirPreferencia] = useState<PreferenciaTema>(temaInicial);
  const [escalaFonte, definirEscalaFonte] = useState<EscalaFonte>(escalaInicial);

  // No export estático da web, o HTML pré-renderizado (build-time, sem
  // `window`) sempre assume a preferência 'sistema' resolvida para claro —
  // não há `matchMedia` no ambiente Node do export. `useColorScheme()`, no
  // cliente, já retorna a preferência real do SO desde a primeiríssima
  // renderização; se o SO estiver em modo escuro, essa primeira renderização
  // do cliente diverge do HTML da hidratação. Em produção, a hidratação do
  // React não reescreve com segurança atributos de estilo divergentes nesse
  // primeiro commit (ela adota o DOM existente); um nó que nunca desmonta —
  // como a barra de topo da navegação web, que embrulha as abas e nunca sai
  // da árvore — fica preso para sempre no valor claro do build, mesmo que
  // renderizações seguintes já computem `escuro: true` corretamente (como
  // confirmado via log: o valor do React já estava certo, só o atributo no
  // DOM real nunca foi escrito). Por isso, na web, a preferência do sistema
  // só é aplicada depois do efeito pós-montagem (que roda só depois da
  // hidratação terminar): a primeira renderização do cliente fica idêntica
  // ao HTML exportado (sem `useColorScheme`), e a atualização que segue é um
  // commit normal — não uma hidratação —, que corrige o DOM de verdade. No
  // nativo não existe SSR/hidratação: `montado` já começa `true` e o
  // comportamento é idêntico ao de antes desta correção.
  const [montado, definirMontado] = useState(Platform.OS !== 'web');
  useEffect(() => {
    if (Platform.OS === 'web') definirMontado(true);
  }, []);
  const sistema = montado ? sistemaDetectado : null;

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
