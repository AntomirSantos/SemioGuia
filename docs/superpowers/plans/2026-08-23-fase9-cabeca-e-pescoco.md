# SemioGuia Fase 9, Cabeça e pescoço: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema "Cabeça e pescoço" (ordem 3, crânio-caudal) com o capítulo "Exame de cabeça e pescoço" (4 tópicos). Único código: 1 ícone + yaml + testes de contagem.

**Spec:** docs/superpowers/specs/2026-08-23-semioguia-fase9-cabeca-e-pescoco-design.md: autoridade (ids, conteúdo por tópico, padrão editorial §4 com a disciplina de primeira escrita consolidada e as referências cruzadas obrigatórias).

## Global Constraints

- As da Fase 5 (docs/superpowers/plans/2026-08-22-fase5-cardio-respiratorio.md, Global Constraints) + spec §4 desta fase.
- Extrações: `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt` (grep, nunca carregar inteiro). Porto Ex. Clín. tem capítulo de Exame de Cabeça e Pescoço; McGee tem caps. de tireoide, pupilas, hearing; Porto Sem. Méd. Parte de cabeça e pescoço.
- Fronteiras do neuro (spec §7) são NOMEADAS no texto, nunca silenciosas.
- NÃO tocar: conteúdo existente, firestore.rules, jest config, src/ além de icones.ts e testes de contagem, scripts/, package.json.
- Branch claude/claude-code-mobile-8l8cdb; gh-pages só na T3 via worktree novo (guarda `-e`, conferir conteúdo).

### Task 1: Estrutura, sistema Cabeça e pescoço
**Files:** `content/sistemas.yaml` (+cabeca-e-pescoco ordem 3, cor #C46B8F, icone scan-face, capítulo exame-de-cabeca-e-pescoco; cardio→4, resp→5, abdome→6), `src/design/icones.ts` (verificar export ScanFace; fallback registrado), `assets/generated/content.json`, testes de contagem se falharem.
- [ ] Gates completos. Commit: `feat: head and neck system scaffolding`

### Task 2: Capítulo "Exame de cabeça e pescoço" (4 tópicos)
**Files:** `content/cabeca-e-pescoco/exame-de-cabeca-e-pescoco/{cranio-e-face,olhos,boca-nariz-e-ouvidos,tireoide-e-pescoco}.md`, `content/ilustracoes/*.svg` (≥2), content.json.
- [ ] Mapear referências cruzadas ANTES de escrever; pesquisar nas extrações; redigir com a disciplina de primeira escrita; varredura n-grama + distribuição do gabarito + gates. Commit: `content: head and neck examination chapter with four topics`
**Review: revisão médica independente (opus) + re-revisão, critérios das Fases 5 a 7.**

### Task 3: Revisão final de fase + deploy + capturas
- [ ] Revisão final (fable): costuras com os 23 tópicos + casos, spec, gates, caminhada visual na leitura por seções.
- [ ] Adendo docs; itens novos → checklist; deploy padrão; verificação headless (6 sistemas; busca "tireoide"); capturas claro/escuro ao autor.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco principal: sobreposição com linfonodos/jugulares/fácies/mucosas já ensinados, mapa de cruzadas carregado no dispatch e critério de revisão.
- Fronteiras do neuro nomeadas evitam a expectativa de conteúdo que virá em outra fase.
