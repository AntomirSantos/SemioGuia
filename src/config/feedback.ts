// Endpoint do feedback in-app (beta §9.5): um Google Forms preenchido por
// URL. COMMITADO com `null`, o autor cria o formulário (três campos:
// categoria, texto, contexto), copia a URL `viewform` e os ids `entry.N`
// de cada campo e preenche este objeto. Enquanto for `null`, o feedback
// fica registrado apenas como evento local `feedback_enviado` (que já sai
// no "Exportar dados de uso"), sem abrir formulário.
export interface ConfigFeedback {
  /** URL do formulário, ex.: https://docs.google.com/forms/d/e/<ID>/viewform */
  urlBase: string;
  /** ids dos campos do formulário, ex.: { categoria: 'entry.111', ... } */
  campos: { categoria: string; texto: string; contexto: string };
}

export const FEEDBACK: ConfigFeedback | null = null;
