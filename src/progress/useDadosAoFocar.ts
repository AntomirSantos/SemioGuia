import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';

// Hook compartilhado: recarrega dados de progresso toda vez que a tela ganha
// foco (não só ao montar), com cancelamento se a tela perder foco antes da
// promise resolver. As telas de abas ficam montadas entre navegações, então
// um efeito mount-only deixaria o progresso desatualizado dentro de uma
// mesma sessão (ex.: "última rodada X%" em Estudar após jogar um quiz).
// `carregar` deve ser memoizado (useCallback) pelo chamador sobre suas
// dependências reais (ex.: [progresso, conteudo]).
export function useDadosAoFocar<T>(carregar: () => Promise<T>): T | undefined {
  const [dados, setDados] = useState<T>();
  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      carregar()
        .then((d) => {
          if (ativo) setDados(d);
        })
        .catch(() => {});
      return () => {
        ativo = false;
      };
    }, [carregar]),
  );
  return dados;
}
