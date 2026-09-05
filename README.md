# SemioGuia 🩺

Guia de bolso de **semiologia médica** para estudantes: do jeito que se
aprende à beira do leito. Prosa original em pt-BR ancorada, tópico a
tópico, em quatro obras de referência citadas (Porto: *Exame Clínico*
8ª ed.; Porto: *Semiologia Médica* 8ª ed.; *Semiologia Clínica* 1ª ed.;
McGee: *Evidence-Based Physical Diagnosis* 4ª ed.), com razões de
verossimilhança, divergências entre as fontes lado a lado e fronteiras
do que as obras não cobrem declaradas ao leitor.

**Web (PWA):** https://antomirsantos.github.io/SemioGuia/

---

## Estado atual (set/2026)

**O conteúdo está completo** e o app está em **beta de validação**
(v1.2.x): onboarding com data da prova e plano diário, analytics local
exportável, feedback in-app, compartilhamento de resultado OSCE e
changelog visível. A passada única de revisão médica do autor está em
concluída na triagem craniocaudal dos 12 sistemas (método em
`docs/triagem-literatura-cardio-resp.md`); todos os tópicos aparecem
como "Revisado" no app.

| | |
|---|---|
| Sistemas | **12** (Anamnese → Semiologia da criança, ordem craniocaudal) |
| Tópicos | **55**: todos revisados (triagem de literatura craniocaudal concluída) |
| Casos clínicos interativos | **3** |
| Questões de quiz | **327** (balanceadas por índice e comprimento) |
| Checklists OSCE | **53** (viram estações de prática) |
| Ilustrações SVG | **59** (temáveis via `currentColor`, geometria verificada; cobertura em `npm run relatorio:ilustracoes`) |
| Sons de ausculta | **20** (17 sintetizados por script + 3 gravações clínicas reais CC BY 4.0) |
| Testes | **60 suítes / 450 testes** verdes |

## Stack

- **Expo SDK 57** (React Native + Web) · **expo-router** (rotas por arquivo) · **TypeScript**
- **Camada didática** (set/2026): cada tópico abre com uma vinheta
  clínica (`cena`), interrompe a leitura com uma pergunta de recuperação
  ativa de resposta recolhida (`pense`), fecha com o resumo "Em três
  linhas" (`resumo`) e termina num caso-relâmpago (`relampago`): um
  parágrafo-caso de decisão única, ponte para os casos ramificados; 220
  textos derivados do conteúdo já revisado
- **Semiologia em movimento e som** (set/2026): ilustrações temporais que
  se desenham (`id="anima-N"` + stroke-dashoffset: sopros no ciclo, ondas
  do pulso venoso, curvas térmicas, ritmos respiratórios), 17 sons de
  ausculta sintetizados por `scripts/gerar-sons.py` (bloco `som`, player
  expo-audio) e micro-recompensas sóbrias no quiz (check que se desenha,
  shake curto, expo-haptics): tudo respeitando `prefers-reduced-motion`
- **Conteúdo como dados**: YAML + Markdown com blocos tipados em `content/`,
  validados por **Zod** e compilados por `npm run build:content` para
  `assets/generated/content.json` (offline-first; busca local sem servidor)
- **Progresso**: SQLite (`expo-sqlite`) + repetição espaçada **SM-2**
  (fila de revisão diária)
- **Sincronização** (opcional, desligada por flag): Firebase Auth +
  Firestore com motor de merge e regras auditadas: ativação em
  `docs/firebase-setup.md`
- **Design "Editorial"** (set/2026): tipografia Libre Bodoni (títulos) +
  Source Serif 4 (leitura) + Public Sans (UI); papel/tinta com acento
  vinho no claro e noturno-tinta no escuro; separação por regras
  tipográficas; tokens de movimento (ease-out forte, pressões 120 ms,
  stagger 40 ms, `prefers-reduced-motion` respeitado) em `src/design/movimento.tsx`
- **Qualidade**: Jest + jest-expo; gate de contraste WCAG AA
  (`npm run checar:contraste`); gate editorial das razões de
  verossimilhança (`npm run checar:rv
npm run checar:travessao`, toda RV em prosa precisa da
  tradução "quanto o achado move a probabilidade" no mesmo parágrafo);
  CI no GitHub Actions; capturas de verificação via Playwright
- **Deploy web**: branch `gh-pages` (procedimento nominal em
  `docs/deploy-gh-pages.md`)

## Telas prontas

- **Guia**: home com os 12 sistemas, tela de sistema/capítulos, tópico
  em seções navegáveis (essencial → técnica → avançado) com tabelas de
  evidência, manobras passo a passo, pérolas (pull-quotes), armadilhas
  e ilustrações
- **Busca**: offline, por sinal, manobra, epônimo ou tópico
- **Modo plantão**: "achei um sinal no exame, e agora?": 186 verbetes
  `sinal` derivados do conteúdo revisado, agrupados por sistema, com busca
  instantânea, destaques em negrito e o salto ao tópico de origem
- **Checklists de exame**: os 53 roteiros do guia em uma tela própria,
  organizados por sistema, com itens marcáveis para conferir o que faltou
- **Estudar**: quiz por sistema, revisão espaçada do dia (SM-2),
  estações OSCE geradas dos checklists e os 3 casos clínicos ramificados
- **Perfil**: progresso, data da prova, preferências, tema claro/escuro,
  exportação dos dados de uso, feedback, versão do app e conta (atrás da
  flag de sync)

## O que falta

1. **Revisão encerrada**: a triagem de literatura craniocaudal cobriu
   os 12 sistemas, todos os 55 tópicos estão `revisao: ok` ("Revisado"
   no app) e os **86 itens do checklist do autor estão fechados**
   (histórico completo em `docs/inconsistencias-para-revisao.md` +
   adendos em `docs/verificacao-fase1b.md`).
2. **Ativação do Firebase**: flag mestre desligada; passos em
   `docs/firebase-setup.md` (executar na máquina do autor).
3. **Publicação nas lojas**: build EAS e fichas das lojas (ícone,
   splash e favicon definitivos já estão na paleta editorial).
4. **Fronteiras declaradas** (fora por decisão ou por silêncio das
   fontes, reavaliáveis): obstetrícia (sem obra de referência no
   acervo), marcha da criança pequena e exame motor neonatal
   especializado, puericultura.
5. **Fase futura planejada: exame físico do idoso**, por decisão do
   autor (2026-09-03) deixa de ser fronteira aceita; capítulo próprio a
   especificar depois do fechamento do beta (fundamentos do exame
   psíquico e delirium já apontam para ele).

## Problemas conhecidos

- **Cores de sistema sob daltonismo**: a re-otimização global de
  2026-09-03 eliminou as colisões (pior par sob deuteranopia/protanopia
  subiu de ΔE00 0,00 para 1,67), mas com 12 cores categóricas a paleta
  opera no limite prático: a cor nunca é canal único; ícone, nome e
  posição desambiguam. Pisos vigiados por `npm run checar:contraste`.
- **Reanimated 4.5 × jest-expo**: incompatíveis hoje; as animações usam
  o `Animated` do React Native com os mesmos valores de curva/duração.

## Rodando localmente

```bash
npm install
npm run build:content   # compila o conteúdo (YAML/MD → JSON)
npx expo start          # i = iOS, a = Android, w = web

npm test                # 58 suítes / 439 testes
npm run checar:contraste
npm run checar:rv
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
