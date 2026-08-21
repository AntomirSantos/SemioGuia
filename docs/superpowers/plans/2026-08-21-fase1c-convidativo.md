# SemioGuia Fase 1C — O App Convidativo: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar o feedback do autor (revisão médica de 21/08): paleta Vital (índigo) escolhida pelo autor, conteúdo sucinto e compartimentado com revelação progressiva (básico visível, avançado sob toque), cards de entendimento clínico, e ilustrações SVG que mostram as manobras.

**Architecture:** Extensões da arquitetura existente: (1) tokens ganham a paleta Vital; (2) o schema de conteúdo ganha os blocos `secao`, `entendimento` e `ilustracao` e o campo opcional `nivel: basico|avancado` em todo bloco — blocos avançados renderizam recolhidos atrás de "Aprofundar"; (3) ilustrações são SVGs inline no conteúdo, renderizados com react-native-svg (`SvgXml`); (4) o conteúdo piloto é reescrito conforme ux-writing + cognitive-load-analyser. Convenções vigentes (tokens only, escala em texto de leitura, testes co-locados, TDD) continuam valendo.

**Tech Stack:** o existente + `SvgXml` de react-native-svg (já instalado).

**Spec:** docs/superpowers/specs/2026-08-21-semioguia-design.md + feedback do autor registrado neste plano. Skills de referência para os implementadores (LER antes da task indicada): `.claude/skills/ux-writing/SKILL.md` (T5), `.claude/skills/cognitive-load-analyser/SKILL.md` (T5), `.claude/skills/dual-coding-designer/SKILL.md` (T4).

## Global Constraints

- Tudo da 1B permanece: TypeScript strict limpo, tokens only, escala em texto de leitura, pt-BR, testes verdes, CI verde, conteúdo `revisao: pendente`.
- Paleta Vital (valores EXATOS, gerados em OKLCH e validados AA — fonte da verdade abaixo).
- Conteúdo: sucinto por padrão (frases ≤ 20 palavras na média; parágrafos ≤ 3 frases; texto longo é exceção justificada); termos específicos/epônimos avançados (ex.: pulso paradoxal de Kussmaul, hiato auscultatório, sinal de Osler) ficam `nivel: avancado`.
- Ilustrações: SVG de linha, traço 2px `currentColor` (herda cor do tema), sem texto embutido em inglês, viewBox limpo, sem estilos externos.
- Commits convencionais em inglês.

### Paleta Vital — valores canônicos

```ts
// CLARO (exatamente como aprovado na prévia)
fundo: '#f3f6fb', superficie: '#FFFFFF', superficie2: '#e5ebf8',
tinta: '#181b2d', tinta2: '#535a72', linha: '#d3d9e5',
acento: '#3655cd', acentoTinta: '#2942ab',
perolaFundo: '#fcedcd', perolaTexto: '#734c00', perolaBorda: '#e8d1a8',
ok: '#21763c', okFundo: '#d9f3dd', erro: '#a43b38', erroFundo: '#ffe4e1',
// ESCURO (exatamente como aprovado na prévia)
fundo: '#0f121c', superficie: '#191e2a', superficie2: '#242939',
tinta: '#e5e8ed', tinta2: '#9fa4b2', linha: '#333949',
acento: '#859ff6', acentoTinta: '#a4b7fb',
perolaFundo: '#2f2512', perolaTexto: '#e1bf80', perolaBorda: '#503f22',
ok: '#79c289', okFundo: '#15291a', erro: '#e88f87', erroFundo: '#3a1d1b',
```

(Se `npm run checar:contraste` acusar par < mínimo, ajustar minimamente o token reprovado em OKLCH e registrar no report.)

---

### Task 1: Paleta Vital nos tokens

**Files:** Modify: `src/design/tokens.ts`, `content/sistemas.yaml` (cor do sistema), `assets/generated/content.json` (regenerado), `app.json` (splash = novos fundos)
**Interfaces:** Consumes/Produces: mesmas chaves `Paleta` — troca só de valores. `sistemas.yaml`: cor de exame-fisico-geral vira `#4A90D9` (azul-céu harmônico com o índigo, distinto do acento global).

- [ ] Substituir os valores das duas paletas pelos canônicos acima (chaves idênticas).
- [ ] `content/sistemas.yaml`: `cor: "#4A90D9"`; `npm run build:content` e commitar o JSON.
- [ ] `app.json`: splash backgroundColor `#f5f6fb` / dark `#14162b`.
- [ ] Verificar: `npx jest src/design/tokens.test.ts`, `npm run checar:contraste` (12 pares AA), suíte inteira, typecheck.
- [ ] Commit: `feat: adopt Vital indigo palette chosen by the author`

---

### Task 2: Schema v2 — secao, entendimento, ilustracao, nivel

**Files:** Modify: `src/content/schema.ts`, testes de schema; Test: casos novos em `src/content/schema.test.ts`
**Interfaces (Produces — Tasks 3-5 dependem):**

```ts
// campo comum opcional em TODO bloco do discriminated union:
nivel?: 'basico' | 'avancado'        // ausente = basico
// blocos novos:
{ tipo: 'secao'; titulo: string }                                    // subtítulo de compartimento
{ tipo: 'entendimento'; titulo?: string; texto: string }             // "por que importa na prática" — relação clínica
{ tipo: 'ilustracao'; svg: string; legenda: string; nivel?: ... }    // svg inline (min 20 chars, deve conter '<svg')
```

- [ ] TDD: testes — secao válida; entendimento exige texto; ilustracao rejeita svg sem `<svg`; `nivel: 'avancado'` aceito em qualquer tipo (testar em conceito e sinal); valor inválido de nivel rejeitado.
- [ ] Implementar: estender cada membro do union com `nivel: z.enum(['basico','avancado']).optional()` (helper aplicado a todos) + os 3 blocos novos no union.
- [ ] Suíte + typecheck. Commit: `feat: content schema v2 with sections, clinical-insight and illustration blocks`

---

### Task 3: Renderizadores novos + revelação progressiva

**Files:** Create: `src/blocos/Secao.tsx`, `Entendimento.tsx`, `Ilustracao.tsx`, `Avancado.tsx` (wrapper colapsável); Modify: `src/blocos/Bloco.tsx` (dispatcher + wrapping por nivel), `src/blocos/Bloco.test.tsx`
**Interfaces:** `BlocoView` inalterado por fora. Internamente: bloco com `nivel === 'avancado'` renderiza dentro de `<Avancado rotulo={rotuloDoTipo}>` — card fino com cabeçalho "Aprofundar · <rotulo>" + chevron, fechado por padrão, `accessibilityRole="button"`, `accessibilityState={{expanded}}`, conteúdo montado só quando aberto. `Secao`: título display h3 com filete `acento` à esquerda, margem generosa acima — divide compartimentos. `Entendimento`: card com borda esquerda 3px `acento`, tag "ENTENDIMENTO CLÍNICO", fundo `superficie2`. `Ilustracao`: `SvgXml` (react-native-svg) com `xml={bloco.svg}` largura 100% (aspecto do viewBox), `color` = `tinta` (o SVG usa currentColor), legenda em `small` `tinta2` centralizada; `accessibilityLabel={legenda}`.

- [ ] TDD: secao renderiza título; entendimento mostra tag + texto; ilustracao renderiza legenda (mock leve de SvgXml se necessário no jest — `jest.mock('react-native-svg')` com componente nulo, asserindo a legenda); bloco `nivel: 'avancado'` NÃO mostra o conteúdo antes do toque e mostra depois (fireEvent.press no "Aprofundar").
- [ ] Implementar os 4 componentes + dispatcher (rotulos pt-BR por tipo: Conceito, Manobra, Sinal…, usados no cabeçalho do Avancado).
- [ ] Suíte + typecheck. Commit: `feat: progressive disclosure, section, clinical-insight and illustration renderers`

---

### Task 4: Ilustrações SVG das manobras (dual coding)

**Files:** Create: `content/ilustracoes/` com 5 SVGs fonte (para referência/reuso) — o conteúdo os embute inline na Task 5. Ler `.claude/skills/dual-coding-designer/SKILL.md` antes.
**Interfaces (Produces — a Task 5 embute):** 5 SVGs de linha (2px, currentColor, sem texto em inglês, com pt-BR mínimo quando indispensável):
1. `medida-pa.svg` — braço com manguito na altura do coração, estetoscópio na fossa cubital (posição correta anotada com setas)
2. `fases-korotkoff.svg` — diagrama das 5 fases: barra de pressão descendo com faixas I-V e onde ler PAS/PAD
3. `palpacao-pulso-radial.svg` — mão examinadora com 2 dedos sobre o punho (técnica correta, polegar fora)
4. `locais-temperatura.svg` — silhueta com os 4 locais de aferição marcados
5. `curvas-termicas.svg` — 4 mini-gráficos dos padrões (contínua, intermitente, remitente, recorrente)

- [ ] Desenhar os 5 (viewBox ~0 0 320 200, traço 2, currentColor, formas simples e claras — didático > realista).
- [ ] Validar: cada arquivo abre como SVG válido (parse com um script rápido), nenhum atributo de cor fixa exceto currentColor/none.
- [ ] Commit: `feat: line-art illustrations for vital signs maneuvers`

---

### Task 5: Reescrita do conteúdo piloto (sucinto + compartimentado + progressivo)

**Files:** Modify: os 3 `.md` de `content/exame-fisico-geral/sinais-vitais/`; `assets/generated/content.json` regenerado. LER antes: `.claude/skills/ux-writing/SKILL.md` e `.claude/skills/cognitive-load-analyser/SKILL.md`.
**Regras de reescrita:**
- Estrutura por `secao` (ex.: PA: "O essencial" / "Como medir" / "Classificação" / "Armadilhas do exame"), com 1 bloco `entendimento` por tópico no mínimo (a ponte clínica: "o que esse número muda na conduta/raciocínio").
- Texto: frases curtas, voz ativa, zero redundância; máx ~3 frases por parágrafo; listas > prosa quando enumerável.
- `nivel: avancado` para: pulso paradoxal/alternante (detalhes), desambiguação de Kussmaul, hiato auscultatório (detalhe além da pérola), sinal de Osler/pseudo-hipertensão, fases de Korotkoff detalhadas, variações da temperatura bucal, padrões de curva térmica raros. O BÁSICO se sustenta sozinho sem esses blocos.
- Embutir as 5 ilustrações da Task 4 (bloco `ilustracao` com o svg inline e legenda curta) nos pontos de máximo valor didático.
- Fatos médicos INALTERADOS (DBHA 2025, FR Porto padrão, cortes de febre adulto/criança SBP 2025, referências mantidas); só forma, ordem e nível mudam. `revisao: pendente` mantido.
- [ ] Reescrever os 3 tópicos; `npm run build:content` OK; suíte + typecheck.
- [ ] Auto-verificação quantitativa no report: nº médio de palavras/frase antes vs depois nos blocos conceito; nº de blocos avançados por tópico.
- [ ] Commit: `content: concise sectioned rewrite with progressive disclosure and illustrations`

---

### Task 6: Build final + gh-pages

**Files:** branch `gh-pages` regenerada (autorizada pelo autor); `docs/verificacao-fase1b.md` ganha adendo 1C.
- [ ] Suíte inteira + typecheck + checar:contraste + build:content sync — tudo verde.
- [ ] Export web com baseUrl `/SemioGuia` (mesmo procedimento da 1B: editar app.json temporariamente, exportar, reverter), regenerar branch gh-pages (worktree órfã) com `.nojekyll` + `404.html`, push.
- [ ] Teste headless no caminho `/SemioGuia/` (padrão da 1B): home, tópico com seção + "Aprofundar" abrindo, ilustração visível, paleta nova aplicada; screenshot para o autor.
- [ ] Commit dos ajustes + push da branch principal.

## Fora deste plano
- Ilustrações para os DEMAIS capítulos (produção junto com cada conteúdo novo).
- Ícones por sistema além do atual (quando novos sistemas entrarem).
