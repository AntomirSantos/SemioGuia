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
   - **Não ative "Login anônimo"** (nem nenhum outro provedor). As regras
     exigem a claim `email` no token para gravar o perfil: um token anônimo
     não tem e-mail e não conseguiria sincronizar.
4. Ainda em Authentication → aba **Settings → Authorized domains**: confirme
   que `localhost` está lá e **adicione o domínio do app publicado**
   (`<seu-usuario>.github.io` para o GitHub Pages). Sem isso o login com
   Google falha no ar.
5. No menu lateral, **Criação → Firestore Database → Criar banco de dados**:
   - Modo: **produção** (regras restritivas). As regras deste repositório
     substituem as padrão no passo 3.
   - Local: `southamerica-east1` (São Paulo) — **não dá para mudar depois**.
6. **Restrinja a chave de API web por referenciador HTTP**: Google Cloud →
   **APIs e serviços → Credenciais** → a chave "Browser key (auto created by
   Firebase)" → **Restrições de aplicativo → Sites** → adicione
   `localhost:*` e `<seu-usuario>.github.io/*`. A config do app é pública
   (passo 2): sem essa restrição, qualquer um pode usar a chave de outro
   domínio para criar contas no seu projeto. Isso limita o abuso, mas não
   substitui as regras — quem protege os dados são elas.

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
6. Teste **Excluir conta** em uma conta descartável e confira no console
   (**Firestore Database → Dados**) que as 7 subcoleções de `users/{uid}`
   ficaram sem documentos — o console ainda mostra o `users/{uid}` como
   documento fantasma (ele nunca existiu de verdade; subcoleção vive sob
   documento inexistente) — e que o usuário sumiu de **Authentication**.
7. Só depois disso divulgue o app.

---

## Testes com o emulador (opcional, mas recomendado ao mudar as regras)

O emulador **não roda no CI** deste projeto (precisa de Java e de baixar
binários), por isso as regras não têm teste na suíte do `npx jest`. O que
existe é um verificador local pronto:
**`scripts/verificar-regras-emulador.mjs`** — 87 asserções
(`assertSucceeds`/`assertFails`) cobrindo caminho feliz de todas as 7
coleções, **a progressão real do SM-2** (importa `avaliar()` de
`src/revisao/sm2.ts` e grava cada estado sucessivo), isolamento entre contas,
`collectionGroup` negado, anônimo, campos extras/faltando, tipos, faixas,
limites de tamanho, imutabilidade dos históricos e a exclusão de conta.

```bash
# no diretório do repositório, com Java 11+ instalado
npm install --no-save --no-package-lock @firebase/rules-unit-testing firebase-tools
npx firebase-tools emulators:exec --only firestore --project demo-semioguia \
  "node --experimental-strip-types scripts/verificar-regras-emulador.mjs"
```

Use o `firebase.json` do passo 3 acrescido da porta que o script espera:

```json
{
  "firestore": { "rules": "firestore.rules" },
  "emulators": { "firestore": { "port": 8087 }, "ui": { "enabled": false } }
}
```

Saída esperada: `PASSOU: 87   FALHOU: 0`. O emulador também reprova erros de
sintaxe das regras já na inicialização. O projeto `demo-…` é local: o emulador
nunca toca no projeto de produção.

---

## Auditoria de segurança

**Data:** 22/08/2026 · **Arquivo:** `firestore.rules` ·
**Método:** skill `firebase-security-rules-auditor` (Red Team Edition),
checklist obrigatório de 6 itens + seção "Admin Bootstrapping & Privileges",
aplicado a um rascunho e reaplicado à versão final.
**Rodada 2 (re-auditoria independente): 22/08/2026** — postura de isolamento
(inclusive ataques por `collectionGroup`) e a decisão de permitir `delete` nos
históricos foram confirmadas; **1 achado Importante (F1) + ajustes** entraram e
foram corrigidos nesta mesma data (ver "Rodada 2" abaixo).
**Resultado:** **5 (Secure)** na rodada 1 (10 achados, 10 corrigidos), mantido
após as correções da rodada 2 — **com a ressalva de que a nota da rodada 1 se
apoiava numa premissa errada sobre as faixas do SM-2**, corrigida em F1.
**Verificação dinâmica:** a versão final roda no emulador do Firestore
(v1.22.0) com `scripts/verificar-regras-emulador.mjs` — **87/87 asserções**
(caminho feliz das 7 coleções, progressão real do SM-2, `collectionGroup`
negado e todas as demais negações esperadas).

### Checklist (todos verificados)

| # | Item do checklist | Situação final |
|---|---|---|
| 1 | **The Update Bypass** (create × update) | `create` e `update` explícitos por coleção, usando o **mesmo** validador; `update` ainda soma imutabilidades (`perfil.criadoEm`, `itensRevisao.id`). Não existe caminho de update mais fraco. |
| 2 | **Authority Source** | `uid` vem sempre do **caminho** comparado a `request.auth.uid`; nenhum campo `role`/`isAdmin`/`ownerId` existe; `perfil.email` é amarrado à claim `email` do token quando ela existe. |
| 3 | **Business Logic vs. Rules** | App de usuário único por conta: dono lê/escreve só a própria subárvore; nada de compartilhamento a suportar. Exclusão de conta (LGPD) exige `delete` em **todas** as 7 subcoleções — liberado ao dono. |
| 4 | **Storage Abuse / DoS** | Limite em toda string (ids ≤ 200, e-mail ≤ 320, `prefs.valor` ≤ 100, ISO ≤ 40, data = 10) **e** no tamanho do id de documento (≤ 300/400). Inteiros com **tetos de sanidade** — deliberadamente folgados, não "plausíveis": um teto apertado nega escrita legítima do SM-2 e mata a sincronização (F1). O que contém custo/abuso aqui é o tamanho, não a magnitude do número. |
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
| A6 | Minor | Inteiros sem faixa: carimbos negativos, `repeticoes`/`intervaloDias` ilimitados, contagens de caso sem 0..100. | `carimboMs()` (1 … 2100-01-01), contagens 0..100 e faixas para `repeticoes`/`intervaloDias`. **As faixas do SM-2 escolhidas nesta rodada estavam erradas** — ver F1 na rodada 2, que as substituiu. |
| A7 | Major | `delete` negado nos dois históricos (e, por A1, inviável nas demais): a spec §4 exige que excluir a conta apague **todas** as subcoleções (LGPD). | `allow delete: if dono(uid)` nas 7 coleções, **mantendo** `allow update: if false` nos históricos. Racional: imutabilidade protege o *conteúdo* de um registro (não dá para reescrever uma resposta errada como certa); apagar tudo é um direito do titular e é o próprio dono, autenticado, quem faz. Perder poder de escrita sobre a própria conta não protegeria ninguém — só quebraria a exclusão. |
| A8 | Moderate | O esboço da spec §4 nomeia `{estudado}`/`{favorito}`, mas o tipo real produzido pelo código (`EstadoCarimbado`, `src/sync/merge.ts`) é `{valor, atualizadoEm}`. Validar o esboço negaria **toda** escrita real. | Regras validam `valor` — a forma que o código realmente grava. |
| A9 | Moderate | Ids de tópico são `sistema/capitulo/slug` (`scripts/build-content.ts`), com `/`: não podem virar id de documento sem codificação. Uma regra do tipo `topicoId == request.resource.data.topicoId` pareceria "mais segura" e quebraria a sincronização. | Regras **não** exigem igualdade entre id do documento e campo; os limites de tamanho do id foram dimensionados para a chave codificada. Contrato para a camada de sync: codificar a chave (ex.: `encodeURIComponent`) e nunca gravar no documento `users/{uid}`, que não tem regra. |
| A10 | Minor | Sem imutabilidade de chaves naturais no `update`: dava para reescrever `perfil.criadoEm` ou trocar o `id` de um item de revisão. | `update` exige `criadoEm` (perfil) e `id` (itensRevisao) idênticos aos gravados. |

### Rodada 2 — re-auditoria independente (22/08/2026)

Confirmados sem mudança: isolamento entre contas (inclusive tentativas por
`collectionGroup`), a decisão de permitir `delete` nos históricos (A7) e o uso
de `is number` por causa da serialização de `3.0` como inteiro pelo SDK (A4).

| # | Severidade | Achado | Correção aplicada |
|---|---|---|---|
| F1 | **Importante** | **Os tetos do SM-2 negavam saída legítima do app.** `avaliar()` (`src/revisao/sm2.ts`) não tem teto de facilidade nem clamp de intervalo, e quiz/estação reavaliam sem esperar o vencimento: acertando a mesma pergunta em sequência, `intervaloDias` passa de 36500 já na **10ª** repetição (57.299 dias, medido rodando o algoritmo real) e chega a 2.900.240 na 13ª. Resultado: `PERMISSION_DENIED` → o `writeBatch` inteiro falha → **sincronização morta em silêncio, para sempre**, sem nada visível além do erro discreto no bloco Conta. | Tetos passam a ser de **sanidade**: `facilidade` 1.3..1000, `repeticoes` 0..100000, `intervaloDias` 0..3650000. Tipos, `NaN`, negativos, campos exatos e tamanhos seguem valendo — o valor de segurança é preservado. Os novos tetos ficam no **horizonte de boa-formação do próprio app**: da 14ª repetição em diante o `proximaRevisao` gerado sai corrompido (`'+032994-12'`, ano de 6 dígitos truncado), então quem nega ali é a validação de data, não os tetos. |
| F2 | Minor | O verificador não tinha rede contra F1 nem contra ataque por `collectionGroup`. | `scripts/verificar-regras-emulador.mjs` ganhou: (a) negação de `collectionGroup` para atacante, dono e anônimo em `respostas`/`estudados`/`perfil`; (b) fixture que **importa `avaliar()` do app** e grava os 14 estados sucessivos (passos 0..13), mais a asserção do limite conhecido do passo 14; (c) leitura de `FIRESTORE_EMULATOR_HOST`. Total: 87 asserções. |
| F3 | Minor | `emailDaConta()` tinha um ramo permissivo para token sem a claim `email`, que aceitaria e-mail arbitrário se algum provedor sem e-mail fosse ativado. | Agora exige `request.auth.token.email is string` **e** igualdade com o campo. Contrapartida documentada no passo 1: **não ativar "Login anônimo"**. |
| F4 | Minor | `perfil/{doc}` aceitava qualquer id de documento, embora o perfil seja um documento único. | Regra fixada em `match /users/{uid}/perfil/dados`; o id `dados` virou contrato explícito no guia e no relatório da task. |
| F5 | Minor | O contrato para a camada de sync não dizia nada sobre `collectionGroup`. | Documentado (aqui e no relatório): **leituras sempre por coleção sob `users/{uid}/…`; `collectionGroup` nunca** — é negado por construção, já que nenhum `match` casa com um grupo de coleção. |
| F7 | Minor | A config pública permitia criar contas no projeto a partir de qualquer domínio. | Passo 1.6 do guia: restringir a chave de API web por referenciador HTTP (`localhost:*` + domínio do GitHub Pages). |
| F8 | Moderate (registro) | O próprio registro desta auditoria afirmava que as faixas do SM-2 eram "inalcançáveis por uso legítimo" — **factualmente falso** (F1). | Item 4 do checklist e A6 corrigidos, com a ressalva sobre a nota da rodada 1 no cabeçalho desta seção. |

**Fica em aberto (código do app, fora do escopo das regras):** `avaliar()`
deveria ter teto de facilidade e clamp de intervalo — hoje, a partir da 14ª
repetição seguida, o próprio app grava `proximaRevisao` corrompido e, mais
adiante, `somarDias()` chega a `Invalid Date`. As regras já não são o elo que
quebra primeiro, mas o dado fica ruim. Sugerido como correção em
`src/revisao/sm2.ts` (com teste), não aqui.

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
  proteção é a auditoria estática + o verificador local de 87 asserções, que
  precisa ser rodado à mão a cada mudança em `firestore.rules`, mais o teste de
  ponta a ponta do passo 4.
- **Regras validam a forma dos documentos, não a camada de sync**: a camada de
  sync (Task 6) tem de ler **sempre por coleção sob `users/{uid}/…`** (nunca
  `collectionGroup`, negado por construção), gravar o perfil em
  `users/{uid}/perfil/dados`, codificar as chaves com `/` e gravar exatamente
  os campos validados aqui; qualquer divergência aparece como
  `permission-denied` no lote inteiro, e a sincronização degrada em silêncio
  (spec §7). O verificador do emulador cobre o caminho feliz justamente para
  pegar isso antes do ar.
