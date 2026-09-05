// Coordenação global da ausculta: um único som toca por vez em todo o app,
// e cada clique concede no máximo DURACAO_MAX_DE_SOM_MS de reprodução.
// Cada bloco Som registra aqui seu "parador" (ref estável por instância);
// quem assume a reprodução manda parar o detentor anterior. Módulo sem
// estado de React de propósito: os blocos vivem em telas diferentes e o
// que os une é só esta referência.

export const DURACAO_MAX_DE_SOM_MS = 10_000;

type Parador = { current: () => void };

let detentor: Parador | null = null;

/** Para o som que estiver tocando (se houver outro) e assume a vez. */
export function assumirReproducao(parador: Parador) {
  if (detentor && detentor !== parador) detentor.current();
  detentor = parador;
}

/** Libera a vez, sem parar ninguém: chamar ao pausar ou desmontar. */
export function encerrarReproducao(parador: Parador) {
  if (detentor === parador) detentor = null;
}

/** Visível para testes: quem detém a reprodução agora. */
export function detentorAtual(): Parador | null {
  return detentor;
}
