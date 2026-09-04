import { aguardarAnalytics, configurarAnalytics, exportarEventos, reiniciarAnalytics, track } from './analytics';
import { MemoryEventosStore } from './memoryEventos';
import type { EventosStore, RegistroEvento } from './types';

afterEach(() => {
  reiniciarAnalytics();
});

test('track grava evento com propriedades, carimbo e userId anônimo', async () => {
  const store = new MemoryEventosStore();
  configurarAnalytics({ store });

  const antes = Date.now();
  track('topico_aberto', { topicoId: 'a/b/c' });
  await aguardarAnalytics();

  const eventos = await store.listar();
  expect(eventos).toHaveLength(1);
  expect(eventos[0].evento).toBe('topico_aberto');
  expect(eventos[0].propriedades).toEqual({ topicoId: 'a/b/c' });
  expect(eventos[0].em).toBeGreaterThanOrEqual(antes);
  expect(eventos[0].userId).toBe(await store.obterUserId());
});

test('track preserva a ordem de chamada mesmo com store assíncrono', async () => {
  const store = new MemoryEventosStore();
  configurarAnalytics({ store });

  track('app_aberto');
  track('topico_aberto', { topicoId: 't1' });
  track('quiz_concluido', { topicoId: 't1', acertos: 3, total: 4 });
  await aguardarAnalytics();

  expect((await store.listar()).map((e) => e.evento)).toEqual([
    'app_aberto',
    'topico_aberto',
    'quiz_concluido',
  ]);
});

test('track nunca lança nem interrompe a fila quando o store falha', async () => {
  const quebrado: EventosStore = {
    obterUserId: async () => 'u',
    registrar: async () => {
      throw new Error('disco cheio');
    },
    listar: async () => [],
  };
  configurarAnalytics({ store: quebrado });
  expect(() => track('app_aberto')).not.toThrow();
  await aguardarAnalytics();

  // A fila segue viva: trocar para um store são volta a gravar.
  const sao = new MemoryEventosStore();
  configurarAnalytics({ store: sao });
  track('busca_realizada', { termo: 'sopro' });
  await aguardarAnalytics();
  expect(await sao.listar()).toHaveLength(1);
});

test('sem PostHog configurado, nada é enviado para fora', async () => {
  const envio = jest.fn(async () => ({}));
  configurarAnalytics({ store: new MemoryEventosStore(), posthog: null, enviar: envio });
  track('app_aberto');
  await aguardarAnalytics();
  expect(envio).not.toHaveBeenCalled();
});

test('com PostHog configurado, envia capture com api_key, distinct_id e propriedades', async () => {
  const envio = jest.fn(async () => ({}));
  const store = new MemoryEventosStore();
  configurarAnalytics({
    store,
    posthog: { host: 'https://ph.exemplo.com/', chaveApi: 'phc_teste' },
    enviar: envio,
  });
  track('caso_concluido', { casoId: 'c1', classe: 'otimo' });
  await aguardarAnalytics();

  expect(envio).toHaveBeenCalledTimes(1);
  const [url, corpo] = envio.mock.calls[0] as unknown as [string, string];
  expect(url).toBe('https://ph.exemplo.com/capture/');
  const dado = JSON.parse(corpo) as {
    api_key: string;
    event: string;
    distinct_id: string;
    properties: Record<string, unknown>;
  };
  expect(dado.api_key).toBe('phc_teste');
  expect(dado.event).toBe('caso_concluido');
  expect(dado.distinct_id).toBe(await store.obterUserId());
  expect(dado.properties).toEqual({ casoId: 'c1', classe: 'otimo' });
});

test('falha no envio ao PostHog não derruba a gravação local', async () => {
  const store = new MemoryEventosStore();
  configurarAnalytics({
    store,
    posthog: { host: 'https://ph.exemplo.com', chaveApi: 'phc_teste' },
    enviar: async () => {
      throw new Error('offline');
    },
  });
  track('app_aberto');
  await aguardarAnalytics();
  expect(await store.listar()).toHaveLength(1);
});

test('exportarEventos devolve envelope JSON com userId e todos os eventos', async () => {
  const store = new MemoryEventosStore();
  configurarAnalytics({ store });
  track('app_aberto');
  track('feedback_enviado', { contexto: 'perfil' });

  const json = await exportarEventos();
  const dado = JSON.parse(json) as {
    app: string;
    formato: number;
    userId: string;
    eventos: RegistroEvento[];
  };
  expect(dado.app).toBe('semioguia');
  expect(dado.formato).toBe(1);
  expect(dado.userId).toBe(await store.obterUserId());
  expect(dado.eventos.map((e) => e.evento)).toEqual(['app_aberto', 'feedback_enviado']);
});

test('sem store configurado (fora do app), track degrada para memória sem lançar', async () => {
  // reiniciarAnalytics deixou store=null; criarStoreEventosPadrao tenta o
  // SQLite nativo, que não existe no Jest: o fallback interno é memória.
  expect(() => track('app_aberto')).not.toThrow();
  await aguardarAnalytics();
  const json = await exportarEventos();
  expect((JSON.parse(json) as { eventos: unknown[] }).eventos).toHaveLength(1);
});
