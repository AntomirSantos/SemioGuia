// Traduz os códigos de erro do Firebase Auth (`FirebaseError.code`, sempre no
// formato "auth/algo") para mensagens pt-BR apresentáveis ao usuário. Códigos
// não mapeados (ou string vazia, ex.: erro sem `.code`) caem no fallback
// genérico — nunca expomos o texto técnico do SDK na UI.
const MENSAGENS: Record<string, string> = {
  'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet e tente de novo.',
  'auth/requires-recent-login': 'Por segurança, entre novamente para concluir esta ação.',
  'auth/too-many-requests': 'Muitas tentativas seguidas. Aguarde um pouco e tente de novo.',
};

const ERRO_GENERICO = 'Não foi possível completar a ação. Tente de novo.';

export function mapearErroAuth(codigo: string): string {
  return MENSAGENS[codigo] ?? ERRO_GENERICO;
}
