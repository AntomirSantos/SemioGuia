# SemioGuia Fase 4A — Contas e Sincronização: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conta opcional (e-mail/senha + Google, Firebase) com sincronização offline-first do progresso, atrás de flag de config — sem config, o app permanece idêntico ao atual.

**Architecture:** (1) `src/conta/` — config pública + init preguiçosa do SDK + AuthContext; (2) motor de merge puro em `src/sync/merge.ts` (união de históricos, LWW por carimbo nos estados); (3) `ProgressStore` v4 (carimbos + `exportarParaSync`/`aplicarDoSync`); (4) `firestore.rules` versionadas e auditadas pela skill; (5) orquestrador + bloco Conta no Perfil. Firebase real NUNCA roda no jest — sempre mockado.

**Tech Stack:** o existente + dependência nova `firebase` (SDK JS modular ^12 — Auth + Firestore).

**Spec:** docs/superpowers/specs/2026-08-22-semioguia-fase4a-contas-sync-design.md — leia antes; é a autoridade.

## Global Constraints

- Convenções da casa: tokens/escala/a11y/pt-BR/dois temas, testes co-locados (render assíncrono), TS strict, commits convencionais em inglês, sem identificadores de modelo.
- **Flag mestre:** `firebaseConfig === null` ⇒ `syncDisponivel() === false` ⇒ app compila, testa e roda como hoje; bloco Conta mostra "Sincronização indisponível nesta versão". Nenhum código de rede executa.
- Merge (spec §3.2, verbatim): históricos = união por chave natural (`perguntaId_respondidaEm`, `casoId_concluidaEm`); estados = LWW por `atualizadoEm`; empate exato ⇒ vence o remoto.
- Regras Firestore: negar por padrão; `request.auth != null && request.auth.uid == uid`; validação de tipos/tamanhos/`hasOnly` por coleção; create/update separados; sem curinga recursivo aberto. Auditoria pela skill firebase-security-rules-auditor é GATE antes de qualquer deploy.
- LGPD: só e-mail; excluir conta apaga subcoleções + Auth; sem analytics.
- Sync nunca quebra o app: falha degrada para o local silenciosamente (erro visível só no bloco Conta).
- Firebase mockado em TODO teste (`jest.mock('firebase/app'|'firebase/auth'|'firebase/firestore')`).

---

### Task 1: Dependência, config pública e flag mestre

**Files:**
- Modify: `package.json` (+`firebase`)
- Create: `src/conta/config.ts`, `src/conta/firebaseApp.ts`, Test: `src/conta/firebaseApp.test.ts`

**Interfaces (Produces):**

```ts
// config.ts — COMMITADO com null; o autor substitui pela config pública do console depois
export interface FirebaseConfigApp { apiKey: string; authDomain: string; projectId: string; appId: string }
export const firebaseConfig: FirebaseConfigApp | null = null;
// firebaseApp.ts
export function syncDisponivel(): boolean;                  // firebaseConfig !== null
export function obterApp(): FirebaseApp;                    // lazy initializeApp; lança "Sincronização não configurada" se null
export function obterAuth(): Auth; export function obterDb(): Firestore;  // lazy, mesmos erros
```

- [ ] **Step 1:** `npm install firebase` (registro npm liberado). Conferir que `npx tsc --noEmit` segue limpo.
- [ ] **Step 2 (TDD):** testes — `syncDisponivel()` é false com config null; `obterApp()` lança com mensagem pt-BR "Sincronização não configurada"; com `jest.mock('firebase/app')` e config injetável (exportar também `_setConfigParaTeste(cfg | null)` — usado SÓ em teste, documentado), `obterApp()` chama `initializeApp` uma única vez (segunda chamada reusa).
- [ ] **Step 3:** implementar; suíte + typecheck. Commit: `feat: firebase dependency, public config and master sync flag`

---

### Task 2: Motor de merge puro

**Files:**
- Create: `src/sync/merge.ts`, Test: `src/sync/merge.test.ts`

**Interfaces (Produces — Tasks 3 e 6 dependem):**

```ts
import type { ItemRevisao } from '../revisao/sm2';
import type { RespostaRegistrada, ConclusaoCaso } from '../progress/types';
export interface EstadoCarimbado { valor: boolean; atualizadoEm: number }      // estudados/favoritos
export interface PrefCarimbada { valor: string; atualizadoEm: number }
export interface SnapshotSync {
  estudados: Record<string, EstadoCarimbado>;
  favoritos: Record<string, EstadoCarimbado>;
  itensRevisao: Record<string, ItemRevisao>;     // ItemRevisao.atualizadoEm (ISO) é o carimbo
  respostas: RespostaRegistrada[];
  conclusoesCasos: ConclusaoCaso[];
  prefs: Record<string, PrefCarimbada>;
}
export interface ResultadoMerge { paraLocal: SnapshotSync; paraRemoto: SnapshotSync }
export function snapshotVazio(): SnapshotSync;
export function merge(local: SnapshotSync, remoto: SnapshotSync): ResultadoMerge;
// paraLocal = o que falta no local; paraRemoto = o que falta no remoto (deltas, não estados completos)
export function chaveResposta(r: RespostaRegistrada): string;   // `${perguntaId}_${respondidaEm}`
export function chaveConclusao(c: ConclusaoCaso): string;       // `${casoId}_${concluidaEm}`
```

- [ ] **Step 1 (TDD), casos obrigatórios:** históricos — união com duplicata exata (mesma chave) não duplica; item só no local vai a `paraRemoto`; só no remoto vai a `paraLocal`. Estados — carimbo maior vence nos DOIS sentidos (local mais novo ⇒ paraRemoto; remoto mais novo ⇒ paraLocal); **empate exato ⇒ vence o remoto** (entra em paraLocal, não em paraRemoto); itensRevisao comparados por `Date.parse(atualizadoEm)`. Snapshot vazio de um lado. **Idempotência:** aplicar `paraLocal`/`paraRemoto` e re-rodar `merge` devolve deltas vazios. Motor puro: sem Date.now(), sem rede, imutável (entradas inalteradas).
- [ ] **Step 2:** FALHA; **Step 3:** implementar; suíte + typecheck. Commit: `feat: pure deterministic sync merge engine`

---

### Task 3: Store v4 — carimbos + exportar/aplicar

**Files:**
- Modify: `src/progress/types.ts`, `memoryStore.ts`, `localStorageStore.ts`, `sqliteStore.ts` (migração v4), `contract.ts`; Test: via `contract.test.ts`

**Interfaces (Produces — Task 6 depende):**

```ts
// em ProgressStore (acréscimos):
exportarParaSync(): Promise<SnapshotSync>;
aplicarDoSync(mudancas: SnapshotSync): Promise<void>;
// Semântica de aplicarDoSync: estados/prefs/itensRevisao = upsert direto (o merge já decidiu);
// respostas/conclusões = append apenas das chaves ausentes (dedupe por chave natural).
```

Migração SQLite v4 (idempotente — ADD COLUMN não tem IF NOT EXISTS; usar PRAGMA):

```ts
private colunaExiste(tabela: string, coluna: string): boolean {
  return this.db.getAllSync<{ name: string }>(`PRAGMA table_info(${tabela})`).some((c) => c.name === coluna);
}
// ESQUEMA_V4: para cada uma de estudados/favoritos/preferencias:
// if (!colunaExiste(t, 'atualizado_em')) execSync(`ALTER TABLE ${t} ADD COLUMN atualizado_em INTEGER DEFAULT 0`)
const VERSAO_ESQUEMA = '4';
```

- Métodos existentes (`marcarEstudado`, `favoritar`, `definirPreferencia`) passam a gravar `atualizado_em = Date.now()` — assinaturas INALTERADAS. Desmarcar estudado/favorito vira gravação `valor=false` com carimbo (não DELETE), para o LWW propagar a remoção entre aparelhos; `listarEstudados`/`listarFavoritos` filtram `valor=true` (mesmo contrato de leitura de hoje). localStorage/memória: mesma semântica em objetos `{valor, atualizadoEm}`.
- [ ] **Step 1 (contrato, TDD):** marcar-desmarcar-listar continua funcionando igual (regressão); `exportarParaSync()` devolve snapshot com carimbos e históricos completos; `aplicarDoSync` faz upsert de estados e dedupe de históricos (aplicar 2× não duplica); round-trip exportar→aplicar em store vazio reproduz o snapshot.
- [ ] **Step 2:** FALHA nos adaptadores testáveis; **Step 3:** implementar nos 3; suíte + typecheck. Commit: `feat: progress store v4 with sync timestamps and snapshot export/apply`

---

### Task 4: AuthContext

**Files:**
- Create: `src/conta/AuthContext.tsx`, `src/conta/errosAuth.ts`, Tests co-locados

**Interfaces (Produces — Task 6 depende):**

```ts
export interface UsuarioConta { uid: string; email: string | null }
export function AuthProvider({ children }): JSX.Element;   // sem config: usuario null e acoes lançam erro pt-BR
export function useConta(): {
  usuario: UsuarioConta | null; carregando: boolean;
  criarConta(email: string, senha: string): Promise<void>;   // + sendEmailVerification (não bloqueia uso)
  entrar(email: string, senha: string): Promise<void>;
  entrarComGoogle(): Promise<void>;                          // signInWithPopup na web; erro claro fora dela nesta fase
  sair(): Promise<void>;
  excluirConta(): Promise<void>;                             // apaga docs do usuário (Task 6 injeta o apagador) + deleteUser; auth/requires-recent-login ⇒ mensagem pedindo reautenticação
};
// errosAuth.ts: mapearErroAuth(codigo: string): string — pt-BR p/ auth/email-already-in-use,
// weak-password, invalid-credential, invalid-email, network-request-failed, requires-recent-login, too-many-requests; fallback genérico
```

- [ ] **Step 1 (TDD, firebase/auth totalmente mockado):** sem config ⇒ usuario null, `entrar` rejeita com "Sincronização não configurada"; com mock ⇒ `onAuthStateChanged` popula usuario; criarConta chama `createUserWithEmailAndPassword` + `sendEmailVerification`; erros do SDK viram as mensagens pt-BR de `mapearErroAuth` (testar 3 códigos + fallback); sair chama signOut.
- [ ] **Step 2:** FALHA; **Step 3:** implementar; `_layout.tsx` ganha `<AuthProvider>` envolvendo a árvore (fora do gate de fontes, dentro do ProgressProvider). Suíte + typecheck. Commit: `feat: optional account auth context with pt-BR error mapping`

---

### Task 5: Regras Firestore + auditoria + guia do autor

**Files:**
- Create: `firestore.rules`, `docs/firebase-setup.md`; Test: nenhum automatizado (emulador não roda no CI — documentar)

**Regras (estrutura exata; escrever completo por coleção, sem curingas recursivos):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/perfil/{doc} { ... }               // read/write só dono; hasOnly(['email','criadoEm']); email string <= 320
    match /users/{uid}/estudados/{topicoId} { ... }       // {valor: bool, atualizadoEm: int > 0}; hasOnly
    match /users/{uid}/favoritos/{topicoId} { ... }       // idem
    match /users/{uid}/itensRevisao/{itemId} { ... }      // campos de ItemRevisao: tipos + facilidade 1.3..5.0 + repeticoes/intervaloDias int >= 0 + strings <= 200; hasOnly
    match /users/{uid}/respostas/{chave} { ... }          // create only (histórico imutável): allow update, delete: if false
    match /users/{uid}/conclusoesCasos/{chave} { ... }    // create only; classe in ['otimo','aceitavel','dano']; contagens int 0..100
    match /users/{uid}/prefs/{chave} { ... }              // {valor: string <= 100, atualizadoEm: int > 0}
  }
}
// função comum: function dono(uid) { return request.auth != null && request.auth.uid == uid; }
// NENHUM match fora de users/{uid}; default do Firestore nega o resto.
```

- [ ] **Step 1:** escrever as regras completas (cada coleção com read/create/update/delete explícitos; históricos com update/delete negados; delete de estados permitido só ao dono — usado pelo excluir conta).
- [ ] **Step 2 — AUDITORIA (gate):** ler `.claude/skills/firebase-security-rules-auditor/SKILL.md` e auditar as regras contra o checklist da skill (privilege escalation, create vs update, hasOnly, type safety, size limits, resource exhaustion, role bypass). Registrar o resultado da auditoria em `docs/firebase-setup.md` (seção "Auditoria de segurança": data, achados, correções). Corrigir tudo antes do commit.
- [ ] **Step 3:** `docs/firebase-setup.md` (pt-BR): os 4 passos do autor da spec §8, com cliques do console, onde colar a config em `src/conta/config.ts`, e o comando de publicar regras (`firebase deploy --only firestore:rules` via `npx firebase-tools`, rodado pelo AUTOR na máquina dele — não no CI); nota de que testes de emulador são opcionais e como rodar.
- [ ] **Step 4:** Commit: `feat: audited firestore security rules and author setup guide`

---

### Task 6: Orquestrador de sync + bloco Conta no Perfil

**Files:**
- Create: `src/sync/orquestrador.ts` (+ test), `src/sync/firestoreSync.ts` (+ test, Firestore mockado), `src/conta/BlocoConta.tsx` (+ test)
- Modify: `src/app/(tabs)/perfil.tsx` (bloco Conta no topo das seções), `src/app/_layout.tsx` (provider do orquestrador se necessário)

**Interfaces:**
- Consumes: Tasks 1-5 (`syncDisponivel`, `useConta`, `merge`/`SnapshotSync`, `exportarParaSync`/`aplicarDoSync`, `obterDb`).
- Produces:

```ts
// firestoreSync.ts — única camada que toca o Firestore:
export function lerSnapshotRemoto(db, uid): Promise<SnapshotSync>;
export function gravarDeltas(db, uid, deltas: SnapshotSync): Promise<void>;  // writeBatch em lotes de <= 400
export function apagarDadosDoUsuario(db, uid): Promise<void>;                // usado por excluirConta
// orquestrador.ts:
export function useSync(): { ultimaSync: number | null; sincronizando: boolean; erro: string | null; sincronizarAgora(): Promise<void> };
// sincronizarAgora: exportar local → ler remoto → merge → aplicarDoSync(paraLocal) → gravarDeltas(paraRemoto) → ultimaSync=Date.now()
// gatilhos: login (merge inicial), app aberto com sessão, foco no Perfil; debounce 30s entre execuções; falha ⇒ erro setado, app intacto
```

Comportamento do BlocoConta (Perfil, acima de "Aparência"): sem config ⇒ card "Sincronização indisponível nesta versão". Sem sessão ⇒ card convite + formulário e-mail/senha (um campo de cada, botões Entrar e Criar conta ≥44pt), botão "Entrar com Google", aviso LGPD de 2 linhas (só o e-mail é coletado, para sincronizar o progresso; dá para excluir a conta a qualquer momento). Com sessão ⇒ e-mail, linha de estado ("Sincronizando…", "Sincronizado há X min", ou erro discreto + "Tentar de novo"), Sair, e Excluir conta com confirmação em duas etapas (toque → card de confirmação com aviso de irreversibilidade → confirmar). Erros de auth exibidos com as mensagens de `mapearErroAuth`. Tokens/escala/a11y; testes de tela com providers mockados cobrindo os 3 estados + fluxo de exclusão chamando `apagarDadosDoUsuario` antes de `deleteUser`.

- [ ] **Step 1 (TDD):** firestoreSync com Firestore mockado (ler snapshot monta SnapshotSync; gravarDeltas particiona em lotes; apagar remove as 7 subcoleções); orquestrador com módulos mockados (fluxo feliz seta ultimaSync; falha de rede seta erro e não lança; debounce ignora chamada a <30s); BlocoConta nos 3 estados.
- [ ] **Step 2:** FALHA; **Step 3:** implementar; suíte + typecheck + `npm run checar:contraste`.
- [ ] **Step 4:** Commit: `feat: sync orchestrator and account block in profile`

---

### Task 7: Gates finais + deploy

**Files:** branch `gh-pages` regenerada (autorizada); `docs/verificacao-fase1b.md` ganha "Adendo Fase 4A".

- [ ] Suíte inteira + typecheck + checar:contraste + build:content sync — verdes.
- [ ] Export web com baseUrl `/SemioGuia` (procedimento padrão), regenerar gh-pages órfã via worktree (`.nojekyll` + `404.html`), commit `deploy: fase 4a — optional accounts groundwork (sync disabled)`, force-push SÓ gh-pages.
- [ ] Headless (390×844, claro+escuro, navegação por cliques): Perfil mostra o bloco Conta com "Sincronização indisponível nesta versão" (config null); resto do app intacto (home, um tópico, card de revisão). Screenshots: perfil-conta-indisponivel, perfil-escuro.
- [ ] "Adendo Fase 4A" no doc de verificação + commit `docs: fase 4a verification addendum`. Push da branch principal fica com o orquestrador.

## Fora deste plano
- 4B (assinatura/paywall/pagamentos), Sign in with Apple, fila persistente offline, tempo real, analytics (spec §9). Ativação real do Firebase = passos do autor (docs/firebase-setup.md).

## Self-review (do plano)
- Cobertura da spec: §3.1 → T1+T4; §3.2 → T2+T6; §4 → T5; §5 → T3; §6 → T6; §7 → distribuído; §8 → T5 (guia); §9 respeitado.
- Tipos consistentes: SnapshotSync/EstadoCarimbado/PrefCarimbada (T2) usados em T3/T6; UsuarioConta (T4) em T6; FirebaseConfigApp (T1) — conferidos.
- Sem placeholders: código real na config, merge, migração v4 e estrutura das regras; T5/T6 com comportamento exaustivo e checklist de auditoria nomeado.
