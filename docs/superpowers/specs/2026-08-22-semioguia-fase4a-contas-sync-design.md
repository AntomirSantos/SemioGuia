# SemioGuia Fase 4A, Contas e Sincronização: Design

Data: 22/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat, aguardando revisão do texto

## 1. Objetivo

Conta opcional com sincronização do progresso entre aparelhos, mantendo o
app 100% funcional offline e sem conta. Base pronta para o paywall da
Fase 4B (assinatura), que fica fora deste escopo junto com pagamentos.

## 2. Decisões do autor (registradas em 22/08)

1. **Escopo 4A:** contas + sincronização agora; assinatura/pagamento na 4B
   (dependem do canal de distribuição, lojas × web, ainda não decidido).
2. **Backend:** Firebase (Auth + Firestore), auditado pela skill
   `firebase-security-rules-auditor` antes de ir ao ar.
3. **Login:** e-mail/senha com verificação + "Entrar com Google". Sign in
   with Apple entra com a publicação na App Store (obrigatório lá).
4. **Conta é opcional:** sem conta, nada muda em relação ao app atual.
5. **Modelo de sync:** local permanece a fonte primária (offline-first);
   sincronização por item com merge determinístico (abordagem A).

## 3. Módulos

### 3.1 `src/conta/`

- `firebaseApp.ts`: inicialização preguiçosa do SDK JS modular
  (`firebase/app`, `firebase/auth`, `firebase/firestore`). A configuração
  pública vem de `src/conta/config.ts` (arquivo gerado a partir de
  `config.exemplo.ts`; sem ele, `syncDisponivel() === false`).
  **Flag mestre:** sem config, todo o módulo se comporta como desabilitado, 
  o app compila, testa e roda como hoje.
- `AuthContext.tsx`: estado da sessão (`usuario: {uid, email} | null`,
  `carregando`), ações `criarConta(email, senha)`, `entrar(email, senha)`,
  `entrarComGoogle()`, `sair()`, `excluirConta()` (reautentica se preciso,
  apaga dados no servidor e a conta de Auth). Persistência de sessão do
  próprio SDK. Erros mapeados para mensagens pt-BR amigáveis (senha fraca,
  e-mail em uso, credencial inválida, sem rede).
- Verificação de e-mail enviada no cadastro; o app não bloqueia uso por
  e-mail não verificado (a conta só sincroniza progresso do próprio dono).

### 3.2 `src/sync/`

- `merge.ts`, **motor puro** (sem rede, sem Firebase): recebe o estado
  local e o remoto e devolve `{ paraLocal, paraRemoto }`.
  - **Históricos** (respostas de quiz, conclusões de caso): fatos
    imutáveis; união por chave natural
    (`perguntaId+respondidaEm`, `casoId+concluidaEm`).
  - **Estados** (itens de revisão, estudados, favoritos, preferências
    tema/fonte): last-write-wins por carimbo `atualizadoEm` (ISO).
    Empate exato de carimbo: vence o remoto (determinístico).
- `orquestrador.ts`, quando sincronizar: ao entrar na conta (merge
  inicial), ao abrir o app com sessão ativa, ao focar o Perfil, e após
  ações que gravam progresso (com debounce; falha silenciosa e re-tentativa
  no próximo gatilho, sem fila persistente na 4A).
- Estado observável para a UI: `ultimaSync: number | null`,
  `sincronizando: boolean`, `erro: string | null`.

## 4. Dados no Firestore e regras de segurança

```
users/{uid}/perfil            { email, criadoEm }
users/{uid}/estudados/{topicoId}      { estudado, atualizadoEm }
users/{uid}/favoritos/{topicoId}      { favorito, atualizadoEm }
users/{uid}/itensRevisao/{itemId}     espelho de ItemRevisao
users/{uid}/respostas/{chave}         espelho de RespostaRegistrada (chave = perguntaId_respondidaEm)
users/{uid}/conclusoesCasos/{chave}   espelho de ConclusaoCaso (chave = casoId_concluidaEm)
users/{uid}/prefs/{chave}             { valor, atualizadoEm }
```

Regras (`firestore.rules`, versionadas no repo):

- Negar por padrão; todo acesso exige `request.auth != null &&
  request.auth.uid == uid` (match no caminho `users/{uid}/**` por coleção,
  sem curinga recursivo aberto).
- Validação por coleção: campos obrigatórios, tipos, tamanhos máximos
  (strings limitadas; números em faixas plausíveis), `hasOnly` para
  impedir campos extras; `create` e `update` validados separadamente.
- Sem acesso de admin/list entre usuários; sem leitura anônima.
- **Gate de processo:** as regras passam pela auditoria da skill
  `firebase-security-rules-auditor` (e os achados são corrigidos) antes de
  qualquer deploy; a auditoria é repetida a cada mudança de regra.

LGPD: único dado pessoal coletado é o e-mail; texto claro na tela de conta
(o que é coletado e por quê); **excluir conta** remove todas as subcoleções
e a conta de Auth; sem analytics e sem quaisquer outros SDKs de coleta.

## 5. Carimbos locais (migração v4)

`estudados`, `favoritos` e `preferencias` ganham `atualizado_em` (INTEGER,
epoch ms) no SQLite: migração v4 idempotente no padrão das anteriores
(v1..v4 executadas em sequência, `IF NOT EXISTS`/`ADD COLUMN` guardado);
localStorage ganha o campo nos objetos; memória idem. A interface
`ProgressStore` muda apenas por acréscimo (os métodos existentes passam a
gravar carimbo internamente; leitura dos carimbos via métodos novos de
exportação para o sync: `exportarParaSync()`, snapshot tipado de tudo que
sincroniza, e `aplicarDoSync(mudancas)`); a suíte de contrato cobre ambos
nos 3 adaptadores.

## 6. UX (Perfil → bloco "Conta")

- Sem sessão: card convidando ("Sincronize seu progresso entre aparelhos"),
  formulário e-mail/senha (entrar OU criar), botão "Entrar com Google",
  aviso LGPD curto. Sem config do Firebase: "Sincronização indisponível
  nesta versão".
- Com sessão: e-mail da conta, "Sincronizado há X" (ou "Sincronizando…" /
  erro discreto com re-tentar), botões Sair e Excluir conta (confirmação
  explícita em duas etapas, aviso de irreversibilidade).
- Primeira entrada com dados locais existentes: merge automático (o motor
  garante que nada local se perde); sem telas extras.
- Acessibilidade e tokens como todo o app; textos pt-BR.

## 7. Erros e testes

- TDD no motor de merge (união de históricos com duplicatas; LWW nos dois
  sentidos; empate; snapshot vazio de um lado; idempotência: merge do
  resultado consigo mesmo é vazio).
- Contrato do store estendido (carimbos + exportar/aplicar) nos 3
  adaptadores; migração v4 testada.
- AuthContext e telas testados com Firebase mockado (o SDK real nunca roda
  no jest); mapeamento de erros pt-BR testado.
- Regras: auditoria via skill (estática) + revisão dedicada; testes com
  emulador ficam documentados como passo do autor (o emulador não roda no
  ambiente de CI atual).
- Sync nunca quebra o app: qualquer falha degrada para o comportamento
  local silenciosamente (erro visível apenas no bloco Conta).

## 8. Passos do autor (quando o código estiver pronto)

1. Criar projeto no console do Firebase; ativar Auth (e-mail/senha e
   Google) e Firestore.
2. Copiar a config pública do app web para `src/conta/config.ts`
   (modelo em `config.exemplo.ts`).
3. Publicar `firestore.rules` (o repo terá o arquivo auditado e o comando).
4. Testar login/sync em dois navegadores; só então divulgar.

## 9. Fora desta fase (4B e além)

- Assinatura, paywall, pagamentos (lojas × web), Sign in with Apple,
  recuperação de senha por SMS, fila persistente de sync offline,
  resolução de conflito manual, multi-dispositivo em tempo real,
  analytics. Better Auth não se aplica (decisão pelo Firebase); a skill
  better-auth-security-best-practices fica reservada caso a 4B adote
  backend próprio.
