# SemioGuia Fase 6 — Anamnese e Avaliação geral: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema novo "Anamnese" (capítulo "A entrevista clínica", 4 tópicos) + capítulo "Avaliação geral" no sistema "Exame físico geral" (4 tópicos), no padrão editorial das Fases 1C/5. Único código: 1 ícone novo e a reordenação dos sistemas.

**Architecture:** pipeline de conteúdo existente. Estações OSCE derivam de `checklist`; quiz alimenta o SM-2; aprofundamento = `nivel: avancado`.

**Spec:** docs/superpowers/specs/2026-08-22-semioguia-fase6-anamnese-avaliacao-geral-design.md — autoridade (ids, títulos, ordem, conteúdo por tópico).

## Global Constraints

- Idênticas às da Fase 5 (docs/superpowers/plans/2026-08-22-fase5-cardio-respiratorio.md — seção Global Constraints vale integralmente: originalidade com varredura n-grama ANTES do commit, zero corridas expositivas ≥10 palavras vs porto-*/semiologia-clinica; âncora para todo número/epônimo; sem fármacos/doses — exceção da spec §4: classes de medicamento como item de REGISTRO anamnésico, sem nome comercial nem dose; coerência interna tabela×quiz; divergências entre fontes escolhidas com atribuição, nunca misturadas; escalas rotuladas; YAML block scalar p/ prosa; SVGs renderizados e inspecionados, fonte em content/ilustracoes/ byte-idêntica ao inline; gates completos por task; NÃO tocar firestore.rules/jest config/src fora do listado; branch claude/claude-code-mobile-8l8cdb, push por task, gh-pages só na T4).
- Textos de referência extraídos (consulta por grep, arquivos grandes): `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt`
- Referências cruzadas obrigatórias (sem duplicar): ângulo de Charpy e cianose/limiar → inspeção do tórax; baqueteamento → inspeção do tórax; edema → tópico venoso do coração; enchimento capilar segue sem corte numérico; petéquias ancoradas em Porto cap. 12 como já fazem os casos.

---

### Task 1: Estrutura — sistema Anamnese, capítulo Avaliação geral, ícone

**Files:**
- Modify: `content/sistemas.yaml` (anamnese ordem 1 com capítulo `entrevista-clinica`; exame-fisico-geral → ordem 2 + capítulo `avaliacao-geral` ordem 2; cardiovascular → 3; respiratório → 4), `src/design/icones.ts` (`clipboard-list` → `ClipboardList`), `assets/generated/content.json` (regen)
- Modify (se falhar): testes que fixem ordem/ids/contagens de sistemas

**Steps:**
- [ ] **Step 1:** editar `sistemas.yaml` conforme spec §3 (cor da anamnese `#8E6BC8`).
- [ ] **Step 2:** registrar o ícone; conferir que `ClipboardList` existe no lucide-react-native instalado.
- [ ] **Step 3:** `npm run build:content`; jest — corrigir apenas testes que fixem ordem/contagens (capítulos vazios são estado intermediário aceito).
- [ ] **Step 4:** gates completos. Commit: `feat: anamnese system and general assessment chapter scaffolding`

---

### Task 2: Capítulo "A entrevista clínica" (4 tópicos)

**Files:**
- Create: `content/anamnese/entrevista-clinica/{a-entrevista-clinica,queixa-principal-e-hda,interrogatorio-sintomatologico,antecedentes-e-habitos}.md`
- Create: `content/ilustracoes/*.svg` (≥2 — ex.: mapa da caracterização do sintoma; estrutura da entrevista)
- Modify: `assets/generated/content.json` (regen)

**Steps:**
- [ ] **Step 1:** ler spec §3–§4, os capítulos existentes (padrão editorial) e as Global Constraints da Fase 5.
- [ ] **Step 2:** pesquisar nas referências (Porto Sem. Méd. Partes 1–3/caps. de anamnese; Porto Ex. Clín. caps. iniciais; Semiologia Clínica caps. 1–2; McGee onde houver) e redigir os 4 tópicos com checklist (roteiro OSCE de entrevista/HDA), quiz, avançados e ilustrações.
- [ ] **Step 3:** varredura n-grama própria + gates completos.
- [ ] **Step 4:** Commit: `content: clinical interview chapter with four topics`

**Review: revisão médica editorial independente (opus), critérios da Fase 5.**

---

### Task 3: Capítulo "Avaliação geral" (4 tópicos)

**Files:**
- Create: `content/exame-fisico-geral/avaliacao-geral/{ectoscopia,antropometria-e-hidratacao,pele-mucosas-e-faneros,linfonodos}.md`
- Create: `content/ilustracoes/*.svg` (≥2 — ex.: cadeias linfonodais; sítios de palidez/icterícia)
- Modify: `assets/generated/content.json` (regen)

**Steps:**
- [ ] **Step 1:** ler spec §3–§4; mapear TODAS as referências cruzadas obrigatórias (Charpy, cianose, baqueteamento, edema, petéquias) antes de escrever.
- [ ] **Step 2:** pesquisar (Porto Sem. Méd. exame físico geral + cap. 12; Porto Ex. Clín.; Semiologia Clínica; McGee caps. de estado nutricional/linfonodos/icterícia/cianose) e redigir os 4 tópicos.
- [ ] **Step 3:** varredura n-grama + gates completos.
- [ ] **Step 4:** Commit: `content: general assessment chapter with four topics`

**Review: revisão médica editorial independente (opus), critérios da Fase 5.**

---

### Task 4: Revisão final de fase + deploy

**Steps:**
- [ ] **Step 1:** revisão final de branch (fable) — costuras entre capítulos novos e os 11 tópicos existentes, cobertura da spec, gates.
- [ ] **Step 2:** adendo em `docs/verificacao-fase1b.md`; atualizar listas do autor se a revisão trouxer itens novos.
- [ ] **Step 3:** deploy padrão (export com baseUrl temporário; gh-pages órfã VIA WORKTREE NOVO — conferir que o diretório existe antes de qualquer comando; force-push SÓ gh-pages; conferir que o commit publicado contém apenas o dist).
- [ ] **Step 4:** verificação headless: home com 4 sistemas na ordem nova; 1 tópico de cada capítulo novo; busca por termo novo (ex. "linfonodo", "HDA").

## Fora deste plano

- Spec §7. Casos novos, capítulos seguintes.

## Self-review (do plano)

- Reordenação de `ordem` dos sistemas pode quebrar testes que fixem posição — T1 cobre.
- Anamnese quase não tem números; o risco editorial é de originalidade e de fidelidade conceitual, mesmo processo de revisão vale.
- Lição do deploy da F5 embutida no passo 3 da T4.
