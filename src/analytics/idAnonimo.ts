// Id anônimo por aparelho: não identifica a pessoa, não usa dados do login.
// crypto.randomUUID quando o runtime oferece; senão um fallback tempo+aleatório.
export function gerarIdAnonimo(): string {
  const cripto = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (cripto?.randomUUID) return cripto.randomUUID();
  return `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
