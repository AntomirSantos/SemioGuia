# SemioGuia 🩺

Guia de bolso de **semiologia médica** para estudantes — do jeito que se
aprende à beira do leito. Prosa original em pt-BR ancorada, tópico a
tópico, em quatro obras de referência citadas (Porto — *Exame Clínico*
8ª ed.; Porto — *Semiologia Médica* 8ª ed.; *Semiologia Clínica* 1ª ed.;
McGee — *Evidence-Based Physical Diagnosis* 4ª ed.), com razões de
verossimilhança, divergências entre as fontes lado a lado e fronteiras
do que as obras não cobrem declaradas ao leitor.

**Web (PWA):** https://antomirsantos.github.io/SemioGuia/

---

## Estado atual (set/2026)

**O conteúdo está completo** e o app está em **beta de validação**
(v1.1.x): onboarding com data da prova e plano diário, analytics local
exportável, feedback in-app, compartilhamento de resultado OSCE e
changelog visível. A passada única de revisão médica do autor está em
andamento (triagem de literatura aberta de cardio + respiratório
concluída — `docs/triagem-literatura-cardio-resp.md`).

| | |
|---|---|
| Sistemas | **12** (Anamnese → Semiologia da criança, ordem craniocaudal) |
| Tópicos | **55** — 8 revisados (cardiovascular e respiratório), 47 `revisao: pendente` |
| Casos clínicos interativos | **3** |
| Questões de quiz | **327** (balanceadas por índice e comprimento) |
| Checklists OSCE | **53** (viram estações de prática) |
| Ilustrações SVG | **52** (temáveis via `currentColor`, geometria verificada) |
| Testes | **53 suítes / 405 testes** verdes |

## Stack

- **Expo SDK 57** (React Native + Web) · **expo-router** (rotas por arquivo) · **TypeScript**
- **Conteúdo como dados**: YAML + Markdown com blocos tipados em `content/`,
  validados por **Zod** e compilados por `npm run build:content` para
  `assets/generated/content.json` (offline-first; busca local sem servidor)
- **Progresso**: SQLite (`expo-sqlite`) + repetição espaçada **SM-2**
  (fila de revisão diária)
- **Sincronização** (opcional, desligada por flag): Firebase Auth +
  Firestore com motor de merge e regras auditadas — ativação em
  `docs/firebase-setup.md`
- **Design "Editorial"** (set/2026): tipografia Libre Bodoni (títulos) +
  Source Serif 4 (leitura) + Public Sans (UI); papel/tinta com acento
  vinho no claro e noturno-tinta no escuro; separação por regras
  tipográficas; tokens de movimento (ease-out forte, pressões 120 ms,
  stagger 40 ms, `prefers-reduced-motion` respeitado) em `src/design/movimento.tsx`
- **Qualidade**: Jest + jest-expo; gate de contraste WCAG AA
  (`npm run checar:contraste`); CI no GitHub Actions; capturas de
  verificação via Playwright
- **Deploy web**: branch `gh-pages` (procedimento nominal em
  `docs/deploy-gh-pages.md`)

## Telas prontas

- **Guia** — home com os 12 sistemas, tela de sistema/capítulos, tópico
  em seções navegáveis (essencial → técnica → avançado) com tabelas de
  evidência, manobras passo a passo, pérolas (pull-quotes), armadilhas
  e ilustrações
- **Busca** — offline, por sinal, manobra, epônimo ou tópico
- **Estudar** — quiz por sistema, revisão espaçada do dia (SM-2),
  estações OSCE geradas dos checklists e os 3 casos clínicos ramificados
- **Perfil** — progresso, data da prova, preferências, tema claro/escuro,
  exportação dos dados de uso, feedback, versão do app e conta (atrás da
  flag de sync)

## O que falta

1. **Revisão médica do autor** — 47 tópicos seguem `revisao: pendente`
   (cardiovascular e respiratório já revisados, com selo "Em revisão"
   removido no app); o roteiro da revisão é `docs/inconsistencias-para-revisao.md`
   (seções A–P: divergências entre as obras, convenções declaradas e
   decisões editoriais a endossar) + os adendos por fase em
   `docs/verificacao-fase1b.md`.
2. **Ativação do Firebase** — flag mestre desligada; passos em
   `docs/firebase-setup.md` (executar na máquina do autor).
3. **Publicação nas lojas** — build EAS, ícones/splash definitivos,
   fichas das lojas.
4. **Splash/ícone do app** — `app.json` ainda usa cores da paleta
   anterior ao design editorial.
5. **Fronteiras declaradas** (fora por decisão ou por silêncio das
   fontes, reavaliáveis): obstetrícia (sem obra de referência no
   acervo), exame físico do idoso como capítulo próprio, marcha da
   criança pequena e exame motor neonatal especializado, puericultura.

## Problemas conhecidos

- **Colisão de cor sob daltonismo** no tema escuro: os washes de
  Cabeça e pescoço × Aparelho respiratório coincidem sob deuteranopia
  (herança da paleta; a cor nunca é canal único — nome e posição
  desambiguam). Registrado no checklist (item L2).
- **Reanimated 4.5 × jest-expo**: incompatíveis hoje; as animações usam
  o `Animated` do React Native com os mesmos valores de curva/duração.
- **Resíduos aguardando endosso do autor** (não são bugs): uma citação
  atribuída de 14 palavras e paráfrases herdadas de fases antigas em
  dois tópicos, listadas nos itens L6/O8 do checklist.

## Rodando localmente

```bash
npm install
npm run build:content   # compila o conteúdo (YAML/MD → JSON)
npx expo start          # i = iOS, a = Android, w = web

npm test                # 53 suítes / 405 testes
npm run checar:contraste
npx tsc --noEmit
```

## Estrutura

```
content/            # o conteúdo (YAML de sistemas + MD por tópico + SVGs)
src/app/            # rotas (expo-router)
src/design/         # tokens, tipografia, movimento, componentes de bloco
src/content/        # schema Zod + provider
scripts/            # build de conteúdo, contraste, relatório do beta, revisão
docs/               # deploy, Firebase, checklist de revisão, adendos por fase
```

O conteúdo é autoral e cita as obras por capítulo/seção (páginas apenas
onde conferidas na fonte); os livros de referência **não** fazem parte
deste repositório.
