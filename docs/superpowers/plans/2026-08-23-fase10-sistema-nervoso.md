# SemioGuia Fase 10, Sistema nervoso: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema "Sistema nervoso" (ordem 7, append) com o capítulo "Exame neurológico" (6 tópicos), pagando todas as molduras que as fases anteriores adiaram para ele. Único código: 1 ícone + yaml + testes de contagem.

**Spec:** docs/superpowers/specs/2026-08-23-semioguia-fase10-sistema-nervoso-design.md: autoridade (ids, conteúdo por tópico, §4 com as cruzadas obrigatórias e a auditoria de promessas, §7 fora de escopo).

## Global Constraints

- As das Fases 5 a 9 + spec §4 desta fase.
- Extrações: `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt` (grep, nunca carregar inteiro). Porto SM tem a Parte de exame neurológico (caps. ~172-174+); Porto EC tem capítulo de Exame Neurológico; McGee tem os capítulos de campos visuais, nervos oculomotores, nervos cranianos diversos, sistema motor, sensitivo, reflexos, coordenação, marcha e meninges; SC tem capítulo de exame neurológico.
- Molduras/promessas das fases anteriores TODAS pagas ou re-adiadas nomeadamente (spec §4): critério de revisão.
- NÃO tocar: conteúdo existente (exceto se uma costura exigir, com justificativa e re-revisão), firestore.rules, jest config, src/ além de icones.ts e testes de contagem, scripts/, package.json.
- Branch claude/claude-code-mobile-8l8cdb; gh-pages só na T4 via worktree novo (guarda `-e`, conferir conteúdo).

### Task 1: Estrutura, sistema Sistema nervoso
**Files:** `content/sistemas.yaml` (+sistema-nervoso ordem 7, cor #5B6ABF, icone brain, capítulo exame-neurologico; SEM reordenação), `src/design/icones.ts` (verificar export Brain; fallback registrado), `assets/generated/content.json`, testes de contagem se falharem.
- [ ] Gates completos. Commit: `feat: nervous system scaffolding`

### Task 2: Tópicos 1 a 3 (consciência, pares I-VI, pares VII-XII)
**Files:** `content/sistema-nervoso/exame-neurologico/{consciencia-e-estado-mental,pares-cranianos-i-a-vi,pares-cranianos-vii-a-xii}.md`, SVGs correspondentes, content.json.
- [ ] Mapear cruzadas + promessas ANTES de escrever; pesquisar nas extrações; disciplina de primeira escrita; varredura n-grama; gabarito parcial mirando o balanço do capítulo. Commit: `content: neurological examination topics one to three`
**Review: revisão médica independente (opus) + re-revisão.**

### Task 3: Tópicos 4 a 6 (força/tônus/reflexos, sensibilidade/coordenação, marcha/meníngeos)
**Files:** `content/sistema-nervoso/exame-neurologico/{forca-tonus-e-reflexos,sensibilidade-e-coordenacao,marcha-e-sinais-meningeos}.md`, SVGs, content.json.
- [ ] Idem T2 + validação do capítulo completo: 36 questões com gabarito balanceado (nenhum índice >~12/36), mais-longa ≈25%, ≥4 ilustrações no capítulo. Commit: `content: neurological examination topics four to six`
**Review: revisão médica independente (opus) + re-revisão.**

### Task 4: Revisão final de fase + deploy + capturas
- [ ] Revisão final (fable): auditoria de promessas pagas (grep de todas as molduras "capítulo neurológico"/"sistema nervoso" no conteúdo antigo), costuras reversas com os 27 tópicos + 3 casos, spec, gates, caminhada visual.
- [ ] Adendo docs; itens novos → checklist; deploy padrão; verificação (7 sistemas; busca "Glasgow"/"Babinski"); capturas claro/escuro ao autor.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco principal: volume (6 tópicos, o maior capítulo até aqui), dividido em duas tasks de conteúdo com revisões independentes próprias, balanço do quiz fechado na T3.
- Risco de sobreposição: pupilas/facial/audição/rigidez já têm semiotécnica parcial em cabeça e pescoço, o mapa de cruzadas + a auditoria de promessas são critérios de revisão nas duas pontas.
- Append na ordem 7 evita o risco de reordenação da F9.
