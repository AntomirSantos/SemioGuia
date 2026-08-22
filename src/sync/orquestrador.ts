import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useConta } from '../conta/AuthContext';
import { useProgresso } from '../progress/ProgressContext';
import { obterDb, syncDisponivel } from '../conta/firebaseApp';
import { gravarDeltas, lerSnapshotRemoto } from './firestoreSync';
import { merge } from './merge';

const DEBOUNCE_MS = 30_000;

export const ERRO_SYNC_GENERICO = 'Não foi possível sincronizar agora.';

export interface EstadoSync {
  ultimaSync: number | null;
  sincronizando: boolean;
  erro: string | null;
  sincronizarAgora(): Promise<void>;
}

const Ctx = createContext<EstadoSync | null>(null);

/**
 * Lógica do orquestrador (Task 6): `sincronizarAgora` segue exatamente
 * exportar local → ler remoto → merge → aplicarDoSync(paraLocal) →
 * gravarDeltas(paraRemoto) → ultimaSync = Date.now(). Nunca lança — qualquer
 * falha (rede, permissão, SDK) vira `erro` no estado, deixando o app intacto
 * (spec: sync degrada em silêncio).
 *
 * Debounce de 30s: reentradas dentro da janela são ignoradas ANTES de tocar
 * qualquer módulo (sem chamar exportar/ler/gravar de novo), inclusive
 * concorrentes entre si (`emAndamentoRef`).
 *
 * Gatilhos "login" e "app aberto com sessão" são o MESMO efeito abaixo: ele
 * roda tanto quando `usuario` passa de ausente para presente (login) quanto
 * quando o provider já monta com uma sessão persistida (app reaberto
 * logado) — em ambos os casos `uid` muda de `null` para um valor na
 * primeira renderização útil. O gatilho "foco no Perfil" fica a cargo de
 * quem consome `useSync()` numa tela (BlocoConta), chamando
 * `sincronizarAgora()` em `useFocusEffect`.
 */
function useOrquestrador(): EstadoSync {
  const { usuario } = useConta();
  const progresso = useProgresso();
  const uid = usuario?.uid ?? null;

  const [ultimaSync, setUltimaSync] = useState<number | null>(null);
  const [sincronizando, setSincronizando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const ultimaExecucaoRef = useRef<number | null>(null);
  const emAndamentoRef = useRef(false);

  const sincronizarAgora = useCallback(async () => {
    if (!syncDisponivel() || !uid) return;
    if (emAndamentoRef.current) return;
    const agora = Date.now();
    if (ultimaExecucaoRef.current !== null && agora - ultimaExecucaoRef.current < DEBOUNCE_MS) {
      return;
    }
    ultimaExecucaoRef.current = agora;
    emAndamentoRef.current = true;
    setSincronizando(true);
    setErro(null);
    try {
      const db = obterDb();
      const local = await progresso.exportarParaSync();
      const remoto = await lerSnapshotRemoto(db, uid);
      const { paraLocal, paraRemoto } = merge(local, remoto);
      await progresso.aplicarDoSync(paraLocal);
      await gravarDeltas(db, uid, paraRemoto);
      setUltimaSync(Date.now());
    } catch {
      setErro(ERRO_SYNC_GENERICO);
    } finally {
      setSincronizando(false);
      emAndamentoRef.current = false;
    }
  }, [uid, progresso]);

  useEffect(() => {
    if (uid) {
      sincronizarAgora().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  return useMemo(
    () => ({ ultimaSync, sincronizando, erro, sincronizarAgora }),
    [ultimaSync, sincronizando, erro, sincronizarAgora],
  );
}

/**
 * Provider único do orquestrador: monta uma vez em `_layout.tsx`, dentro de
 * `AuthProvider` e `ProgressProvider` (dos quais depende) — assim o estado de
 * sync (e o gatilho de login/app aberto) é compartilhado pelo app inteiro,
 * não recriado a cada tela que chama `useSync()`.
 */
export function SyncProvider({ children }: { children: ReactNode }) {
  const valor = useOrquestrador();
  // `.ts` (não `.tsx`): sem sintaxe JSX, createElement no lugar dela.
  return createElement(Ctx.Provider, { value: valor }, children);
}

export function useSync(): EstadoSync {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSync requer SyncProvider');
  return v;
}
