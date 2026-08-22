import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { carregarConteudo, listarCasos, obterCaso, obterSistema, obterTopico } from './store';
import type { Conteudo, Sistema, Topico } from './schema';
import type { Caso } from './casoSchema';

const Ctx = createContext<Conteudo | null>(null);

export function ContentProvider({ children, conteudo }: { children: ReactNode; conteudo?: Conteudo }) {
  // `conteudo` é opcional e existe para testes (ex.: casos clínicos — Task 5
  // —, ainda ausentes do bundle real) injetarem conteúdo próprio, espelhando
  // o `store` opcional do ProgressProvider.
  const valor = useMemo(
    () => conteudo ?? carregarConteudo(require('../../assets/generated/content.json')),
    [conteudo],
  );
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
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
