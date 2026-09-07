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

**O conteúdo está completo.** A triagem de literatura craniocaudal
cobriu os 12 sistemas e os 55 tópicos estão `revisao: ok` ("Revisado" no
app); o método está em `docs/triagem-literatura-cardio-resp.md`. O app
está em **beta de validação** (v1.2.34), agora com o **paywall ligado**:
quatro sistemas inteiros de graça e os outros oito na assinatura anual.

| | |
|---|---|
| Sistemas | **12** (Anamnese → Semiologia da criança, ordem craniocaudal) |
| Tópicos | **55**, todos revisados |
| Casos clínicos interativos | **67** ramificados (42 de urgência e 25 de ambulatório, com filtro por cenário), aguardando endosso do autor |
| Questões de quiz | **327** em 55 rodadas, balanceadas por índice e comprimento |
| Checklists OSCE | **53**, cada um vira estação de prática |
| Verbetes do modo plantão | **186** blocos `sinal`, também usados como flashcards na revisão |
| Camada didática | **220** textos: uma `cena`, um `pense`, um `resumo` e um caso-relâmpago por tópico |
| Ilustrações SVG | **59** em uso (temáveis via `currentColor`; cobertura em `npm run relatorio:ilustracoes`) |
| Sons de ausculta | **20** (10 sintetizados por script e 10 gravações clínicas reais: HF_Lung_V1 CC BY 4.0 e CirCor DigiScope ODC-BY 1.0), com fonocardiograma sincronizado |
| Acesso | **4 sistemas gratuitos e inteiros**, **8 na assinatura anual** de R$ 24,90 |
| Testes | **70 suítes / 498 testes** verdes |

## Acesso: o que é grátis e o que se paga

Decisão do autor (2026-09-07), plano completo em `docs/monetizacao.md`.

| Faixa | Sistemas | Tópicos |
|---|---|---|
| Grátis | Anamnese, Exame físico geral, Aparelho cardiovascular, Aparelho respiratório | 19 |
| Assinatura anual | os outros 8 sistemas | 36 |

O corte é **por sistema e vale para tudo o que pertence a ele**: tópicos,
questões, casos, checklists, estações e verbetes do plantão. Quem não
assina tem quatro sistemas inteiros, e não quatro amostras: 19 tópicos,
25 casos, 17 checklists e 58 verbetes.

- **R$ 24,90 por ano, sempre.** Sem primeiro ano promocional e sem preço
  cheio depois: na loja é um plano base anual, sem oferta de introdução.
- **O conteúdo pago não some das listas**: aparece como linha trancada,
  com o nome à vista e um cadeado, e o toque leva à tela de acesso.
- **Prazo com carência**: o aparelho continua liberando o conteúdo por
  até 30 dias sem conseguir falar com a loja, porque o app é offline por
  princípio.
- **A web fica gratuita para sempre**, como vitrine: a cobrança da loja
  não existe no navegador.
- **Assinar não exige conta no app.** A conta serve para sincronizar o
  progresso e liberar o acesso na web, e é opcional.

O app fala com a interface `Loja` (`src/entitlements/loja.ts`) e nunca
com o SDK nativo, então telas, prazo e bloqueio já existem e são
testados com uma loja de mentira. Ligar a cobrança de verdade é
implementar essa interface e chamar `configurarLoja(...)`.

## Stack

- **Expo SDK 57** (React Native + Web) · **expo-router** (rotas por arquivo) · **TypeScript**
- **Conteúdo como dados**: YAML + Markdown com blocos tipados em `content/`,
  validados por **Zod** e compilados por `npm run build:content` para
  `assets/generated/content.json` (offline-first; busca local sem servidor)
- **Camada didática** (set/2026): cada tópico abre com uma vinheta
  clínica (`cena`), interrompe a leitura com uma pergunta de recuperação
  ativa de resposta recolhida (`pense`), fecha com o resumo "Em três
  linhas" (`resumo`) e termina num caso-relâmpago (`relampago`), um
  parágrafo-caso de decisão única que serve de ponte para os casos
  ramificados
- **Semiologia em movimento e som** (set/2026): ilustrações temporais que
  se desenham (`id="anima-N"` + stroke-dashoffset: sopros no ciclo, ondas
  do pulso venoso, curvas térmicas, ritmos respiratórios), sons de
  ausculta em bloco `som` com player `expo-audio`, e micro-recompensas
  sóbrias no quiz (check que se desenha, shake curto, expo-haptics),
  tudo respeitando `prefers-reduced-motion`
- **Progresso**: SQLite (`expo-sqlite`) + repetição espaçada **SM-2**
  (fila de revisão diária)
- **Acesso**: entitlements por sistema com prazo, adaptador de loja e
  bloqueios, em `src/entitlements/`
- **Sincronização** (opcional, desligada por flag): Firebase Auth +
  Firestore com motor de merge e regras auditadas; ativação em
  `docs/firebase-setup.md`
- **Design "Editorial"** (set/2026): tipografia Libre Bodoni (títulos) +
  Source Serif 4 (leitura) + Public Sans (UI); papel/tinta com acento
  vinho no claro e noturno-tinta no escuro; separação por regras
  tipográficas; tokens de movimento (ease-out forte, pressões 120 ms,
  stagger 40 ms) em `src/design/movimento.tsx`
- **Qualidade**: Jest + jest-expo, CI no GitHub Actions e cinco gates de
  conteúdo (contraste, razões de verossimilhança, travessões, menções às
  fontes e versão), descritos abaixo
- **Deploy web**: branch `gh-pages` (procedimento nominal em
  `docs/deploy-gh-pages.md`)

## Telas

- **Guia**: home com os 12 sistemas, tela de sistema e capítulos, tópico
  em seções navegáveis (essencial → técnica → avançado) com tabelas de
  evidência, manobras passo a passo, pérolas (pull-quotes), armadilhas
  e ilustrações
- **Busca**: offline; sinais e checklists são resultados de primeira
  classe e abrem o tópico na parte certa
- **Modo plantão** (aba própria): "achei um sinal no exame, e agora?",
  com os 186 verbetes agrupados por sistema, busca instantânea e o salto
  ao tópico de origem
- **Checklists de exame** (aba própria): os 53 roteiros do guia, mais o
  exame completo da cabeça aos pés com relatório do que faltou, com
  itens marcáveis e a opção de praticar cada roteiro como estação OSCE
- **Estudar**: a porta de entrada do estudo, com a revisão espaçada do
  dia (SM-2, incluindo flashcards dos 186 sinais) e dois caminhos de
  tela própria, **Questões** e **Casos clínicos**, ambos organizados
  como o plantão (busca instantânea, grupos por sistema, linhas que
  abrem no lugar com histórico de acerto e desfecho)
- **Perfil**: progresso, data da prova, bibliografia do guia, o bloco
  "Seu acesso" com o estado da assinatura, preferências, tema claro e
  escuro, exportação dos dados de uso, feedback, versão do app e conta
  (atrás da flag de sync)
- **Acesso completo**: a tela de assinatura, com o que já é gratuito, o
  que a assinatura abre, preço com a periodicidade, renovação
  automática, cancelamento e restauração de compra

## O que falta

1. **Endosso dos 67 casos clínicos**: todos estão `revisao: pendente` e
   aparecem com o selo "Em revisão pelo autor"; fila de trabalho por
   sistema em `docs/casos-para-revisao.md`.
2. **Cobrança de verdade**: o paywall está completo, mas falta instalar
   a biblioteca de compras, implementar a interface `Loja`, chamar
   `configurarLoja(...)` e criar o produto `acesso_anual` no console.
   Passo a passo na seção 8 de `docs/monetizacao.md`.
3. **Publicação nas lojas**: a configuração está pronta no repositório
   (pacote `br.com.semioguia.app`, `eas.json`, política de privacidade
   em `public/privacidade.html`, peças da ficha em `assets/loja/`);
   faltam a conta de desenvolvedor e o build assinado, na máquina do
   autor. Textos da ficha em `docs/publicar-na-loja.md`.
4. **Ativação do Firebase**: flag mestre desligada; passos em
   `docs/firebase-setup.md`, também na máquina do autor.
5. **Fase futura planejada: exame físico do idoso**, por decisão do
   autor (2026-09-03) deixa de ser fronteira aceita; capítulo próprio a
   especificar depois do fechamento do beta (os fundamentos do exame
   psíquico e o delirium já apontam para ele).
6. **Fronteiras declaradas** (fora por decisão ou por silêncio das
   fontes, reavaliáveis): obstetrícia (sem obra de referência no
   acervo), marcha da criança pequena, exame motor neonatal
   especializado e puericultura.

## Problemas conhecidos

- **Cores de sistema sob daltonismo**: a re-otimização global de
  2026-09-03 eliminou as colisões (o pior par sob deuteranopia e
  protanopia subiu de ΔE00 0,00 para 1,67), mas com 12 cores
  categóricas a paleta opera no limite prático: a cor nunca é canal
  único, e ícone, nome e posição desambiguam. Pisos vigiados por
  `npm run checar:contraste`.
- **Reanimated 4.5 e jest-expo**: incompatíveis hoje; as animações usam
  o `Animated` do React Native com os mesmos valores de curva e duração.
- **Peso do pacote web**: o bundle passa de 8 MB, e as listas longas
  ainda rolam sem virtualização.

## Regras editoriais com gate

Três decisões do autor que o CI vigia, porque texto novo tende a
esquecê-las:

- **Sem travessão nem meia-risca** em nenhum texto do projeto, incluindo
  código e documentação. No lugar: vírgula, dois-pontos, ponto final ou
  parênteses; faixas numéricas usam "a" (`npm run checar:travessao`).
- **Toda razão de verossimilhança numérica em prosa** vem com a tradução
  interpretativa de quanto o achado move a probabilidade, no mesmo
  parágrafo (`npm run checar:rv`).
- **As obras de referência não são citadas no corpo do conteúdo**, só no
  frontmatter (`npm run checar:fontes`).

## Rodando localmente

```bash
npm install
npm run build:content   # compila o conteúdo (YAML e MD para JSON)
npx expo start          # i = iOS, a = Android, w = web
```

Antes de qualquer publicação, os gates:

```bash
npm test                # 70 suítes / 498 testes
npx tsc --noEmit
npm run checar:contraste
npm run checar:rv
npm run checar:travessao
npm run checar:fontes
npm run checar:versao
```

Relatórios de apoio: `npm run revisao:status` (o que falta revisar),
`npm run relatorio:ilustracoes` (cobertura visual) e
`npm run relatorio:beta` (dados de uso exportados do app).

## Estrutura

```
content/            # o conteúdo (YAML de sistemas + MD por tópico + casos + SVGs)
src/app/            # rotas (expo-router)
src/content/        # schema Zod, parser e provider
src/design/         # tokens, tipografia, movimento, componentes de bloco
src/entitlements/   # acesso, assinatura anual, adaptador da loja e bloqueios
src/revisao/        # SM-2, fila do dia e semeadura
src/casos/          # motor dos casos ramificados
src/progress/       # SQLite e preferências
src/sync/           # Firebase (atrás de flag)
scripts/            # build de conteúdo, gates, relatórios e geradores de mídia
docs/               # deploy, Firebase, monetização, publicação e revisões
assets/loja/        # ícone, destaque e capturas da ficha da loja
public/             # o que vai junto no export web (política de privacidade)
```

Documentos que vale abrir primeiro: `docs/monetizacao.md` (acesso e
preço), `docs/publicar-na-loja.md` (ficha e build assinado),
`docs/casos-para-revisao.md` (fila de endosso) e
`docs/deploy-gh-pages.md` (publicação da web).

O conteúdo é autoral e cita as obras por capítulo e seção (páginas
apenas onde conferidas na fonte); os livros de referência **não** fazem
parte deste repositório.
