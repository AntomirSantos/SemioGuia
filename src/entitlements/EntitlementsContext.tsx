import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { ANUNCIOS_ATIVOS, PAYWALL_ATIVO } from '../config/paywall';
import { useProgresso } from '../progress/ProgressContext';
import { hojeLocal } from '../revisao/hoje';
import {
  CHAVE_COMPRA,
  SEM_COMPRA,
  desserializar,
  estadoDaCompra,
  semAnuncios,
  serializar,
  type Compra,
  type EstadoCompra,
} from './compra';
import { acessoLiberado, type EstadoEntitlements } from './entitlements';
import { obterLoja, type ResultadoDaCompra } from './loja';

// Estado de acesso do aplicativo. Uma fonte só: quem quiser saber se mostra
// anúncio chama `useAcesso().mostrarAnuncios`, e quem quiser saber se pode
// abrir um sistema chama `liberado(sistemaId)` (hoje sempre verdadeiro, com o
// corte por sistema desligado).

interface AcessoContexto {
  carregando: boolean;
  compra: Compra;
  estado: EstadoCompra;
  /** O direito comprado: verdadeiro quando esta pessoa não vê anúncios. */
  semAnuncios: boolean;
  /** A pergunta que as telas fazem: desenho o espaço de anúncio aqui? */
  mostrarAnuncios: boolean;
  paywallAtivo: boolean;
  lojaDisponivel: boolean;
  liberado(sistemaId: string): boolean;
  comprar(): Promise<ResultadoDaCompra>;
  restaurar(): Promise<ResultadoDaCompra>;
}

const Ctx = createContext<AcessoContexto | null>(null);

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const progresso = useProgresso();
  const [compra, setCompra] = useState<Compra>(SEM_COMPRA);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let vivo = true;
    progresso
      .obterPreferencia(CHAVE_COMPRA)
      .then((bruto) => {
        if (vivo) setCompra(desserializar(bruto));
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
    async (nova: Compra) => {
      setCompra(nova);
      await progresso.definirPreferencia(CHAVE_COMPRA, serializar(nova)).catch(() => {});
    },
    [progresso],
  );

  const aplicar = useCallback(
    async (resultado: ResultadoDaCompra) => {
      if (resultado.tipo === 'ok') await guardar(resultado.compra);
      return resultado;
    },
    [guardar],
  );

  const comprar = useCallback(async () => aplicar(await obterLoja().comprar(hojeLocal())), [aplicar]);
  const restaurar = useCallback(async () => aplicar(await obterLoja().restaurar(hojeLocal())), [aplicar]);

  const valor = useMemo<AcessoContexto>(() => {
    const hoje = hojeLocal();
    const estadoEnt: EstadoEntitlements = { paywallAtivo: PAYWALL_ATIVO, compra, hoje };
    const limpo = semAnuncios(compra, hoje);
    return {
      carregando,
      compra,
      estado: estadoDaCompra(compra, hoje),
      semAnuncios: limpo,
      // Três condições, todas necessárias. Na web não há anúncio nenhum: a
      // cobrança da loja não existe no navegador, então lá o app é gratuito e
      // limpo, e é isso que os textos precisam dizer. E enquanto a compra
      // carrega do banco, nada de anúncio: quem já pagou não pode ver um
      // piscar de propaganda a cada abertura do app.
      mostrarAnuncios: ANUNCIOS_ATIVOS && Platform.OS !== 'web' && !limpo && !carregando,
      paywallAtivo: PAYWALL_ATIVO,
      lojaDisponivel: obterLoja().disponivel,
      liberado: (sistemaId: string) => acessoLiberado(sistemaId, estadoEnt),
      comprar,
      restaurar,
    };
  }, [compra, carregando, comprar, restaurar]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useAcesso(): AcessoContexto {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAcesso requer EntitlementsProvider');
  return v;
}
