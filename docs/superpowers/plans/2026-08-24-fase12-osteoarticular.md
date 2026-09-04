# SemioGuia Fase 12, Sistema osteoarticular: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Sistema "Sistema osteoarticular" (ordem 8; sistema-nervoso 8→9) com o capítulo "Exame osteoarticular" (6 tópicos). Único código: 1 ícone + yaml + testes de contagem.

**Spec:** docs/superpowers/specs/2026-08-24-semioguia-fase12-osteoarticular-design.md: autoridade. **Roteiro da série:** docs/roteiro-conteudo-restante.md.

## Global Constraints

- As das Fases 5 a 11 + spec §4 desta fase, com a **adaptação central**: o McGee não cobre o musculoesquelético, **não forçar razões de verossimilhança**; onde não houver desempenho medido nas quatro obras, ensinar a técnica atribuída e dizer que não há dado de acurácia nas fontes adotadas.
- Extrações (grep, nunca carregar inteiro): `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt`. Âncoras já localizadas: **Semiologia Clínica cap. 16 "Exame osteoarticular"**; Porto SM e EC com material de aparelho locomotor e coluna (127 e 60 ocorrências de coluna/Lasègue/Schober); McGee só no capítulo de raízes nervosas (elevação da perna estendida).
- Desambiguação de Trendelenburg (spec §4) é critério de revisão.
- NÃO tocar conteúdo existente (costuras reversas ficam para a T3), firestore.rules, jest config, src/ além de icones.ts e testes de contagem, scripts/, package.json.
- Branch claude/claude-code-mobile-8l8cdb; gh-pages só na T4, pelo checklist NOMINAL.

### Task 1: Estrutura, sistema osteoarticular · sonnet
**Files:** `content/sistemas.yaml` (+sistema-osteoarticular ordem 8, cor #A8559B, icone bone; nervoso 8→9), `src/design/icones.ts`, `assets/generated/content.json`, testes se falharem.
- [ ] Verificar o export do ícone; **medir ΔE2000 do #A8559B contra as oito cores existentes** nos dois temas e reportar. Gates completos. Commit: `feat: musculoskeletal system scaffolding`
**Review: estrutural independente (sonnet), incluindo a medição de cor.**

### Task 2: Tópicos 1 a 3 (princípios, coluna, ombro e cotovelo) · opus
**Files:** `content/sistema-osteoarticular/exame-osteoarticular/{principios-do-exame-osteoarticular,coluna-vertebral,ombro-e-cotovelo}.md`, SVGs, content.json.
- [ ] Mapear cruzadas antes de escrever; disciplina de primeira escrita; varredura n-grama N=10 e passada N=7. Commit: `content: musculoskeletal examination topics one to three`
**Review: médica independente (opus) + re-revisão escopada.**

### Task 3: Tópicos 4 a 6 (punho e mão, quadril e joelho, tornozelo e padrões) · opus
**Files:** `content/sistema-osteoarticular/exame-osteoarticular/{punho-e-mao,quadril-e-joelho,tornozelo-pe-e-padroes-articulares}.md`, SVGs, content.json.
- [ ] Idem T2 + fechar o balanço do capítulo (36 questões) e a desambiguação de Trendelenburg. Commit: `content: musculoskeletal examination topics four to six`
**Review: médica independente (opus) + re-revisão escopada.**

### Task 4: Revisão final de fase + deploy + capturas
- [ ] Revisão final: costuras reversas com os 37 tópicos + 3 casos, deferrais que envelheceram, spec, gates, caminhada visual com 9 sistemas e a medição de cor sob daltonismo.
- [ ] Adendo docs; itens novos → checklist; deploy nominal; capturas ao autor.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco principal: **a mudança de textura**, capítulo sem LRs num guia que os usa em todo lugar. Mitigação: dizer isso ao leitor no primeiro tópico e proibir número forçado; é critério de revisão.
- Risco secundário: colisão tripla do epônimo Trendelenburg, desambiguação obrigatória no tópico 5.
- Risco terciário: paleta saturando, medição de ΔE na T1 e verificação sob daltonismo na T4.
