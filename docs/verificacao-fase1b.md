# Roteiro de verificação manual — Fase 1B

Este roteiro serve para conferir, num aparelho de verdade, que o app funciona
bem de ponta a ponta. Os testes automáticos (Jest) já cobrem a lógica interna,
mas não conseguem abrir o app num celular real — então esta é a forma de
confirmar visualmente que tudo está encaixado, e principalmente de confirmar
que os dados **persistem** quando o app é fechado e reaberto.

Não é preciso saber programar para seguir os passos abaixo. Leva uns 10
minutos.

## 1. Preparar

1. No celular (Android ou iPhone), instale o aplicativo **Expo Go** na loja
   de aplicativos (Play Store ou App Store) — é gratuito.
2. No computador, dentro da pasta do projeto, rode:

   ```
   npx expo start --tunnel
   ```

3. Vai aparecer um QR code no terminal. Abra o Expo Go no celular e escaneie
   esse QR code (no Android, o próprio Expo Go tem um botão "Scan QR code";
   no iPhone, pode usar a câmera nativa e tocar na notificação que aparece).
4. Aguarde o app carregar. A tela inicial é o **Guia**, com os sistemas do
   corpo em cartões.

Se o QR code não abrir ou ficar carregando muito tempo, veja a seção
"Se algo der errado" no fim deste documento.

## 2. Roteiro de navegação

Siga os passos na ordem. Em cada um, confira se o que está descrito realmente
acontece.

1. **Abrir o Guia.** Na aba "Guia" (a primeira embaixo), toque no sistema
   que contém sinais vitais.
2. **Entrar no tópico "Pressão arterial".** Dentro do sistema, toque no
   capítulo correspondente e depois no tópico **Pressão arterial**.
3. **Favoritar o tópico.** No topo da tela do tópico, toque no botão
   "Favoritar" (ícone de coração). O botão deve mudar visualmente para
   indicar que ficou favoritado ("Favoritado").
4. **Marcar como estudado.** Ao lado, toque em "Marcar estudado". O botão
   deve indicar "Estudado".
5. **Buscar "Osler".** Volte para as abas e toque em "Busca". Digite
   **Osler** no campo de busca. Deve aparecer um resultado na lista.
6. **Abrir pelo resultado da busca.** Toque no resultado encontrado — deve
   abrir o tópico correspondente normalmente.
7. **Jogar o quiz de Pressão arterial.** Volte ao tópico "Pressão arterial"
   (aba Guia ou aba Estudar) e toque em "Praticar" no bloco de quiz. Responda
   as perguntas até chegar na tela de **resultado** (percentual de acertos).
8. **Alternar tema escuro.** Vá para a aba "Perfil" e ative o tema escuro
   nas opções de aparência. As telas do app devem trocar de cores
   imediatamente (fundo escuro, texto claro).
9. **Alternar fonte grande.** Ainda no Perfil, ative a opção de fonte grande.
   Os textos do app devem ficar visivelmente maiores.
10. **Conferir o progresso.** No Perfil, deve aparecer um indicador de
    progresso no formato **"X de 3"** (ou número equivalente) refletindo
    quantos tópicos já foram estudados.

## 3. Teste de persistência (o mais importante)

Este é o único passo que testa de verdade o banco de dados do aparelho
(SQLite) — o Jest não consegue rodar essa parte porque ela depende do
celular, então esta verificação manual é a única garantia que temos.

1. **Feche o app completamente.** Não basta minimizar: no Android, abra a
   lista de apps recentes e deslize o SemioGuia para fora; no iPhone,
   deslize para cima a partir da barra inferior e depois deslize o card do
   app para cima até ele sumir. O objetivo é "matar" o processo, não só
   colocar em segundo plano.
2. **Reabra o app** (de novo pelo Expo Go, escaneando o QR code se precisar).
3. Confira, nesta ordem:
   - O tópico "Pressão arterial" continua marcado como **favorito**.
   - O tópico "Pressão arterial" continua marcado como **estudado**.
   - O **tema escuro** continua ativo.
   - A **fonte grande** continua ativa.

Se todos os quatro itens continuarem como você deixou antes de fechar o
app, a persistência está funcionando corretamente.

## 4. Se algo der errado

Ao relatar um problema, inclua:

- Em qual passo do roteiro (número da lista acima) o problema apareceu.
- O que você esperava ver e o que apareceu de fato (uma foto de tela ajuda
  bastante).
- Modelo do aparelho e sistema (ex.: "iPhone 13, iOS 18" ou "Moto G, Android
  14").
- Se o problema foi no passo 3 (persistência): diga exatamente quais dos
  quatro itens (favorito, estudado, tema, fonte) não voltaram como esperado
  — isso ajuda a isolar se o problema é geral ou só de um tipo de dado.
- Se o `npx expo start --tunnel` mostrou alguma mensagem de erro no
  terminal, copie e cole o texto.

## Adendo 1C — paleta Vital, divulgação progressiva e ilustrações

A Fase 1C trocou a aparência e a organização do conteúdo, mantendo intacta a
arquitetura verificada acima (navegação, favoritos, estudado, busca, quiz,
tema e persistência). O que mudou:

- **Paleta "Vital"**: nova paleta clara/escura (fundo `#f3f6fb` / `#0f121c`,
  acento indigo `#3655cd` / `#859ff6`), todos os 12 pares de contraste
  auditados em `npm run checar:contraste` (mínimo WCAG AA, 4.5:1 texto e
  3:1 UI) — os 3 tópicos existentes foram migrados para ela.
- **Blocos novos**: `secao` (títulos de seção com friso lateral), `entendimento`
  (caixa de destaque conceitual) e `ilustracao` (SVG de traço, herda a cor
  de tinta do tema via `currentColor`). Cinco ilustrações novas: medida da PA,
  fases de Korotkoff, palpação do pulso radial, locais de temperatura e
  curvas térmicas.
- **Divulgação progressiva** ("Aprofundar"): blocos com `nivel: avancado`
  ficam recolhidos atrás de um cabeçalho "Aprofundar · <tipo>" e só montam o
  conteúdo quando expandidos (exceção deliberada: uma `secao` com nível
  avançado ainda renderiza como título normal, nunca escondida).
- **Conteúdo reescrito**: os 3 tópicos de sinais vitais (pressão arterial,
  frequência cardíaca e pulso, temperatura e frequência respiratória) foram
  reescritos de forma mais concisa e seccionada, com o essencial visível e
  o aprofundamento (taxonomias, achados raros, armadilhas) atrás do
  "Aprofundar".

### Verificação headless (build de deploy, caminho `/SemioGuia/`)

Antes de regenerar a `gh-pages`, o build web (`npx expo export --platform web`
com `experiments.baseUrl` = `/SemioGuia`) foi servido localmente com o mesmo
prefixo de caminho e navegado com Playwright/Chromium headless (viewport
390×844, o mesmo layout de celular usado na Fase 1B). Resultado:

1. **Home com a paleta Vital**: fundo da tela em `#f3f6fb` e cor de acento
   `#3655cd` confirmados por estilo computado (não bastou olhar a tela —
   os valores exatos batem com `src/design/tokens.ts`).
2. **Tópico "Pressão arterial"**: títulos de `secao` ("O essencial", "Como
   medir") visíveis; bloco "Aprofundar · Conceito" presente e recolhido
   por padrão (a taxonomia das cinco fases de Korotkoff não aparece no
   texto da página antes do toque); ao tocar, o conteúdo monta e o texto
   das fases I–V passa a aparecer.
3. **Ilustração `medida-pa`**: renderiza na seção "Como medir", ocupando
   quase a largura total do viewport (350 de 390px) e com a cor herdada do
   tema (`rgb(24, 27, 45)` = `#181b2d`, a tinta clara), confirmando que o
   `currentColor` do SVG segue o tema.
4. **Tópico "Frequência cardíaca e pulso"**, sub-lista aninhada do item 6
   básico (célere / parvus / filiforme) em viewport estreito (390px):
   indentação com marcador "-" visível, sem sobreposição ou corte. As
   linhas de continuação que voltam à margem esquerda (em vez de alinhar
   sob o texto do marcador) são o único ponto de atenção — é um
   comportamento aceitável para este único caso de lista aninhada no
   corpus, não uma quebra de layout.
5. **Tópico "Temperatura e frequência respiratória"**: ilustração
   `curvas-termicas` renderiza em largura quase total (350px), com os
   quatro padrões (contínua, intermitente, remitente, recorrente) legíveis
   e a legenda abaixo.

Nenhum erro de página (`pageerror`) ou requisição falha (`requestfailed`)
foi registrado em nenhuma das quatro navegações.

## Adendo Fase 2 — revisão espaçada e estação OSCE

A Fase 2 adiciona um motor de revisão espaçada (SM-2) sobre a arquitetura
verificada acima, sem alterar navegação, tema ou persistência de
favoritos/estudados já existentes. O que entrou:

- **Motor SM-2 automático** (`src/revisao/sm2.ts`): agenda cada item
  (pergunta de quiz ou checklist) com fator de facilidade, repetições e
  intervalo em dias; a nota (2/4/5) é derivada automaticamente do resultado
  — acerto/erro no quiz, percentual na estação — sem botões manuais de
  Difícil/Bom/Fácil (fora do escopo desta fase).
- **Semeadura ao marcar "Estudado"**: ao marcar um tópico como estudado,
  todas as perguntas de quiz e o checklist do tópico entram na fila de
  revisão com `proximaRevisao` = amanhã, sem duplicar itens já semeados.
- **Limite diário de itens novos** (20/dia): a fila do dia mistura itens
  vencidos (de qualquer antiguidade) com no máximo 20 itens novos,
  descartando da fila qualquer item cujo id não exista mais no conteúdo
  atual (órfãos).
- **Persistência**: itens de revisão são gravados em todos os adaptadores de
  `ProgressStore` (memória, localStorage — chave `semioguia.itensRevisao` —,
  SQLite com migração v2), na mesma linha dos demais dados de progresso.
- **Card "Revisão de hoje"** no topo da aba Estudar: estado vazio quando não
  há itens vencidos, ou contagem "N pergunta(s) · M estação(ões)" que abre a
  sessão `/revisao` ao tocar.
- **Sessão de revisão** (`/revisao`): percorre a fila do dia reaproveitando a
  UI de pergunta do quiz e a estação OSCE; cada resposta é avaliada e salva
  imediatamente (sobrevive a fechar a aba no meio), terminando num resumo de
  acertos/erros.
- **Estação OSCE** (`EstacaoOsce`): recordação ativa passo a passo de um
  checklist ("Revelar passo" → "Lembrei"/"Esqueci"), acessível tanto avulsa
  (botão "Praticar como estação" dentro de um bloco de checklist) quanto
  embutida na sessão de revisão; termina num resumo percentual com a lista
  de passos esquecidos.
- **Contadores no Perfil** (fora do detalhamento deste adendo): refletem o
  novo estado de revisão junto aos contadores já existentes.

Fora do escopo (spec §7): cronômetro/modo treino da estação, botões
manuais de nota (Difícil/Bom/Fácil), notificações e configuração do limite
diário — todos deliberadamente adiados.

### Verificação headless (build de deploy, caminho `/SemioGuia/`, 390×844)

Mesmo procedimento da Fase 1C: export web com `experiments.baseUrl` =
`/SemioGuia`, servido localmente sob o mesmo prefixo e navegado com
Playwright/Chromium headless. Uma particularidade desta rodada: navegar
direto (`page.goto`) para uma rota dinâmica de catch-all (`/topico/...`,
`/estacao/...`) força o fallback de SPA (serve `index.html` com 404) e
produz um erro de hidratação React (#418) inofensivo, mas evitável — a
verificação passou a abrir tópicos por cliques dentro do app já carregado
(Guia → sistema → tópico), como um usuário real faria; com isso, **zero**
`pageerror`/`requestfailed` em toda a bateria, igual ao padrão da Fase 1C.

1. **Card vazio**: com `localStorage` limpo, a aba Estudar mostra
   "Revisão de hoje" / "Nada para revisar hoje" — sem navegação (elemento
   não é tocável nesse estado).
2. **Semeadura**: abrir o tópico "Pressão arterial" e marcar "Estudado"
   grava 5 itens em `semioguia.itensRevisao` (as 5 perguntas do quiz — este
   tópico não tem bloco `checklist`, só `manobra`), todos com
   `proximaRevisao` = amanhã (confirmado por igualdade de string de data,
   não só inspeção visual).
3. **Revisão vencida → sessão → resposta**: reescrever no `localStorage` o
   `proximaRevisao` de um item para ontem e recarregar a aba Estudar faz o
   card passar a contar "1 pergunta · 0 estações"; tocar no card abre
   `/revisao` com a pergunta correspondente, respondível; responder e
   avançar leva ao resumo "Revisão concluída — 1/1"; o item no
   `localStorage` foi atualizado (`repeticoes: 1`, `intervaloDias: 1`,
   `proximaRevisao` avançada).
4. **Estação OSCE via checklist**: no tópico "Frequência cardíaca e pulso",
   o botão "Praticar como estação" no checklist "Avaliação do pulso em 60
   segundos" abre `/estacao/...`; completados os 10 passos (alternando
   Lembrei/Esqueci), o resumo mostra "50%" e a lista dos 5 passos
   esquecidos.
5. **Tema escuro**: com `prefers-color-scheme: dark`, tanto o card da aba
   Estudar quanto a sessão de revisão renderizam com o fundo escuro correto
   (`rgb(15, 18, 28)` = `#0f121c`, confirmado por estilo computado, não só
   inspeção visual).

Screenshots (390×844, salvos durante a verificação):
`estudar-card-vazio.png`, `estudar-card-cheio.png`, `sessao-pergunta.png`,
`estacao-osce.png` (em andamento, passo 3 de 10) e `resultado.png`
(resumo da sessão de revisão) — mais `resultado-estacao.png`,
`estudar-escuro.png` e `sessao-escuro.png` como evidência complementar do
resumo da estação e do tema escuro.

## Adendo Fase 3 — casos clínicos ramificados

A Fase 3 adiciona um motor de casos clínicos com decisões ramificadas
(cena → decisão → cena/desfecho), sobre a mesma arquitetura de conteúdo e
progresso já verificada nas fases anteriores. O que entrou:

- **Formato de caso** (`content/casos/*.md`, `src/content/casoSchema.ts`):
  grafo de nós tipados (`cena`, `decisao`, `desfecho`) validado no
  `build:content`; cada opção de decisão traz avaliação (`otima` /
  `aceitavel` / `erro`), feedback imediato e o próximo nó.
- **Motor** (`src/casos/motor.ts`): `iniciar`/`avancar`/`decidir` navegam o
  grafo mantendo uma trilha de decisões; o feedback de uma opção aparece
  assim que ela é tocada, e o grafo só avança quando "Seguir" é
  pressionado — nunca antes.
- **Três casos** do capítulo de sinais vitais (crise hipertensiva, febre na
  criança, síncope com pulso irregular), cada um com regras clínicas e
  referências específicas.
- **Lista "Casos clínicos"** na aba Estudar: um card por caso, mostrando
  "Não iniciado" ou "Melhor resultado: <Classe>" (o melhor desfecho já
  alcançado, entre todas as tentativas).
- **Tela do caso** (`/caso/[id]`): cena com dados objetivos, decisão com
  opções e feedback, e desfecho com a classe, "O que este caso ensina" e a
  trilha de decisões — cada passo abaixo do ótimo mostra também "Melhor
  conduta: …". "Refazer o caso" reinicia do primeiro nó.
- **Histórico de conclusões**: cada chegada a um desfecho é registrada em
  todos os adaptadores de `ProgressStore` (memória, localStorage, SQLite
  com migração v3), alimentando o "Melhor resultado" da lista.

Fora do escopo (spec §8): estado parcial persistido entre sessões, casos
integrados ao SM-2, ilustrações na cena, casos de outros capítulos.

### Verificação headless (build de deploy, caminho `/SemioGuia/`, 390×844)

Mesmo procedimento das fases anteriores: export web com
`experiments.baseUrl` = `/SemioGuia`, servido localmente sob o mesmo
prefixo e navegado com Playwright/Chromium headless, por cliques dentro do
app (sem `page.goto` direto em rota dinâmica, pelo mesmo motivo já registado
no adendo da Fase 2). Zero `pageerror` em toda a bateria.

1. **Lista**: a aba Estudar mostra a seção "Casos clínicos" com os 3 casos,
   todos "Não iniciado".
2. **Cena e decisão**: abrir "A pressão que chegou em 210 por 130" mostra a
   cena com os dados objetivos (PA, FC, FR, temperatura, SpO2); "Continuar"
   leva ao primeiro nó de decisão, com as três opções visíveis.
3. **Feedback antes de avançar**: escolher a opção errada (nifedipina
   sublingual) mostra o feedback correspondente sem sair do nó de decisão;
   só ao tocar "Seguir" o grafo avança.
4. **Desfecho**: seguindo por um caminho com um erro e depois um acerto, o
   caso termina num desfecho "Aceitável", com "O que este caso ensina" e a
   trilha mostrando, no passo errado, "Melhor conduta: …" com a opção ótima.
5. **Refazer**: "Refazer o caso" volta à cena inicial.
6. **Melhor resultado na lista**: voltando à aba Estudar, o card do caso
   passa a mostrar "Melhor resultado: Aceitável".
7. **Tema escuro**: lista e player do caso renderizam com fundo e cores
   corretos no tema escuro (conferido visualmente nas capturas).

Screenshots (390×844, salvos durante a verificação): `casos-lista.png`,
`caso-cena.png`, `caso-decisao.png`, `caso-feedback.png`,
`caso-desfecho.png`, `casos-lista-resultado.png` e `caso-escuro.png`.

## Adendo Fase 4A — conta opcional e base de sincronização

A Fase 4A prepara o terreno para contas e sincronização entre aparelhos,
mas **entrega isso desligado por padrão**: sem a config do Firebase (que só
o autor cola em `src/conta/config.ts`, ver `docs/firebase-setup.md`), o
bloco "Conta" no Perfil não mostra formulário nenhum — só um aviso. O
resto do app permanece intacto. O que entrou:

- **Conta opcional atrás de flag** (`src/conta/`): `firebaseApp.ts` inicializa
  o Firebase só se `config.ts` tiver uma config real; `syncDisponivel()`
  retorna `false` com config `null` (o estado committado hoje) e nenhum SDK
  é tocado. `AuthContext` (`src/conta/AuthContext.tsx`) expõe
  `entrar`/`criarConta`/`entrarComGoogle`/`sair`/`excluirConta` e o tipo
  `UsuarioConta`; erros do SDK passam por `mapearErroAuth`
  (`src/conta/errosAuth.ts`) antes de chegar à UI.
- **Motor de merge puro** (`src/sync/merge.ts`): reconcilia snapshot local
  e remoto por campo — listas por união, preferências e progresso de SM-2
  por carimbo de tempo mais recente (last-write-wins) — sem tocar rede ou
  storage; tipado sobre `SnapshotSync`/`EstadoCarimbado`/`PrefCarimbada`.
- **`ProgressStore` v4** (`src/progress/types.ts` e adaptadores memória/
  localStorage/SQLite): todo estado mutável ganha carimbo de tempo;
  `exportarParaSync`/`aplicarDoSync` alimentam o merge; migração
  automática da forma legada (v3 e anteriores) para v4 preserva os dados já
  no aparelho do usuário.
- **Regras do Firestore** (`firestore.rules`) — 7 coleções sob
  `users/{uid}/…`, deny-by-default fora desse caminho, `hasOnly`+`hasAll`
  por coleção, faixas e tamanhos em todo campo, imutabilidade de
  `perfil.criadoEm` e dos históricos (create-only, delete só pelo dono para
  cumprir exclusão LGPD). Auditadas com a skill
  `firebase-security-rules-auditor` em **2 rodadas** (achados corrigidos em
  cada uma, nota final "Secure"); verificador de emulador local
  (`scripts/verificar-regras-emulador.mjs`, fora do CI):
  **87/87** contra a forma dos dados, mais **12/12** rodando o código real
  de sincronização (`firestoreSync.ts`) contra o emulador — round-trip,
  particionamento de `writeBatch`, exclusão idempotente e perfil adiado
  quando o e-mail ainda não está disponível.
- **Orquestrador de sync** (`src/sync/orquestrador.ts`, `SyncProvider`/
  `useSync()`): liga login e "app aberto com sessão" ao ciclo
  exportar → ler remoto → merge → aplicar local → gravar remoto; nunca
  lança (falha vira `erro` no estado); debounce de 30s com retry manual
  (`forcar: true`) e reset de estado/relógio por troca de conta.
- **Bloco Conta no Perfil** (`src/conta/BlocoConta.tsx`, montado em
  `(tabs)/perfil.tsx`): três estados — sem config (aviso "Sincronização
  indisponível nesta versão."), sem sessão (formulário e-mail/senha +
  "Entrar com Google" + aviso LGPD) e com sessão (status de sync, "Sair",
  "Excluir conta" com confirmação em duas etapas).

Fora do escopo desta fase (spec §9): 4B (assinatura/paywall/pagamentos),
Sign in with Apple, fila offline persistente, tempo real, analytics.
Ativação real do Firebase continua sendo um passo manual do autor,
documentado em `docs/firebase-setup.md`.

### Verificação headless (build de deploy, caminho `/SemioGuia/`, 390×844)

Mesmo procedimento das fases anteriores: export web com
`experiments.baseUrl` = `/SemioGuia`, servido localmente sob o mesmo
prefixo e navegado com Playwright/Chromium headless, por cliques dentro do
app. Config do Firebase committada é `null` (estado real de deploy desta
fase). Zero `pageerror` em toda a bateria.

1. **Perfil sem config**: o bloco "Conta" mostra só "Sincronização
   indisponível nesta versão." — nenhum campo de e-mail/senha, nenhum botão
   "Entrar"/"Criar conta"/"Entrar com Google" visível.
2. **Resto do app intacto**: a Home carrega e lista os sistemas; abrir um
   tópico (Exame físico geral → Pressão arterial) navega normalmente; a aba
   Estudar mostra o card "Revisão de hoje" e a seção "Casos clínicos".
3. **Tema escuro**: alternando para "Escuro" em Aparência, o bloco Conta
   permanece visível com fundo e cores corretos (cartão e texto do aviso
   legíveis, mesma paleta do resto da tela).

Screenshots (390×844, salvos durante a verificação):
`perfil-conta-indisponivel.png` (tema claro/sistema) e
`perfil-conta-escuro.png` (tema escuro).
