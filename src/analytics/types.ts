// Instrumentação do beta (plano de validação §4): eventos de uso anônimos,
// persistidos localmente e exportáveis pelo próprio aluno no Perfil.

export const EVENTOS = [
  'app_aberto',
  'onboarding_concluido',
  'topico_aberto',
  'busca_realizada',
  'quiz_concluido',
  'revisao_concluida',
  'osce_concluida',
  'caso_concluido',
  'resultado_compartilhado',
  'feedback_enviado',
  'plantao_aberto',
  'plantao_sinal_aberto',
  'checklists_aberto',
  'checklist_concluido',
  'exame_completo_aberto',
  'exame_completo_encerrado',
  'questoes_aberto',
  'casos_aberto',
] as const;

export type EventoAnalytics = (typeof EVENTOS)[number];

export type Propriedades = Record<string, string | number | boolean>;

export interface RegistroEvento {
  evento: EventoAnalytics;
  propriedades: Propriedades;
  em: number; // epoch ms
  userId: string;
}

export interface EventosStore {
  /** Devolve o id anônimo do aparelho, gerando e persistindo na 1ª chamada. */
  obterUserId(): Promise<string>;
  registrar(r: RegistroEvento): Promise<void>;
  listar(): Promise<RegistroEvento[]>; // ordem de chegada
}
