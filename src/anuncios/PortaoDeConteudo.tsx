import type { ReactNode } from 'react';
import { useSistema } from '../content/ContentContext';
import { useDesbloqueio } from './DesbloqueioContext';
import { ParedeOffline, PortaoDeAnuncio } from './PecasDeAnuncio';
import type { AbaDeConteudo } from './desbloqueio';

// O portão de uma rota inteira, na ordem em que as regras valem: sem conexão
// pede conexão, sistema não liberado pede o anúncio, e o resto passa.
//
// Fica nos componentes de rota, e não nas telas internas, para que os testes
// continuem montando a tela sem os provedores e para que um deep link não seja
// um atalho por fora do regime.

export function PortaoDeConteudo({
  aba,
  sistemaId,
  oQue,
  children,
}: {
  aba: AbaDeConteudo;
  sistemaId: string;
  /** O que existe do outro lado, para o texto do portão. */
  oQue: string;
  children: ReactNode;
}) {
  const desbloqueio = useDesbloqueio();
  const sistema = useSistema(sistemaId);

  if (desbloqueio.exigindoConexao) return <ParedeOffline comCabecalho />;
  if (desbloqueio.liberado(aba, sistemaId)) return <>{children}</>;
  return (
    <PortaoDeAnuncio
      aba={aba}
      sistemaId={sistemaId}
      sistemaTitulo={sistema?.titulo ?? 'Este sistema'}
      oQue={oQue}
    />
  );
}
