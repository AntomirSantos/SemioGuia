# SemioGuia Fase 5 — Aparelhos cardiovascular e respiratório: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dois capítulos novos de guia — "Exame do coração" (4 tópicos) e "Exame do tórax" (4 tópicos) — no padrão editorial dos sinais vitais, com aprofundamentos, quiz, checklists (estações OSCE automáticas) e ilustrações SVG. Fase quase 100% de conteúdo: o único código é o registro de 2 ícones.

**Architecture:** pipeline de conteúdo existente absorve tudo: `sistemas.yaml` ganha 2 sistemas, `content/<sistema>/<capitulo>/*.md` ganha 8 tópicos, `npm run build:content` valida (zod) e regenera `assets/generated/content.json`. Estações OSCE derivam dos blocos `checklist`; quiz alimenta o SM-2; aprofundamento = blocos `nivel: avancado`.

**Tech Stack:** o existente. Nenhuma dependência nova.

**Spec:** docs/superpowers/specs/2026-08-22-semioguia-fase5-cardio-respiratorio-design.md — leia antes; é a autoridade (títulos, ids, conteúdo por tópico, padrão editorial).

## Global Constraints

- Convenções da casa: tokens/escala/a11y/pt-BR/dois temas, TS strict, commits convencionais em inglês, sem identificadores de modelo em nenhum artefato do repo.
- **Conteúdo:** redação 100% original a partir das referências — NUNCA copiar texto dos livros; citações precisas (obra, edição, capítulo, páginas quando possível) no frontmatter `referencias`. Os livros são copyright de terceiros e vivem fora deste repo; nada deles entra aqui além de citações bibliográficas.
- Textos extraídos para consulta (ambiente de trabalho, NÃO commitá-los): `/tmp/claude-0/-home-user-SemioGuia/5a72fb17-6ea1-5493-a525-10d96f1ba47d/scratchpad/{porto-semiologia-medica-8ed,porto-exame-clinico-8ed,mcgee-evidence-based-physical-diagnosis-4ed,semiologia-clinica-1ed}.txt` — use grep/sed por trechos; são arquivos grandes.
- **Consistência com o aprovado:** nada pode contradizer os 3 tópicos de sinais vitais nem os rulings registrados (ex.: enchimento capilar sem corte numérico; sem fármacos/doses; DBHA 2025 como âncora de PA). Termo do app: "aferir" (não "medir") para PA.
- Todo tópico nasce `revisao: pendente`. Valores numéricos e epônimos só com âncora explícita numa das referências.
- Estrutura de tópico (padrão sinais vitais): `secao` "O essencial" → seção de técnica com `manobra` + `checklist` → seções temáticas → "Armadilhas do exame" → "Teste rápido" (`quiz` 4–6 perguntas com `explicacao`). 3–6 blocos `nivel: avancado` por tópico; `perola` onde couber. Ilustrações: SVG inline, `viewBox="0 0 320 200"`, `stroke="currentColor"`, sem cores fixas (funciona nos dois temas).
- Gates por task: `npm run build:content` + `npx jest` + `npx tsc --noEmit` + `npm run checar:contraste`; `assets/generated/content.json` re-gerado e commitado em sync (o CI confere).
- NÃO tocar: `firestore.rules`, `scripts/verificar-regras-emulador.mjs`, `jest.config`, qualquer código de sync/conta.
- Branch designado: `claude/claude-code-mobile-8l8cdb` (push por task). gh-pages só na Task 4.

---

### Task 1: Estrutura — sistemas, ícones e build

**Files:**
- Modify: `content/sistemas.yaml`, `src/design/icones.ts`, `assets/generated/content.json` (regen)
- Modify (se falhar): testes que fixam contagens/ids de sistemas

**Steps:**
- [ ] **Step 1:** `sistemas.yaml`: acrescentar `aparelho-cardiovascular` (titulo "Aparelho cardiovascular", cor `#D95757`, icone `heart-pulse`, ordem 2, capítulo `exame-cardiaco` "Exame do coração" ordem 1) e `aparelho-respiratorio` (titulo "Aparelho respiratório", cor `#3BA48D`, icone `wind`, ordem 3, capítulo `exame-do-torax` "Exame do tórax" ordem 1).
- [ ] **Step 2:** `src/design/icones.ts`: registrar `heart-pulse` → `HeartPulse` e `wind` → `Wind` (lucide-react-native), seguindo o comentário do próprio arquivo.
- [ ] **Step 3:** `npm run build:content`; rodar jest e corrigir apenas testes que fixem contagens/ids de sistemas (capítulos vazios são válidos no schema — cards "0 tópicos" no Guia são o estado intermediário esperado até as Tasks 2–3).
- [ ] **Step 4:** gates completos. Commit: `feat: cardiovascular and respiratory systems scaffolding`

---

### Task 2: Capítulo "Exame do coração" (4 tópicos)

**Files:**
- Create: `content/aparelho-cardiovascular/exame-cardiaco/{inspecao-e-palpacao-do-precordio,ausculta-cardiaca,sopros-cardiacos,pulso-venoso-jugular-e-turgencia}.md`
- Create: `content/ilustracoes/*.svg` (cópias-fonte dos SVGs novos, ≥2 — ex.: focos de ausculta; ondas do pulso venoso)
- Modify: `assets/generated/content.json` (regen)

**Steps:**
- [ ] **Step 1:** ler a spec §3–§4 (conteúdo obrigatório por tópico) e os 3 tópicos de sinais vitais (padrão editorial + o que já foi dito sobre pulsos arteriais — referência cruzada, sem duplicar).
- [ ] **Step 2:** pesquisar nas referências extraídas (Porto Semiologia Parte 10 e cap. 47; Porto Exame Clínico; McGee caps. de coração; Semiologia Clínica cap. cardiovascular) e redigir os 4 tópicos, `ordem` 1–4, com técnica, checklist, aprofundamentos (`nivel: avancado` — incluindo edema e perfusão no tópico venoso, correlação com valvopatias no de sopros), armadilhas, quiz 4–6 perguntas, ≥2 ilustrações no capítulo.
- [ ] **Step 3:** `npm run build:content` + gates completos; conferir que busca encontra os tópicos novos (tags generosas).
- [ ] **Step 4:** Commit: `content: cardiac examination chapter with four topics`

**Review desta task inclui revisão médica editorial independente (modelo opus): exatidão clínica, âncoras reais nas referências citadas, originalidade da prosa (sem paráfrase colada), consistência com sinais vitais.**

---

### Task 3: Capítulo "Exame do tórax" (4 tópicos)

**Files:**
- Create: `content/aparelho-respiratorio/exame-do-torax/{inspecao-do-torax,palpacao-do-torax,percussao-do-torax,ausculta-pulmonar}.md`
- Create: `content/ilustracoes/*.svg` (≥2 — ex.: linhas torácicas; mapa comparativo de percussão/síndromes)
- Modify: `assets/generated/content.json` (regen)

**Steps:**
- [ ] **Step 1:** ler a spec §3–§4 e o padrão dos tópicos existentes; NÃO duplicar frequência respiratória/padrões de FR (referência cruzada ao tópico de sinais vitais).
- [ ] **Step 2:** pesquisar nas referências (Porto Semiologia Parte 9/caps. 35–36; Porto Exame Clínico; McGee caps. de tórax/pulmões; Semiologia Clínica) e redigir os 4 tópicos, `ordem` 1–4, incluindo a tabela integradora das síndromes pleuropulmonares como aprofundamento da ausculta, checklists, quizzes e ilustrações.
- [ ] **Step 3:** gates completos.
- [ ] **Step 4:** Commit: `content: thorax examination chapter with four topics`

**Review desta task inclui revisão médica editorial independente (modelo opus), mesmos critérios da Task 2.**

---

### Task 4: Gates finais + deploy

**Files:**
- Nenhum código; `docs/verificacao-fase1b.md` ganha adendo curto da Fase 5.

**Steps:**
- [ ] **Step 1:** gates completos na árvore final; conferir contagens no Perfil (fila SM-2 absorve os checklists/quizzes novos com limite 20/dia — comportamento esperado, sem mudança).
- [ ] **Step 2:** deploy padrão: `expo export` web com `experiments.baseUrl "/SemioGuia"` temporário (reverter `app.json`), gh-pages órfã via worktree com `.nojekyll` + `404.html`, force-push SÓ em gh-pages.
- [ ] **Step 3:** verificação headless (Playwright + Chromium local): home mostra 3 sistemas; abrir 1 tópico de cada capítulo novo (claro e escuro), abrir uma estação OSCE nova, rodar uma busca por termo novo (ex. "frêmito").
- [ ] **Step 4:** Commit docs: `docs: fase 5 verification addendum`

---

## Fora deste plano

- Casos clínicos novos, demais capítulos, 4B, mudanças de motor/sync (spec §7).

## Self-review (do plano)

- Capítulo vazio entre a T1 e as T2–T3 é estado intermediário visível mas inofensivo (card "0 tópicos"); aceitável no branch de trabalho.
- Ilustrações ficam DENTRO das tasks de conteúdo (sem task separada) — menos costura; o estilo está fixado nas Global Constraints.
- Risco principal é editorial (exatidão/originalidade), mitigado pela revisão médica opus por task de conteúdo + revisão final de branch.
