import { z } from 'zod';
import { casoSchema } from './casoSchema';

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
  // Blocos didáticos (2026-09): cena abre o tópico com uma vinheta clínica,
  // pense interrompe a leitura com recuperação ativa (resposta recolhida),
  // resumo fecha o tópico com exatamente três frases de saída.
  z.object({ tipo: z.literal('cena'), texto: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('pense'), pergunta: z.string().min(1), resposta: z.string().min(1), ...nivelCommon }),
  z.object({ tipo: z.literal('resumo'), linhas: z.array(z.string().min(1)).length(3), ...nivelCommon }),
  // Caso-relâmpago: parágrafo-caso com uma decisão única ao fim do tópico —
  // a ponte entre a leitura e os casos clínicos ramificados.
  z
    .object({
      tipo: z.literal('relampago'),
      caso: z.string().min(1),
      pergunta: z.string().min(1),
      opcoes: z.array(z.string().min(1)).min(2).max(4),
      corretaIndex: z.number().int().nonnegative(),
      desfecho: z.string().min(1),
      ...nivelCommon,
    })
    .refine((b) => b.corretaIndex < b.opcoes.length, {
      message: 'corretaIndex fora do intervalo de opcoes',
    }),
  // Som de ausculta (didática 2026-09): player de um som sintetizado do
  // registro em src/config/sons.ts. O enum espelha as chaves de lá — o
  // build recusa um bloco que aponte para som inexistente.
  z.object({
    tipo: z.literal('som'),
    titulo: z.string().min(1),
    arquivo: z.enum([
      'bulhas-normais',
      'galope-b3',
      'galope-b4',
      'desdobramento-b2',
      'sopro-sistolico',
      'sopro-regurgitacao',
      'sopro-diastolico',
      'ruflar-pre-sistolico',
      'sopro-continuo',
      'atrito-pericardico',
      'som-traqueal',
      'som-bronquico',
      'som-broncovesicular',
      'murmurio-vesicular',
      'sibilos',
      'roncos',
      'estridor',
      'estertores-finos',
      'estertores-grossos',
      'atrito-pleural',
    ]),
    descricao: z.string().min(1),
    ...nivelCommon,
  }),
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
  // 'ok' é o atalho que o autor usa no frontmatter durante a revisão do beta
  // (checklist §10 do plano) — normalizado para 'aprovada' na compilação,
  // então o app só conhece dois estados.
  revisao: z.preprocess((v) => (v === 'ok' ? 'aprovada' : v), z.enum(['pendente', 'aprovada'])),
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

export const conteudoSchema = z.object({
  versao: z.string().min(1),
  sistemas: z.array(sistemaSchema),
  casos: z.array(casoSchema).default([]),
});

export type QuizPergunta = z.infer<typeof quizPerguntaSchema>;
export type Bloco = z.infer<typeof blocoSchema>;
export type Topico = z.infer<typeof topicoSchema>;
export type Capitulo = z.infer<typeof capituloSchema>;
export type Sistema = z.infer<typeof sistemaSchema>;
export type Conteudo = z.infer<typeof conteudoSchema>;
