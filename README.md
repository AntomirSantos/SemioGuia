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
está em **beta de validação** (v1.2.37): o acervo inteiro está no aplicativo,
a conta é paga por anúncios, e quem preferir compra a remoção deles junto com
o uso offline.

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
| Acesso | Anamnese e Exame físico geral abertos; os outros dez abrem com um anúncio, por aba e por sessão. R$ 24,90 uma vez tiram os anúncios e liberam o uso offline |
| Testes | **70 suítes / 498 testes** verdes |

## Como o app se sustenta

Decisão do autor (2026-09-07), plano completo em `docs/monetizacao.md`.

O acervo inteiro está no aplicativo, sem cadastro e sem corte de conteúdo. O
que muda é como ele abre:

- **Anamnese e Exame físico geral abrem sozinhos**, sempre.
- **Cada outro sistema abre com um anúncio premiado, por aba**: liberar o
  cardiovascular no Guia não o libera no modo plantão. A liberação vale até o
  aplicativo ser fechado, porque ela mora só na memória.
- **Usar o app sem internet é da compra.** Sem rede e sem compra, o app pede
  conexão em vez de mostrar conteúdo.
- **R$ 24,90, uma vez só**, tiram os anúncios para sempre e liberam o uso
  offline. É compra única, não assinatura: não renova, não vence e vale nas
  versões futuras. Na loja, produto avulso `sem_anuncios`.
- **Na web não há anúncio, parede nem compra.** A cobrança da loja não existe
  no navegador, então lá o app é gratuito e limpo, permanentemente.

Quatro garantias que o código já dá: nada de anúncio na web, nada de anúncio
enquanto a compra carrega, falta de inventário abre o conteúdo em vez de
trancá-lo, e o regime inteiro fica invisível enquanto o SDK não estiver
ligado, o que torna seguro publicar antes de integrá-lo.

O app fala com duas interfaces, `Loja` (`src/entitlements/loja.ts`) e
`Anuncios` (`src/anuncios/anuncios.ts`), e nunca com SDK nativo: telas, regra
e restauração já existem e são testadas com implementações de mentira.

O corte por sistema da versão anterior segue no código, dormente atrás de
`PAYWALL_ATIVO`, com seus testes.

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
- **Acesso**: compra única que remove os anúncios e libera o offline, regime
  de liberação por anúncio premiado (`src/anuncios/`) e o corte por sistema
  dormente (`src/entitlements/`)
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
- **Sem anúncios, e offline**: a tela da compra única, com o que ela muda, o
  acervo que já é seu, o preço, a promessa de não renovar nem vencer, e a
  restauração de compra

## O que falta

1. **Endosso dos 67 casos clínicos**: todos estão `revisao: pendente` e
   aparecem com o selo "Em revisão pelo autor"; fila de trabalho por
   sistema em `docs/casos-para-revisao.md`.
2. **SDK de anúncios e de compras**: o regime e a compra estão completos e
   testados no app, mas falta instalar as bibliotecas, implementar as
   interfaces `Anuncios` e `Loja`, chamar `configurarAnuncios(...)` e
   `configurarLoja(...)`, e criar o produto `sem_anuncios` no console.
3. **Conformidade dos anúncios**: SDK de consentimento (LGPD), política de
   privacidade refeita e a declaração "contém anúncios" na ficha.
4. **Publicação nas lojas**: a configuração está pronta no repositório
   (pacote `br.com.semioguia.app`, `eas.json`, política de privacidade
   em `public/privacidade.html`, peças da ficha em `assets/loja/`);
   faltam a conta de desenvolvedor e o build assinado, na máquina do
   autor. Textos da ficha em `docs/publicar-na-loja.md`.
5. **Ativação do Firebase**: flag mestre desligada; passos em
   `docs/firebase-setup.md`, também na máquina do autor.
6. **Fase futura planejada: exame físico do idoso**, por decisão do
   autor (2026-09-03) deixa de ser fronteira aceita; capítulo próprio a
   especificar depois do fechamento do beta (os fundamentos do exame
   psíquico e o delirium já apontam para ele).
7. **Fronteiras declaradas** (fora por decisão ou por silêncio das
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
src/entitlements/   # compra única, adaptador da loja e o corte por sistema (dormente)
src/anuncios/       # regime de liberação por anúncio, adaptador e telas do regime
src/revisao/        # SM-2, fila do dia e semeadura
src/casos/          # motor dos casos ramificados
src/progress/       # SQLite e preferências
src/sync/           # Firebase (atrás de flag)
scripts/            # build de conteúdo, gates, relatórios e geradores de mídia
docs/               # deploy, Firebase, monetização, publicação e revisões
assets/loja/        # ícone, destaque e capturas da ficha da loja
public/             # o que vai junto no export web (política de privacidade)
```

Documentos que vale abrir primeiro: `docs/rodar-no-computador.md` (trazer o
projeto para a sua máquina), `docs/monetizacao.md` (anúncios, compra e preço), `docs/publicar-na-loja.md` (ficha e build assinado),
`docs/casos-para-revisao.md` (fila de endosso) e
`docs/deploy-gh-pages.md` (publicação da web).

O conteúdo é autoral e cita as obras por capítulo e seção (páginas
apenas onde conferidas na fonte); os livros de referência **não** fazem
parte deste repositório.
