# SemioGuia Fase 8 — Redesign de navegação e leitura: Design

Data: 23/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo (pedido do autor, verbatim em espírito)

"Deixar mais bonito e navegável, separando e compartimentando o app de
forma que não pareça um livro com muito texto e pouca compartimentação —
bonito, fluido, navegável, intuitivo e não maçante."

O problema real: um tópico tem 20–37 blocos numa rolagem única. O
conteúdo é bom; a **apresentação é de livro**. A fase muda a forma de
ler, não o conteúdo: nenhum arquivo de `content/` é tocado.

## 2. Princípios (das skills da casa)

- `.claude/skills/cognitive-load-analyser/` — reduzir carga extrínseca:
  revelar progressivamente, um compartimento por vez, sinalizar posição.
- `.claude/skills/sleek-design-mobile-apps/` e
  `.claude/skills/high-end-visual-design/` — hierarquia tipográfica
  clara, cards com respiro, sombras/elevação sutis, animações curtas com
  propósito, nada de defaults genéricos.
- Invariantes da casa: tokens via `useTema()` (nada de cor solta),
  `escala` em todo texto de leitura, a11y (roles/labels/estados, alvos
  ≥44pt), dois temas, pt-BR, jest-expo com render assíncrono, TS strict.

## 3. As cinco mudanças

### 3.1 Tópico em camadas (a mudança central)

Hoje: rolagem única de todos os blocos. Passa a ser **leitura por
seções**:

- Os blocos `secao` já dividem o conteúdo (O essencial, Como examinar,
  temáticas, Armadilhas, Teste rápido). A tela de tópico passa a
  renderizar **uma seção por vez**, com:
  - **Sumário horizontal fixo** (chips roláveis no topo, sob o título):
    uma chip por seção, estado ativo com a cor do sistema; tocar navega.
  - **Navegação sequencial**: botões "Anterior/Próxima seção" ao fim de
    cada seção (o aluno lê como páginas, não como rolagem infinita).
  - **Indicador de posição**: "Seção 2 de 6" + barra fina de progresso
    com a cor do sistema.
- Blocos `nivel: avancado` continuam atrás do "Aprofundar" dentro da
  seção a que pertencem (comportamento atual preservado).
- Estado da seção ativa é local (não persiste); deep-links continuam
  funcionando (a tela abre na primeira seção).
- Acessibilidade: chips com `accessibilityRole="tab"` e
  `accessibilityState={{selected}}`; anúncio da troca de seção.

### 3.2 Compartimentação visual dos blocos

- Cada tipo de bloco ganha identidade visual leve e consistente:
  ícone pequeno + rótulo de tipo (Conceito, Manobra, Pérola, Tabela,
  Armadilha) no canto do card, cards com raio/elevação dos tokens,
  espaçamento vertical maior entre blocos (respiro).
- `perola` vira card destacado (fundo `perola` já existente, ícone).
- Tabelas: cabeçalho com peso maior e linha zebrada sutil (tokens).
- Tipografia: títulos de seção maiores, line-height de leitura
  confortável — ajustes nos valores de `tipo`/`espaco` dos tokens, sem
  trocar fontes.

### 3.3 Home e tela de sistema mais ricas

- Card de sistema na home ganha: barra de progresso (x de y tópicos
  estudados — dado que o Perfil já calcula), e a cor do sistema como
  acento consistente.
- Card **"Continuar de onde parou"** no topo da home: último tópico
  aberto (persistido em preferência existente ou nova chave leve no
  ProgressStore — SEM migração de schema: usar `definirPreferencia`
  com chave nova, que o store já suporta genericamente — verificar; se
  exigir migração, cortar este item para não mexer em store nesta fase).
- Tela de sistema: capítulos como seções com contagem e checkmarks de
  estudado.

### 3.4 Movimento com propósito

- Transições curtas na troca de seção (fade/slide ~180–220 ms) e no
  expandir do "Aprofundar" — `LayoutAnimation`/`Animated` nativos, sem
  dependência nova. `prefers-reduced-motion` respeitado na web (e
  `AccessibilityInfo.isReduceMotionEnabled` onde disponível).

### 3.5 O que NÃO muda

Conteúdo (`content/` intocado), pipeline, schema, quiz/SM-2/casos/sync,
navegação de abas/hambúrguer, paletas e fontes, `firestore.rules`.
Nenhuma dependência nova.

## 4. Critérios de aceite

- Um tópico denso (ex. ectoscopia, 37 blocos) navegável por seções com
  sumário, posição visível e transições suaves — sem rolagem única.
- Todos os 293 testes existentes passando (testes de tela adaptados
  apenas onde a estrutura mudou — ex.: conteúdo de seções não ativas não
  está mais no DOM; os testes de bloco continuam intactos).
- Contraste AA nos dois temas para tudo que for novo; alvos ≥44pt.
- Deploy verificado em headless com capturas claro/escuro entregues ao
  autor (pedido explícito: "me mostre o resultado final do deploy").

## 5. Fora desta fase

Reescrita de conteúdo; mudanças no motor de revisão/casos/sync;
onboarding; qualquer dependência nova; redesign do quiz player (os
cards de pergunta já são compartimentados).
