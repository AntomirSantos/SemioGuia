import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PAYWALL_ATIVO } from '../config/paywall';
import { useProgresso } from '../progress/ProgressContext';
import { hojeLocal } from '../revisao/hoje';
import {
  CHAVE_ASSINATURA,
  SEM_ASSINATURA,
  desserializar,
  estadoDaAssinatura,
  serializar,
  type Assinatura,
  type EstadoAcesso,
} from './assinatura';
import { acessoLiberado, type EstadoEntitlements } from './entitlements';
import { obterLoja, type ResultadoDaAssinatura } from './loja';

// Estado de acesso do aplicativo. Uma fonte só: quem quiser saber se pode
// abrir algo chama `useAcesso().liberado(sistemaId)`.

interface AcessoContexto {
  carregando: boolean;
  assinatura: Assinatura;
  estado: EstadoAcesso;
  paywallAtivo: boolean;
  lojaDisponivel: boolean;
  liberado(sistemaId: string): boolean;
  assinar(): Promise<ResultadoDaAssinatura>;
  restaurar(): Promise<ResultadoDaAssinatura>;
}

const Ctx = createContext<AcessoContexto | null>(null);

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const progresso = useProgresso();
  const [assinatura, setAssinatura] = useState<Assinatura>(SEM_ASSINATURA);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    progresso
      .obterPreferencia(CHAVE_ASSINATURA)
      .then((bruto) => {
        if (vivo) setAssinatura(desserializar(bruto));
      })
      .catch(() => {})
      .finally(() => {
        if (vivo) setCarregando(false);
      });
    return () => {
      vivo = false;
    };
  }, [progresso]);

  const guardar = useCallback(
    async (nova: Assinatura) => {
      setAssinatura(nova);
      await progresso.definirPreferencia(CHAVE_ASSINATURA, serializar(nova)).catch(() => {});
    },
    [progresso],
  );

  const aplicar = useCallback(
    async (resultado: ResultadoDaAssinatura) => {
      if (resultado.tipo === 'ok') await guardar(resultado.assinatura);
      return resultado;
    },
    [guardar],
  );

  const assinar = useCallback(async () => aplicar(await obterLoja().assinar(hojeLocal())), [aplicar]);
  const restaurar = useCallback(async () => aplicar(await obterLoja().restaurar(hojeLocal())), [aplicar]);

  const valor = useMemo<AcessoContexto>(() => {
    const hoje = hojeLocal();
    const estadoEnt: EstadoEntitlements = { paywallAtivo: PAYWALL_ATIVO, assinatura, hoje };
    return {
      carregando,
      assinatura,
      estado: estadoDaAssinatura(assinatura, hoje),
      paywallAtivo: PAYWALL_ATIVO,
      lojaDisponivel: obterLoja().disponivel,
      liberado: (sistemaId: string) => acessoLiberado(sistemaId, estadoEnt),
      assinar,
      restaurar,
    };
  }, [assinatura, carregando, assinar, restaurar]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useAcesso(): AcessoContexto {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAcesso requer EntitlementsProvider');
  return v;
}
