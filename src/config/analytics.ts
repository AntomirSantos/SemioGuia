// Integração opcional com PostHog (plano de beta §4): DESLIGADA por padrão.
// Os eventos sempre ficam no aparelho (SQLite/localStorage) e saem só pelo
// botão "Exportar dados de uso" no Perfil. Para ligar o envio automático,
// o autor preenche este objeto com o host e a chave pública do projeto
// PostHog (a chave `phc_...` é publicável, como a config web do Firebase).
export interface ConfigPostHog {
  host: string; // ex.: 'https://us.i.posthog.com'
  chaveApi: string; // chave pública do projeto (phc_...)
}

export const POSTHOG: ConfigPostHog | null = null;
