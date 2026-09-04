# SemioGuia Fase 8, Redesign de navegação e leitura: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leitura por seções com sumário e progressão, compartimentação visual dos blocos, home/sistema mais ricos, movimento sutil, sem tocar em `content/`, sem dependência nova.

**Spec:** docs/superpowers/specs/2026-08-23-semioguia-fase8-redesign-leitura-design.md: autoridade. Implementers DEVEM ler as skills citadas na spec §2 (`.claude/skills/{cognitive-load-analyser,sleek-design-mobile-apps,high-end-visual-design}/SKILL.md`) antes de desenhar qualquer tela.

## Global Constraints

- Invariantes da casa (spec §2): tokens/useTema, escala, a11y, dois temas, pt-BR, TS strict, jest-expo async render; commits convencionais sem identificadores de modelo; branch claude/claude-code-mobile-8l8cdb, push por task.
- NÃO tocar: `content/`, `scripts/`, schema/parsers, quiz/SM-2/casos/sync/conta, `firestore.rules`, jest config, `package.json` (zero dependências novas).
- Cada task roda gates completos: `npx jest`, `npx tsc --noEmit`, `npm run checar:contraste`, `npm run build:content` (deve permanecer sem drift). Testes de tela adaptados só onde a estrutura mudou; NUNCA enfraquecer asserções de a11y.
- Verificação visual por task: renderizar as telas alteradas em Chromium (procedimento headless da casa, claro + escuro) e inspecionar antes do commit.
- Deploy só na T3, via worktree novo (guarda `-e`, conferir conteúdo do commit).

---

### Task 1: Tópico em camadas + compartimentação dos blocos (spec §3.1: §3.2, §3.4)

**Files:** `src/app/topico/[...caminho].tsx` (seções, sumário-chips, navegação, progresso), novos componentes em `src/design/` ou `src/blocos/` (ex. `SumarioSecoes.tsx`, `NavegacaoSecao.tsx`), ajustes visuais em `src/blocos/*.tsx` (identidade por tipo, respiro), possíveis acréscimos de tokens em `src/design/tokens.ts`; testes co-locados novos + adaptação dos existentes (`guia.test.tsx` etc.).

- [ ] Ler skills + spec; particionar blocos por `secao` (blocos antes da 1ª seção pertencem a uma seção implícita "Início" se existirem: verificar no conteúdo real via content.json).
- [ ] Implementar com a11y de tabs, transições com reduced-motion respeitado, estados nas cores do sistema.
- [ ] Adaptar testes (conteúdo de seção inativa fora do DOM); adicionar testes do sumário (troca de seção, estado selected, "Seção X de Y").
- [ ] Gates + inspeção visual claro/escuro. Commit: `feat: sectioned topic reading with summary chips and block identity`

**Review: revisor independente (sonnet) (a11y, ambos os temas, testes não enfraquecidos, spec §3.1) §3.2, render visual conferido por ele mesmo.**

### Task 2: Home e sistema mais ricos (spec §3.3)

**Files:** `src/app/(tabs)/index.tsx`, `src/app/sistema/[sistemaId].tsx`, testes.

- [ ] Progresso por sistema (estudados/total: reusar `listarEstudados` + `listarTodosTopicos`); checkmarks por tópico na tela de sistema; "Continuar de onde parou" APENAS se `definirPreferencia`/`obterPreferencia` aceitarem chave nova sem migração, verificar a interface real do ProgressStore primeiro; se exigir migração de schema, CORTAR o item e registrar.
- [ ] Gates + inspeção visual. Commit: `feat: richer home and system screens with progress`

**Review: revisor independente (sonnet), mesmos critérios.**

### Task 3: Revisão final de fase + deploy + capturas

- [ ] Revisão final (fable): coerência visual entre telas, a11y, regressões, gates.
- [ ] Adendo docs/verificacao-fase1b.md; deploy padrão; verificação headless.
- [ ] **Capturas de tela para o autor** (pedido explícito): home, tópico denso em seções (claro e escuro), tela de sistema, entregues no fechamento.

## Fora deste plano

Spec §5.

## Self-review (do plano)

- Maior risco: quebra de testes de tela pela seccionação, tratado como passo explícito da T1, com proibição de enfraquecer a11y.
- "Continuar de onde parou" tem cláusula de corte para não abrir migração de store nesta fase.
