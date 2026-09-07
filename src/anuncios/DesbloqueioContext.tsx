import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';
import { useNetworkState } from 'expo-network';
import { ANUNCIOS_ATIVOS, OFFLINE_EXIGE_COMPRA } from '../config/paywall';
import { useAcesso } from '../entitlements/EntitlementsContext';
import { track } from '../analytics/analytics';
import { obterAnuncios, type ResultadoDoAnuncio } from './anuncios';
import {
  comDesbloqueio,
  liberado as liberadoNaRegra,
  type AbaDeConteudo,
  type EstadoDesbloqueio,
} from './desbloqueio';

// Estado das liberações por anúncio. Ele mora AQUI, em memória, e não no
// banco: a regra é que fechar o app zera tudo, e a forma mais honesta de
// garantir isso é não gravar em lugar nenhum.

interface DesbloqueioContexto {
  /** O app está no regime de anúncios? Falso para quem comprou, e na web. */
  regimeDeAnuncios: boolean;
  /** Há conexão? Só importa quando o regime está ligado. */
  online: boolean;
  /** Sem internet e sem compra: o app pede conexão em vez de mostrar conteúdo. */
  exigindoConexao: boolean;
  liberado(aba: AbaDeConteudo, sistemaId: string): boolean;
  /** Roda o anúncio premiado e, se ele terminar, abre o sistema naquela aba. */
  assistirPara(aba: AbaDeConteudo, sistemaId: string): Promise<ResultadoDoAnuncio>;
  /** Qual chave está rodando agora, para a tela mostrar que está ocupada. */
  rodando: string | null;
}

const Ctx = createContext<DesbloqueioContexto | null>(null);

export function DesbloqueioProvider({ children }: { children: ReactNode }) {
  const acesso = useAcesso();
  const rede = useNetworkState();
  const [desbloqueados, setDesbloqueados] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [rodando, setRodando] = useState<string | null>(null);

  // `isInternetReachable` é indefinido enquanto a primeira medição não chega.
  // Na dúvida, considera online: nunca vale barrar quem está com rede boa por
  // causa de uma leitura que ainda não voltou.
  const online = rede.isInternetReachable !== false && rede.isConnected !== false;

  // O regime só existe quando há anúncio de verdade para mostrar: quem comprou
  // a remoção, a web (onde não há loja nem anúncio) e o app antes de o SDK ser
  // ligado ficam todos fora dele, com tudo aberto.
  const regimeDeAnuncios =
    ANUNCIOS_ATIVOS && Platform.OS !== 'web' && !acesso.semAnuncios && obterAnuncios().disponivel;

  const assistirPara = useCallback(
    async (aba: AbaDeConteudo, sistemaId: string): Promise<ResultadoDoAnuncio> => {
      const chave = `${aba}:${sistemaId}`;
      setRodando(chave);
      try {
        const r = await obterAnuncios().mostrarPremiado();
        // Assistiu abre. Sem anúncio para mostrar também abre: a falta de
        // estoque da rede de anúncios é problema nosso, não do aluno.
        if (r.tipo === 'assistido' || r.tipo === 'sem_anuncio') {
          setDesbloqueados((atual) => comDesbloqueio(atual, aba, sistemaId));
        }
        track('anuncio_resultado', { aba, sistema: sistemaId, resultado: r.tipo });
        return r;
      } catch {
        const erro: ResultadoDoAnuncio = { tipo: 'erro', mensagem: 'falha ao mostrar o anúncio' };
        track('anuncio_resultado', { aba, sistema: sistemaId, resultado: 'erro' });
        return erro;
      } finally {
        setRodando(null);
      }
    },
    [],
  );

  const valor = useMemo<DesbloqueioContexto>(() => {
    const estado: EstadoDesbloqueio = { regimeDeAnuncios, desbloqueados };
    return {
      regimeDeAnuncios,
      online,
      exigindoConexao: OFFLINE_EXIGE_COMPRA && regimeDeAnuncios && !online,
      liberado: (aba, sistemaId) => liberadoNaRegra(aba, sistemaId, estado),
      assistirPara,
      rodando,
    };
  }, [regimeDeAnuncios, desbloqueados, online, assistirPara, rodando]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useDesbloqueio(): DesbloqueioContexto {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDesbloqueio requer DesbloqueioProvider');
  return v;
}
