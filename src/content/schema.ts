import { z } from 'zod';

export const quizPerguntaSchema = z
  .object({
    id: z.string().min(1),
    enunciado: z.string().min(1),
    alternativas: z.array(z.string().min(1)).min(2).max(5),
    corretaIndex: z.number().int().nonnegative(),
    explicacao: z.string().min(1),
  })
  .refine((p) => p.corretaIndex < p.alternativas.length, {
    message: 'corretaIndex fora do intervalo de alternativas',
  });

const etapaFluxo = z.object({
  texto: z.string().min(1),
  formato: z.enum(['inicio', 'decisao', 'acao', 'fim']),
});

// Shared nivel field for all block types
const nivelCommon = {
  nivel: z.enum(['basico', 'avancado']).optional(),
};

export const blocoSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('conceito'), titulo: z.string().optional(), texto: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('manobra'), titulo: z.string().min(1), passos: z.array(z.string().min(1)).min(1), observar: z.string().optional(), ...nivelCommon }),
  z.object({ tipo: z.literal('sinal'), nome: z.string().min(1), descricao: z.string().min(1), significado: z.string().min(1), causas: z.array(z.string().min(1)).min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('checklist'), titulo: z.string().min(1), itens: z.array(z.string().min(1)).min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('tabela'), titulo: z.string().optional(), colunas: z.array(z.string().min(1)).min(2), linhas: z.array(z.array(z.string())).min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('fluxograma'), titulo: z.string().optional(), etapas: z.array(etapaFluxo).min(2), ...nivelCommon }),
  z.object({ tipo: z.literal('perola'), texto: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('quiz'), perguntas: z.array(quizPerguntaSchema).min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('secao'), titulo: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('entendimento'), titulo: z.string().optional(), texto: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('ilustracao'), svg: z.string().min(20), legenda: z.string().min(1), ...nivelCommon }).refine((obj) => obj.svg.includes('<svg'), {
    message: 'svg deve conter "<svg"',
    path: ['svg'],
  }),
]);

export const topicoSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/),
  titulo: z.string().min(1),
  sistemaId: z.string().min(1),
  capituloId: z.string().min(1),
  ordem: z.number().int().positive(),
  tags: z.array(z.string()),
  referencias: z.array(z.string().min(1)).min(1),
  revisao: z.enum(['pendente', 'aprovada']),
  blocos: z.array(blocoSchema).min(1),
});

export const capituloSchema = z.object({
  id: z.string().min(1), titulo: z.string().min(1), ordem: z.number().int().positive(),
  topicos: z.array(topicoSchema),
});

export const sistemaSchema = z.object({
  id: z.string().min(1), titulo: z.string().min(1),
  cor: z.string().regex(/^#[0-9a-fA-F]{6}$/), icone: z.string().min(1),
  ordem: z.number().int().positive(), capitulos: z.array(capituloSchema),
});

export const conteudoSchema = z.object({ versao: z.string().min(1), sistemas: z.array(sistemaSchema) });

export type QuizPergunta = z.infer<typeof quizPerguntaSchema>;
export type Bloco = z.infer<typeof blocoSchema>;
export type Topico = z.infer<typeof topicoSchema>;
export type Capitulo = z.infer<typeof capituloSchema>;
export type Sistema = z.infer<typeof sistemaSchema>;
export type Conteudo = z.infer<typeof conteudoSchema>;
