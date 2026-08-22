import type { ItemRevisao } from '../revisao/sm2';

export interface RespostaRegistrada { perguntaId: string; topicoId: string; correta: boolean; respondidaEm: number }
export interface ConclusaoCaso { casoId: string; classe: 'otimo' | 'aceitavel' | 'dano'; otimas: number; aceitaveis: number; erros: number; concluidaEm: number }
export interface ProgressStore {
  marcarEstudado(topicoId: string, estudado: boolean): Promise<void>;
  listarEstudados(): Promise<string[]>;
  favoritar(topicoId: string, favorito: boolean): Promise<void>;
  listarFavoritos(): Promise<string[]>;
  registrarResposta(r: RespostaRegistrada): Promise<void>;
  listarRespostas(topicoId?: string): Promise<RespostaRegistrada[]>;
  registrarBusca(termo: string): Promise<void>;
  listarBuscasRecentes(limite?: number): Promise<string[]>; // mais recente primeiro, sem duplicatas, default 10
  obterPreferencia(chave: string): Promise<string | null>;
  definirPreferencia(chave: string, valor: string): Promise<void>;
  salvarItemRevisao(item: ItemRevisao): Promise<void>; // upsert por item.id
  listarItensRevisao(): Promise<ItemRevisao[]>; // ordem livre; quem consome ordena
  registrarConclusaoCaso(c: ConclusaoCaso): Promise<void>; // append (histórico), não upsert
  listarConclusoesCasos(casoId?: string): Promise<ConclusaoCaso[]>; // ordem por concluidaEm asc
}
