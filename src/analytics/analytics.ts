import { POSTHOG, type ConfigPostHog } from '../config/analytics';
import { criarStoreEventosPadrao } from './storePadrao';
import { MemoryEventosStore } from './memoryEventos';
import type { EventoAnalytics, EventosStore, Propriedades, RegistroEvento } from './types';

/**
 * Núcleo do analytics do beta: `track(evento, propriedades)` fire-and-forget.
 *
 * Contratos:
 * - track NUNCA lança nem bloqueia a UI — qualquer falha é engolida;
 * - os registros são gravados em série (fila interna), preservando a ordem;
 * - a persistência é local (tabela `eventos` no SQLite; localStorage na web);
 * - o envio ao PostHog só acontece com a flag POSTHOG preenchida em
 *   src/config/analytics.ts, e é também fire-and-forget.
 */

type FnEnvio = (url: string, corpo: string) => Promise<unknown>;

interface EstadoAnalytics {
  store: EventosStore | null;
  posthog: ConfigPostHog | null;
  enviar: FnEnvio | null; // null = fetch global, se existir
  fila: Promise<void>;
}

const estado: EstadoAnalytics = { store: null, posthog: POSTHOG, enviar: null, fila: Promise.resolve() };

function obterStore(): EventosStore {
  if (!estado.store) {
    try {
      estado.store = criarStoreEventosPadrao();
    } catch {
      // Sem runtime nativo (ex.: Jest) ou storage bloqueado: degrada para
      // memória volátil em vez de derrubar quem chamou track().
      estado.store = new MemoryEventosStore();
    }
  }
  return estado.store;
}

function obterEnvio(): FnEnvio | null {
  if (estado.enviar) return estado.enviar;
  const f = (globalThis as { fetch?: typeof fetch }).fetch;
  if (!f) return null;
  return (url, corpo) =>
    f(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: corpo });
}

function enviarParaPostHog(config: ConfigPostHog, r: RegistroEvento): void {
  const envio = obterEnvio();
  if (!envio) return;
  const corpo = JSON.stringify({
    api_key: config.chaveApi,
    event: r.evento,
    distinct_id: r.userId,
    timestamp: new Date(r.em).toISOString(),
    properties: r.propriedades,
  });
  envio(`${config.host.replace(/\/$/, '')}/capture/`, corpo).catch(() => {});
}

/** Registra um evento de uso. Fire-and-forget: nunca lança, nunca bloqueia. */
export function track(evento: EventoAnalytics, propriedades: Propriedades = {}): void {
  const em = Date.now();
  estado.fila = estado.fila
    .then(async () => {
      const store = obterStore();
      const userId = await store.obterUserId();
      const registro: RegistroEvento = { evento, propriedades, em, userId };
      await store.registrar(registro);
      if (estado.posthog) enviarParaPostHog(estado.posthog, registro);
    })
    .catch(() => {});
}

/** JSON com todos os eventos do aparelho — corpo do "Exportar dados de uso". */
export async function exportarEventos(): Promise<string> {
  await estado.fila;
  const store = obterStore();
  const [userId, eventos] = await Promise.all([store.obterUserId(), store.listar()]);
  return JSON.stringify(
    { app: 'semioguia', formato: 1, exportadoEm: new Date().toISOString(), userId, eventos },
    null,
    2,
  );
}

/** Injeção para testes (e para trocar a config em runtime, se preciso). */
export function configurarAnalytics(opcoes: {
  store?: EventosStore | null;
  posthog?: ConfigPostHog | null;
  enviar?: FnEnvio | null;
}): void {
  if ('store' in opcoes) estado.store = opcoes.store ?? null;
  if ('posthog' in opcoes) estado.posthog = opcoes.posthog ?? null;
  if ('enviar' in opcoes) estado.enviar = opcoes.enviar ?? null;
}

/** Volta ao estado padrão (testes). */
export function reiniciarAnalytics(): void {
  estado.store = null;
  estado.posthog = POSTHOG;
  estado.enviar = null;
  estado.fila = Promise.resolve();
}

/** Aguarda a fila interna esvaziar (testes determinísticos). */
export function aguardarAnalytics(): Promise<void> {
  return estado.fila;
}
