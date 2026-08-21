import type { ProgressStore } from './types';

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
  });
}
