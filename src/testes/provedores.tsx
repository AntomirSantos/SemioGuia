import type { ReactNode } from 'react';
import { ThemeProvider } from '../design/ThemeContext';
import { ContentProvider } from '../content/ContentContext';
import { ProgressProvider } from '../progress/ProgressContext';
import { EntitlementsProvider } from '../entitlements/EntitlementsContext';
import { DesbloqueioProvider } from '../anuncios/DesbloqueioContext';
import { MemoryProgressStore } from '../progress/memoryStore';
import type { Conteudo } from '../content/schema';

// A pilha de provedores que as telas exigem, num lugar só: quando entra um
// provedor novo no _layout, é aqui que os testes o recebem, e não em quinze
// arquivos.

export function Provedores({
  children,
  store = new MemoryProgressStore(),
  conteudo,
}: {
  children: ReactNode;
  store?: MemoryProgressStore;
  conteudo?: Conteudo;
}) {
  return (
    <ThemeProvider>
      <ContentProvider conteudo={conteudo}>
        <ProgressProvider store={store}>
          <EntitlementsProvider>
            <DesbloqueioProvider>{children}</DesbloqueioProvider>
          </EntitlementsProvider>
        </ProgressProvider>
      </ContentProvider>
    </ThemeProvider>
  );
}
