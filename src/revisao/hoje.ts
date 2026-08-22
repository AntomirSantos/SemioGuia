// Único ponto do app autorizado a chamar `new Date()` sem argumento. Todo
// código que precisa da data/hora atual (rota de estação avulsa nesta task,
// sessão de revisão na Task 5) passa por aqui, para manter o "agora" testável
// e consistente com o formato usado pelo agendador SM-2 (`src/revisao/sm2.ts`).

// Data local (não UTC) no formato 'YYYY-MM-DD', para casar com `proximaRevisao`.
export function hojeLocal(): string {
  const d = new Date();
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function agoraIso(): string {
  return new Date().toISOString();
}
