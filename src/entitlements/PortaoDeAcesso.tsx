import type { ReactNode } from 'react';
import { useSistema } from '../content/ContentContext';
import { useAcesso } from './EntitlementsContext';
import { BloqueioPremium } from './BloqueioPremium';

// Portão de uma rota inteira. Fica nos componentes de rota (quiz, caso,
// estação) e não nas telas internas, para que os testes continuem montando a
// tela sem o provedor de acesso, e para que um deep link não seja um atalho
// por fora do paywall.

export function PortaoDeAcesso({
  sistemaId,
  oQue,
  children,
}: {
  sistemaId: string;
  oQue: string;
  children: ReactNode;
}) {
  const acesso = useAcesso();
  const sistema = useSistema(sistemaId);
  if (acesso.liberado(sistemaId)) return <>{children}</>;
  return <BloqueioPremium sistemaTitulo={sistema?.titulo ?? 'um sistema do guia'} oQue={oQue} />;
}
