import { Share } from 'react-native';
import {
  ALTURA_IMAGEM,
  LARGURA_IMAGEM,
  compartilharResultadoOsce,
  desenharResultado,
  montarTextoResultado,
  type Ctx2dMinimo,
  type DadosResultadoOsce,
} from './compartilharResultado';

const DADOS: DadosResultadoOsce = {
  titulo: 'Medida da pressão arterial',
  lembrados: 8,
  total: 10,
  percentual: 80,
};

test('montarTextoResultado resume estação, placar e assinatura', () => {
  expect(montarTextoResultado(DADOS)).toBe(
    'Estação OSCE: Medida da pressão arterial\n8 de 10 passos lembrados (80%)\nSemioGuia · semiologia no bolso',
  );
});

// Contexto 2D falso que grava o que foi desenhado: testa o layout sem
// canvas real (o Jest roda em Node).
function ctxFalso(): Ctx2dMinimo & { textos: string[]; retangulos: [number, number, number, number][] } {
  const gravado = {
    fillStyle: '',
    font: '',
    textos: [] as string[],
    retangulos: [] as [number, number, number, number][],
    fillRect(x: number, y: number, w: number, h: number) {
      gravado.retangulos.push([x, y, w, h]);
    },
    fillText(texto: string) {
      gravado.textos.push(texto);
    },
    // largura proporcional ao comprimento: título curto não quebra
    measureText(texto: string) {
      return { width: texto.length * 30 };
    },
  };
  return gravado;
}

test('desenharResultado pinta o papel inteiro e escreve masthead, título, placar e rodapé', () => {
  const ctx = ctxFalso();
  desenharResultado(ctx, DADOS, '2026-09-03');

  expect(ctx.retangulos[0]).toEqual([0, 0, LARGURA_IMAGEM, ALTURA_IMAGEM]);
  expect(ctx.textos).toContain('SemioGuia');
  expect(ctx.textos).toContain('ESTAÇÃO OSCE');
  expect(ctx.textos).toContain('Medida da pressão arterial');
  expect(ctx.textos).toContain('80%');
  expect(ctx.textos).toContain('8 de 10 passos lembrados');
  expect(ctx.textos).toContain('03/09/2026 · antomirsantos.github.io/SemioGuia');
});

test('desenharResultado quebra título longo em múltiplas linhas (máx. 3)', () => {
  const ctx = ctxFalso();
  desenharResultado(
    ctx,
    { ...DADOS, titulo: 'Exame neurológico completo com fundoscopia pares cranianos força tônus reflexos e marcha' },
    '2026-09-03',
  );
  const linhasDoTitulo = ctx.textos.filter((t) => t.includes('neurológico') || t.includes('fundoscopia') || t.includes('reflexos') || t.includes('marcha') || t.includes('força'));
  expect(linhasDoTitulo.length).toBeGreaterThan(1);
  expect(linhasDoTitulo.length).toBeLessThanOrEqual(3);
});

test('no nativo, compartilharResultadoOsce usa a folha do sistema com o texto', async () => {
  // jest-expo roda com Platform.OS nativo (não-web), então este é o caminho padrão.
  const spy = jest.spyOn(Share, 'share').mockResolvedValue({ action: 'sharedAction' } as never);
  const meio = await compartilharResultadoOsce(DADOS);
  expect(meio).toBe('texto');
  expect(spy).toHaveBeenCalledWith({ title: 'Resultado OSCE', message: montarTextoResultado(DADOS) });
  spy.mockRestore();
});

test('cancelamento da folha nativa propaga (o chamador não conta o evento)', async () => {
  const spy = jest.spyOn(Share, 'share').mockRejectedValue(new Error('cancelado'));
  await expect(compartilharResultadoOsce(DADOS)).rejects.toThrow('cancelado');
  spy.mockRestore();
});
