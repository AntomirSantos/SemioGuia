# SemioGuia Fase 7 — Exame do abdome: Design

Data: 22/08/2026 · Autor do produto: Antomir Santos · Status: aprovado em chat

## 1. Objetivo

Sistema novo **Abdome** com o capítulo "Exame do abdome" (4 tópicos), no
padrão editorial das Fases 5–6: prosa original ancorada, aprofundamentos,
quiz balanceado, checklists-estação, ilustrações. Fecha o tripé
tórax–coração–abdome. Sem casos novos nesta fase.

## 2. Decisões do autor (registradas em 22/08)

1. Fase 7 = capítulo de abdome, 4 tópicos (opção recomendada aceita).
2. Sem casos clínicos novos; todo conteúdo nasce `revisao: pendente`.
3. Regras editoriais das fases anteriores permanecem (originalidade,
   âncoras, sem fármacos/doses, divergências atribuídas).

## 3. Estrutura

### `sistemas.yaml`

```yaml
- id: abdome                    # NOVO — ordem 5, cor "#D99A3B", icone grid-3x3
  titulo: Abdome                # (grade 3×3 = as nove regiões abdominais)
  capitulos:
    - id: exame-do-abdome       # "Exame do abdome", ordem 1
```

(Ícone: `grid-3x3` → `Grid3x3` do lucide; a Task 1 verifica o nome exato
do export e, se ausente, escolhe o equivalente mais próximo e registra.)

### Abdome · Exame do abdome (ordem 1–4)

1. `inspecao-e-ausculta-do-abdome` — divisões (9 regiões e 4 quadrantes,
   com a projeção visceral essencial), formas do abdome (plano, globoso,
   em avental, batráquio, escavado), pele e parede (cicatrizes,
   estrias, circulação colateral e seus tipos, hérnias à manobra de
   esforço), abaulamentos e peristaltismo visível; a ORDEM invertida do
   abdome (auscultar antes de percutir/palpar, e por quê), ruídos
   hidroaéreos (presença/ausência, o que significa), sopros abdominais
   (onde procurar). Avançado: sinais de Cullen e Grey-Turner,
   diferenciação dos tipos de circulação colateral, íleo × obstrução na
   ausculta (com o ceticismo de McGee sobre RHA, se ancorável).
2. `percussao-do-abdome` — técnica e os dois sons do abdome, hepatimetria
   (limite superior COERENTE com o tópico de percussão do tórax —
   referência cruzada obrigatória; borda inferior; faixa normal
   ancorada), espaço de Traube (referência cruzada ao tórax, aqui na
   leitura esplênica — percussão do baço, Castell se ancorável),
   **ascite**: macicez móvel de decúbito, semicírculo de Skoda, sinal do
   piparote (com utilidade/limites e LRs de McGee quando houver).
   Avançado: LRs da ascite (McGee), percussão do baço e seus limites.
3. `palpacao-do-abdome` — superficial (parede × cavidade, tensão,
   diferenciação parede/intracavitário com a manobra de elevação da
   cabeça), profunda (técnica, mono e bimanual), **fígado** (técnicas de
   Lemos Torres e Mathieu, o que descrever da borda), **baço** (posição
   de Schuster, por que só o baço aumentado é palpável), rins (Guyon,
   punho-percussão fica no tópico 4), vesícula (Murphy fica no tópico 4;
   aqui Courvoisier como aprofundamento). Avançado: características
   semiológicas do fígado palpável (consistência/borda/superfície e o que
   sugerem), Courvoisier, LRs de hepato/esplenomegalia (McGee).
4. `abdome-agudo-e-sinais-peritoneais` — dor à descompressão brusca
   (Blumberg) e sua leitura, defesa voluntária × contratura (ventre em
   tábua), McBurney, Rovsing, sinais do psoas e do obturador, **Murphy**,
   Giordano/punho-percussão lombar, percussão dolorosa como alternativa
   gentil à descompressão (se ancorada em McGee), silêncio abdominal.
   Avançado: LRs de apendicite e colecistite (McGee), Jobert
   (pneumoperitônio) se ancorado, armadilhas no idoso.

## 4. Padrão editorial

Idêntico às Fases 5–6 (seções "O essencial" → técnica com
`manobra`+`checklist` → temáticas → "Armadilhas" → "Teste rápido"), MAIS
as regras que as revisões da Fase 6 tornaram explícitas, valendo DESDE O
PRIMEIRO RASCUNHO:

- Quiz: 4–6 perguntas/tópico com `explicacao`; **gabarito balanceado por
  posição no capítulo** (nenhum índice acima de ~8/24); distratores
  plausíveis (nunca espantalhos) e excludíveis pelo texto-base do
  tópico; explicações sem referência posicional às alternativas.
- Checklist executável a partir do conteúdo de nível básico.
- Varredura n-grama antes do commit (zero corridas expositivas ≥10;
  citações atribuídas entre aspas são a exceção).
- Divergências entre fontes: um lado atribuído ou os dois atribuídos,
  nunca misturados; escalas rotuladas; números datados com a fonte.
- Ilustrações ≥2 no capítulo (candidatas: as 9 regiões com projeção
  visceral; sítios dos sinais de abdome agudo; hepatimetria/Traube),
  renderizadas e inspecionadas nos dois temas; fonte byte-idêntica.
- Referências cruzadas obrigatórias: limite superior da macicez hepática
  e espaço de Traube → percussão do tórax; refluxo hepatojugular →
  capítulo do coração; Virchow/supraclavicular → linfonodos; dor
  abdominal na HDA → anamnese. Sem fármacos/doses; "aferir" a PA.
- Âncoras: Porto Sem. Méd. (Parte de abdome/sistema digestório), Porto
  Ex. Clín., McGee (caps. de abdome — ascite, hepatomegalia,
  esplenomegalia, abdominal pain/peritonite; páginas reais via running
  headers), Semiologia Clínica (cap. de abdome). Citações por
  capítulo/seção nomeada; páginas só quando verificáveis.

## 5. Código (mínimo)

`sistemas.yaml` (+ sistema abdome, ordem 5), `src/design/icones.ts`
(+1 ícone), `content.json` regenerado, ajuste apenas de testes que fixem
contagens/ordem.

## 6. Erros e testes

Gates de sempre; revisão médica independente por capítulo (opus) +
re-revisão + micro-rounds; revisão final de fase (fable); deploy gh-pages
com verificação headless (home com 5 sistemas; tópico novo; busca por
"ascite"/"Blumberg").

## 7. Fora desta fase

Casos novos; toque retal/genitourinário (vai com o capítulo próprio);
demais capítulos; 4B.
