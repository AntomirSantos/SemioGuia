export interface RespostaRegistrada { perguntaId: string; topicoId: string; correta: boolean; respondidaEm: number }
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
}
