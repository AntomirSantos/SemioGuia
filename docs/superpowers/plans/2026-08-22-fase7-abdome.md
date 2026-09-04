# SemioGuia Fase 7, Exame do abdome: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema "Abdome" com o capítulo "Exame do abdome" (4 tópicos) no padrão das Fases 5 a 6. Único código: 1 ícone + sistema no yaml + ajustes de testes de contagem.

**Spec:** docs/superpowers/specs/2026-08-22-semioguia-fase7-abdome-design.md (autoridade (ids, títulos, conteúdo por tópico, padrão editorial §4) que já incorpora as lições das revisões da Fase 6: quiz balanceado desde o rascunho, distratores plausíveis, checklist em nível básico, varredura pré-commit, divergências atribuídas).

## Global Constraints

- As da Fase 5 (docs/superpowers/plans/2026-08-22-fase5-cardio-respiratorio.md, seção Global Constraints) valem integralmente, mais o §4 da spec desta fase.
- Extrações para pesquisa (grep, nunca carregar inteiro): `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt`
- Referências cruzadas obrigatórias mapeadas ANTES de escrever: macicez hepática superior + Traube → `content/aparelho-respiratorio/exame-do-torax/percussao-do-torax.md` (o limite lá ensinado é 6ª (7ª costela, Porto Sem. Méd., rotulado) a hepatimetria daqui NÃO pode contradizer); refluxo hepatojugular → capítulo do coração; Virchow → linfonodos; dor na HDA → anamnese.
- NÃO tocar: conteúdo existente, firestore.rules, jest config, src/ além de icones.ts e testes de contagem, scripts/.
- Branch claude/claude-code-mobile-8l8cdb; push por task; gh-pages só na T3, via worktree novo (guarda `-e` no .git; conferir conteúdo do commit antes do push).

---

### Task 1: Estrutura, sistema Abdome

**Files:** `content/sistemas.yaml` (+abdome ordem 5, cor #D99A3B, icone grid-3x3, capítulo exame-do-abdome "Exame do abdome"), `src/design/icones.ts` (verificar export Grid3x3 no lucide instalado; se ausente, escolher equivalente e registrar a escolha), `assets/generated/content.json` (regen), testes de contagem se falharem.

- [ ] Steps: editar yaml → registrar ícone → build:content → jest (corrigir só testes de contagem/ordem) → gates completos. Commit: `feat: abdomen system scaffolding`

---

### Task 2: Capítulo "Exame do abdome" (4 tópicos)

**Files:** `content/abdome/exame-do-abdome/{inspecao-e-ausculta-do-abdome,percussao-do-abdome,palpacao-do-abdome,abdome-agudo-e-sinais-peritoneais}.md`, `content/ilustracoes/*.svg` (≥2), `assets/generated/content.json`.

- [ ] Steps: ler spec §3, §4 + capítulos das Fases 5 a 6 como template + mapear as referências cruzadas → pesquisar nas extrações e redigir os 4 tópicos → varredura n-grama própria + gates completos → Commit: `content: abdominal examination chapter with four topics`

**Review: revisão médica editorial independente (opus) + re-revisão, critérios das Fases 5 a 6.**

---

### Task 3: Revisão final de fase + deploy

- [ ] Revisão final de branch (fable): costuras com os 19 tópicos + casos, auditoria da spec, gates.
- [ ] Adendo em docs/verificacao-fase1b.md; itens novos → checklist do autor.
- [ ] Deploy padrão (export com baseUrl temporário; worktree novo; orphan só-dist verificado; force-push SÓ gh-pages) + verificação headless (5 sistemas; tópico novo; busca "ascite").

## Fora deste plano

Spec §7.

## Self-review (do plano)

- Fase de capítulo único → 3 tasks (sem segundo capítulo). O risco principal é a coerência da hepatimetria com o limite 6ª, 7ª costela já publicado, carregado como referência cruzada obrigatória e critério de revisão.
