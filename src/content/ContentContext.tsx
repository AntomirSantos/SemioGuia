import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { carregarConteudo, listarCasos, obterCaso, obterSistema, obterTopico } from './store';
import type { Conteudo, Sistema, Topico } from './schema';
import type { Caso } from './casoSchema';

const Ctx = createContext<Conteudo | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const conteudo = useMemo(() => carregarConteudo(require('../../assets/generated/content.json')), []);
  return <Ctx.Provider value={conteudo}>{children}</Ctx.Provider>;
}

export function useConteudo(): Conteudo {
  const c = useContext(Ctx);
  if (!c) throw new Error('useConteudo requer ContentProvider');
  return c;
}

export function useSistema(sistemaId: string): Sistema | undefined {
  return obterSistema(useConteudo(), sistemaId);
}

export function useTopico(topicoId: string): Topico | undefined {
  return obterTopico(useConteudo(), topicoId);
}

export function useCasos(): Caso[] {
  return listarCasos(useConteudo());
}

export function useCaso(casoId: string): Caso | undefined {
  return obterCaso(useConteudo(), casoId);
}
