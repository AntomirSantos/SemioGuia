import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { ProgressStore } from './types';
import { SqliteProgressStore } from './sqliteStore';

const Ctx = createContext<ProgressStore | null>(null);

export function ProgressProvider({
  children,
  store,
}: {
  children: ReactNode;
  store?: ProgressStore;
}) {
  const valor = useMemo(() => store ?? new SqliteProgressStore(), [store]);
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useProgresso(): ProgressStore {
  const v = useContext(Ctx);
  if (!v) throw new Error('useProgresso requer ProgressProvider');
  return v;
}
