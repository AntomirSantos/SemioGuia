# Plano — Fase 15: Semiologia da criança

Spec: docs/superpowers/specs/2026-08-30-semioguia-fase15-semiologia-da-crianca-design.md

### Task 1: Estrutura — sistema Semiologia da criança · sonnet
**Files:** content/sistemas.yaml, src/design/icones.ts, content.json.
- [ ] Inserção pura (ordem 12, nada desloca); ícone verificado (baby →
  blocks → sprout); busca de cor dual-regime COM piso de legibilidade
  ≥2,0:1 (método F14) contra 11 cores; gates (build "12 sistemas,
  52 tópicos, 3 casos", jest 41/321, tsc, contraste).
  Commit: `feat: pediatric semiology system scaffolding`
**Review: estrutural independente (sonnet) — refaz medição + Pareto.**

### Task 2: Tópicos 1–2 (abordagem/anamnese; crescimento/sinais vitais) · fable
**Files:** content/semiologia-da-crianca/exame-da-crianca/{abordagem-e-anamnese-da-crianca,crescimento-sinais-vitais-e-hidratacao}.md, SVG(s), content.json.
- [ ] Mapear cap. 179 antes de escrever; contingência do exame psíquico
  da criança decidida com justificativa; faixas de FC/FR ancoradas
  pagam C4 por referência (caso intocado); cruzadas para temperatura
  e antropometria (donas); quiz 12. Commit:
  `content: pediatric approach and growth topics`
**Review: médica independente + re-revisão escopada.**

### Task 3: Tópico 3 (do RN ao adolescente) + auditoria de adiamentos · fable
**Files:** content/semiologia-da-crianca/exame-da-crianca/do-recem-nascido-ao-adolescente.md, SVG(s), content.json.
- [ ] Tanner/telarca/puberdade precoce/criptorquidia do lactente pelas
  fontes (cap. 179/180); contingências do RN (reflexos, Ortolani) com
  justificativa; AUDITORIA COMPLETA dos adiamentos "fase da criança"
  (lista da spec §1a) — cada um marcado PAGO ou RE-ESCOPADO com
  motivo, entregando à T4 a lista fechada de costuras; quiz 18 fecha
  4-5/índice e mais-longa 4-5/18. Commit:
  `content: newborn to adolescent examination topic`
**Review: médica independente + re-revisão escopada.**

### Task 4: Costuras reversas + revisão final + deploy + capturas
- [ ] Atualizar TODAS as frases de origem dos adiamentos pagos (lista
  da T3; até 8 arquivos), re-verificado; checklist C4 anotado como
  pago/pago-parcial.
- [ ] Revisão final: costuras com 52 tópicos + 3 casos (o caso "febre
  na criança" ganhou âncora?), deferrals, spec, gates, caminhada
  visual (12 sistemas — home completa!; busca "Tanner"/"fontanela"/
  "criança"); adendo + checklist O; deploy nominal; capturas.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco 1: fontes rasas — regra do não-forçar; revisões auditam K6.
- Risco 2: Tanner visual — só esquemático e ancorado, senão texto.
- Risco 3: 8 costuras — lista fechada pela T3, confinadas à T4.
- Risco 4: paleta 11 cores + piso — método F14 na T1.
