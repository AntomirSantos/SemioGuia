# SemioGuia Fase 13 — Mamas e aparelho geniturinário: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Checkbox (`- [ ]`) steps.

**Goal:** Sistema "Mamas e geniturinário" (ordem 9; nervoso 9→10), dois capítulos, cinco tópicos. Paga a dívida do toque retal do abdome agudo, nos dois sentidos.

**Spec:** docs/superpowers/specs/2026-08-24-semioguia-fase13-mamas-e-geniturinario-design.md — autoridade. **Roteiro:** docs/roteiro-conteudo-restante.md.

## Global Constraints

- As das Fases 5–12 + spec §4. Em especial: profissionalismo dos exames íntimos como conteúdo ancorado; não forçar números (McGee sem capítulo de mamas/genital/retal — varredura corrigida); `pdftotext -layout` para tabelas; offset PDF↔impresso do McGee varia por capítulo — mapear antes de citar página; barra de originalidade em **zero runs ≥9 palavras** (N=10 e N=9).
- Biblioteca privada em /home/user/semioguia-referencias/ — nunca copiar conteúdo ao repositório, nunca commitar PDF. Extrações planas no scratchpad como apoio.
- NÃO tocar conteúdo existente, EXCETO a costura da dívida (abdome-agudo l.260) na T4, com re-verificação.
- Branch claude/claude-code-mobile-8l8cdb; gh-pages só na T4, checklist NOMINAL de docs/deploy-gh-pages.md (50 arquivos por nome).

### Task 1: Estrutura · sonnet
**Files:** sistemas.yaml (+mamas-e-geniturinario ordem 9, DOIS capítulos, icone ribbon; nervoso 9→10), icones.ts, content.json, testes se falharem.
- [ ] Cor por busca em dois regimes (normal + deuteranopia/protanopia), wash sobre `paleta.fundo`, S/L na família; reportar tabela e aplicar a vencedora. Gates. Commit: `feat: breast and genitourinary system scaffolding`
**Review: estrutural independente (sonnet) — refaz a medição de cor, diff aditivo + o único deslocamento, dois capítulos vazios tolerados.**

### Task 2: Capítulo "Exame das mamas" (2 tópicos) · fable
**Files:** content/mamas-e-geniturinario/exame-das-mamas/{exame-das-mamas,nodulo-mamario-e-descarga-papilar}.md, SVG(s), content.json.
- [ ] Mapa de cruzadas antes (linfonodos é o dono das cadeias); profissionalismo ancorado; quiz 12 balanceado (~3/índice). Commit: `content: breast examination chapter with two topics`
**Review: médica independente + re-revisão escopada.**

### Task 3: Capítulo "Exame geniturinário e retal" (3 tópicos) · fable
**Files:** content/mamas-e-geniturinario/exame-geniturinario-e-retal/{genitalia-masculina-e-hernias,exame-ginecologico,toque-retal}.md, SVG(s), content.json.
- [ ] Contingência do espéculo decidida com justificativa; toque retal remete aos números do abdome sem repeti-los; quiz 18 (4-5/índice). Commit: `content: genitourinary and rectal examination chapter with three topics`
**Review: médica independente + re-revisão escopada.**

### Task 4: Revisão final + costura da dívida + deploy + capturas
- [ ] Atualizar `abdome-agudo-e-sinais-peritoneais.md:260` ("pertence a um capítulo próprio" → aponta o tópico real), re-verificado pela revisão.
- [ ] Revisão final: costuras reversas com os 43 tópicos + 3 casos, deferrals que envelheceram, spec, gates, caminhada visual (10 sistemas; cor nova sob daltonismo; busca "próstata"/"hérnia"/"nódulo de mama"); adendo + checklist; deploy nominal; capturas.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco 1: sensibilidade do conteúdo íntimo — mitigado pela regra "profissionalismo é conteúdo" e pelo tom técnico das fontes; ilustrações esquemáticas.
- Risco 2: capítulo com pouca evidência quantificada num guia acostumado a LRs — precedente da F12 (dizer ao leitor), e o abdome agudo já carrega os números do toque, que este capítulo NÃO duplica.
- Risco 3: a costura reversa da dívida toca conteúdo aprovado — confinada à T4 e re-verificada.
- Risco 4: paleta no limite — busca em dois regimes na T1, medição refeita na revisão, conferência sob daltonismo na T4.
