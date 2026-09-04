# SemioGuia Fase 11, Sistema vascular periférico: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema "Sistema vascular periférico" (ordem 7; sistema-nervoso 7→8) com o capítulo "Exame vascular periférico" (4 tópicos). Único código: 1 ícone + yaml + testes de contagem.

**Spec:** docs/superpowers/specs/2026-08-23-semioguia-fase11-vascular-periferico-design.md: autoridade (ids, conteúdo por tópico, §4 com as cruzadas obrigatórias, §7 fora de escopo).

## Global Constraints

- As das Fases 5 a 10 + spec §4 desta fase.
- Extrações: `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt` (grep, nunca carregar inteiro). Levantamento já feito: Porto EC cap. 13 "Exame dos Pulsos Radial, Periféricos e Venoso" (sequência completa dos pulsos e figuras); Semiologia Clínica cap. 12 "Exame do sistema vascular periférico" e cap. 60 "Insuficiência arterial periférica"; Porto SM traz varizes e edema varicoso; McGee tem o capítulo "Peripheral Vascular Disease" (~p. 463) com o ITB, o aneurisma de aorta abdominal, e trata a TVP sobretudo dentro da suspeita de embolia pulmonar (Wells): conferir e declarar o que não existir.
- **Não reensinar** o que já está no guia (spec §4): pulso radial, edema, linfedema/Stemmer, monofilamento, sopros abdominais.
- **Lacunas declaradas, nunca preenchidas**: Trendelenburg/Perthes não apareceram nas extrações; auditar e, se ausentes, nomear como não ensinadas dizendo por quê (padrão da *jolt accentuation* na Fase 10).
- NÃO tocar: conteúdo existente (salvo costura reversa justificada, decidida na T3), firestore.rules, jest config, src/ além de icones.ts e testes de contagem, scripts/, package.json.
- Branch claude/claude-code-mobile-8l8cdb; gh-pages só na T3, pelo checklist NOMINAL de docs/deploy-gh-pages.md.

### Task 1: Estrutura, sistema vascular periférico  · modelo: sonnet
**Files:** `content/sistemas.yaml` (+sistema-vascular-periferico ordem 7, cor #66A04F, icone git-fork, capítulo exame-vascular-periferico; sistema-nervoso 7→8), `src/design/icones.ts` (verificar export do ícone; fallback registrado), `assets/generated/content.json`, testes de contagem se falharem.
- [ ] Gates completos. Commit: `feat: peripheral vascular system scaffolding`
**Review: revisão estrutural independente (sonnet), byte-level vs spec §3, export do ícone, diff aditivo + o único deslocamento de ordem, tolerância a capítulo vazio.**

### Task 2: Capítulo "Exame vascular periférico" (4 tópicos) · modelo: opus
**Files:** `content/sistema-vascular-periferico/exame-vascular-periferico/{pulsos-arteriais-perifericos,insuficiencia-arterial-cronica,doenca-venosa-cronica-e-trombose,isquemia-aguda-e-aneurismas}.md`, `content/ilustracoes/*.svg` (≥3), content.json.
- [ ] Mapear as cruzadas ANTES de escrever (abrir os tópicos citados e ler o que eles já dizem); pesquisar nas extrações; redigir com a disciplina de primeira escrita; varredura n-grama N=10 e passada N=7; gabarito balanceado no capítulo. Commit: `content: peripheral vascular examination chapter with four topics`
**Review: revisão médica independente (opus) + re-revisão escopada, critérios das Fases 5 a 10 (hostilidade a lateralidade/direção, cada número conferido na fonte, divergências atribuídas dos dois lados, promessas e cruzadas verificadas nas duas pontas).**

### Task 3: Revisão final de fase + deploy + capturas · modelo: fable
- [ ] Revisão final: costuras reversas com os 33 tópicos + 3 casos, auditoria das cruzadas obrigatórias, spec, gates, caminhada visual medida nos dois temas (8 sistemas na home; distinção do verde #66A04F contra o verde-azulado do respiratório; busca por "claudicação"/"varizes"; estação nova).
- [ ] Adendo docs; itens novos → checklist; deploy pelo checklist nominal; capturas claro/escuro ao autor.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco principal: sobreposição com o que já é ensinado (pulso radial, edema, linfedema, monofilamento, sopros abdominais), o mapa de cruzadas é critério de revisão nas duas pontas, e o levantamento prévio já identificou cada dono.
- Risco secundário: TVP com âncora fraca no McGee (aparece via embolia pulmonar), a regra é declarar a limitação, não importar números de fora das quatro obras.
- Deslocamento de uma única ordem (neuro 7→8) mantém baixo o risco de teste, e a T1 roda a suíte antes de qualquer edição de teste.
