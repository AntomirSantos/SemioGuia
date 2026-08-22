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

export interface OpcoesSincronizar {
  forcar?: boolean;
}

export interface EstadoSync {
  ultimaSync: number | null;
  sincronizando: boolean;
  erro: string | null;
  sincronizarAgora(opcoes?: OpcoesSincronizar): Promise<void>;
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
 * qualquer módulo (sem chamar exportar/ler/gravar de novo). `forcar: true`
 * (usado pelo botão "Tentar de novo" do BlocoConta) pula só a checagem do
 * relógio do debounce — a reentrância concorrente continua bloqueada por
 * `emAndamentoRef`, sempre. Sem `forcar`, uma falha recente também "gasta" a
 * janela de 30s (mede da última EXECUÇÃO tentada, não da última
 * bem-sucedida) — por isso o retry manual precisa do escape explícito, senão
 * o primeiro toque em "Tentar de novo" é sempre um no-op silencioso (achado
 * do round de revisão: o gatilho de foco no Perfil já consome a janela ao
 * chegar na tela).
 *
 * Gatilhos "login" e "app aberto com sessão" são o MESMO efeito abaixo: ele
 * roda tanto quando `usuario` passa de ausente para presente (login) quanto
 * quando o provider já monta com uma sessão persistida (app reaberto
 * logado) — em ambos os casos `uid` muda de `null` para um valor na
 * primeira renderização útil. O gatilho "foco no Perfil" fica a cargo de
 * quem consome `useSync()` numa tela (BlocoConta), chamando
 * `sincronizarAgora()` em `useFocusEffect`.
 *
 * Troca de conta: `uid` mudando (inclusive para `null`, no logout) reseta o
 * relógio do debounce e o estado (`ultimaSync`/`erro`) ANTES de qualquer
 * sincronização — sem isso, o debounce e o estado eram globais por
 * `SyncProvider`, não por conta: trocar de conta dentro da janela de 30s
 * pulava a sincronização inicial da conta B (o gatilho "login" que o brief
 * exige) e mostrava o `ultimaSync` da conta A na tela da conta B.
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

  const sincronizarAgora = useCallback(
    async (opcoes?: OpcoesSincronizar) => {
      if (!syncDisponivel() || !uid) return;
      if (emAndamentoRef.current) return;
      const agora = Date.now();
      if (
        !opcoes?.forcar &&
        ultimaExecucaoRef.current !== null &&
        agora - ultimaExecucaoRef.current < DEBOUNCE_MS
      ) {
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
    },
    [uid, progresso],
  );

  useEffect(() => {
    // Troca de conta (ou logout): zera o relógio do debounce e o estado
    // exposto ANTES de agir, para não vazar o estado/janela da conta
    // anterior para a nova sessão (ou para o app deslogado).
    ultimaExecucaoRef.current = null;
    setUltimaSync(null);
    setErro(null);
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
