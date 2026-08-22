# Ativar a sincronização (Firebase) — guia do autor

Este guia é para **o autor do SemioGuia**, na máquina dele. Nada aqui roda no
CI. Enquanto `src/conta/config.ts` estiver com `firebaseConfig = null`, o app
funciona normalmente em modo local e o bloco "Conta" do Perfil mostra
"Sincronização indisponível nesta versão" — nenhum destes passos é urgente.

Ao final destes 4 passos, contas e sincronização ficam ativas para todo mundo
que usar o app publicado. Faça o passo 4 (teste em dois navegadores) **antes**
de divulgar.

---

## Passo 1 — Criar o projeto e ativar Auth + Firestore

1. Abra <https://console.firebase.google.com> e clique em **Criar um projeto**
   (ou **Adicionar projeto**).
2. Nome: `semioguia` (o console gera um ID como `semioguia-1a2b3`; anote-o).
   **Desative o Google Analytics** — a spec proíbe SDKs de coleta (§4, LGPD).
   Aceite os termos e clique em **Criar projeto**.
3. No menu lateral, **Criação → Authentication → Vamos começar**. Na aba
   **Sign-in method**:
   - **E-mail/senha** → ativar o primeiro botão (**Ativar**) e **Salvar**.
     *Não* ative "link de e-mail (login sem senha)".
   - **Adicionar novo provedor → Google** → ativar, escolher um **e-mail de
     suporte do projeto** e **Salvar**.
4. Ainda em Authentication → aba **Settings → Authorized domains**: confirme
   que `localhost` está lá e **adicione o domínio do app publicado**
   (`<seu-usuario>.github.io` para o GitHub Pages). Sem isso o login com
   Google falha no ar.
5. No menu lateral, **Criação → Firestore Database → Criar banco de dados**:
   - Modo: **produção** (regras restritivas). As regras deste repositório
     substituem as padrão no passo 3.
   - Local: `southamerica-east1` (São Paulo) — **não dá para mudar depois**.

## Passo 2 — Copiar a config pública para `src/conta/config.ts`

1. No console: ⚙️ **Configurações do projeto → Seus apps → `</>` (Web)**.
2. Apelido do app: `SemioGuia web`. **Não** marque "Firebase Hosting".
3. Copie o objeto `firebaseConfig` que o console mostra.
4. Edite `src/conta/config.ts` e troque o `null` pelos **quatro** campos que a
   interface `FirebaseConfigApp` declara (o console mostra outros, como
   `storageBucket` e `messagingSenderId`; eles não são usados aqui):

```ts
export const firebaseConfig: FirebaseConfigApp | null = {
  apiKey: 'AIzaSyB1exemplo-nao-e-uma-chave-real',
  authDomain: 'semioguia-1a2b3.firebaseapp.com',
  projectId: 'semioguia-1a2b3',
  appId: '1:123456789012:web:abcdef1234567890',
};
```

Essa config **não é segredo** (ela vai no bundle de qualquer app web Firebase;
é identificação, não credencial). Quem protege os dados são as regras do
passo 3 — por isso elas passam por auditoria antes de qualquer deploy.

Depois de editar, rode os portões de sempre (`npx tsc --noEmit && npx jest`) e
faça o commit — a config precisa estar no repositório para ir junto no deploy
web.

## Passo 3 — Publicar as regras de segurança (`firestore.rules`)

O arquivo auditado está na raiz do repositório. Publique **da sua máquina**
(o CI não tem — e não deve ter — credencial de deploy):

```bash
cd /caminho/para/SemioGuia
npx firebase-tools login                      # abre o navegador, uma vez só
npx firebase-tools use --add                  # escolha o projeto; apelido: default
npx firebase-tools deploy --only firestore:rules --project semioguia-1a2b3
```

Se o `use --add` reclamar de configuração ausente, crie um `firebase.json`
mínimo na raiz:

```json
{ "firestore": { "rules": "firestore.rules" } }
```

Confira no console (**Firestore Database → Regras**) que a versão publicada é
a do repositório — a data de publicação e o texto devem bater.

> **Regra de processo (spec §4):** qualquer mudança em `firestore.rules` passa
> de novo pela auditoria da skill `firebase-security-rules-auditor` e o
> resultado é registrado na seção "Auditoria de segurança" abaixo **antes** do
> deploy.

## Passo 4 — Testar em dois navegadores (e só então divulgar)

1. `npx expo start --web`, abra o Perfil: o bloco "Conta" deve mostrar o
   formulário (não mais "Sincronização indisponível").
2. Navegador A: criar conta com e-mail/senha, marcar um tópico como estudado,
   favoritar outro, responder um quiz.
3. Navegador B (ou janela anônima): entrar com a **mesma** conta e conferir
   que estudados, favoritos, revisão e histórico aparecem.
4. Volte ao A, mude o tema, confirme que B recebe a preferência na próxima
   sincronização (entrar no app / focar o Perfil).
5. Teste **Entrar com Google** em um dos dois.
6. Teste **Excluir conta** em uma conta descartável: no console, a subárvore
   `users/{uid}` deve sumir e o usuário some de Authentication.
7. Só depois disso divulgue o app.

---

## Testes com o emulador (opcional, mas recomendado ao mudar as regras)

O emulador **não roda no CI** deste projeto (precisa de Java e de baixar
binários), por isso as regras não têm teste na suíte do `npx jest`. O que
existe é um verificador local pronto:
**`scripts/verificar-regras-emulador.mjs`** — 64 asserções
(`assertSucceeds`/`assertFails`) cobrindo caminho feliz de todas as 7
coleções, isolamento entre contas, anônimo, campos extras/faltando, tipos,
faixas, limites de tamanho, imutabilidade dos históricos e a exclusão de conta.

```bash
# no diretório do repositório, com Java 11+ instalado
npm install --no-save --no-package-lock @firebase/rules-unit-testing firebase-tools
npx firebase-tools emulators:exec --only firestore --project demo-semioguia \
  "node scripts/verificar-regras-emulador.mjs"
```

Use o `firebase.json` do passo 3 acrescido da porta que o script espera:

```json
{
  "firestore": { "rules": "firestore.rules" },
  "emulators": { "firestore": { "port": 8087 }, "ui": { "enabled": false } }
}
```

Saída esperada: `PASSOU: 64   FALHOU: 0`. O emulador também reprova erros de
sintaxe das regras já na inicialização. O projeto `demo-…` é local: o emulador
nunca toca no projeto de produção.

---

## Auditoria de segurança

**Data:** 22/08/2026 · **Arquivo:** `firestore.rules` ·
**Método:** skill `firebase-security-rules-auditor` (Red Team Edition),
checklist obrigatório de 6 itens + seção "Admin Bootstrapping & Privileges",
aplicado a um rascunho e reaplicado à versão final.
**Resultado final:** **5 (Secure)** — 10 achados, 10 corrigidos.
**Verificação dinâmica:** além da auditoria estática, a versão final foi
executada no emulador do Firestore (v1.22.0) com
`scripts/verificar-regras-emulador.mjs` — **64/64 asserções passaram**
(caminho feliz das 7 coleções + todas as negações esperadas).

### Checklist (todos verificados)

| # | Item do checklist | Situação final |
|---|---|---|
| 1 | **The Update Bypass** (create × update) | `create` e `update` explícitos por coleção, usando o **mesmo** validador; `update` ainda soma imutabilidades (`perfil.criadoEm`, `itensRevisao.id`). Não existe caminho de update mais fraco. |
| 2 | **Authority Source** | `uid` vem sempre do **caminho** comparado a `request.auth.uid`; nenhum campo `role`/`isAdmin`/`ownerId` existe; `perfil.email` é amarrado à claim `email` do token quando ela existe. |
| 3 | **Business Logic vs. Rules** | App de usuário único por conta: dono lê/escreve só a própria subárvore; nada de compartilhamento a suportar. Exclusão de conta (LGPD) exige `delete` em **todas** as 7 subcoleções — liberado ao dono. |
| 4 | **Storage Abuse / DoS** | Limite em toda string (ids ≤ 200, e-mail ≤ 320, `prefs.valor` ≤ 100, ISO ≤ 40, data = 10) **e** no tamanho do id de documento (≤ 300/400). Inteiros com faixas plausíveis. |
| 5 | **Type Safety** | Todo campo tem `is bool` / `is int` / `is string` / `is number`, faixas numéricas, `in [...]` para enums e `matches()` para datas. |
| 6 | **Field-Level vs Identity-Level** | Nenhuma regra depende só de `hasOnly()`: **toda** linha `allow` começa por `dono(uid)`. |
| — | **Admin bootstrapping** | Não há admin, nem e-mail hardcoded, nem `get()`/`exists()` em documentos de terceiros. Não aplicável. |
| — | **Deny by default** | Só há `match` sob `users/{uid}/…`; sem curinga recursivo `{document=**}`, sem regra no documento `users/{uid}`, sem leitura anônima. |

### Achados e correções

| # | Severidade | Achado (no rascunho) | Correção aplicada |
|---|---|---|---|
| A1 | Major | `allow write` unificava create+update+delete em 5 coleções: o `delete` acabava avaliando `request.resource.data` (nulo em delete) e era **sempre negado** — quebrando "excluir conta" — e um afrouxamento futuro do create afrouxaria o update junto. | `read`/`create`/`update`/`delete` escritos separadamente nas 7 coleções. |
| A2 | Moderate | `hasOnly([...])` sozinho aceita **subconjuntos**: dava para criar `{}` ou um `ItemRevisao` sem `facilidade`, passando por toda a "validação". | Helper `camposExatos()` = `hasOnly` **e** `hasAll` — conjunto exato de campos. |
| A3 | Moderate | `perfil.email` (único dado pessoal guardado) vinha 100% do cliente: dava para gravar o e-mail de outra pessoa no próprio perfil. | `emailDaConta()`: se o token traz a claim `email`, o campo tem de ser igual a ela (fallback só quando a claim não existe). |
| A4 | Major | `facilidade is float` **rejeitaria escrita legítima**: o SDK Web serializa `2.0`/`3.0` como inteiro. Um `writeBatch` inteiro falharia e a sincronização morreria em silêncio. | `is number` + faixa `1.3..5.0` (a faixa também rejeita `NaN`, já que toda comparação com `NaN` é falsa). |
| A5 | Moderate | Nenhum limite de tamanho em `id`, `topicoId`, `perguntaId`, `casoId`, `proximaRevisao`, `atualizadoEm`, `prefs.valor` — cada string pode chegar a ~1 MiB (exaustão de recurso/custo). | Limites por campo (200/320/100/40/10) + limite no tamanho do **id do documento** (300/400), que é o outro tamanho que o cliente controla. |
| A6 | Minor | Inteiros sem faixa: carimbos negativos, `repeticoes`/`intervaloDias` ilimitados, contagens de caso sem 0..100. | `carimboMs()` (1 … 2100-01-01), `repeticoes` 0..10000, `intervaloDias` 0..36500, contagens 0..100. As faixas do SM-2 são inalcançáveis por uso legítimo (o algoritmo exige espera real entre repetições). |
| A7 | Major | `delete` negado nos dois históricos (e, por A1, inviável nas demais): a spec §4 exige que excluir a conta apague **todas** as subcoleções (LGPD). | `allow delete: if dono(uid)` nas 7 coleções, **mantendo** `allow update: if false` nos históricos. Racional: imutabilidade protege o *conteúdo* de um registro (não dá para reescrever uma resposta errada como certa); apagar tudo é um direito do titular e é o próprio dono, autenticado, quem faz. Perder poder de escrita sobre a própria conta não protegeria ninguém — só quebraria a exclusão. |
| A8 | Moderate | O esboço da spec §4 nomeia `{estudado}`/`{favorito}`, mas o tipo real produzido pelo código (`EstadoCarimbado`, `src/sync/merge.ts`) é `{valor, atualizadoEm}`. Validar o esboço negaria **toda** escrita real. | Regras validam `valor` — a forma que o código realmente grava. |
| A9 | Moderate | Ids de tópico são `sistema/capitulo/slug` (`scripts/build-content.ts`), com `/`: não podem virar id de documento sem codificação. Uma regra do tipo `topicoId == request.resource.data.topicoId` pareceria "mais segura" e quebraria a sincronização. | Regras **não** exigem igualdade entre id do documento e campo; os limites de tamanho do id foram dimensionados para a chave codificada. Contrato para a camada de sync: codificar a chave (ex.: `encodeURIComponent`) e nunca gravar no documento `users/{uid}`, que não tem regra. |
| A10 | Minor | Sem imutabilidade de chaves naturais no `update`: dava para reescrever `perfil.criadoEm` ou trocar o `id` de um item de revisão. | `update` exige `criadoEm` (perfil) e `id` (itensRevisao) idênticos aos gravados. |

### Considerado e recusado (com motivo)

- **`atualizadoEm` monotônico no update** (`>= resource.data.atualizadoEm`):
  recusado. O `writeBatch` é atômico — uma negação por diferença de relógio
  entre aparelhos derrubaria o lote inteiro e a sincronização falharia em
  silêncio. O last-write-wins já é decidido no cliente (`src/sync/merge.ts`).
- **Amarrar o id do histórico aos campos** (`chave == perguntaId + '_' +
  respondidaEm`): recusado. Acopla a regra a um formato de chave do cliente; um
  descasamento derruba o lote inteiro. O risco residual atinge só os dados do
  próprio usuário.
- **Exigir `email_verified == true`**: recusado. O fluxo de criação de conta
  envia a verificação mas não bloqueia o uso (Task 4); exigir na regra
  impediria a sincronização de quem acabou de criar a conta.
- **`match /{document=**} { allow read, write: if false; }` explícito**:
  recusado por redundância — o Firestore já nega o que nenhuma regra permite, e
  a spec pede nenhum `match` fora de `users/{uid}`.

### Risco residual aceito

- **Quantidade de documentos por usuário**: as regras limitam o tamanho de cada
  documento, mas não dá para limitar quantos documentos uma conta cria (os
  históricos são append-only). Mitigação recomendada ao ativar o projeto:
  **alerta de orçamento** no Google Cloud (Faturamento → Orçamentos e alertas)
  e acompanhar o uso do Firestore nas primeiras semanas.
- **Sem teste das regras na suíte do CI** (o emulador não roda lá): a rede de
  proteção é a auditoria estática + o verificador local de 64 asserções, que
  precisa ser rodado à mão a cada mudança em `firestore.rules`, mais o teste de
  ponta a ponta do passo 4.
- **Regras validam a forma dos documentos, não a camada de sync**: a camada de
  sync (Task 6) tem de codificar as chaves com `/` e gravar exatamente os
  campos validados aqui; qualquer divergência aparece como
  `permission-denied` no lote inteiro, e a sincronização degrada em silêncio
  (spec §7). O verificador do emulador cobre o caminho feliz justamente para
  pegar isso antes do ar.
