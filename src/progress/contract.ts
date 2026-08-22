import type { ConclusaoCaso, ProgressStore } from './types';
import type { ItemRevisao } from '../revisao/sm2';
import { chaveConclusao, chaveResposta, snapshotVazio, type SnapshotSync } from '../sync/merge';

/**
 * Suíte de contrato compartilhada: garante semântica idêntica entre
 * adaptadores de ProgressStore (memória, SQLite, ...).
 */
export function testarContratoProgressStore(nome: string, criar: () => Promise<ProgressStore>): void {
  describe(`ProgressStore (${nome})`, () => {
    test('estudado é idempotente e reversível', async () => {
      const s = await criar();
      await s.marcarEstudado('t1', true);
      await s.marcarEstudado('t1', true);
      expect(await s.listarEstudados()).toEqual(['t1']);
      await s.marcarEstudado('t1', false);
      expect(await s.listarEstudados()).toEqual([]);
    });

    test('favoritos independem de estudados', async () => {
      const s = await criar();
      await s.favoritar('t1', true);
      expect(await s.listarFavoritos()).toEqual(['t1']);
      expect(await s.listarEstudados()).toEqual([]);
    });

    test('respostas filtram por tópico', async () => {
      const s = await criar();
      await s.registrarResposta({ perguntaId: 'q1', topicoId: 't1', correta: true, respondidaEm: 1 });
      await s.registrarResposta({ perguntaId: 'q2', topicoId: 't2', correta: false, respondidaEm: 2 });
      expect(await s.listarRespostas('t1')).toHaveLength(1);
      expect(await s.listarRespostas()).toHaveLength(2);
    });

    test('buscas recentes: sem duplicatas, mais recente primeiro, com limite', async () => {
      const s = await criar();
      for (const termo of ['pa', 'murphy', 'pa']) await s.registrarBusca(termo);
      expect(await s.listarBuscasRecentes()).toEqual(['pa', 'murphy']);
      expect(await s.listarBuscasRecentes(1)).toEqual(['pa']);
    });

    test('preferências: ausente é null, gravar e ler', async () => {
      const s = await criar();
      expect(await s.obterPreferencia('tema')).toBeNull();
      await s.definirPreferencia('tema', 'escuro');
      expect(await s.obterPreferencia('tema')).toBe('escuro');
      await s.definirPreferencia('tema', 'claro');
      expect(await s.obterPreferencia('tema')).toBe('claro');
    });

    test('salvarItemRevisao faz upsert por id e listarItensRevisao devolve todos', async () => {
      const store = await criar();
      const base: ItemRevisao = { id: 'pa-1', tipo: 'pergunta', topicoId: 'a/b/c', facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22', atualizadoEm: '2026-08-21T12:00:00.000Z' };
      await store.salvarItemRevisao(base);
      await store.salvarItemRevisao({ ...base, id: 'a/b/c#checklist:Medida da PA', tipo: 'checklist' });
      await store.salvarItemRevisao({ ...base, repeticoes: 3, intervaloDias: 15, proximaRevisao: '2026-09-06' }); // upsert do pa-1
      const itens = await store.listarItensRevisao();
      expect(itens).toHaveLength(2);
      const pa1 = itens.find((i) => i.id === 'pa-1');
      expect(pa1).toMatchObject({ repeticoes: 3, intervaloDias: 15, proximaRevisao: '2026-09-06', facilidade: 2.5 });
    });

    test('registrarConclusaoCaso é append (histórico) e listarConclusoesCasos ordena por concluidaEm e filtra por casoId', async () => {
      const store = await criar();
      const c1: ConclusaoCaso = { casoId: 'caso-1', classe: 'otimo', otimas: 3, aceitaveis: 0, erros: 0, concluidaEm: 300 };
      const c2: ConclusaoCaso = { casoId: 'caso-2', classe: 'aceitavel', otimas: 1, aceitaveis: 2, erros: 0, concluidaEm: 100 };
      const c3: ConclusaoCaso = { casoId: 'caso-1', classe: 'dano', otimas: 0, aceitaveis: 1, erros: 2, concluidaEm: 200 };
      await store.registrarConclusaoCaso(c1);
      await store.registrarConclusaoCaso(c2);
      await store.registrarConclusaoCaso(c3);

      const todas = await store.listarConclusoesCasos();
      expect(todas).toHaveLength(3);
      expect(todas.map((c) => c.concluidaEm)).toEqual([100, 200, 300]);

      const doCaso1 = await store.listarConclusoesCasos('caso-1');
      expect(doCaso1).toHaveLength(2);
      expect(doCaso1.map((c) => c.concluidaEm)).toEqual([200, 300]);
      expect(doCaso1.every((c) => c.casoId === 'caso-1')).toBe(true);
    });

    test('desmarcar é gravação com carimbo (não DELETE) — leitura permanece idêntica ao contrato de hoje', async () => {
      const s = await criar();
      await s.marcarEstudado('t1', true);
      await s.favoritar('t1', true);
      await s.marcarEstudado('t1', false);
      await s.favoritar('t1', false);

      // regressão: contrato de leitura idêntico ao de antes do carimbo
      expect(await s.listarEstudados()).toEqual([]);
      expect(await s.listarFavoritos()).toEqual([]);

      // mas internamente é uma gravação valor=false, não uma remoção
      const snap = await s.exportarParaSync();
      expect(snap.estudados.t1).toEqual({ valor: false, atualizadoEm: expect.any(Number) });
      expect(snap.favoritos.t1).toEqual({ valor: false, atualizadoEm: expect.any(Number) });
    });

    test('exportarParaSync devolve snapshot com carimbos e históricos completos', async () => {
      const s = await criar();
      await s.marcarEstudado('t1', true);
      await s.favoritar('t1', true);
      await s.definirPreferencia('tema', 'escuro');
      const resposta = { perguntaId: 'q1', topicoId: 't1', correta: true, respondidaEm: 1 };
      await s.registrarResposta(resposta);
      const conclusao: ConclusaoCaso = { casoId: 'c1', classe: 'otimo', otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 1 };
      await s.registrarConclusaoCaso(conclusao);
      const item: ItemRevisao = { id: 'pa-1', tipo: 'pergunta', topicoId: 't1', facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22', atualizadoEm: '2026-08-21T12:00:00.000Z' };
      await s.salvarItemRevisao(item);

      const snap = await s.exportarParaSync();
      expect(snap.estudados.t1).toEqual({ valor: true, atualizadoEm: expect.any(Number) });
      expect(snap.favoritos.t1).toEqual({ valor: true, atualizadoEm: expect.any(Number) });
      expect(snap.prefs.tema).toEqual({ valor: 'escuro', atualizadoEm: expect.any(Number) });
      expect(snap.respostas).toEqual([resposta]);
      expect(snap.conclusoesCasos).toEqual([conclusao]);
      expect(snap.itensRevisao['pa-1']).toEqual(item);
    });

    test('aplicarDoSync faz upsert de estados/prefs/itensRevisao e dedupe de históricos ao aplicar 2×', async () => {
      const s = await criar();
      const resposta = { perguntaId: 'q1', topicoId: 't1', correta: true, respondidaEm: 1 };
      const conclusao: ConclusaoCaso = { casoId: 'c1', classe: 'otimo', otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 1 };
      const item: ItemRevisao = { id: 'pa-1', tipo: 'pergunta', topicoId: 't1', facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22', atualizadoEm: '2026-08-21T12:00:00.000Z' };
      const mudancas: SnapshotSync = {
        ...snapshotVazio(),
        estudados: { t1: { valor: true, atualizadoEm: 100 } },
        favoritos: { t1: { valor: true, atualizadoEm: 100 } },
        prefs: { tema: { valor: 'escuro', atualizadoEm: 100 } },
        itensRevisao: { 'pa-1': item },
        respostas: [resposta],
        conclusoesCasos: [conclusao],
      };

      await s.aplicarDoSync(mudancas);
      await s.aplicarDoSync(mudancas); // aplicar 2× não duplica

      expect(await s.listarEstudados()).toEqual(['t1']);
      expect(await s.listarFavoritos()).toEqual(['t1']);
      expect(await s.obterPreferencia('tema')).toBe('escuro');
      expect(await s.listarItensRevisao()).toHaveLength(1);
      const respostas = await s.listarRespostas();
      expect(respostas).toHaveLength(1);
      expect(respostas.map(chaveResposta)).toEqual([chaveResposta(resposta)]);
      const conclusoes = await s.listarConclusoesCasos();
      expect(conclusoes).toHaveLength(1);
      expect(conclusoes.map(chaveConclusao)).toEqual([chaveConclusao(conclusao)]);
    });

    test('round-trip: aplicar snapshot exportado em store vazio reproduz o snapshot original', async () => {
      const origem = await criar();
      await origem.marcarEstudado('t1', true);
      await origem.favoritar('t2', true);
      await origem.definirPreferencia('tema', 'escuro');
      await origem.registrarResposta({ perguntaId: 'q1', topicoId: 't1', correta: true, respondidaEm: 1 });
      await origem.registrarConclusaoCaso({ casoId: 'c1', classe: 'otimo', otimas: 1, aceitaveis: 0, erros: 0, concluidaEm: 1 });
      await origem.salvarItemRevisao({ id: 'pa-1', tipo: 'pergunta', topicoId: 't1', facilidade: 2.5, repeticoes: 0, intervaloDias: 0, proximaRevisao: '2026-08-22', atualizadoEm: '2026-08-21T12:00:00.000Z' });

      const snapshot = await origem.exportarParaSync();

      const destino = await criar(); // store vazio
      expect(await destino.exportarParaSync()).toEqual(snapshotVazio());

      await destino.aplicarDoSync(snapshot);
      expect(await destino.exportarParaSync()).toEqual(snapshot);
    });
  });
}
