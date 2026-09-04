# Plano, Fase 14: Exame psíquico

Spec: docs/superpowers/specs/2026-08-29-semioguia-fase14-exame-psiquico-design.md

### Task 1: Estrutura, sistema Exame psíquico · sonnet
**Files:** content/sistemas.yaml, src/design/icones.ts, content.json.
- [ ] Inserção pura (ordem 11, nada desloca); ícone verificado no lucide
  (candidatos message-circle → lightbulb → puzzle); busca de cor
  dual-regime contra 10 cores (baselines re-derivados); gates (build
  "11 sistemas, 48 tópicos, 3 casos", jest 41/321 antes e depois, tsc,
  contraste). Commit: `feat: mental status examination system scaffolding`
**Review: estrutural independente (sonnet), refaz a medição de cor.**

### Task 2: Tópicos 1 a 2 (fundamentos; funções psíquicas) · fable
**Files:** content/exame-psiquico/exame-psiquico/{fundamentos-do-exame-psiquico,funcoes-psiquicas-e-seus-disturbios}.md, SVG(s), content.json.
- [ ] Mapa de cruzadas antes (consciência é dona de Glasgow/atenção/kappas);
  profissionalismo ancorado; nomenclaturas divergentes lado a lado;
  quiz 12 balanceado. Commit: `content: mental status examination chapter first two topics`
**Review: médica independente + re-revisão escopada.**

### Task 3: Tópicos 3 a 4 (escalas à beira do leito; delirium/demência/depressão) · fable
**Files:** content/exame-psiquico/exame-psiquico/{escalas-cognitivas-a-beira-do-leito,delirium-demencia-e-depressao}.md, SVG(s), content.json.
- [ ] Paga as dívidas do neurológico (miniexame com cortes por
  escolaridade; escalas de sedação; reflexos primitivos); minera o
  McGee cap. 6 inteiro (EBM boxes, páginas por cabeçalho corrente);
  quiz 12; capítulo fecha com 24 (6/6/6/6, mais-longa 6/24 espalhada).
  Commit: `content: cognitive scales and mental state syndromes topics`
**Review: médica independente + re-revisão escopada.**

### Task 4: Costuras reversas + revisão final + deploy + capturas
- [ ] Atualizar consciencia-e-estado-mental.md:94-95 e :486 e
  forca-tonus-e-reflexos.md:96 (apontar os tópicos reais), re-verificado.
- [ ] Revisão final: costuras com 48 tópicos + 3 casos, deferrals,
  spec, gates, caminhada visual (11 sistemas; cor sob daltonismo;
  busca "delirium"/"miniexame"/"memória"); adendo + checklist M;
  deploy nominal; capturas.

## Fora deste plano
Spec §7.

## Self-review (do plano)
- Risco 1: nomenclatura divergente, regra lado a lado, revisão confere.
- Risco 2: importação DSM, proibição explícita na spec, revisão audita.
- Risco 3: costura toca 2 tópicos aprovados, confinada à T4.
- Risco 4: paleta com 10 cores, busca em dois regimes + re-medição.
